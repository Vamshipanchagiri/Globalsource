import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router, Link, NavLink, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Menu, X, Mail, MapPin, Globe, ArrowRight, Check, Code2, Smartphone, CloudCog, Compass, BarChart3, ShieldCheck, Headphones } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import { COMPANY, SERVICES, INDUSTRIES, WHY_US, PROCESS, getService } from './data/site';

const ICONS = { Code2, Smartphone, CloudCog, Compass, BarChart3, ShieldCheck, Headphones };
const NAV = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/industries', label: 'Industries' },
    { to: '/contact', label: 'Contact' },
];

function Seo({ title, description, path, type = 'website', schema }) {
    const url = `${COMPANY.site}${path === '/' ? '/' : path}`;
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={COMPANY.name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
        </Helmet>
    );
}

function Logo() {
    return (
        <Link to="/" className="flex items-center gap-3" aria-label={`${COMPANY.name} home`}>
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#0b2545] text-sm font-bold tracking-tight text-white">GS</span>
            <span className="flex flex-col leading-tight">
                <span className="text-[15px] font-semibold tracking-tight text-[#0b2545]">GlobalSource Solutions</span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">IT Services &amp; Technology</span>
            </span>
        </Link>
    );
}

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-[76rem] items-center justify-between px-5">
                <Logo />
                <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
                    {NAV.map((n) => (
                        <NavLink
                            key={n.to}
                            to={n.to}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? 'text-[#1d4ed8]' : 'text-slate-700 hover:text-[#1d4ed8]'}`
                            }
                        >
                            {n.label}
                        </NavLink>
                    ))}
                    <Link to="/contact" className="rounded-md bg-[#0b2545] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#12386b]">
                        Talk to Us
                    </Link>
                </nav>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    className="grid h-11 w-11 place-items-center rounded-md border border-slate-200 text-[#0b2545] lg:hidden"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
            {open && (
                <nav className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden" aria-label="Mobile">
                    {NAV.map((n) => (
                        <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-slate-800">
                            {n.label}
                        </Link>
                    ))}
                    <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 block rounded-md bg-[#0b2545] px-5 py-3 text-center text-sm font-semibold text-white">
                        Talk to Us
                    </Link>
                </nav>
            )}
        </header>
    );
}

function Footer() {
    return (
        <footer className="mt-24 border-t border-slate-200 bg-[#0b2545] text-slate-300">
            <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-14 md:grid-cols-3">
                <div>
                    <p className="text-lg font-semibold text-white">{COMPANY.name}</p>
                    <p className="mt-1 text-sm">{COMPANY.tagline}</p>
                    <p className="mt-4 text-sm">{COMPANY.location}</p>
                    <a className="mt-1 block text-sm hover:text-white" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </div>
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Company</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        {[...NAV, { to: '/privacy-policy', label: 'Privacy Policy' }, { to: '/terms', label: 'Terms & Conditions' }].map((n) => (
                            <li key={n.to}><Link className="hover:text-white" to={n.to}>{n.label}</Link></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Services</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        {SERVICES.map((s) => (
                            <li key={s.slug}><Link className="hover:text-white" to={`/services/${s.slug}`}>{s.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
                &copy; 2026 {COMPANY.name}. All rights reserved.
            </div>
        </footer>
    );
}

const Section = ({ children, className = '' }) => (
    <section className={`mx-auto max-w-[76rem] px-5 py-16 md:py-20 ${className}`}>{children}</section>
);
const H2 = ({ children }) => <h2 className="text-3xl font-semibold tracking-tight text-[#0b2545] md:text-4xl">{children}</h2>;
const P = ({ children }) => <p className="mt-4 max-w-3xl text-[17px] leading-8 text-slate-600">{children}</p>;

function Crumbs({ items }) {
    return (
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
                <li><Link className="hover:text-[#1d4ed8]" to="/">Home</Link></li>
                {items.map((i) => (
                    <li key={i.to} className="flex items-center gap-2">
                        <span aria-hidden="true">/</span>
                        {i.to ? <Link className="hover:text-[#1d4ed8]" to={i.to}>{i.label}</Link> : <span className="text-slate-700">{i.label}</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

function CtaBand({ heading = "Let's Build Better Technology Together.", label = 'Talk to GlobalSource Solutions' }) {
    return (
        <section className="bg-[#0b2545]">
            <div className="mx-auto max-w-[76rem] px-5 py-16 text-center md:py-20">
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{heading}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-slate-300">
                    Tell us about the challenge you are working on and we will respond with a considered, practical next step.
                </p>
                <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#0b2545] transition hover:bg-slate-100">
                    {label} <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}

const ServiceIcon = ({ name, className = '' }) => {
    const I = ICONS[name] || Code2;
    return <I className={className} strokeWidth={1.6} />;
};

function ServiceCard({ s }) {
    return (
        <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-7 transition hover:border-[#1d4ed8]/40 hover:shadow-[0_12px_40px_-24px_rgba(11,37,69,0.5)]">
            <ServiceIcon name={s.icon} className="h-8 w-8 text-[#1d4ed8]" />
            <h3 className="mt-5 text-lg font-semibold text-[#0b2545]">{s.name}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">{s.short}</p>
            <Link to={`/services/${s.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8] hover:gap-3 transition-all">
                Learn More <ArrowRight size={15} />
            </Link>
        </article>
    );
}

