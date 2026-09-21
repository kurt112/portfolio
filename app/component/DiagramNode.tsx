import type { ReactNode } from "react";

interface DiagramNodeProps {
    id: NodeId;
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    sub: string;
    inside: boolean;
    selected: NodeId;
    onSelect: (id: NodeId) => void;
    children?: ReactNode;
}



export const DiagramNode = ({ id, x, y, w, h, label, sub, inside, selected, onSelect, children }: DiagramNodeProps) => {
    const on = selected === id;
    const bottom = y + h;
    return (
        <g
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${label} — ${sub}`}
            className="group cursor-pointer outline-none"
            onClick={() => onSelect(id)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(id);
                }
            }}
        >
            <rect
                x={x} y={y} width={w} height={h} rx={10}
                className={`fill-[color:var(--paper)] transition-[stroke] duration-200 ${on
                    ? 'stroke-[color:var(--accent)] stroke-[2.5]'
                    : 'stroke-[color:var(--line)] stroke-[1.5] group-hover:stroke-[color:var(--ink)] group-focus-visible:stroke-[color:var(--accent)]'
                    }`}
            />
            {children}
            <text x={x + w / 2} y={inside ? y + h / 2 + 7 : bottom + 22} textAnchor="middle" className="fill-[color:var(--ink)] text-[20px]">{label}</text>
            <text x={x + w / 2} y={inside ? bottom + 22 : bottom + 40} textAnchor="middle" className="fill-[color:var(--mute)] text-[15px] max-[520px]:hidden">{sub}</text>
        </g>
    );
}

export type NodeId = 'client' | 'api' | 'broker' | 'workers' | 'store';

export const nodeInfo: Record<NodeId, [title: string, text: string]> = {
    client: ['Client', 'Angular, React and React Native front ends call the API and render results for the user.'],
    api: ['API', 'Spring Boot, Spring MVC and JAX-RS services expose REST endpoints and hand slow or heavy work to the broker instead of doing it inline.'],
    broker: ['Broker', 'Apache Kafka or RabbitMQ carries events between services, so producers and consumers stay decoupled and can be scaled separately.'],
    workers: ['Workers', 'Containerised consumers on Docker and Kubernetes. Replicas can scale with load, for example with KEDA.'],
    store: ['Store', 'SQL databases with tuned queries and caching keep reads fast once the work is done.'],
};