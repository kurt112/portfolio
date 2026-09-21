
export const cls = {
    h2: 'kp-serif m-0 mb-[clamp(1.25rem,3vw,2.5rem)] text-[clamp(2rem,4.6vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.01em]',
    h3: 'kp-serif m-0 text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-tight',
    body: 'max-w-[62ch] text-[clamp(.95rem,1.35vw,1.05rem)] leading-[1.7] text-[color:var(--mute)]',
    small: 'text-sm text-[color:var(--mute)]',
    list: 'm-0 mb-4 max-w-[66ch] list-disc pl-[1.1rem] text-[.98rem] leading-[1.65] text-[color:var(--mute)] [&>li]:mb-[.45rem]',
    inner: 'mx-auto flex min-h-full max-w-[60rem] flex-col justify-center pt-8',
    link: 'border-b border-b-[color:var(--line)] pb-px text-[color:var(--ink)] no-underline hover:border-b-[color:var(--accent)] hover:text-[color:var(--accent)]',
    btn: 'inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--ink)] bg-[color:var(--ink)] px-5 py-[.7rem] text-[.95rem] text-[color:var(--paper)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]',
    btnGhost: 'inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--line)] bg-transparent px-5 py-[.7rem] text-[.95rem] text-[color:var(--ink)] hover:border-[color:var(--ink)]',
    btnSmall: 'inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--ink)] bg-[color:var(--ink)] px-4 py-[.4rem] text-[.85rem] text-[color:var(--paper)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]',
    btnSmallGhost: 'inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--line)] bg-transparent px-4 py-[.4rem] text-[.85rem] text-[color:var(--ink)] hover:border-[color:var(--ink)]',
    field: 'mb-4 block',
    fieldLabel: 'mb-[.3rem] block text-[.85rem] text-[color:var(--mute)]',
    input: 'w-full rounded-none border-0 border-b border-b-[color:var(--line)] bg-transparent py-[.55rem] text-base text-[color:var(--ink)] focus:border-b-[color:var(--accent)] focus:outline-none',
};

export const pillOn = 'border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--paper)]';
export const tagCls = (on: boolean) =>
    `inline-block cursor-pointer rounded-full border px-[.65rem] py-[.22rem] text-[.8rem] ${on ? pillOn : 'border-[color:var(--line)] bg-[color:var(--tag)] text-[color:var(--mute)] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)]'
    }`;
export const chipCls = (on: boolean, used = false) =>
    `inline-block cursor-pointer rounded-full border px-[.65rem] py-[.22rem] text-[.9rem] ${on
        ? pillOn
        : `border-[color:var(--line)] bg-transparent hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] ${used ? 'text-[color:var(--ink)]' : 'text-[color:var(--mute)]'}`
    }`;

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
