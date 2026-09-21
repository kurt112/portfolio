import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type {
  ComponentType,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useNavigate, useParams } from "react-router";
import { ArrowIcon } from '~/component/ArrowIcon';
import Contact from '~/component/Contact';
import { Systems } from '~/component/Systems';
import useMediaQuery from '~/component/useMediaQuery';
import { PortalContext } from '~/context/PortalContext';
import { pageNames, type PageProps } from '~/data/portfolio-data';
import About from './About';
import Cover from './Cover';
import Experience from './Experience';
import Projects from './Projects';
import type { Route } from '../+types/root';

const views: ComponentType<PageProps>[] = [Cover, About, Experience, Projects, Systems, Contact];

// Slugs for dynamic route matching: "" for Cover, "about", "experience", etc.
const pageSlugs = pageNames.map((name, idx) => (idx === 0 ? '' : name.toLowerCase().replace(/\s+/g, '-')));

const NO_DRAG = 'button,a,input,textarea,label,select,[role="button"],[data-nodrag]';
const TURN_DEG = 104;
const EASE = 'cubic-bezier(.65,.05,.25,1)';

type DragState = { dir: 'next' | 'prev'; p: number };
interface DragStart {
  x: number;
  y: number;
  id: number;
  mode: 'next' | 'prev' | null;
  p: number;
  width: number;
  el: HTMLElement;
}

export interface PortfolioProps {
  className?: string;
}

