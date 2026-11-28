import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

export type DocDates = {
  created: string | null;
  modified: string | null;
};

const cache = new Map<string, DocDates>();

/**
 * 从本地 git 历史读取文档的创建/最后修改时间，避免依赖 GitHub API 限额。
 * 在没有 .git 的环境中返回 null，由调用方回退到 GitHub 数据。
 */
export function getLocalGitDates(absolutePath: string | undefined): DocDates {
  if (!absolutePath) return { created: null, modified: null };

  const cached = cache.get(absolutePath);
  if (cached) return cached;

  let result: DocDates = { created: null, modified: null };

  try {
    const output = execFileSync('git', ['log', '--follow', '--format=%cI', '--', absolutePath], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    const dates = output ? output.split('\n').filter(Boolean) : [];
    result = {
      created: dates.length > 0 ? dates[dates.length - 1] : null,
      modified: dates.length > 0 ? dates[0] : null,
    };
  } catch {
    // git unavailable (e.g. deployment without history)
  }

  // 文件尚未提交时 git 没有记录，退回文件系统时间
  if (!result.created || !result.modified) {
    try {
      const stat = statSync(absolutePath);
      const fallback = (stat.birthtimeMs > 0 ? stat.birthtime : stat.mtime).toISOString();
      result = {
        created: result.created ?? fallback,
        modified: result.modified ?? fallback,
      };
    } catch {
      // file not readable
    }
  }

  cache.set(absolutePath, result);
  return result;
}
