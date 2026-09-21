import { useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project, PageProps } from "~/data/portfolio-data";
import { PortalContext } from "~/context/PortalContext";
import { cls, chipCls, tagCls } from "~/util/string";
import Stepper from "./Stepper";

const ProjectSheet = ({ project, tech, setTech, onClose }: { project: Project; tech: string | null; setTech: PageProps['setTech']; onClose: () => void }) => {
    const container = useContext(PortalContext);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            previous?.focus?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!container) return null;
    return createPortal(
        <div
            data-modal="true"
            className="absolute inset-0 z-[2000] flex justify-end bg-black/50 print:hidden"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={project.name}
                className="h-full w-[min(40rem,100%)] animate-[kp-slidein_320ms_cubic-bezier(.2,.7,.2,1)] overflow-y-auto border-l border-l-[color:var(--line)] bg-[color:var(--paper)] p-[clamp(1.25rem,4vw,2.5rem)] pt-[calc(clamp(1.25rem,4vw,2.5rem)+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] text-[color:var(--ink)] motion-reduce:animate-none"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className={`${cls.h2} mb-1`}>{project.name}</h2>
                        <p className={`m-0 ${cls.small}`}>{project.kind} · personal project</p>
                    </div>
                    <button ref={closeRef} type="button" className={chipCls(false)} onClick={onClose}>Close</button>
                </div>
                <ul className={`${cls.list} mt-6`}>{project.pts.map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="mb-7 flex flex-wrap gap-2">
                    {project.stack.map((n) => (
                        <button key={n} type="button" className={tagCls(tech === n)} onClick={() => { setTech(n); onClose(); }}>{n}</button>
                    ))}
                </div>
                <Stepper title={project.flowTitle} flow={project.flow} />
            </div>
        </div>,
        container,
    );
}

export default ProjectSheet;