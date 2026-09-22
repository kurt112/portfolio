export const EMAIL = 'kurtorioque112@gmail.com';
export const GITHUB = 'https://github.com/kurt112';
export const LINKEDIN = 'https://linkedin.com/in/kurt-lupin-orioque-2946a6157';

export interface Role {
    org: string;
    title: string;
    when: string;
    tech: string[];
    pts: string[];
}

export interface PageProps {
    tech: string | null;
    setTech: (tech: string | null) => void;
    go: (page: number) => void;
    active: boolean;
}

export interface Project {
    name: string;
    kind: string;
    stack: string[];
    pts: string[];
    flowTitle: string;
    flow: [title: string, detail: string][];
}

export const skills: [group: string, items: string[]][] = [
    ['Languages', ['Java', 'JavaScript', 'Python', 'C++', 'PHP', 'Go']],
    ['Backend', ['Spring Boot', 'Spring MVC', 'JAX-RS', 'Hibernate', 'Node.js', 'Express', 'Fastify', 'GraphQL', 'Socket.IO', 'Keycloak']],
    ['Frontend', ['Angular', 'React', 'React Native', 'Ionic', 'Vue', 'HTML', 'CSS', 'Bootstrap', 'MUI']],
    ['Messaging & delivery', ['Apache Kafka', 'RabbitMQ', 'Docker', 'Kubernetes', 'Argo CD', 'KEDA', 'Jenkins', 'Maven', 'Gradle']],
    ['Data & observability', ['SQL', 'MySQL', 'Firebase', 'Grafana', 'Prometheus', 'Kibana']],
    ['AI tooling', ['Claude', 'ChatGPT', 'Gemini', 'n8n', 'Hugging Face', 'Ollama']],
];

export const strengths: [string, string][] = [
    ['Event-driven microservices', 'Kafka and RabbitMQ for asynchronous, high-throughput systems, including services handling 300k+ daily transactions.'],
    ['Shipping to production', 'CI/CD pipelines, containerised multi-environment deployments, and unit test suites that gate every release.'],
    ['Growing engineers', 'Code reviews, mentoring juniors and interns, and writing down the standards a team works to.'],
];

export const roles: Role[] = [
    {
        org: 'Independent / Freelance', title: 'Full-Stack Web & Software Developer', when: 'Aug 2025 – Present',
        tech: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'TypeScript', 'Docker', 'React', 'Angular', 'Ionic'],
        pts: [
            'Delivered custom end-to-end web applications and backend solutions for diverse client projects.',
            'Architected database schemas and integrated secure RESTful APIs for client business platforms.',
            'Consulted directly with stakeholders to gather technical requirements, define scope, and execute milestones.',
            'Implemented payment gateway integrations, authentication mechanisms, and role-based access control.',
            'Configured cloud hosting, CI/CD deployment workflows, and automated backup schedules for production builds.',
            'Provided post-launch technical support, performance tuning, and code maintenance across client systems.',
        ],
    },
    // {
    //     org: 'NCS', title: 'Senior Full-stack Software Engineer', when: 'Aug 2025 – Present',
    //     tech: ['Java', 'Spring Boot'],
    //     pts: [
    //         'Manage microservices handling 300k+ daily transactions, and mentor three junior and one mid-level developer.',
    //         'Lead end-to-end design, development and production deployment of frontend and backend features in Java and Spring Boot.',
    //         'Standardise operating procedures and refactor codebase patterns to improve stability and maintainability.',
    //         'Write unit test suites that enforce code coverage before staging and release.',
    //         'Run multi-environment deployments against delivery timelines and budget constraints.',
    //     ],
    // },
    {
        org: 'Genpact Services LLC', title: 'Consultant (project-based)', when: 'Mar 2025 – Aug 2025',
        tech: ['Java', 'Spring Boot', 'Spring MVC', 'JAX-RS', 'Docker', 'Kubernetes', 'Apache Kafka', 'RabbitMQ', 'Jenkins'],
        pts: [
            'Designed microservice architectures and REST APIs with Spring Boot, Spring MVC and JAX-RS.',
            'Integrated Kafka and RabbitMQ for asynchronous processing and high-throughput communication.',
            'Deployed containerised services with Docker and Kubernetes; automated testing and delivery with Jenkins.',
            'Optimised database queries and API endpoints, and added caching to improve application performance.',
            'Used generative AI tools for code review, bug detection, query optimisation and unit-test generation.',
        ],
    },
    {
        org: 'Ascendion', title: 'Mid Java Developer', when: 'Aug 2024 – Mar 2025',
        tech: ['Java'],
        pts: [
            'Turned technical component specifications into full-stack applications, delivering milestones on schedule.',
            'Managed repositories, staging deployments and status reporting for stakeholders.',
            'Developed unit testing strategies to catch critical bugs before QA, and peer-reviewed code for consistency.',
        ],
    },
    {
        org: 'Vértere Global Solutions, Inc.', title: 'Programmer Analyst S3 (contractual)', when: 'Sep 2022 – Jul 2024',
        tech: [],
        pts: [
            'Built software modules from enterprise specifications for user-facing applications.',
            'Wrote technical design documents and user training manuals from business-logic analysis.',
            'Ran integration and system testing and root-cause analysis for production support issues.',
            'Guided junior programmers through code reviews, estimates and documentation standards.',
        ],
    },
    {
        org: 'PearlPay Inc.', title: 'Software Engineer (Angular / Java) and Consultant', when: 'Jun 2021 – Dec 2022',
        tech: ['Angular', 'Java'],
        pts: [
            'Led core development on PearlPay Core Banking for Indonesia, approving pull requests and overseeing deployments.',
            'Supervised development workflows and mentored incoming engineering interns.',
            'Maintained CI/CD pipelines and processed analytics data for system performance monitoring.',
        ],
    },
    {
        org: 'MITEZ, Seagem and SMMC', title: 'Web Instructor (part-time)', when: 'Dec 2019 – Dec 2020',
        tech: ['HTML', 'CSS', 'JavaScript', 'Java'],
        pts: ['Taught Web NCII certification, web development fundamentals (HTML, CSS, JavaScript) and Java basics.'],
    },
];

