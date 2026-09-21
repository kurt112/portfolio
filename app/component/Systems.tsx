
import { cls, chipCls } from "~/util/string";
import { type NodeId, nodeInfo, DiagramNode } from "./DiagramNode";
import useMediaQuery from "./useMediaQuery";
import { useState, type ChangeEvent } from "react";
import { BROKERS, LINKS, type Broker, type PageProps } from "~/data/portfolio-data";
import Readout from "./Readout";
import Counter from "./Counter";

export const Systems = ({ active }: PageProps) => {
    const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const [load, setLoad] = useState(300);
    const [broker, setBroker] = useState<Broker>('Apache Kafka');
    const [selected, setSelected] = useState<NodeId>('api');

    const tps = (load * 1000) / 86400;
    const workers = Math.max(1, Math.min(8, Math.ceil(tps)));
    const dots = Math.max(1, Math.min(9, Math.round(tps * 0.8)));
    const dur = 2.4;
    const [title, text] = nodeInfo[selected];

    return (
        <div className={cls.inner}>
            <h2 className={cls.h2}>How I build</h2>
            <p className={`m-0 mb-5 ${cls.body}`}>
                A simplified sketch of the event-driven pattern I work with. Click a part to read about it, then push the load and watch the workers scale.
            </p>

            <svg viewBox="0 0 750 310" role="group" aria-label="Event-driven architecture: client, API, broker, workers, store" className="block h-auto w-full">
                {LINKS.map(([a, b]) => (
                    <line key={a} x1={a} y1={150} x2={b} y2={150} className="stroke-[color:var(--line)] stroke-2 [stroke-dasharray:4_5]" />
                ))}
                <DiagramNode id="client" x={6} y={110} w={90} h={80} label="Client" sub="Angular · React" inside selected={selected} onSelect={setSelected} />
                <DiagramNode id="api" x={150} y={110} w={100} h={80} label="API" sub="Spring Boot" inside selected={selected} onSelect={setSelected} />
                <DiagramNode id="broker" x={304} y={100} w={104} h={100} label="Broker" sub={broker} inside selected={selected} onSelect={setSelected} />
                <DiagramNode id="workers" x={462} y={50} w={118} h={200} label={`Workers ×${workers}`} sub="Docker · Kubernetes" inside={false} selected={selected} onSelect={setSelected}>
                    {Array.from({ length: 8 }, (_, s) => (
                        <rect
                            key={s}
                            x={472 + (s % 2) * 54} y={62 + Math.floor(s / 2) * 46} width={44} height={36} rx={6}
                            className={`transition-[fill,stroke] duration-[350ms] ${s < workers ? 'fill-[color:var(--accent)] stroke-[color:var(--accent)]' : 'fill-[color:var(--tag)] stroke-[color:var(--line)]'
                                }`}
                        />
                    ))}
                </DiagramNode>
                <DiagramNode id="store" x={634} y={110} w={110} h={80} label="Store" sub="SQL + cache" inside selected={selected} onSelect={setSelected} />

                {!reduceMotion && active &&
                    LINKS.map(([a, b]) =>
                        Array.from({ length: dots }, (_, d) => (
                            <circle key={`${a}-${d}`} r={4} cx={0} cy={0} className="fill-[color:var(--accent)]">
                                <animateMotion dur={`${dur}s`} begin={`-${((d * dur) / dots).toFixed(2)}s`} repeatCount="indefinite" path={`M${a} 150 L${b} 150`} />
                            </circle>
                        )),
                    )}
            </svg>

            <div className="mt-4 mb-5 min-h-[4.5rem]" aria-live="polite">
                <p className={`${cls.h3} mb-[.3rem]`}>{title}{selected === 'broker' ? ` · ${broker}` : ''}</p>
                <p className={`m-0 ${cls.body}`}>{text}</p>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className={`mr-2 ${cls.small}`}>Broker</span>
                {BROKERS.map((b) => (
                    <button key={b} type="button" aria-pressed={broker === b} className={chipCls(broker === b)} onClick={() => setBroker(b)}>{b}</button>
                ))}
            </div>

            <label className="mb-5 block">
                <span className={`mb-[.4rem] block ${cls.small}`}>Daily load: {load}k transactions</span>
                <input
                    type="range" min={50} max={700} step={10} value={load}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLoad(Number(e.target.value))}
                    className="w-full accent-[color:var(--accent)]"
                />
            </label>

            <div className="grid grid-cols-2 gap-4 border-t border-t-[color:var(--line)] pt-4 sm:grid-cols-3">
                <Readout value={tps.toFixed(1)} label="transactions / second" />
                <Readout value={String(workers)} label="workers running" />
                <Readout value={<Counter active={active} tps={tps} />} label="processed since you arrived" />
            </div>
            <p className={`mt-4 ${cls.small}`}>
                Illustrative model: one worker is assumed to handle about one transaction a second. At NCS I manage microservices handling 300k+ transactions a day.
            </p>
        </div>
    );
}