function HomePage() {
    return (
        <>
            <Seo
                title="GlobalSource Solutions | IT Services & Technology Solutions"
                description="GlobalSource Solutions delivers reliable, scalable IT services — software development, cloud, data analytics, cybersecurity and managed IT — from Hyderabad, India, serving businesses globally."
                path="/"
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: COMPANY.name,
                    url: COMPANY.site,
                    email: COMPANY.email,
                    address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressRegion: 'Telangana', addressCountry: 'IN' },
                }}
            />
            <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                <div className="mx-auto grid max-w-[76rem] items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1d4ed8]">Serving businesses globally</p>
                        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#0b2545] md:text-[54px] md:leading-[1.08]">
                            Technology Solutions for a Smarter Business.
                        </h1>
                        <p className="mt-6 max-w-xl text-[18px] leading-8 text-slate-600">
                            GlobalSource Solutions delivers reliable and scalable IT solutions that help businesses solve technology challenges, improve operations, and accelerate digital growth.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link to="/services" className="rounded-md bg-[#0b2545] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#12386b]">Explore Our Services</Link>
                            <Link to="/contact" className="rounded-md border border-slate-300 px-6 py-3.5 text-sm font-semibold text-[#0b2545] transition hover:border-[#0b2545]">Talk to Us</Link>
                        </div>
                    </div>
                    <div className="w-full rounded-xl border border-slate-200 bg-gradient-to-br from-[#0b2545] to-[#12386b] p-10 shadow-[0_30px_80px_-50px_rgba(11,37,69,0.7)] min-h-[380px] flex flex-col justify-between">
                        <div className="grid grid-cols-3 gap-4">
                            {[{ I: Code2, l: 'Software Dev' }, { I: Smartphone, l: 'Web & Mobile' }, { I: CloudCog, l: 'Cloud' }, { I: BarChart3, l: 'Analytics & AI' }, { I: ShieldCheck, l: 'Cybersecurity' }, { I: Headphones, l: 'Managed IT' }].map(({ I, l }) => (
                                <div key={l} className="flex flex-col items-center gap-2 rounded-lg bg-white/10 p-4">
                                    <I className="h-7 w-7 text-white" strokeWidth={1.5} />
                                    <span className="text-center text-[11px] font-medium leading-tight text-white/80">{l}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                            {[['Global', 'Reach'], ['7', 'Services'], ['24/7', 'Support']].map(([v, l]) => (
                                <div key={l} className="text-center">
                                    <p className="text-2xl font-bold text-white">{v}</p>
                                    <p className="text-xs text-white/60 uppercase tracking-wider mt-1">{l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Section>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-10 flex flex-col gap-6">
                        <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                            <div className="h-14 w-14 rounded-xl bg-[#0b2545] grid place-items-center shrink-0">
                                <Globe className="h-7 w-7 text-white" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-[#0b2545]">Hyderabad, India</p>
                                <p className="text-sm text-slate-500">Serving businesses globally</p>
                            </div>
                        </div>
                        {[{ I: Code2, t: 'Engineering discipline', d: 'Reviewed code, automated tests, documented releases' }, { I: ShieldCheck, t: 'Security by default', d: 'Least privilege, encryption and secure defaults from day one' }, { I: Compass, t: 'Long-term partnership', d: 'We plan for handover and evolution, not lock-in' }, { I: BarChart3, t: 'Honest reporting', d: 'Clear scope, tested delivery, transparent progress' }].map(({ I, t, d }) => (
                            <div key={t} className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-[#1d4ed8]/10 grid place-items-center shrink-0">
                                    <I className="h-5 w-5 text-[#1d4ed8]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#0b2545]">{t}</p>
                                    <p className="text-[13px] leading-5 text-slate-500 mt-0.5">{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <H2>Technology Built Around Your Business.</H2>
                        <P>
                            GlobalSource Solutions is an IT services company based in Hyderabad, Telangana, India, working with startups, small and medium businesses, mid-market companies and enterprises worldwide. We design, build and support technology that fits the way an organisation actually operates.
                        </P>
                        <P>
                            As a young company with a long-term global outlook, we compete on clarity, engineering discipline and accountability — clear scope, tested delivery, honest reporting and support that continues after launch.
                        </P>
                        <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0b2545] hover:border-[#0b2545]">About Us <ArrowRight size={15} /></Link>
                    </div>
                </div>
            </Section>

            <div className="bg-slate-50">
                <Section>
                    <H2>Our Services</H2>
                    <P>Seven service lines covering the technology most businesses depend on, delivered individually or as a coordinated programme.</P>
                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}
                    </div>
                </Section>
            </div>

            <Section>
                <H2>Why GlobalSource Solutions</H2>
                <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {WHY_US.map((w) => (
                        <div key={w.t} className="border-t border-slate-200 pt-5">
                            <h3 className="text-base font-semibold text-[#0b2545]">{w.t}</h3>
                            <p className="mt-2 text-[15px] leading-7 text-slate-600">{w.d}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <div className="bg-slate-50">
                <Section>
                    <H2>Industries We Serve</H2>
                    <P>Technology needs differ by sector. We shape solutions around the systems, data and constraints of your industry.</P>
                    <div className="mt-10 flex flex-wrap gap-3">
                        {INDUSTRIES.map((i) => (
                            <span key={i.name} className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0b2545]">{i.name}</span>
                        ))}
                    </div>
                    <Link to="/industries" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8]">Explore industries <ArrowRight size={15} /></Link>
                </Section>
            </div>

            <Section>
                <H2>How We Work</H2>
                <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {PROCESS.map((p) => (
                        <div key={p.n} className="border-t-2 border-[#1d4ed8] pt-5">
                            <span className="font-mono text-sm text-[#1d4ed8]">{p.n}</span>
                            <h3 className="mt-2 text-lg font-semibold text-[#0b2545]">{p.t}</h3>
                            <p className="mt-2 text-[15px] leading-7 text-slate-600">{p.d}</p>
                        </div>
                    ))}
                </div>
            </Section>
            <CtaBand />
        </>
    );
}

function AboutPage() {
    const blocks = [
        ['Who We Are', 'GlobalSource Solutions is an IT services and technology solutions company based in Hyderabad, Telangana, India, serving businesses globally. We work with startups building a first product, small and medium businesses replacing manual processes, and mid-market and enterprise teams modernising established systems. We are a young company, and we are deliberate about what that means: we compete on engineering discipline, clear communication and accountability rather than on scale.'],
        ['Our Mission', 'To make dependable technology accessible to businesses of every size — designing, building and supporting systems that solve real operational problems, remain maintainable over time, and give organisations genuine control over the technology they rely on.'],
        ['Our Vision', 'To grow into a globally trusted technology partner known for honest advice, durable engineering and long-term client relationships, serving organisations across sectors and geographies from our base in Hyderabad.'],
        ['Our Approach', 'We begin with the business problem, not the technology. We scope openly, sequence delivery so value arrives early, review working software with you throughout, and document what we build so your team is never dependent on ours. Testing, security and maintainability are part of delivery, not optional extras.'],
    ];
    const values = [
        ['Clarity', 'Plain language, explicit assumptions and honest estimates — including when the answer is that something is not worth building.'],
        ['Craft', 'Reviewed code, automated tests, documented releases and architecture proportionate to the problem.'],
        ['Accountability', 'We own outcomes through to production and stay responsible after go-live.'],
        ['Security mindset', 'Least privilege, encryption and secure defaults considered from the first design conversation.'],
        ['Partnership', 'We plan for handover and evolution, not lock-in.'],
        ['Integrity', 'We describe our capability and experience accurately, without inflated claims.'],
    ];
    return (
        <>
            <Seo title="About GlobalSource Solutions | IT Services Company" description="Learn about GlobalSource Solutions, an IT services and technology solutions company based in Hyderabad, Telangana, India, serving startups, SMEs and enterprises globally." path="/about" />
            <Section>
                <Crumbs items={[{ label: 'About Us' }]} />
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#0b2545] md:text-5xl">About GlobalSource Solutions</h1>
                <P>An IT services company built on engineering discipline, clear communication and long-term client relationships.</P>
                <div className="mt-14 space-y-12">
                    {blocks.map(([t, d]) => (
                        <div key={t}>
                            <h2 className="text-2xl font-semibold text-[#0b2545]">{t}</h2>
                            <p className="mt-3 max-w-3xl text-[17px] leading-8 text-slate-600">{d}</p>
                        </div>
                    ))}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#0b2545]">Our Values</h2>
                        <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
                            {values.map(([t, d]) => (
                                <div key={t} className="border-t border-slate-200 pt-4">
                                    <h3 className="text-base font-semibold text-[#0b2545]">{t}</h3>
                                    <p className="mt-2 text-[15px] leading-7 text-slate-600">{d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-[#0b2545]">Why GlobalSource Solutions</h2>
                        <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
                            {WHY_US.map((w) => (
                                <div key={w.t} className="flex gap-3">
                                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#1d4ed8]" />
                                    <div>
                                        <h3 className="text-base font-semibold text-[#0b2545]">{w.t}</h3>
                                        <p className="mt-1 text-[15px] leading-7 text-slate-600">{w.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
            <CtaBand />
        </>
    );
}

function ServicesPage() {
    return (
        <>
            <Seo title="IT Services & Technology Solutions | GlobalSource Solutions" description="Explore IT services from GlobalSource Solutions: software development, web and mobile apps, cloud solutions, IT consulting, data analytics and AI automation, cybersecurity and managed IT support." path="/services" />
            <Section>
                <Crumbs items={[{ label: 'Services' }]} />
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#0b2545] md:text-5xl">IT Services &amp; Technology Solutions</h1>
                <P>Seven connected service lines. Engage one of them for a specific problem, or combine several into a coordinated technology programme.</P>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}
                </div>
                <div className="mt-16 grid gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#0b2545]">Business benefits</h2>
                        <ul className="mt-4 space-y-3">
                            {['Less manual work and fewer avoidable errors', 'Systems that scale with users, data and geography', 'Clear visibility of cost, risk and progress', 'Security and maintainability designed in from the start'].map((b) => (
                                <li key={b} className="flex gap-3 text-[16px] leading-7 text-slate-600"><Check className="mt-1 h-5 w-5 shrink-0 text-[#1d4ed8]" />{b}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-[#0b2545]">Delivery approach</h2>
                        <ol className="mt-4 space-y-3">
                            {PROCESS.map((p) => (
                                <li key={p.n} className="text-[16px] leading-7 text-slate-600"><span className="font-mono text-sm text-[#1d4ed8]">{p.n}</span> — <strong className="font-semibold text-[#0b2545]">{p.t}:</strong> {p.d}</li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Industries served</h2>
                    <div className="mt-5 flex flex-wrap gap-3">
                        {INDUSTRIES.map((i) => <span key={i.name} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm text-[#0b2545]">{i.name}</span>)}
                    </div>
                </div>
            </Section>
            <CtaBand />
        </>
    );
}

function ServiceDetailPage() {
    const { slug } = useParams();
    const s = getService(slug);
    if (!s) return <NotFoundPage />;
    const related = s.related.map(getService).filter(Boolean);
    const url = `${COMPANY.site}/services/${s.slug}`;
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'WebPage', '@id': url, name: s.title, description: s.meta, url },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${COMPANY.site}/` },
                    { '@type': 'ListItem', position: 2, name: 'Services', item: `${COMPANY.site}/services` },
                    { '@type': 'ListItem', position: 3, name: s.name, item: url },
                ],
            },
            { '@type': 'Service', serviceType: s.name, name: s.name, description: s.meta, areaServed: 'Worldwide', provider: { '@type': 'Organization', name: COMPANY.name, url: COMPANY.site } },
            {
                '@type': 'FAQPage',
                mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
        ],
    };
    const Block = ({ title, paras }) => (
        <div>
            <h2 className="text-2xl font-semibold text-[#0b2545]">{title}</h2>
            {paras.map((p, i) => <p key={i} className="mt-4 text-[17px] leading-8 text-slate-600">{p}</p>)}
        </div>
    );
    return (
        <>
            <Seo title={s.title} description={s.meta} path={`/services/${s.slug}`} type="article" schema={schema} />
            <section className="border-b border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-[76rem] px-5 py-16 md:py-20">
                    <Crumbs items={[{ label: 'Services', to: '/services' }, { label: s.name }]} />
                    <div className="mt-6 flex items-start gap-5">
                        <ServiceIcon name={s.icon} className="mt-2 hidden h-10 w-10 text-[#1d4ed8] sm:block" />
                        <div>
                            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#0b2545] md:text-5xl">{s.h1}</h1>
                            <p className="mt-6 max-w-3xl text-[18px] leading-8 text-slate-600">{s.intro}</p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/contact" className="rounded-md bg-[#0b2545] px-6 py-3 text-sm font-semibold text-white hover:bg-[#12386b]">Talk to Us</Link>
                                <Link to="/services" className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0b2545] hover:border-[#0b2545]">All Services</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Section className="space-y-14">
                <Block title={`What is ${s.name}?`} paras={s.whatIs} />
                <Block title="Why businesses need it" paras={s.whyNeed} />
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Common business challenges</h2>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                        {s.challenges.map((c) => (
                            <li key={c} className="flex gap-3 text-[16px] leading-7 text-slate-600"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1d4ed8]" />{c}</li>
                        ))}
                    </ul>
                </div>
                <Block title={`How ${COMPANY.name} can help`} paras={s.help} />
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Detailed capabilities</h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {s.capabilities.map((c) => (
                            <div key={c.t} className="rounded-lg border border-slate-200 p-6">
                                <h3 className="text-base font-semibold text-[#0b2545]">{c.t}</h3>
                                <p className="mt-2 text-[15px] leading-7 text-slate-600">{c.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Business benefits</h2>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                        {s.benefits.map((b) => (
                            <li key={b} className="flex gap-3 text-[16px] leading-7 text-slate-600"><Check className="mt-1 h-5 w-5 shrink-0 text-[#1d4ed8]" />{b}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Our approach</h2>
                    <div className="mt-6 space-y-5 border-l-2 border-slate-200 pl-6">
                        {s.approach.map((a, i) => (
                            <div key={a.s}>
                                <h3 className="text-base font-semibold text-[#0b2545]"><span className="font-mono text-sm text-[#1d4ed8]">{String(i + 1).padStart(2, '0')}</span> — {a.s}</h3>
                                <p className="mt-1 text-[15px] leading-7 text-slate-600">{a.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Use cases</h2>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                        {s.useCases.map((u) => (
                            <li key={u} className="flex gap-3 text-[16px] leading-7 text-slate-600"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1d4ed8]" />{u}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Industries we support</h2>
                    <p className="mt-4 max-w-3xl text-[17px] leading-8 text-slate-600">{s.industriesNote}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        {INDUSTRIES.map((i) => <span key={i.name} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm text-[#0b2545]">{i.name}</span>)}
                    </div>
                    <Link to="/industries" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8]">See how we work by industry <ArrowRight size={15} /></Link>
                </div>
                <Block title="Technology and integration" paras={s.tech} />
                <Block title="Security considerations" paras={s.security} />
                <Block title="Scalability" paras={s.scalability} />
                <Block title="Quality assurance" paras={s.qa} />
                <Block title="Implementation considerations" paras={s.implementation} />
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Frequently asked questions</h2>
                    <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                        {s.faqs.map((f) => (
                            <div key={f.q} className="py-6">
                                <dt className="text-base font-semibold text-[#0b2545]">{f.q}</dt>
                                <dd className="mt-2 text-[16px] leading-8 text-slate-600">{f.a}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-[#0b2545]">Related services</h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {related.map((r) => <ServiceCard key={r.slug} s={r} />)}
                    </div>
                    <p className="mt-6 text-[16px] leading-8 text-slate-600">
                        You can also read more <Link className="font-semibold text-[#1d4ed8]" to="/about">about GlobalSource Solutions</Link>, review the{' '}
                        <Link className="font-semibold text-[#1d4ed8]" to="/industries">industries we serve</Link>, or{' '}
                        <Link className="font-semibold text-[#1d4ed8]" to="/contact">contact our team</Link>.
                    </p>
                </div>
            </Section>
            <CtaBand heading={`Ready to discuss ${s.name.toLowerCase()}?`} label="Talk to GlobalSource Solutions" />
        </>
    );
}

function IndustriesPage() {
    return (
        <>
            <Seo title="Industries We Serve | GlobalSource Solutions" description="Technology challenges, IT solutions and use cases across financial services, healthcare, retail and e-commerce, manufacturing, logistics, education, technology and professional services." path="/industries" />
            <Section>
                <Crumbs items={[{ label: 'Industries' }]} />
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#0b2545] md:text-5xl">Industries We Serve</h1>
                <P>Every sector carries its own constraints — regulation, data sensitivity, seasonality, legacy systems. We shape solutions around those realities rather than applying a single template.</P>
                <div className="mt-14 space-y-12">
                    {INDUSTRIES.map((i) => (
                        <article key={i.name} className="border-t border-slate-200 pt-8">
                            <h2 className="text-2xl font-semibold text-[#0b2545]">{i.name}</h2>
                            <div className="mt-5 grid gap-6 md:grid-cols-3">
                                <div><h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Common challenges</h3><p className="mt-2 text-[15px] leading-7 text-slate-600">{i.challenges}</p></div>
                                <div><h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Relevant solutions</h3><p className="mt-2 text-[15px] leading-7 text-slate-600">{i.solutions}</p></div>
                                <div><h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Potential use cases</h3><p className="mt-2 text-[15px] leading-7 text-slate-600">{i.useCases}</p></div>
                            </div>
                            <p className="mt-4 text-[15px] leading-7 text-slate-600">
                                GlobalSource Solutions can help through <Link className="font-semibold text-[#1d4ed8]" to="/services">our services</Link>, from software and cloud through to analytics, security and managed support.
                            </p>
                        </article>
                    ))}
                </div>
            </Section>
            <CtaBand />
        </>
    );
}

function ContactPage() {
    const [values, setValues] = useState({ name: '', email: '', company: '', phone: '', service: '', message: '' });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!values.name.trim()) e.name = 'Please enter your full name.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Please enter a valid business email address.';
        if (!values.service) e.service = 'Please select the service you need.';
        if (values.message.trim().length < 10) e.message = 'Please tell us a little more (at least 10 characters).';
        return e;
    };
    const onSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length === 0) setSent(true);
    };

    const field = 'w-full rounded-md border bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20';

    return (
        <>
            <Seo title="Contact GlobalSource Solutions | Hyderabad IT Services" description="Contact GlobalSource Solutions in Hyderabad, Telangana, India. Send an enquiry about software development, cloud, data analytics, cybersecurity or managed IT services." path="/contact" />
            <Section>
                <Crumbs items={[{ label: 'Contact' }]} />
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#0b2545] md:text-5xl">Let&apos;s Build Something Better.</h1>
                <P>Tell us about your challenge and we will respond with a practical next step.</P>
                <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
                    <aside className="rounded-lg border border-slate-200 bg-slate-50 p-8">
                        <h2 className="text-lg font-semibold text-[#0b2545]">{COMPANY.name}</h2>
                        <ul className="mt-6 space-y-4 text-[15px] text-slate-600">
                            <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1d4ed8]" />{COMPANY.location}</li>
                            <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#1d4ed8]" /><a className="hover:text-[#1d4ed8]" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
                            <li className="flex gap-3"><Globe className="mt-0.5 h-5 w-5 shrink-0 text-[#1d4ed8]" />globalsourcetechnologies.in</li>
                        </ul>
                        <div className="mt-8 rounded-lg bg-[#0b2545] p-6">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Response time</p>
                            <p className="mt-1 text-2xl font-semibold text-white">Within 1 business day</p>
                            <div className="mt-5 space-y-3">
                                {SERVICES.slice(0, 4).map((s) => (
                                    <div key={s.slug} className="flex items-center gap-3">
                                        <ServiceIcon name={s.icon} className="h-4 w-4 text-[#1d4ed8]" />
                                        <span className="text-[13px] text-white/70">{s.name}</span>
                                    </div>
                                ))}
                                <p className="text-[12px] text-white/40 pt-1">+ {SERVICES.length - 4} more services</p>
                            </div>
                        </div>
                    </aside>

                    <div>
                        {sent ? (
                            <div role="status" className="rounded-lg border border-[#1d4ed8]/30 bg-[#1d4ed8]/5 p-8">
                                <h2 className="text-xl font-semibold text-[#0b2545]">Thank you — your enquiry has been prepared.</h2>
                                <p className="mt-3 text-[16px] leading-8 text-slate-600">
                                    Please send the details to <a className="font-semibold text-[#1d4ed8]" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and our team will respond shortly.
                                </p>
                                <button type="button" onClick={() => { setSent(false); setValues({ name: '', email: '', company: '', phone: '', service: '', message: '' }); }} className="mt-6 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#0b2545]">Send another enquiry</button>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
                                {[
                                    { k: 'name', l: 'Full Name', t: 'text', req: true },
                                    { k: 'email', l: 'Business Email', t: 'email', req: true },
                                    { k: 'company', l: 'Company Name', t: 'text' },
                                    { k: 'phone', l: 'Phone Number', t: 'tel' },
                                ].map((f) => (
                                    <div key={f.k} className="flex flex-col gap-2">
                                        <label htmlFor={f.k} className="text-sm font-medium text-[#0b2545]">{f.l}{f.req && <span aria-hidden="true"> *</span>}</label>
                                        <input id={f.k} name={f.k} type={f.t} value={values[f.k]} onChange={set(f.k)} required={f.req}
                                            aria-invalid={!!errors[f.k]} aria-describedby={errors[f.k] ? `${f.k}-error` : undefined}
                                            className={`${field} ${errors[f.k] ? 'border-red-500' : 'border-slate-300'}`} />
                                        {errors[f.k] && <p id={`${f.k}-error`} className="text-sm text-red-600">{errors[f.k]}</p>}
                                    </div>
                                ))}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label htmlFor="service" className="text-sm font-medium text-[#0b2545]">Service Required <span aria-hidden="true">*</span></label>
                                    <select id="service" name="service" value={values.service} onChange={set('service')} required
                                        aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}
                                        className={`${field} ${errors.service ? 'border-red-500' : 'border-slate-300'}`}>
                                        <option value="">Select a service</option>
                                        {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                                        <option value="Other">Other / Not sure yet</option>
                                    </select>
                                    {errors.service && <p id="service-error" className="text-sm text-red-600">{errors.service}</p>}
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label htmlFor="message" className="text-sm font-medium text-[#0b2545]">Message <span aria-hidden="true">*</span></label>
                                    <textarea id="message" name="message" rows={6} value={values.message} onChange={set('message')} required
                                        aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                                        className={`${field} ${errors.message ? 'border-red-500' : 'border-slate-300'}`} />
                                    {errors.message && <p id="message-error" className="text-sm text-red-600">{errors.message}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <button type="submit" className="rounded-md bg-[#0b2545] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#12386b] active:scale-[0.98]">Send Enquiry</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </Section>
        </>
    );
}

function LegalPage({ title, description, path, sections }) {
    return (
        <>
            <Seo title={title} description={description} path={path} />
            <Section>
                <Crumbs items={[{ label: title.split(' | ')[0] }]} />
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#0b2545] md:text-5xl">{title.split(' | ')[0]}</h1>
                <p className="mt-4 text-sm text-slate-500">Last updated: January 2026</p>
                <div className="mt-10 space-y-10">
                    {sections.map(([h, b]) => (
                        <div key={h}>
                            <h2 className="text-xl font-semibold text-[#0b2545]">{h}</h2>
                            <p className="mt-3 max-w-3xl text-[16px] leading-8 text-slate-600">{b}</p>
                        </div>
                    ))}
                    <p className="text-[16px] leading-8 text-slate-600">Questions? Email <a className="font-semibold text-[#1d4ed8]" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>
                </div>
            </Section>
        </>
    );
}

const PrivacyPage = () => (
    <LegalPage
        title="Privacy Policy | GlobalSource Solutions"
        description="How GlobalSource Solutions collects, uses, stores and protects personal information submitted through globalsourcetechnologies.in."
        path="/privacy-policy"
        sections={[
            ['Introduction', 'This Privacy Policy explains how GlobalSource Solutions, based in Hyderabad, Telangana, India, handles information collected through this website. By using the site you agree to the practices described here.'],
            ['Information we collect', 'We collect information you submit voluntarily through our enquiry form, such as your name, business email address, company name, phone number, the service you are interested in and the content of your message. We may also collect limited technical information such as browser type and pages visited.'],
            ['How we use information', 'We use the information to respond to enquiries, provide requested services, improve the website and communicate about work in progress. We do not sell personal information to third parties.'],
            ['Legal basis and retention', 'We process enquiry information on the basis of your request and our legitimate interest in responding. Information is retained only as long as necessary for these purposes or as required by applicable law.'],
            ['Sharing', 'Information may be shared with service providers who host or support our systems, strictly to the extent necessary and subject to confidentiality obligations, or where disclosure is required by law.'],
            ['Security', 'We apply reasonable technical and organisational measures, including access controls and encryption in transit, to protect information. No method of transmission or storage is entirely secure, and we cannot guarantee absolute security.'],
            ['Cookies', 'The site may use essential cookies or similar technologies required for functionality. Where analytics are used, they are configured to collect only what is needed to understand site performance.'],
            ['Your rights', 'Subject to applicable law, you may request access to, correction of, or deletion of personal information we hold about you, or object to certain processing. Contact us using the email address below to make a request.'],
            ['Changes', 'We may update this policy from time to time. The revised version will be posted on this page with an updated date.'],
        ]}
    />
);

const TermsPage = () => (
    <LegalPage
        title="Terms & Conditions | GlobalSource Solutions"
        description="Terms and conditions governing use of the GlobalSource Solutions website and the information provided on it."
        path="/terms"
        sections={[
            ['Acceptance of terms', 'By accessing this website you agree to these Terms and Conditions. If you do not agree, please do not use the site.'],
            ['Use of the website', 'You agree to use the website lawfully and not to attempt unauthorised access, disrupt its operation, or use automated means to extract content in a manner that burdens the service.'],
            ['Information provided', 'Content on this website is provided for general information about GlobalSource Solutions and its services. It does not constitute professional advice and should not be relied upon as the sole basis for business decisions.'],
            ['Service engagements', 'Any services provided by GlobalSource Solutions are governed by a separate written agreement setting out scope, deliverables, timelines, fees and responsibilities. Nothing on this website constitutes an offer capable of acceptance.'],
            ['Intellectual property', 'All content on this website, including text, design, graphics and logos, is owned by or licensed to GlobalSource Solutions and may not be reproduced without permission.'],
            ['Third-party links', 'The website may link to third-party sites. We are not responsible for the content, accuracy or practices of those sites.'],
            ['Limitation of liability', 'To the maximum extent permitted by law, GlobalSource Solutions is not liable for indirect or consequential loss arising from use of this website or reliance on its content.'],
            ['Governing law', 'These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts of Hyderabad, Telangana.'],
            ['Changes to terms', 'We may amend these terms at any time. Continued use of the website constitutes acceptance of the amended terms.'],
        ]}
    />
);

function NotFoundPage() {
    const { pathname } = useLocation();
    return (
        <>
            <Helmet>
                <title>Page Not Found | GlobalSource Solutions</title>
                <meta name="description" content="The page you requested could not be found. Explore GlobalSource Solutions IT services, industries and contact information." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <Section className="text-center">
                <p className="font-mono text-sm text-[#1d4ed8]">404</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0b2545] md:text-5xl">This page could not be found.</h1>
                <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-slate-600">
                    The address <span className="font-mono text-[15px] text-slate-500">{pathname}</span> does not exist. Try one of the links below.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link to="/" className="rounded-md bg-[#0b2545] px-6 py-3 text-sm font-semibold text-white">Back to Home</Link>
                    <Link to="/services" className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0b2545]">Our Services</Link>
                    <Link to="/contact" className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0b2545]">Contact Us</Link>
                </div>
            </Section>
        </>
    );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col bg-white text-slate-900">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/services/:slug" element={<ServiceDetailPage />} />
                        <Route path="/industries" element={<IndustriesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
