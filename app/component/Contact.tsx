import { useState, type ChangeEvent, type FormEvent } from "react";
import { EMAIL, GITHUB, LINKEDIN } from "~/data/portfolio-data";
import { cls } from "~/util/string";

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const update = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setForm((f) => ({ ...f, [key]: value }));
    };
    const send = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`;
        const subject = `Hello from ${form.name || 'your portfolio'}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className={cls.inner}>
            <h2 className={cls.h2}>Say hello</h2>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
                <div>
                    <p className={`m-0 mb-6 ${cls.body}`}>Open to senior full-stack and backend roles, and to conversations about event-driven architecture.</p>
                    <p className="m-0 mb-2"><a className={cls.link} href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
                    <p className="m-0 mb-2"><a className={cls.link} href={GITHUB} target="_blank" rel="noopener noreferrer">github.com/kurt112</a></p>
                    <p className="m-0 mb-7"><a className={cls.link} href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                    <button type="button" className={`${cls.btnGhost} print:hidden`} onClick={() => window.print()}>Save résumé as PDF</button>
                </div>
                <form onSubmit={send} className="print:hidden">
                    <label className={cls.field}>
                        <span className={cls.fieldLabel}>Your name</span>
                        <input required value={form.name} onChange={update('name')} autoComplete="name" className={cls.input} />
                    </label>
                    <label className={cls.field}>
                        <span className={cls.fieldLabel}>Your email</span>
                        <input type="email" required value={form.email} onChange={update('email')} autoComplete="email" className={cls.input} />
                    </label>
                    <label className={cls.field}>
                        <span className={cls.fieldLabel}>Message</span>
                        <textarea required rows={4} value={form.message} onChange={update('message')} className={cls.input} />
                    </label>
                    <button type="submit" className={cls.btn}>Send message</button>
                    <p className={`mt-3 ${cls.small}`}>This opens your email app with the message ready to send.</p>
                </form>
            </div>
        </div>
    );
}

export default Contact;