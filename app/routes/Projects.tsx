import { useState } from "react";
import { FilterBar } from "~/component/FilterBar";
import { TechTag } from "~/component/TechTag";
import { type PageProps, projects, GITHUB } from "~/data/portfolio-data";
import { cls } from "~/util/string";
import usage from "~/util/usage";
import ProjectSheet from "./ProjectSheet";



const Projects = ({ tech, setTech }: PageProps) => {
    const [selected, setSelected] = useState<number | null>(null);
    const count = tech ? usage(tech).projects.length : 0;

    return (
        <div className={cls.inner}>
            <h2 className={cls.h2}>Projects</h2>
            <p className={`m-0 mb-6 ${cls.body}`}>Products I designed and built myself, outside of client work. Open one for a walkthrough.</p>
            <FilterBar tech={tech} count={count} setTech={setTech} />
            <div>
                {projects.map((p, i) => {
                    const hit = !!tech && p.stack.includes(tech);
                    const dim = !!tech && !hit;
                    return (
                        <article
                            key={p.name}
                            className={`grid gap-x-10 gap-y-3 border-t border-l-2 border-t-[color:var(--line)] py-[clamp(1.1rem,2vw,1.6rem)] pl-[.9rem] transition-[opacity,border-color] duration-[250ms] min-[860px]:grid-cols-[15rem_1fr] ${hit ? 'border-l-[color:var(--accent)]' : 'border-l-transparent'
                                } ${dim ? 'opacity-[.35]' : ''}`}
                        >
                            <div>
                                <h3 className={cls.h3}>{p.name}</h3>
                                <p className={`mt-1 mb-[.6rem] ${cls.small}`}>{p.kind}</p>
                                <button
                                    type="button"
                                    onClick={() => setSelected(i)}
                                    className="cursor-pointer border-0 border-b border-b-[color:var(--line)] bg-transparent p-0 text-[.95rem] text-[color:var(--ink)] hover:border-b-[color:var(--accent)] hover:text-[color:var(--accent)]"
                                >
                                    Open walkthrough
                                </button>
                            </div>
                            <div>
                                <ul className={cls.list}>{p.pts.map((x) => <li key={x}>{x}</li>)}</ul>
                                <div className="flex flex-wrap gap-2">
                                    {p.stack.map((n) => <TechTag key={n} name={n} tech={tech} setTech={setTech} />)}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
            <p className={`mt-5 ${cls.small}`}>
                More code on <a className={cls.link} href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>.
            </p>
            {selected !== null && (
                <ProjectSheet project={projects[selected]} tech={tech} setTech={setTech} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}

export default Projects;