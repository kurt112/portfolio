import { roles, projects } from "~/data/portfolio-data";

const usage = (tech: string) => {
    return {
        roles: roles.flatMap((r, i) => (r.tech.includes(tech) ? [i] : [])),
        projects: projects.flatMap((p, i) => (p.stack.includes(tech) ? [i] : [])),
    };
}

export default usage;