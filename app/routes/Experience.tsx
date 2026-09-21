import { useState, useEffect } from "react";
import { FilterBar } from "~/component/FilterBar";
import { TechTag } from "~/component/TechTag";
import { roles, type PageProps } from "~/data/portfolio-data";
import { cls } from "~/util/string";
import usage from "~/util/usage";

const Experience = ({ tech, setTech }: PageProps) => {
    const [open, setOpen] = useState(0);
    useEffect(() => {
        if (!tech) return;
        const first = usage(tech).roles[0];
        if (first !== undefined) setOpen(first);
    }, [tech]);
    const count = tech ? usage(tech).roles.length : 0;

    return (
        <div className={cls.inner}>
            <h2 className={cls.h2}>Experience</h2>
            <FilterBar tech={tech} count={count} setTech={setTech} />
            <div>
                {roles.map((r, i) => {
                    const isOpen = open === i;
                    const hit = !!tech && r.tech.includes(tech);
                    const dim = !!tech && !hit;
                    return (
                        <div
                            key={r.org + r.when}
                            className={`border-t border-l-2 border-t-[color:var(--line)] pl-[.9rem] transition-[opacity,border-color] duration-[250ms] last:border-b last:border-b-[color:var(--line)] ${hit ? 'border-l-[color:var(--accent)]' : 'border-l-transparent'
                                } ${dim ? 'opacity-[.35]' : ''}`}
                        >
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={`role-${i}`}
                                onClick={() => setOpen(isOpen ? -1 : i)}
                                className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-0 bg-transparent py-[1.1rem] text-left text-inherit"
                            >
                                <span>
                                    <span className={`${cls.h3} block group-hover:text-[color:var(--accent)]`}>{r.org}</span>
                                    <span className={`mt-[.2rem] block ${cls.small}`}>{r.title}</span>
                                </span>
                                <span className={`text-right ${cls.small}`}>
                                    {r.when}{' '}
                                    <span aria-hidden="true" className={`inline-block transition-transform duration-[250ms] ${isOpen ? 'rotate-90' : ''}`}>›</span>
                                </span>
                            </button>
                            <div id={`role-${i}`} className={`kp-panel grid transition-[grid-template-rows] duration-[350ms] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden">
                                    <ul className={cls.list}>{r.pts.map((p) => <li key={p}>{p}</li>)}</ul>
                                    {r.tech.length > 0 && (
                                        <div className="mb-5 flex flex-wrap gap-2">
                                            {r.tech.map((n) => <TechTag key={n} name={n} tech={tech} setTech={setTech} />)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Experience;