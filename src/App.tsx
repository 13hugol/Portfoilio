import { useEffect, useRef, useState } from 'react';
import './index.css';
import portfolioData from '../public/data/portfolio-data.json';
import { ErrorBoundary } from './components/ErrorBoundary';
import MatrixRain from './components/MatrixRain';
import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';

const FRAME_COUNT = 286;

function App() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const imagesRef     = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress]               = useState(0);
  const [loaded, setLoaded]                   = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Derived — no state needed: canvas fades out as progress goes 0.88 → 0.975
  // At p=0.975 exactly, About section enters viewport bottom (with -20vh margin below)
  const canvasOpacity = Math.max(0, Math.min(1, (0.975 - progress) / 0.095));
  const navVisible    = progress >= 0.88;

  const { personalInfo, bio, achievements, skills, projects, education, certifications } = portfolioData;


  // ── 1. Preload frames ──────────────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const idx = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${idx}_delay-0.045s.webp`;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (i === 0) drawFrame(0);
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      imagesRef.current[i] = img;
    }
  }, []);

  // ── 2. Draw frame (cover-fit) ──────────────────────────────────────────────
  const drawFrame = (index: number) => {
    if (!canvasRef.current || !imagesRef.current[index]) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img.complete || img.naturalWidth === 0) return;
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = canvas.width  / 2 - (img.width  / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // ── 3. Scroll tracking ──────────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      if (!containerRef.current) return;
      const { offsetTop: top, offsetHeight: height } = containerRef.current;
      const scrollable = height - window.innerHeight;
      const raw        = window.scrollY - top;
      const p          = raw < 0 ? 0 : raw > scrollable ? 1 : raw / scrollable;
      setProgress(p);
      const frameIdx = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => drawFrame(frameIdx));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  // ── 4. Resize handler ──────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width  = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT)));
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [progress]);

  // ── Fade helper ────────────────────────────────────────────────────────────
  const fade = (start: number, end: number, p: number) => {
    if (p < start || p > end) return 0;
    const r = (end - start) * 0.3;
    if (p < start + r) return (p - start) / r;
    if (p > end - r)   return (end - p) / r;
    return 1;
  };

  // ── Bio text (strip "Technical Skills\n\n" prefix) ────────────────────────
  const bioText = bio.about.includes('\n\n') ? bio.about.split('\n\n').slice(1).join(' ') : bio.about;

  return (
    <ErrorBoundary>
      <div className="bg-pure-black text-text-primary min-h-screen font-sans selection:bg-matrix-green selection:text-pure-black">

        {/* ── Fixed matrix rain background ──────────────────────────────── */}
        <MatrixRain />

        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <Navigation visible={navVisible} />

      {/* ── Loading overlay ─────────────────────────────────────────────────── */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pure-black">
          <div className="text-4xl font-black tracking-tighter mb-2 text-matrix-green animate-pulse">
            {personalInfo.name}
          </div>
          <div className="text-xs text-text-tertiary mb-8 tracking-[0.3em] uppercase">Loading Portfolio</div>
          <div className="w-64 h-1 bg-hover-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-matrix-green transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-3 text-text-tertiary text-xs font-mono">{loadingProgress}%</div>
        </div>
      )}

      {/* ── Canvas — fixed overlay, plays while scrolling through the spacer ── */}
      <div
        className="fixed inset-0 bg-pure-black"
        style={{
          zIndex: 15,
          opacity: canvasOpacity,
          pointerEvents: canvasOpacity > 0.01 ? 'auto' : 'none',
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        <div className="absolute inset-0 bg-pure-black/40 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">

            {/* Section 1 · 0–25%  · Name & identity */}
            <div
              className="absolute w-full px-6 flex flex-col items-center justify-center text-center"
              style={{
                opacity:   fade(0, 0.25, progress),
                transform: `translateY(${progress * 80}px) scale(${1 + progress * 0.08})`,
              }}
            >
              <div className="text-xs font-mono text-green-500 tracking-[0.25em] uppercase mb-5">
                {personalInfo.location} · {personalInfo.website}
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
                {personalInfo.name}
              </h1>
              <p className="text-lg md:text-2xl font-light text-green-400 mb-3 tracking-wide">
                {personalInfo.title}
              </p>
              <p className="text-sm md:text-base text-gray-500 max-w-xl italic font-light">
                "{personalInfo.tagline}"
              </p>
              <div className="mt-14">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-3">Scroll to discover</p>
                <div className="w-px h-14 bg-gradient-to-b from-gray-600 to-transparent mx-auto" />
              </div>
            </div>

            {/* Section 2 · 35–65% · Skills & bio */}
            <div
              className="absolute w-full px-6 flex flex-col items-center justify-center text-center"
              style={{
                opacity:   fade(0.35, 0.65, progress),
                transform: `translateY(${(progress - 0.5) * 80}px)`,
              }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl">
                Full-Stack · <span className="text-green-500 font-mono italic">AI</span> · Game&nbsp;Dev
              </h2>
              <div className="p-7 rounded-3xl max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl mb-6">
                <p className="text-base md:text-xl font-light text-gray-200 leading-relaxed">
                  {bioText}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-xl">
                {Object.values(skills).flat().slice(0, 8).map(s => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-matrix-green/10 rounded-full text-xs font-mono text-matrix-green border border-matrix-green/30 backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 3 · 75–100% · CTA */}
            <div
              className="absolute w-full px-6 flex flex-col items-center justify-center text-center"
              style={{
                opacity:   fade(0.75, 1.0, progress),
                transform: `scale(${1 - (1 - progress) * 0.08})`,
              }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-xl text-white">
                Let's Build the Future
              </h2>
              <p className="text-gray-500 text-sm font-mono mb-8">{personalInfo.email}</p>
              <div className="flex gap-4 flex-wrap justify-center" style={{ pointerEvents: fade(0.75, 1.0, progress) > 0.05 ? 'auto' : 'none' }}>
                <a
                  href="#projects"
                  className="px-8 py-4 border border-matrix-green/50 text-matrix-green font-semibold rounded-full hover:border-matrix-green hover:bg-matrix-green/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  View My Work
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="px-8 py-4 border border-matrix-green/50 text-matrix-green font-semibold rounded-full hover:border-matrix-green hover:bg-matrix-green/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  Get In Touch
                </a>
              </div>
            </div>

          </div>
        </div>

      {/* ── Scroll spacer — 800vh gives the fixed canvas its scroll-driven playback room ── */}
      <div id="home" ref={containerRef} style={{ height: '800vh' }} />

      {/* ── Portfolio sections ───────────────────────────────────────────── */}
      {/* -20vh margin pulls About up so it enters viewport exactly as canvas fades to 0 */}
      <div style={{ marginTop: '-20vh' }}>
      <AboutSection data={bio} achievements={achievements} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <EducationSection education={education} certifications={certifications} />
      <ContactSection
        contactInfo={{
          name:     personalInfo.name,
          email:    personalInfo.email,
          website:  personalInfo.website,
          github:   personalInfo.github,
          linkedin: personalInfo.linkedin,
          location: personalInfo.location,
        }}
      />

      </div>

      </div>
    </ErrorBoundary>
  );
}

export default App;