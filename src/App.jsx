import { useEffect, useState } from 'react'

const copy = {
  pt: {
    locale: 'pt-BR',
    statusAvailable: 'disponível',
    stack: [
      {
        levelClass: 'lv-expert',
        level: '▪ Expert',
        name: 'C / C++',
        detail: 'malloc, ponteiros, processos Unix, file descriptors, signals, memória',
        barClass: 'on-g',
        score: 5,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Sólido',
        name: 'NestJS',
        detail: 'TypeScript, módulos, injeção de dependência, guards, DTOs, microserviços',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Sólido',
        name: 'Linux / Redes',
        detail: 'TCP/IP, DNS, subnetting, routing, SSH, firewall, ACLs, hardening',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Sólido',
        name: 'PostgreSQL',
        detail: 'modelagem relacional, Prisma/TypeORM, migrations, database-per-service',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Sólido',
        name: 'Docker',
        detail: 'Compose, redes segmentadas, Docker Secrets, multi-stage builds, imagens não-root',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-learn',
        level: '▪ Crescendo',
        name: 'Cybersecurity',
        detail: 'CIA, IAM, controlo de acessos, monitorização de logs, resposta a incidentes',
        barClass: 'on-b',
        score: 3,
      },
    ],
    projects: [
      {
        idx: '01',
        name: 'VAKS — Crowdfunding com Token Blockchain',
        tag: 'Backend Tech Lead',
        tagClass: 'pi-tag-own',
        desc: 'Plataforma de crowdfunding com carteira virtual e token ERC-20 na Avalanche Fuji. Arquitectei e implementei 7 microserviços (API Gateway, Auth, Users, Wallet, Campaigns, Notifications, Ledger) com PostgreSQL isolado por serviço — reduzindo o impacto de falhas entre domínios. Infraestrutura com redes bridge segmentadas, Docker Secrets para credenciais, multi-stage builds não-root e autenticação completa (JWT + bcrypt, OAuth, 2FA TOTP, blacklist em Redis). Comunicação assíncrona via Redis Streams com rastreabilidade de eventos.',
        chips: ['NestJS', 'Fastify', 'PostgreSQL', 'Redis', 'Docker', 'JWT + 2FA', 'OAuth', 'Solidity', 'ethers.js'],
        meta: '2026',
        metaColor: 'var(--phosphor)',
        repoLabel: 'repositório privado',
      },
      {
        idx: '02',
        name: 'Weya — Detecção Automática de Acidentes',
        tag: 'Open Source',
        tagClass: 'pi-tag-own',
        desc: 'Sistema de detecção de eventos críticos em tempo real com fusão de sinais de acelerómetro, giroscópio e GPS. Score de risco composto por quatro sinais independentes com lógica dedicada de redução de falsos positivos. Integração entre app móvel e backend REST (NestJS) para ingestão contínua de eventos. Em caso de acidente detectado, localiza automaticamente o hospital mais próximo e notifica contactos registados. Arquitectura monorepo com separação entre app, backend e pacote de detecção reutilizável em TypeScript.',
        chips: ['React Native', 'Expo', 'NestJS', 'TypeScript', 'Sensor Fusion', 'Yarn Workspaces'],
        meta: 'Em Dev',
        metaColor: 'var(--amber)',
        repoLabel: 'repositório privado',
      },
      {
        idx: '03',
        name: 'Born2BeRoot — Hardening de Servidor Linux',
        tag: '42 Luanda',
        tagClass: 'pi-tag-42',
        desc: 'Hardening de servidor Linux em ambiente virtualizado com políticas de menor privilégio. Configuração de SSH, firewall e políticas de password robustas. Controlo de acessos com gestão de utilizadores, grupos, permissões ACLs e sudo. Análise de logs de autenticação (auth.log) para identificação de eventos suspeitos e validação de políticas de acesso.',
        chips: ['Linux', 'ACLs', 'sudo', 'SSH', 'firewall', 'log analysis', 'least privilege'],
        meta: 'Segurança',
        metaColor: 'var(--ice)',
        repoLabel: 'repositório privado',
      },
      {
        idx: '04',
        name: 'NetPractice — Redes TCP/IP',
        tag: '42 Luanda',
        tagClass: 'pi-tag-42',
        desc: 'Resolução de cenários práticos de redes com base no modelo TCP/IP. Configuração de endereçamento IP, subnetting e routing estático. Diagnóstico de falhas de conectividade, análise de fluxos de comunicação e troubleshooting sistemático de topologias complexas.',
        chips: ['TCP/IP', 'subnetting', 'routing estático', 'DNS', 'troubleshooting'],
        meta: '2025',
        metaColor: 'var(--phosphor)',
        repoLabel: 'repositório privado',
      },
    ],
    principles: [
      {
        num: '01',
        title: 'Entender antes de abstrair',
        text: 'Aprendi malloc antes de ORM. Aprendi fork antes de Docker. Sei o que acontece por baixo de cada ferramenta que uso — e isso aplica-se à segurança.',
      },
      {
        num: '02',
        title: 'CIA como bússola',
        text: 'Confidencialidade, Integridade e Disponibilidade não são conceitos — são critérios de decisão em cada arquitectura que desenho.',
      },
      {
        num: '03',
        title: 'Menor privilégio sempre',
        text: 'Desde o Born2BeRoot que aplico: cada utilizador, processo e serviço acede apenas ao que precisa. Nem mais, nem menos.',
      },
      {
        num: '04',
        title: 'Logs como narrativa',
        text: 'Aprendi a ler output e raciocinar sobre estado antes de qualquer debugger. Logs são a memória do sistema — e sei lê-los.',
      },
      {
        num: '05',
        title: 'Código legível é revisável',
        text: 'Na 42, o código é lido por outros devs todo dia. Clareza e organização não são opcionais — são sobrevivência e auditabilidade.',
      },
      {
        num: '06',
        title: 'Aprendizado acelerado',
        text: 'De zero a shells, parsers, microserviços e blockchain em 2 anos. Aprender rápido sob pressão é a minha habilidade mais transferível.',
      },
    ],
    heroRole: 'Backend Engineer · Especialização em Cybersecurity',
    heroDesc:
      'Engenheiro backend com fundações reais em sistemas e redes — microserviços, autenticação, infraestrutura segura. Em especialização progressiva em cybersecurity aplicada a serviços críticos.',
    ctaProjects: 'ver projetos',
    ctaContact: 'entrar em contato',
    profileRole: 'backend engineer · cybersecurity',
    profileLoc: 'Luanda, Angola · Remoto / Híbrido',
    heroAvatarAlt: 'Foto de Kelson Pedro',
    idLocation: 'localização',
    idLocationVal: 'Luanda, Angola / Remoto',
    idEducation: 'formação',
    idFocus: 'foco',
    idStatus: 'status',
    idAvailable: 'Disponível',
    stackMeta: 'stack técnico',
    stackTitle1: 'Ferramentas',
    stackTitle2: '& Linguagens',
    stackDesc:
      'APIs, microserviços e infraestrutura segura construídos da base para cima. Em especialização progressiva em cybersecurity com aplicação prática em ambientes reais.',
    projectsMeta: 'projetos',
    projectsTitle1: 'O que',
    projectsTitle2: 'construí',
    projectsDesc:
      'Projectos reais com impacto mensurável — desde plataformas com blockchain e autenticação robusta até hardening de servidores Linux e simulação de redes TCP/IP.',
    backgroundMeta: 'background',
    backgroundTitle1: 'De onde',
    backgroundTitle2: 'venho',
    backgroundDesc:
      'Sem experiência corporativa — mas com fundações que a maioria dos devs júnior não tem: sistemas, redes, microserviços reais e segurança aplicada em projectos concretos.',
    schoolPeriod: '2024 – 2026 · em andamento',
    schoolText:
      'Common Core concluído + 42 Advanced. Escola baseada em peer-learning sem professores, sem aulas e sem provas tradicionais. Cada projecto é avaliado por outros alunos e por sistema automatizado.',
    schoolList: [
      'C/C++, Unix e algoritmos antes de qualquer framework',
      'Code review obrigatório — dar e receber',
      'Born2BeRoot: hardening, ACLs, logs, menor privilégio',
      'NetPractice: TCP/IP, subnetting, routing, troubleshooting',
      'Reconhecida globalmente por grandes empresas de tech',
    ],
    selfTitle: 'Autodidata',
    selfPeriod: '2022 – 2026 · Aprendizagem contínua',
    selfText:
      'Percurso de aprendizagem contínua construído de forma autodidata, com foco em programação, sistemas, redes, backend e segurança. Estudo com base em projectos, leitura técnica e prática deliberada, sempre orientado por arquitectura, clareza e responsabilidade técnica.',
    selfList: [
      'Aprendizagem orientada por projectos reais e documentação técnica',
      'Fundamentos sólidos em sistemas operativos, redes e bases de dados',
      'Construção de backend com foco em manutenção, segurança e escalabilidade',
      'Prática constante em C, TypeScript, Linux e infraestruturas modernas',
      'Cybersecurity — aprofundamento aplicado ao desenvolvimento diário',
    ],
    principlesLabel: 'princípios',
    contactMeta: 'contato',
    contactTitle1: 'Vamos',
    contactTitle2: 'conversar?',
    contactDesc:
      'Aberto a estágio, emprego e contextos de aprendizagem contínua — remoto ou híbrido. Foco em cybersecurity, arquitectura de sistemas e backend aplicado. Respondo rápido.',
    terminalRole: 'Backend Engineer · Especialização em Cybersecurity',
    terminalLoc: 'Luanda, Angola · Remoto / Híbrido',
    terminalAvailable: 'Disponível para: estágio · emprego · freelance',
    responseTime: 'geralmente < 24h',
    ciTitle: 'Estágio ou emprego em cybersecurity / backend',
    ciSub:
      'Tenho as fundações que a maioria dos devs júnior não tem — microserviços reais, infraestrutura segura, redes e análise de logs. Procuro uma equipa que valorize quem pensa antes de copiar da documentação.',
    phoneLabel: 'Telefone',
    footer: '© 2026 Kelson Pedro · Backend Engineer · Especialização em Cybersecurity',
    langAria: 'Selecionar idioma',
  },
  en: {
    locale: 'en-US',
    statusAvailable: 'available',
    stack: [
      {
        levelClass: 'lv-expert',
        level: '▪ Expert',
        name: 'C / C++',
        detail: 'malloc, pointers, Unix processes, file descriptors, signals, memory',
        barClass: 'on-g',
        score: 5,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Solid',
        name: 'NestJS',
        detail: 'TypeScript, modules, dependency injection, guards, DTOs, microservices',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Solid',
        name: 'Linux / Networks',
        detail: 'TCP/IP, DNS, subnetting, routing, SSH, firewall, ACLs, hardening',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Solid',
        name: 'PostgreSQL',
        detail: 'relational modeling, Prisma/TypeORM, migrations, database-per-service',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-solid',
        level: '▪ Solid',
        name: 'Docker',
        detail: 'Compose, segmented networks, Docker Secrets, non-root multi-stage builds',
        barClass: 'on-a',
        score: 4,
      },
      {
        levelClass: 'lv-learn',
        level: '▪ Growing',
        name: 'Cybersecurity',
        detail: 'CIA, IAM, access control, log monitoring, incident response',
        barClass: 'on-b',
        score: 3,
      },
    ],
    projects: [
      {
        idx: '01',
        name: 'VAKS — Crowdfunding with Blockchain Token',
        tag: 'Backend Tech Lead',
        tagClass: 'pi-tag-own',
        desc: 'Crowdfunding platform with virtual wallet and ERC-20 token on Avalanche Fuji. I architected and implemented 7 microservices (API Gateway, Auth, Users, Wallet, Campaigns, Notifications, Ledger) with one isolated PostgreSQL database per service, reducing cross-domain failure impact. Infrastructure with segmented bridge networks, Docker Secrets for credentials, non-root multi-stage builds, and full authentication flow (JWT + bcrypt, OAuth, 2FA TOTP, Redis blacklist). Async communication through Redis Streams with event traceability.',
        chips: ['NestJS', 'Fastify', 'PostgreSQL', 'Redis', 'Docker', 'JWT + 2FA', 'OAuth', 'Solidity', 'ethers.js'],
        meta: '2026',
        metaColor: 'var(--phosphor)',
        repoLabel: 'private repository',
      },
      {
        idx: '02',
        name: 'Weya — Automatic Accident Detection',
        tag: 'Open Source',
        tagClass: 'pi-tag-own',
        desc: 'Real-time critical event detection system using accelerometer, gyroscope, and GPS signal fusion. Composite risk score based on four independent signals with dedicated false-positive reduction logic. Integration between mobile app and REST backend (NestJS) for continuous event ingestion. When an accident is detected, it automatically locates the nearest hospital and notifies registered contacts. Monorepo architecture with clear separation between app, backend, and a reusable TypeScript detection package.',
        chips: ['React Native', 'Expo', 'NestJS', 'TypeScript', 'Sensor Fusion', 'Yarn Workspaces'],
        meta: 'In Dev',
        metaColor: 'var(--amber)',
        repoLabel: 'private repository',
      },
      {
        idx: '03',
        name: 'Born2BeRoot — Linux Server Hardening',
        tag: '42 Luanda',
        tagClass: 'pi-tag-42',
        desc: 'Linux server hardening in a virtualized environment with least-privilege policies. Setup of SSH, firewall, and strong password policies. Access control with users, groups, ACL permissions, and sudo. Authentication log analysis (auth.log) to identify suspicious events and validate access policies.',
        chips: ['Linux', 'ACLs', 'sudo', 'SSH', 'firewall', 'log analysis', 'least privilege'],
        meta: 'Security',
        metaColor: 'var(--ice)',
        repoLabel: 'private repository',
      },
      {
        idx: '04',
        name: 'NetPractice — TCP/IP Networks',
        tag: '42 Luanda',
        tagClass: 'pi-tag-42',
        desc: 'Solving practical networking scenarios based on the TCP/IP model. IP addressing, subnetting, and static routing configuration. Connectivity troubleshooting, communication flow analysis, and systematic diagnosis of complex topologies.',
        chips: ['TCP/IP', 'subnetting', 'static routing', 'DNS', 'troubleshooting'],
        meta: '2025',
        metaColor: 'var(--phosphor)',
        repoLabel: 'private repository',
      },
    ],
    principles: [
      {
        num: '01',
        title: 'Understand before abstracting',
        text: 'I learned malloc before ORM. I learned fork before Docker. I understand what happens under each tool I use, and that directly improves security decisions.',
      },
      {
        num: '02',
        title: 'CIA as a compass',
        text: 'Confidentiality, Integrity, and Availability are not concepts only; they are decision criteria in every architecture I design.',
      },
      {
        num: '03',
        title: 'Least privilege always',
        text: 'Since Born2BeRoot I apply this rule: each user, process, and service accesses only what it needs. Nothing more, nothing less.',
      },
      {
        num: '04',
        title: 'Logs as narrative',
        text: 'I learned to read output and reason about system state before relying on any debugger. Logs are system memory, and I know how to read them.',
      },
      {
        num: '05',
        title: 'Readable code is reviewable',
        text: 'At 42, code is reviewed by other devs every day. Clarity and organization are not optional; they are survival and auditability.',
      },
      {
        num: '06',
        title: 'Accelerated learning',
        text: 'From zero to shells, parsers, microservices, and blockchain in 2 years. Learning fast under pressure is my most transferable skill.',
      },
    ],
    heroRole: 'Backend Engineer · Cybersecurity Specialization',
    heroDesc:
      'Backend engineer with real systems and networking foundations — microservices, authentication, secure infrastructure. Progressive specialization in cybersecurity applied to critical services.',
    ctaProjects: 'view projects',
    ctaContact: 'contact me',
    profileRole: 'backend engineer · cybersecurity',
    profileLoc: 'Luanda, Angola · Remote / Hybrid',
    heroAvatarAlt: 'Photo of Kelson Pedro',
    idLocation: 'location',
    idLocationVal: 'Luanda, Angola / Remote',
    idEducation: 'education',
    idFocus: 'focus',
    idStatus: 'status',
    idAvailable: 'Available',
    stackMeta: 'tech stack',
    stackTitle1: 'Tools',
    stackTitle2: '& Languages',
    stackDesc:
      'APIs, microservices, and secure infrastructure built from the ground up. Progressive cybersecurity specialization with practical application in real environments.',
    projectsMeta: 'projects',
    projectsTitle1: 'What I',
    projectsTitle2: 'built',
    projectsDesc:
      'Real projects with measurable impact, from blockchain-based platforms with robust auth to Linux server hardening and TCP/IP network simulation.',
    backgroundMeta: 'background',
    backgroundTitle1: 'Where I',
    backgroundTitle2: 'come from',
    backgroundDesc:
      'No corporate experience yet, but strong foundations most junior developers do not have: systems, networking, real microservices, and applied security in concrete projects.',
    schoolPeriod: '2024 – 2026 · in progress',
    schoolText:
      'Common Core completed + 42 Advanced. Peer-learning school with no teachers, no lectures, and no traditional exams. Each project is evaluated by peers and automated systems.',
    schoolList: [
      'C/C++, Unix, and algorithms before any framework',
      'Mandatory code review — giving and receiving feedback',
      'Born2BeRoot: hardening, ACLs, logs, least privilege',
      'NetPractice: TCP/IP, subnetting, routing, troubleshooting',
      'Globally recognized by major tech companies',
    ],
    selfTitle: 'Self-taught',
    selfPeriod: '2022 – 2026 · Continuous learning',
    selfText:
      'Continuous self-driven learning path focused on programming, systems, networking, backend, and security. I study through projects, technical reading, and deliberate practice, guided by architecture, clarity, and technical responsibility.',
    selfList: [
      'Project-driven learning grounded in technical documentation',
      'Strong fundamentals in operating systems, networking, and databases',
      'Backend development focused on maintainability, security, and scalability',
      'Consistent practice in C, TypeScript, Linux, and modern infrastructure',
      'Cybersecurity specialization applied to day-to-day development',
    ],
    principlesLabel: 'principles',
    contactMeta: 'contact',
    contactTitle1: 'Let’s',
    contactTitle2: 'talk?',
    contactDesc:
      'Open to internships, full-time opportunities, and continuous-learning environments — remote or hybrid. Focused on cybersecurity, systems architecture, and applied backend. Fast response.',
    terminalRole: 'Backend Engineer · Cybersecurity Specialization',
    terminalLoc: 'Luanda, Angola · Remote / Hybrid',
    terminalAvailable: 'Available for: internship · full-time · freelance',
    responseTime: 'usually < 24h',
    ciTitle: 'Internship or full-time in cybersecurity / backend',
    ciSub:
      'I have foundations most junior devs do not: real microservices, secure infrastructure, networking, and log analysis. I am looking for a team that values people who think before copying from docs.',
    phoneLabel: 'Phone',
    footer: '© 2026 Kelson Pedro · Backend Engineer · Cybersecurity Specialization',
    langAria: 'Select language',
  },
}

