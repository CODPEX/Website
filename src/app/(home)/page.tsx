'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Layers,
  Lock,
  Mail,
  Rocket,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';

import Aurora from '@/components/react-bits/Aurora';
import BlurText from '@/components/react-bits/BlurText';
import BorderGlow from '@/components/react-bits/BorderGlow';
import CardSwap from '@/components/react-bits/CardSwap';
import CountUp from '@/components/react-bits/CountUp';
import DecryptedText from '@/components/react-bits/DecryptedText';
import DotField from '@/components/react-bits/DotField';
import AnimatedList from '@/components/react-bits/AnimatedList';
import ScrollVelocity from '@/components/react-bits/ScrollVelocity';
import ShinyText from '@/components/react-bits/ShinyText';
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import SiteHeader from '@/components/site-header';
import { useSite } from '@/contexts/site-context';
import { featuredPosts } from '@/lib/blog-posts';

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

const projects = [
  { icon: <Rocket className="h-5 w-5" />, title: 'Aurora-Star-Launcher', description: 'Next-gen Minecraft launcher', meta: 'LAUNCHER' },
  { icon: <Sparkles className="h-5 w-5" />, title: 'StarsAICopilot', description: 'AI-powered code assistant', meta: 'AI' },
  { icon: <Terminal className="h-5 w-5" />, title: 'SimpleSSH', description: 'Fluent SSH client for Windows', meta: 'CLIENT' },
  { icon: <Database className="h-5 w-5" />, title: 'Open.StarsAPI', description: 'Authentication & data API', meta: 'API' },
  { icon: <Lock className="h-5 w-5" />, title: 'A-Login API', description: 'Python Flask auth solution', meta: 'AUTH' },
  { icon: <Code2 className="h-5 w-5" />, title: 'EasyGit', description: 'Beginner-friendly Git wrapper', meta: 'TOOL' },
  { icon: <Sparkles className="h-5 w-5" />, title: 'S-AI Music', description: 'Smart weather-adaptive music', meta: 'MUSIC' },
  { icon: <Globe className="h-5 w-5" />, title: 'SkyBBS', description: 'Community forum platform', meta: 'WEB' },
];

