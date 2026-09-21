import { PAGE, skills, strengths, type PageProps } from "~/data/portfolio-data";
import { cls, chipCls, plural } from "~/util/string";
import usage from "~/util/usage";

const about = ({ tech, setTech, go }: PageProps) => {
    const u = tech ? usage(tech) : null;
    const total = u ? u.roles.length + u.projects.length : 0;
    return (
        <div className={cls.inner}>
            <h2 className={cls.h2}>About</h2>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
                <div>
                    {strengths.map(([title, text]) => (
                        <div key={title} className="mb-6">
                            <h3 className={cls.h3}>{title}</h3>
                            <p className={`mt-[.35rem] mb-0 ${cls.body}`}>{text}</p>
                        </div>
                    ))}
                    <hr className="my-6 border-0 border-t border-t-[color:var(--line)]" />
                    <p className={`m-0 ${cls.small}`}>BS Computer Science, Informatics International College, Cainta (2022)</p>
                    <p className={`mt-2 mb-0 ${cls.small}`}>HackerRank certificates in problem solving, SQL, JavaScript and Java; Udemy course on Spring with JPA / Hibernate.</p>
                </div>
                <div>
                    <p className={`m-0 mb-2 ${cls.small}`}>Pick a technology to see the roles and projects that used it.</p>
                    {skills.map(([group, items]) => (
                        <div key={group} className="grid gap-2 border-t border-t-[color:var(--line)] py-[.9rem] sm:grid-cols-[10rem_1fr] sm:gap-6">
                            <div className="kp-serif pt-[.15rem] text-[1.1rem]">{group}</div>
                            <div className="flex flex-wrap gap-[.4rem]">
                                {items.map((name) => {
                                    const uu = usage(name);
                                    const count = uu.roles.length + uu.projects.length;
                                    const on = tech === name;
                                    return (
                                        <button key={name} type="button" aria-pressed={on} className={chipCls(on, count > 0)} onClick={() => setTech(on ? null : name)}>
                                            {name}
                                            {count > 0 && <sup className={`ml-1 text-[.7em] ${on ? 'text-[color:var(--paper)]' : 'text-[color:var(--accent)]'}`}>{count}</sup>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {tech && u && (
                        <div className="mt-5 border-t border-t-[color:var(--accent)] pt-4">
                            <p className="m-0 mb-3">
                                <strong>{tech}</strong>{' '}
                                <span className={cls.small}>
                                    {total > 0
                                        ? `· ${plural(u.roles.length, 'role')}, ${plural(u.projects.length, 'project')}`
                                        : '· not tied to a specific role or project on these pages'}
                                </span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {u.roles.length > 0 && <button type="button" className={cls.btnSmall} onClick={() => go(PAGE.experience)}>See the roles</button>}
                                {u.projects.length > 0 && <button type="button" className={cls.btnSmall} onClick={() => go(PAGE.projects)}>See the projects</button>}
                                <button type="button" className={cls.btnSmallGhost} onClick={() => setTech(null)}>Clear</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default about;