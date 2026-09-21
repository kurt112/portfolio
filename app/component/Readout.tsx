import type { ReactNode } from "react";
import { cls } from "~/util/string";

const Readout = ({ value, label }: { value: ReactNode; label: string }) => {
    return (
        <div>
            <div className="kp-serif text-[clamp(1.4rem,3vw,2rem)] leading-[1.1] tabular-nums">{value}</div>
            <div className={cls.small}>{label}</div>
        </div>
    );
}

export default Readout;