export default function HomePage() {
  const { t, theme, isDark, lang } = useSite();

  const features = [
    { icon: <Zap className="h-5 w-5" />, label: t('f1Label'), title: t('f1Title'), description: t('f1Desc') },
    { icon: <Layers className="h-5 w-5" />, label: t('f2Label'), title: t('f2Title'), description: t('f2Desc') },
    { icon: <Sparkles className="h-5 w-5" />, label: t('f3Label'), title: t('f3Title'), description: t('f3Desc') },
    { icon: <Globe className="h-5 w-5" />, label: t('f4Label'), title: t('f4Title'), description: t('f4Desc') },
  ];

  const stats = [
    { to: 2023, label: t('statSince') },
    { to: 8, suffix: '+', label: t('statProjects') },
    { to: 3, label: t('statProducts') },
    { to: 100, suffix: '%', label: t('statOpen') },
  ];

  const ghostButtonClass = `flex items-center gap-2 rounded-2xl border px-7 py-3.5 text-sm font-semibold backdrop-blur transition ${
    isDark
      ? 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-300/40 hover:text-white'
      : 'border-slate-300 bg-white/70 text-slate-700 hover:border-indigo-400 hover:text-slate-950'
  }`;

  const surfaceCardClass = `rounded-2xl border px-4 py-5 backdrop-blur-sm ${
    isDark ? 'border-white/[0.06] bg-white/[0.025]' : 'border-slate-200 bg-white/70'
  }`;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--site-bg)] text-[var(--site-fg)]">
      <div className="pointer-events-none fixed inset-0 z-0 codpex-grid" aria-hidden="true" />
      <SiteHeader />

      <section id="home" className="relative z-10 min-h-[100svh] w-full overflow-hidden">
          <div className="absolute inset-0 opacity-90">
            <DotField
              pattern="hex"
              dotRadius={1.15}
              dotSpacing={17}
              gradientFrom="#4f46e5"
              gradientTo="#d946ef"
              gradientAngle={135}
              glowColor="#818cf8"
              glowRadius={180}
              glowIntensity={0.9}
              cursorRadius={170}
              bulgeStrength={0.85}
              twist={0.35}
              waveAmplitude={0.35}
              sparkle
              speed={0.6}
              opacity={isDark ? 0.85 : 0.55}
              maxDevicePixelRatio={1.5}
              lightMode={!isDark}
              intro
            />
          </div>
          {/* 由 data-theme 驱动，暗色首屏不会先渲染白色遮罩 */}
          <div className="pointer-events-none absolute inset-0 home-hero-overlay" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pb-28 pt-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <ShinyText
                text={t('badge')}
                speed={3.2}
                color={isDark ? '#a5b4fc' : '#4f46e5'}
                shineColor={isDark ? '#ffffff' : '#312e81'}
                shineWidth={22}
                className="rounded-full border border-indigo-300/20 bg-indigo-300/[0.06] px-4 py-2 text-xs font-medium tracking-[0.18em] sm:text-sm"
              />
            </motion.div>

            <h1 className="codpex-script mx-auto mt-10 w-full max-w-6xl pb-2 text-center text-5xl leading-[1.3] sm:text-7xl lg:text-8xl">
              <span className="flex w-full justify-center">
                <BlurText
                  text={t('heroSlogan1')}
                  animateBy="words"
                  direction="top"
                  delay={120}
                  stepDuration={0.55}
                  blur={10}
                  distance={36}
                  effect="blur"
                  trigger="load"
                  className="codpex-text-gradient justify-center text-center"
                />
              </span>
              <span className="flex w-full justify-center">
                <BlurText
                  text={t('heroSlogan2')}
                  animateBy="words"
                  direction="top"
                  delay={340}
                  stepDuration={0.55}
                  blur={10}
                  distance={36}
                  effect="blur"
                  trigger="load"
                  className="codpex-text-gradient justify-center text-center"
                />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <BorderGlow
                glowColor="hsl(243 75% 59%)"
                backgroundColor="hsl(229 47% 8%)"
                borderRadius={16}
                glowRadius={20}
                glowIntensity={0.9}
                animated
                colors={['#4f46e5', '#a855f7', '#ec4899']}
                className="rounded-2xl"
              >
                <a href="#products" className="flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white">
                  {t('btnProducts')} <ArrowRight className="h-4 w-4" />
                </a>
              </BorderGlow>
              <a href="#contact" className={ghostButtonClass}>
                {t('btnContact')}
              </a>
              <a
                href="https://github.com/CODPEX"
                target="_blank"
                rel="noreferrer"
                className={ghostButtonClass}
              >
                {t('github')} <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.85 + index * 0.1, ease: 'easeOut' }}
                  className={surfaceCardClass}
                >
                  <div className="text-2xl font-bold text-[var(--site-fg)] sm:text-3xl">
                    <CountUp
                      to={stat.to}
                      suffix={stat.suffix ?? ''}
                      duration={2.4}
                      delay={0.4 + index * 0.15}
                      trigger="view"
                      mode="count"
                    />
                  </div>
                  <div className="mt-1 text-[11px] tracking-wider text-[var(--site-subtle)] sm:text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        <section className={`relative z-10 border-y py-7 ${isDark ? 'border-white/[0.06] bg-white/[0.015]' : 'border-slate-200 bg-white/40'}`}>
          <ScrollVelocity
            texts={[
              'React', 'Vue', 'Node.js', 'TypeScript', 'Python', '.NET', 'Flask', 'Git', 'Blender', 'Avalonia', t('brand'),
            ]}
            velocity={0.9}
            gap={48}
            fontSize="clamp(28px, 4.5vw, 58px)"
            fontWeight={700}
            color={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(15,23,42,0.16)'}
            outlineAlternate
            fadeEdges
            pauseOnHover
            draggable
            separator={<span className="mx-6 text-indigo-500/70">✦</span>}
            className="select-none"
          />
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-28">
          <Reveal>
            <div className="text-center">
              <ShinyText
                text={t('featuresBadge')}
                speed={3.5}
                color={isDark ? '#a5b4fc' : '#4f46e5'}
                shineColor={isDark ? '#ffffff' : '#312e81'}
                className="text-xs font-semibold tracking-[0.4em]"
              />
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--site-fg)] sm:text-5xl">
                {t('featuresTitle')}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--site-muted)] sm:text-base">
                {t('featuresDesc')}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.09}>
                <SpotlightCard
                  theme={theme}
                  spotlightColor={isDark ? 'rgba(129,140,248,0.24)' : 'rgba(79,70,229,0.16)'}
                  intensity={0.9}
                  spotlightSize={260}
                  shape="beam"
                  borderGlow={0.8}
                  proximity={0.6}
                  ambient
                  flare
                  grain={0.18}
                  className="h-full rounded-3xl p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--site-border)] bg-[var(--site-hover)] text-indigo-500">
                    {feature.icon}
                  </div>
                  <div className="mt-6 text-[11px] tracking-[0.2em] text-[var(--site-subtle)]">{feature.label}</div>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--site-fg)]">
                    <DecryptedText
                      text={feature.title}
                      speed={45}
                      animateOn="view"
                      effect="scramble"
                      scrambleColor="#818cf8"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--site-muted)]">{feature.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-indigo-500">
                    <Check className="h-3.5 w-3.5" /> {t('ready')}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="products" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <ShinyText
                  text={t('productsBadge')}
                  speed={3.5}
                  color={isDark ? '#f0abfc' : '#a21caf'}
                  shineColor={isDark ? '#ffffff' : '#312e81'}
                  className="text-xs font-semibold tracking-[0.4em]"
                />
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--site-fg)] sm:text-5xl">
                  {t('productsTitle')}
                </h2>
                <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--site-muted)] sm:text-base">
                  {t('productsDesc')}
                </p>
                <ul className="mt-8 space-y-4">
                  {[t('prod1'), t('prod2'), t('prod3')].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[var(--site-fg)]">
                      <CheckCircle2 className="h-4 w-4 flex-none text-indigo-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-5">
                  <a
                    href={`/${lang}/docs`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 transition hover:text-indigo-400"
                  >
                    {t('productDocs')} <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/CODPEX"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-muted)] transition hover:text-[var(--site-fg)]"
                  >
                    {t('github')} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className={`relative h-[420px] w-full rounded-[32px] border p-4 ${isDark ? 'border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-transparent' : 'border-slate-200 bg-white/60'}`}>
                <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.18),transparent_55%)]" />
                <CardSwap
                  width={360}
                  height={280}
                  cardDistance={62}
                  verticalDistance={40}
                  depth={85}
                  skewAmount={4}
                  visibleCards={3}
                  delay={2800}
                  autoplay
                  pauseOnHover
                  draggable
                  cardRadius={24}
                  theme={theme}
                  className="relative z-10"
                >
                  <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-indigo-300/20 bg-[#0b1020] shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-3 text-[10px] tracking-[0.3em] text-indigo-300">
                      <span>API</span>
                      <span>A-LOGIN</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/products/API.png" alt="A-Login API" className="min-h-0 w-full flex-1 object-cover object-top" />
                    <div className="px-5 py-4 text-sm font-semibold text-white">A-Login API</div>
                  </div>
                  <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-fuchsia-300/20 bg-[#150b1f] shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-3 text-[10px] tracking-[0.3em] text-fuchsia-300">
                      <span>AI</span>
                      <span>STARS COPILOT</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/products/sac.png" alt="Stars AI Copilot" className="min-h-0 w-full flex-1 object-cover object-top" />
                    <div className="px-5 py-4 text-sm font-semibold text-white">Stars AI Copilot</div>
                  </div>
                  <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-purple-300/20 bg-gradient-to-br from-[#131033] to-[#1b0f2a] p-6 shadow-2xl">
                    <div className="flex items-center justify-between text-purple-300">
                      <Terminal className="h-6 w-6" />
                      <span className="text-[10px] tracking-[0.3em]">SSH</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">SimpleSSH</div>
                      <p className="mt-2 text-sm text-slate-400">
                        {isDark ? '现代、直观的 SSH 客户端，让云服务器管理更轻松。' : 'A modern SSH client for effortless cloud server management.'}
                      </p>
                    </div>
                    <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-purple-400 to-transparent" />
                  </div>
                </CardSwap>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-stretch gap-12 lg:grid-cols-2">
            <Reveal>
              <div id="about" className="flex h-full min-h-[420px] scroll-mt-28 flex-col justify-center">
                <ShinyText
                  text={t('aboutBadge')}
                  speed={3.5}
                  color={isDark ? '#c4b5fd' : '#6d28d9'}
                  shineColor={isDark ? '#ffffff' : '#312e81'}
                  className="text-xs font-semibold tracking-[0.4em]"
                />
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--site-fg)] sm:text-5xl">
                  {t('aboutTitle1')}
                  <br />
                  {t('aboutTitle2')}
                </h2>
                <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--site-muted)] sm:text-base">{t('aboutDesc')}</p>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--site-subtle)]">{t('mission')}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[t('value1'), t('value2'), t('value3'), t('value4')].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--site-border)] bg-[var(--site-hover)] px-4 py-2 text-xs text-[var(--site-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="h-[420px] w-full">
                <AnimatedList
                  items={projects}
                  theme={theme}
                  accentColor="#818cf8"
                  animation="none"
                  stagger={70}
                  frame
                  width="100%"
                  maxHeight={420}
                  gap={10}
                  radius={18}
                  showGradients
                  selectOnHover
                  enableArrowNavigation
                  initialSelectedIndex={0}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <ShinyText
                  text="BLOG"
                  speed={3.5}
                  color={isDark ? '#a5b4fc' : '#4f46e5'}
                  shineColor={isDark ? '#ffffff' : '#312e81'}
                  className="text-xs font-semibold tracking-[0.4em]"
                />
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--site-fg)] sm:text-4xl">
                  {t('blog')}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--site-muted)]">
                  {lang === 'zh' ? '来自 CODPEX 的工程实践与产品思考。' : 'Engineering and product notes from CODPEX.'}
                </p>
              </div>
              <a href="/blog" className={ghostButtonClass}>
                {lang === 'zh' ? '查看全部' : 'View all'} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <Reveal key={post.href}>
                <SpotlightCard
                  theme={theme}
                  spotlightColor={isDark ? 'rgba(129,140,248,0.22)' : 'rgba(79,70,229,0.14)'}
                  intensity={0.8}
                  spotlightSize={220}
                  borderGlow={0.6}
                  ambient
                  className="flex h-full flex-col rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between text-xs text-[var(--site-subtle)]">
                    <span>{post.tag}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-[var(--site-fg)]">
                    {lang === 'zh' ? post.title : post.titleEn}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--site-muted)]">
                    {lang === 'zh' ? post.description : post.descriptionEn}
                  </p>
                  <a
                    href={post.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-500"
                  >
                    {lang === 'zh' ? '阅读全文' : 'Read more'} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <div className={`relative overflow-hidden rounded-[32px] border px-6 py-24 text-center sm:px-12 ${isDark ? 'border-white/10 bg-[#080b14]' : 'border-slate-200 bg-white/80'}`}>
              <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('/images/background-contact.png')" }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 opacity-60">
                <Aurora
                  colorStops={['#4f46e5', '#a855f7', '#ec4899']}
                  amplitude={1.1}
                  blend={0.65}
                  speed={0.85}
                  height={340}
                  layers={4}
                  glow={0.8}
                  brightness={0.9}
                  mouseInteraction
                  lightMode={!isDark}
                  intro
                />
              </div>
              <div className="pointer-events-none absolute inset-0 contact-overlay" aria-hidden="true" />
              <div className="relative z-10">
                <div className={`mx-auto flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-[0.2em] ${isDark ? 'border-white/15 bg-white/[0.06] text-slate-300' : 'border-slate-200 bg-white/70 text-slate-600'}`}>
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> {t('contactBadge')}
                </div>
                <h2 className="mt-7 text-3xl font-bold tracking-tight text-[var(--site-fg)] sm:text-6xl">
                  {t('contactTitle1')} <span className="codpex-text-gradient">{t('contactTitle2')}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[var(--site-muted)] sm:text-base">
                  {t('contactDesc')}
                </p>
                <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[var(--site-subtle)]">
                  {t('contactWarning')}
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <BorderGlow
                    glowColor="hsl(292 84% 65%)"
                    backgroundColor="hsl(240 30% 8%)"
                    borderRadius={16}
                    glowRadius={20}
                    glowIntensity={0.85}
                    animated
                    colors={['#4f46e5', '#a855f7', '#ec4899']}
                    className="rounded-2xl"
                  >
                    <a
                      href="mailto:support@codpex.top"
                      className="flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
                    >
                      <Mail className="h-4 w-4" /> support@codpex.top
                    </a>
                  </BorderGlow>
                  <a
                    href="https://github.com/CODPEX"
                    target="_blank"
                    rel="noreferrer"
                    className={ghostButtonClass}
                  >
                    <Code2 className="h-4 w-4" /> {t('github')}
                  </a>
                  <a
                    href={`/${lang}/docs`}
                    target="_blank"
                    rel="noreferrer"
                    className={ghostButtonClass}
                  >
                    {t('docs')} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className={`relative z-10 border-t py-12 ${isDark ? 'border-white/[0.06]' : 'border-slate-200'}`}>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 sm:flex-row sm:items-start">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 text-sm font-bold tracking-tight" style={{ color: 'var(--site-fg)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt={t('brand')} className="h-7 w-7" style={{ filter: isDark ? 'invert(1)' : 'none' }} />
                {t('brand')}
              </div>
              <p className="mt-4 text-xs leading-6 text-[var(--site-subtle)]">{t('footerTagline')}</p>
              <p className="mt-2 text-xs text-[var(--site-subtle)]">{t('copyright')}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs text-[var(--site-muted)] sm:grid-cols-1">
              <a href={`/${lang}/docs`} target="_blank" rel="noreferrer" className="transition hover:text-[var(--site-fg)]">
                {t('docs')}
              </a>
              <a href="https://github.com/CODPEX/SimpleSSH" target="_blank" rel="noreferrer" className="transition hover:text-[var(--site-fg)]">
                SimpleSSH
              </a>
              <a
                href="https://github.com/CODPEX/StarsAICopilot.Avalonia"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[var(--site-fg)]"
              >
                StarsAICopilot
              </a>
              <a href="mailto:support@codpex.top" className="transition hover:text-[var(--site-fg)]">
                support@codpex.top
              </a>
            </div>
          </div>
        </footer>
    </main>
  );
}
