import type { PageProps } from "~/data/portfolio-data";
import { tagCls } from "~/util/string";

export const TechTag = ({ name, tech, setTech }: { name: string; tech: string | null; setTech: PageProps['setTech'] }) => {
    const on = tech === name;
    return (
        <button type="button" aria-pressed={on} title="Show where this is used" className={tagCls(on)} onClick={() => setTech(on ? null : name)}>
            {name}
        </button>
    );
}