const getInitialLang = () => {
  const saved = localStorage.getItem('lang')

  if (saved === 'pt' || saved === 'en') {
    return saved
  }

  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

function App() {
  const [lang, setLang] = useState(getInitialLang)
  const [progress, setProgress] = useState(0)
  const [clock, setClock] = useState('00:00:00')
  const [statusActive, setStatusActive] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const content = copy[lang]

  useEffect(() => {
    const updateOnScroll = () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)) * 100
      setProgress(pct)
      setStatusActive(window.scrollY > 10)
    }

    const updateClock = () => {
      const now = new Date()
      setClock(
        now.toLocaleTimeString(content.locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    }

    updateOnScroll()
    updateClock()

    const clockTimer = setInterval(updateClock, 1000)

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60)
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 },
    )

    document
      .querySelectorAll('section[id]')
      .forEach((section) => sectionObserver.observe(section))

    window.addEventListener('scroll', updateOnScroll, { passive: true })

    return () => {
      clearInterval(clockTimer)
      revealObserver.disconnect()
      sectionObserver.disconnect()
      window.removeEventListener('scroll', updateOnScroll)
    }
  }, [content.locale])

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang])

  const scrollToSection = (hash) => {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div id="prog" style={{ width: `${progress}%` }} />

      <div id="statusbar" className={statusActive ? 'active' : ''}>
        <div className="sb-left">
          <span className="sb-pid">PID 2847</span>
          <span>kelsonpedro@portfolio</span>
          <span className="sb-mode">-- NORMAL --</span>
        </div>
        <div className="sb-right">
          <div className="lang-switch" role="group" aria-label={content.langAria}>
            <button
              type="button"
              className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
              onClick={() => setLang('pt')}
            >
              PT
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <span id="sb-clock">{clock}</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span className="sb-status">
            <span className="sb-dot" />
            {content.statusAvailable}
          </span>
        </div>
      </div>

      <nav id="sidenav">
        <a className={`sn-item ${activeSection === 'hero' ? 'active' : ''}`} href="#hero" data-label="~/hero">
          ~
        </a>
        <a className={`sn-item ${activeSection === 'stack' ? 'active' : ''}`} href="#stack" data-label="./stack">
          01
        </a>
        <a
          className={`sn-item ${activeSection === 'projects' ? 'active' : ''}`}
          href="#projects"
          data-label="./projects"
        >
          02
        </a>
        <a
          className={`sn-item ${activeSection === 'background' ? 'active' : ''}`}
          href="#background"
          data-label="./background"
        >
          03
        </a>
        <div className="sn-sep" />
        <a
          className={`sn-item ${activeSection === 'contact' ? 'active' : ''}`}
          href="#contact"
          data-label="./contact"
        >
          ✉
        </a>
      </nav>

      <main>
        <section id="hero">
          <div className="hero-left">
            <div className="hero-glow" />
            <div className="hero-inner">
              <div className="h-path">
                <span className="h-path-seg">~</span>
                <span className="h-path-sep">/</span>
                <span className="h-path-seg">home</span>
                <span className="h-path-sep">/</span>
                <span>kelsonpedro</span>
                <span className="h-path-sep">/</span>
                <span>portfolio</span>
                <span className="h-path-sep" style={{ marginLeft: '0.5rem' }}>
                  ▶
                </span>
                <span style={{ color: 'var(--phosphor)' }}>whoami</span>
              </div>

              <div className="hero-main">
                <div className="hero-copy">
                  <h1 className="h-name">
                    <span className="h-name-first">Kelson</span>
                    <span className="h-name-last">Pedro</span>
                  </h1>

                  <p className="h-role">{content.heroRole}</p>

                  <p className="h-desc">{content.heroDesc}</p>

                  <div className="h-actions">
                    <a href="#projects" className="btn-primary">
                      {content.ctaProjects}
                    </a>
                    <a href="#contact" className="btn-sec">
                      {content.ctaContact}
                    </a>
                  </div>
                </div>

                <div className="hero-profile-inline">
                  <img src="/avatar.png" alt={content.heroAvatarAlt} className="hero-profile-avatar" />
                  <div className="hero-profile-meta">
                    <div className="hero-profile-name">Kelson Pedro</div>
                    <div className="hero-profile-role">{content.profileRole}</div>
                    <div className="hero-profile-loc">{content.profileLoc}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className="id-strip reveal">
          <div className="id-cell">
            <div className="id-key">{content.idLocation}</div>
            <div className="id-val">
              <span className="hl">AO</span> · {content.idLocationVal}
            </div>
          </div>
          <div className="id-cell">
            <div className="id-key">{content.idEducation}</div>
            <div className="id-val">
              <span className="hl">42</span> Luanda
            </div>
          </div>
          <div className="id-cell">
            <div className="id-key">{content.idFocus}</div>
            <div className="id-val">
              Backend <span className="hl-amber">+</span> <span className="hl">InfoSec</span>
            </div>
          </div>
          <div className="id-cell">
            <div className="id-key">{content.idStatus}</div>
            <div className="id-val">
              <span className="hl">✓</span> {content.idAvailable}
            </div>
          </div>
        </div>

        <section className="section" id="stack">
          <div className="s-header reveal">
            <div>
              <div className="s-meta">
                <span className="s-meta-num">01</span>
                <span>{content.stackMeta}</span>
              </div>
              <h2 className="s-title">
                {content.stackTitle1}
                <br />
                {content.stackTitle2}
              </h2>
            </div>
            <p className="s-desc">{content.stackDesc}</p>
          </div>

          <div className="stack-table reveal">
            {content.stack.map((item) => (
              <div key={item.name} className="stack-cell">
                <div className={`sc-level ${item.levelClass}`}>{item.level}</div>
                <div className="sc-name">{item.name}</div>
                <div className="sc-detail">{item.detail}</div>
                <div className="sc-bar">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className={`sc-seg ${index < item.score ? item.barClass : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section alt" id="projects">
          <div className="s-header reveal">
            <div>
              <div className="s-meta">
                <span className="s-meta-num">02</span>
                <span>{content.projectsMeta}</span>
              </div>
              <h2 className="s-title">
                {content.projectsTitle1}
                <br />
                {content.projectsTitle2}
              </h2>
            </div>
            <p className="s-desc">{content.projectsDesc}</p>
          </div>

          <div className="proj-list reveal">
            {content.projects.map((project) => (
              <div key={project.idx} className="proj-item">
                <div className="pi-idx">{project.idx}</div>
                <div className="pi-body">
                  <div className="pi-name">
                    {project.name}
                    <span className={`pi-tag ${project.tagClass}`}>{project.tag}</span>
                  </div>
                  <p className="pi-desc">{project.desc}</p>
                  <div className="pi-chips">
                    {project.chips.map((chip) => (
                      <span key={`${project.idx}-${chip}`} className="pi-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pi-meta">
                  {project.score ? (
                    <>
                      <div className="pi-score">{project.score}</div>
                      <div className="pi-score-sub">/100</div>
                    </>
                  ) : (
                    <div className="pi-score-sub" style={{ color: project.metaColor }}>
                      {project.meta}
                    </div>
                  )}
                  <span className="pi-link">{project.repoLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="background">
          <div className="s-header reveal">
            <div>
              <div className="s-meta">
                <span className="s-meta-num">03</span>
                <span>{content.backgroundMeta}</span>
              </div>
              <h2 className="s-title">
                {content.backgroundTitle1}
                <br />
                {content.backgroundTitle2}
              </h2>
            </div>
            <p className="s-desc">{content.backgroundDesc}</p>
          </div>

          <div className="bg-cards reveal">
            <div className="bg-card">
              <div className="bc-head">
                <div className="bc-title">42 Luanda</div>
                <div className="bc-period">{content.schoolPeriod}</div>
              </div>
              <p className="bc-text">{content.schoolText}</p>
              <ul className="bc-list">
                {content.schoolList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-card">
              <div className="bc-head">
                <div className="bc-title">{content.selfTitle}</div>
                <div className="bc-period">{content.selfPeriod}</div>
              </div>
              <p className="bc-text">{content.selfText}</p>
              <ul className="bc-list">
                {content.selfList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <div
              style={{
                fontSize: '0.6rem',
                color: 'var(--dim)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1px',
                  background: 'var(--wire2)',
                }}
              />
              {content.principlesLabel}
            </div>
            <div className="prn-grid reveal">
              {content.principles.map((principle) => (
                <div key={principle.num} className="prn-item">
                  <div className="prn-num">{principle.num}</div>
                  <div className="prn-title">{principle.title}</div>
                  <p className="prn-text">{principle.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="contact">
          <div className="s-header reveal">
            <div>
              <div className="s-meta">
                <span className="s-meta-num">04</span>
                <span>{content.contactMeta}</span>
              </div>
              <h2 className="s-title">
                {content.contactTitle1}
                <br />
                {content.contactTitle2}
              </h2>
            </div>
            <p className="s-desc">{content.contactDesc}</p>
          </div>

          <div className="contact-grid reveal">
            <div className="contact-terminal">
              <div className="ct-titlebar">
                <div className="ct-btn ct-btn-r" />
                <div className="ct-btn ct-btn-y" />
                <div className="ct-btn ct-btn-g" />
                <span className="ct-label">zsh — kelson@portfolio: ~/contact</span>
              </div>
              <div className="ct-body">
                <div className="ct-row">
                  <span className="ct-ps">❯</span>
                  <span className="ct-cmd">cat README.md</span>
                </div>
                <br />
                <div className="ct-out ct-ok">## Kelson Pedro</div>
                <div className="ct-out">{content.terminalRole}</div>
                <div className="ct-out">{content.terminalLoc}</div>
                <div className="ct-out">{content.terminalAvailable}</div>
                <br />
                <div className="ct-row">
                  <span className="ct-ps">❯</span>
                  <span className="ct-cmd">echo $RESPONSE_TIME</span>
                </div>
                <div className="ct-out ct-ok">{content.responseTime}</div>
                <br />
                <div className="ct-row">
                  <span className="ct-ps">❯</span>
                  <span className="ct-cmd">cat links.env</span>
                </div>
                <div className="ct-out">
                  GITHUB=<span style={{ color: 'var(--phosphor)' }}>github.com/Kelson-D-Pedro</span>
                </div>
                <div className="ct-out">
                  LINKEDIN=<span style={{ color: 'var(--phosphor)' }}>linkedin.com/in/kelsonpedro</span>
                </div>
                <div className="ct-out">
                  EMAIL=<span style={{ color: 'var(--phosphor)' }}>kelsonpedro015@gmail.com</span>
                </div>
                <div className="ct-out">
                  PHONE=<span style={{ color: 'var(--phosphor)' }}>+244 944 838 706</span>
                </div>
                <br />
                <div className="ct-row">
                  <span className="ct-ps">❯</span>
                  <span className="ct-cur" />
                </div>
              </div>
            </div>

            <div className="contact-info">
              <div className="ci-title">{content.ciTitle}</div>
              <p className="ci-sub">{content.ciSub}</p>

              <div className="ci-links">
                <a href="https://github.com/Kelson-D-Pedro" target="_blank" rel="noreferrer" className="ci-link">
                  <span>github.com/Kelson-D-Pedro</span>
                  <span className="ci-link-label">GitHub</span>
                </a>
                <a href="https://linkedin.com/in/kelsonpedro" target="_blank" rel="noreferrer" className="ci-link">
                  <span>linkedin.com/in/kelsonpedro</span>
                  <span className="ci-link-label">LinkedIn</span>
                </a>
                <a href="mailto:kelsonpedro015@gmail.com" className="ci-link">
                  <span>kelsonpedro015@gmail.com</span>
                  <span className="ci-link-label">Email</span>
                </a>
                <a href="tel:+244944838706" className="ci-link">
                  <span>+244 944 838 706</span>
                  <span className="ci-link-label">{content.phoneLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>{content.footer}</div>
        <div className="ft-right">
          exit <span>0</span>
        </div>
      </footer>
    </>
  )
}

export default App
