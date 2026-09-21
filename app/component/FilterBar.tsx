import type { PageProps } from "~/data/portfolio-data";
import { chipCls } from "~/util/string";

export const FilterBar = ({ tech, count, setTech }: { tech: string | null; count: number; setTech: PageProps['setTech'] }) => {
    if (!tech) return null;
    return (
        <div className="-mt-4 mb-5 flex flex-wrap items-center gap-3 text-[.95rem] text-[color:var(--mute)]">
            <span>
                {count > 0 ? 'Highlighting where ' : 'Nothing listed here uses '}
                <strong className="font-semibold text-[color:var(--ink)]">{tech}</strong>
                {count > 0 ? ' is used' : ''}
            </span>
            <button type="button" className={chipCls(false)} onClick={() => setTech(null)}>Clear filter</button>
        </div>
    );
}