export const projects: Project[] = [
    {
        name: 'CMS Membership Platform', kind: 'SaaS',
        stack: ['Firebase', 'Ionic', 'Angular'],
        pts: [
            'A white-label content management system where businesses brand, manage and scale membership and rewards programmes.',
            'Real-time analytics dashboards, role-based access control and cross-platform mobile support.',
        ],
        flowTitle: 'How a business uses it',
        flow: [
            ['Brand it', 'A business applies its own branding to the white-label platform.'],
            ['Enrol members', 'Customers join the membership and rewards programme.'],
            ['Control access', 'Role-based access decides who can manage what.'],
            ['Watch it grow', 'Real-time analytics dashboards show how the programme is performing.'],
        ],
    },
    {
        name: 'Gym Management System', kind: 'SaaS',
        stack: ['Spring Boot', 'Node.js', 'Angular', 'MySQL', 'AWS', 'Heroku'],
        pts: [
            'End-to-end gym operations: RFID and barcode attendance, automated subscription billing and facility management.',
            'Automated renewal notifications, class bookings and revenue reporting through third-party integrations.',
        ],
        flowTitle: 'A member’s visit',
        flow: [
            ['Tap in', 'The member scans an RFID card or barcode at the door.'],
            ['Attendance logged', 'The visit is recorded automatically, with no front-desk entry.'],
            ['Billing stays current', 'Subscription billing runs automatically against the member’s plan.'],
            ['Reminders go out', 'Renewal notifications and class booking messages are sent through third-party tools.'],
        ],
    },
    {
        name: "Erik's Bike Rental Platform", kind: 'SaaS',
        stack: ['Spring Boot', 'Node.js', 'React Native', 'Next.js', 'MySQL', 'AWS', 'Google Maps API'],
        pts: [
            'A multi-platform rental booking system with live geolocation tracking and station navigation.',
            'Localised payment processing for renters.',
        ],
        flowTitle: 'A rider’s trip',
        flow: [
            ['Find a station', 'The rider sees stations on a map using real-time geolocation.'],
            ['Navigate', 'Station navigation guides them to the nearest pick-up point.'],
            ['Book the bike', 'The rental is booked from the mobile or web app.'],
            ['Pay locally', 'Localised payment processing completes the rental.'],
        ],
    },
];

export const pageNames = ['Cover', 'About', 'Experience', 'Projects', 'Systems', 'Contact'] as const;
export const PAGE = { experience: 2, projects: 3 } as const;

export const BROKERS = ['Apache Kafka', 'RabbitMQ'] as const;
export type Broker = (typeof BROKERS)[number];
export const LINKS: [from: number, to: number][] = [[96, 150], [250, 304], [408, 462], [580, 634]];
