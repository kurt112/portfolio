import { useState, useRef, useEffect } from "react";

const Counter = ({ active, tps }: { active: boolean; tps: number }) => {
    const [n, setN] = useState(0);
    const acc = useRef(0);
    useEffect(() => {
        if (!active) return;
        const id = window.setInterval(() => {
            acc.current += tps * 0.25;
            setN(Math.floor(acc.current));
        }, 250);
        return () => window.clearInterval(id);
    }, [active, tps]);
    return <span>{n.toLocaleString('en-US')}</span>;
}

export default Counter;