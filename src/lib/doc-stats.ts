export type DocStats = {
  words: number;
  minutes: number;
};

const CJK_RE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/g;
const LATIN_WORD_RE = /[A-Za-z0-9_]+(?:['’-][A-Za-z0-9_]+)*/g;

/**
 * 统计文档字数与预估阅读时间。
 * - 中日韩字符按 1 字计，拉丁文按单词计
 * - 中文 300 字/分钟，英文 200 词/分钟
 */
export function getDocStats(text: string): DocStats {
  const cjk = text.match(CJK_RE)?.length ?? 0;
  const latin = text.replace(CJK_RE, ' ').match(LATIN_WORD_RE)?.length ?? 0;
  const words = cjk + latin;
  const minutes = Math.max(1, Math.ceil(cjk / 300 + latin / 200));

  return { words, minutes };
}
