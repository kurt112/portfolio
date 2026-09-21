import type { CSSProperties } from "react";
import { cls } from "~/util/string";

const Cover = () => {
    const rise = (delay: number): { className: string; style: CSSProperties } => ({
        className: 'animate-[kp-settle_900ms_ease_both] motion-reduce:animate-none',
        style: { animationDelay: `${delay}ms` },
    });
    return (
        <div className={cls.inner}>
            <p {...rise(0)} className={`${rise(0).className} m-0 mb-6 ${cls.small}`}>Portfolio · Makati City, Philippines</p>
            <h1 {...rise(120)} className={`${rise(120).className} kp-serif m-0 text-[clamp(2.75rem,9vw,7rem)] font-light leading-[1.02] tracking-[-0.02em]`}>
                Kurt Lupin<br />Orioque
            </h1>
            <p {...rise(240)} className={`${rise(240).className} kp-serif m-0 mt-[clamp(1.25rem,3vw,2.25rem)] max-w-[38ch] text-[clamp(1.15rem,2.2vw,1.6rem)] leading-[1.45]`}>
                Senior full-stack engineer. I build event-driven systems, and the interfaces that sit on top of them.
            </p>
            <div {...rise(360)} className={`${rise(360).className} mt-[clamp(1.5rem,4vw,3rem)]`}>
                <p className={`m-0 ${cls.body}`}>
                    Six-plus years building enterprise web and mobile products in Java, Spring Boot, Angular and React, from fintech core banking to SaaS. I design microservices, run their deployments, and mentor the engineers who work on them.
                </p>
                <p className={`mt-6 ${cls.small}`}>Drag the page, peel the corner, swipe, or use the arrow keys.</p>
            </div>
        </div>
    );
}

export default Cover;