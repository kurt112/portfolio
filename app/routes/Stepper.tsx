import { useState, useEffect } from "react";
import type { Project } from "~/data/portfolio-data";
import { cls, chipCls } from "~/util/string";

const Stepper = ({ title, flow }: { title: string; flow: Project['flow'] }) => {
    const [i, setI] = useState(0);
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (!playing) return;
        const id = window.setInterval(() => setI((c) => (c + 1) % flow.length), 2200);
        return () => window.clearInterval(id);
    }, [playing, flow.length]);

    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <h3 className={cls.h3}>{title}</h3>
                <button type="button" className={chipCls(false)} onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
            </div>
            <div className="my-4 grid gap-[.4rem]" style={{ gridTemplateColumns: `repeat(${flow.length}, 1fr)` }}>
                {flow.map(([label], k) => (
                    <button
                        key={label}
                        type="button"
                        aria-label={`Step ${k + 1}: ${label}`}
                        onClick={() => { setPlaying(false); setI(k); }}
                        className="relative h-1 cursor-pointer overflow-hidden rounded border-0 bg-[color:var(--line)] p-0"
                    >
                        <span className={`absolute inset-0 origin-left bg-[color:var(--accent)] transition-transform duration-[400ms] motion-reduce:transition-none ${k <= i ? 'scale-x-100' : 'scale-x-0'}`} />
                    </button>
                ))}
            </div>
            <div className="min-h-[7.5rem] border-t border-t-[color:var(--line)] pt-4" aria-live="polite">
                <p className={`m-0 mb-1 ${cls.small}`}>Step {i + 1} of {flow.length}</p>
                <p className={`${cls.h3} mb-[.4rem]`}>{flow[i][0]}</p>
                <p className={`m-0 ${cls.body}`}>{flow[i][1]}</p>
            </div>
            <p className={`mt-3 ${cls.small}`}>A walkthrough of the flow, not the live product.</p>
        </div>
    );
}

export default Stepper;