const Home = ({ className = '' }: PortfolioProps) => {
  const { page } = useParams();
  const navigate = useNavigate();

  // Derive current page index from URL parameter
  const activeSlug = page ? page.toLowerCase() : '';
  const pageIndexFromUrl = pageSlugs.indexOf(activeSlug);
  const current = pageIndexFromUrl !== -1 ? pageIndexFromUrl : 0;

  // Track mounting state so direct page loads trigger flip animation from page 0
  const hasMounted = useRef(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [tech, setTech] = useState<string | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragStart = useRef<DragStart | null>(null);
  const pageEls = useRef<(HTMLElement | null)[]>([]);

  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = theme ? theme === 'dark' : systemDark;
  const count = views.length;

  // Initialize and animate displayIndex step-by-step
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (current !== 0) {
        // Trigger a tiny delay so the DOM mounts before applying rotateY
        const initTimer = setTimeout(() => {
          setDisplayIndex(current);
        }, 50);
        return () => clearTimeout(initTimer);
      }
      return;
    }

    if (displayIndex === current) return;

    // Synchronize displayIndex step-by-step allowing CSS 900ms transition time
    const timer = setTimeout(() => {
      setDisplayIndex((prev) => {
        if (prev < current) return prev + 1;
        if (prev > current) return prev - 1;
        return prev;
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [current, displayIndex]);

  const go = useCallback(
    (target: number | ((c: number) => number)) => {
      const targetIndex = typeof target === 'function' ? target(displayIndex) : target;
      const nextIndex = Math.max(0, Math.min(count - 1, targetIndex));
      if (nextIndex === displayIndex) return;

      const targetSlug = pageSlugs[nextIndex];
      navigate(targetSlug ? `/${targetSlug}` : '/', { preventScrollReset: true });
    },
    [count, displayIndex, navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
      if (root?.querySelector('[data-modal]')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go((c) => c + 1);
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go((c) => c - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, root]);

  useEffect(() => {
    const el = pageEls.current[displayIndex];
    if (el) el.scrollTop = 0;
  }, [displayIndex]);

  /* Drag to turn. Pointer events cover mouse, pen and touch. */
  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    if (!e.currentTarget.contains(e.target as Node)) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if ((e.target as HTMLElement).closest?.(NO_DRAG)) return;
    dragStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId, mode: null, p: 0, width: e.currentTarget.clientWidth, el: e.currentTarget };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const d = dragStart.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.mode) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dy) > Math.abs(dx)) { dragStart.current = null; return; }
      const mode = dx < 0 ? 'next' : 'prev';
      if ((mode === 'next' && displayIndex >= count - 1) || (mode === 'prev' && displayIndex <= 0)) { dragStart.current = null; return; }
      d.mode = mode;
      try { d.el.setPointerCapture(e.pointerId); } catch { /* not supported */ }
    }
    d.p = Math.max(0, Math.min(1, Math.abs(dx) / (d.width * 0.55)));
    setDrag({ dir: d.mode, p: d.p });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLElement>) => {
    const d = dragStart.current;
    if (!d) return;
    dragStart.current = null;
    if (!d.mode) return;
    try { d.el.releasePointerCapture(e.pointerId); } catch { /* not supported */ }
    setDrag(null);
    if (d.p > 0.3) go((c) => (d.mode === 'next' ? c + 1 : c - 1));
  };

  const onPointerCancel = () => {
    dragStart.current = null;
    setDrag(null);
  };

  const pageStyle = (i: number): CSSProperties => {
    const turned = i < displayIndex;
    const dragging = !!drag && ((drag.dir === 'next' && i === displayIndex) || (drag.dir === 'prev' && i === displayIndex - 1));
    const base: CSSProperties = {
      zIndex: turned ? 10 + i : count - i,
      transformOrigin: 'left center',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      willChange: 'transform',
    };

    if (dragging && drag) {
      const deg = drag.dir === 'next' ? -TURN_DEG * drag.p : -TURN_DEG * (1 - drag.p);
      return {
        ...base,
        transform: `rotateY(${deg}deg)`,
        boxShadow: `30px 0 60px rgba(0,0,0,${(0.25 * (deg / -TURN_DEG)).toFixed(3)})`,
        visibility: 'visible',
        transition: 'none',
      };
    }
    if (reduceMotion) {
      return {
        ...base,
        opacity: turned ? 0 : 1,
        visibility: turned ? 'hidden' : 'visible',
        transition: turned ? 'opacity 250ms linear, visibility 0s linear 250ms' : 'opacity 250ms linear, visibility 0s',
      };
    }
    return turned
      ? {
        ...base,
        transform: `rotateY(-${TURN_DEG}deg)`,
        boxShadow: '30px 0 60px rgba(0,0,0,.25)',
        visibility: 'hidden',
        transition: `transform 900ms ${EASE}, box-shadow 900ms ease, visibility 0s linear 900ms`,
      }
      : {
        ...base,
        transform: 'rotateY(0deg)',
        visibility: 'visible',
        transition: `transform 900ms ${EASE}, box-shadow 900ms ease, visibility 0s`,
      };
  };

  return (
    <PortalContext.Provider value={root}>
      <div
        ref={setRoot}
        data-theme={theme ?? undefined}
        className={`kp relative h-[100dvh] w-full overflow-hidden bg-[color:var(--bg)] pt-[env(safe-area-inset-top,0px)] text-[color:var(--ink)] ${className}`}
      >
        <button
          type="button"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label="Toggle light and dark theme"
          className="absolute top-[calc(.75rem+env(safe-area-inset-top,0px))] right-[clamp(.75rem,3vw,2rem)] z-[1000] cursor-pointer rounded-full border border-[color:var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] px-3 py-[.4rem] text-[.8rem] text-[color:var(--mute)] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] print:hidden"
        >
          {isDark ? 'Light' : 'Dark'}
        </button>

        <main
          className={`kp-book relative h-full w-full touch-pan-y overflow-hidden bg-[color:var(--bg)] [perspective:2400px] ${drag ? 'cursor-grabbing select-none' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          {/* the binding */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-0 z-[500] w-[clamp(14px,2.4vw,34px)] [background:linear-gradient(to_right,rgba(0,0,0,.14),rgba(0,0,0,.04)_55%,transparent)] print:hidden"
          />

          {views.map((View, i) => {
            const isCurrent = i === displayIndex;
            const inertProps: Record<string, string> = isCurrent ? {} : { inert: '' };
            return (
              <section
                key={pageNames[i]}
                ref={(el) => { pageEls.current[i] = el; }}
                aria-label={pageNames[i]}
                aria-hidden={!isCurrent}
                {...inertProps}
                style={pageStyle(i)}
                className="kp-page absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain bg-[color:var(--paper)] pt-[clamp(1.25rem,4vw,4rem)] pr-[clamp(1.25rem,6vw,6rem)] pb-[5.5rem] pl-[clamp(1.75rem,7vw,7rem)]"
              >
                <View tech={tech} setTech={setTech} go={go} active={isCurrent} />
              </section>
            );
          })}

          {displayIndex < count - 1 && (
            <button
              type="button"
              aria-label="Turn to the next page"
              onClick={() => go(displayIndex + 1)}
              className="absolute right-0 bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] z-[900] h-[34px] w-[34px] cursor-pointer border-0 p-0 transition-[width,height] duration-200 [background:linear-gradient(135deg,var(--paper)_46%,var(--line)_50%,var(--bg)_54%)] [filter:drop-shadow(-2px_-2px_3px_rgba(0,0,0,.18))] hover:h-16 hover:w-16 focus-visible:h-16 focus-visible:w-16 motion-reduce:transition-none print:hidden"
            />
          )}
        </main>

        <nav
          aria-label="Pages"
          className="absolute inset-x-0 bottom-0 z-[1000] flex items-center justify-between gap-4 border-t border-t-[color:var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] px-[clamp(1rem,4vw,2.5rem)] pt-[.6rem] pb-[calc(.6rem+env(safe-area-inset-bottom,0px))] backdrop-blur-[8px] print:hidden"
        >
          <button
            type="button"
            aria-label="Previous page"
            disabled={displayIndex === 0}
            onClick={() => go(displayIndex - 1)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[color:var(--line)] bg-transparent text-[color:var(--ink)] enabled:hover:border-[color:var(--ink)] disabled:cursor-default disabled:opacity-30"
          >
            <ArrowIcon dir="left" />
          </button>

          <div className="flex items-center gap-1">
            {pageNames.map((name, i) => (
              <button
                key={name}
                type="button"
                aria-label={name}
                aria-current={i === displayIndex ? 'page' : undefined}
                onClick={() => go(i)}
                className={`cursor-pointer rounded-md border-0 bg-transparent px-[.3rem] py-3 text-[.85rem] sm:px-2 sm:py-2 ${i === displayIndex ? 'font-semibold text-[color:var(--ink)]' : 'text-[color:var(--mute)]'
                  }`}
              >
                <span className="hidden sm:inline">{name}</span>
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full sm:hidden ${i === displayIndex ? 'w-[22px] bg-[color:var(--ink)]' : 'w-2 bg-[color:var(--line)]'}`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next page"
            disabled={displayIndex === count - 1}
            onClick={() => go(displayIndex + 1)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[color:var(--line)] bg-transparent text-[color:var(--ink)] enabled:hover:border-[color:var(--ink)] disabled:cursor-default disabled:opacity-30"
          >
            <ArrowIcon dir="right" />
          </button>
        </nav>
      </div>
    </PortalContext.Provider>
  );
};

export async function loader({ request }: Route.LoaderArgs) {
  return { message: "Hello World" };
}

export default Home;