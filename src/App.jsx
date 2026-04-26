import { useEffect, useState } from 'react'

const STACK = [
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
]

const PROJECTS = [
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
]

const PRINCIPLES = [
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
]

function App() {
  const [progress, setProgress] = useState(0)
  const [clock, setClock] = useState('00:00:00')
  const [statusActive, setStatusActive] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

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
        now.toLocaleTimeString('pt-BR', {
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
  }, [])

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
          <span id="sb-clock">{clock}</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span className="sb-status">
            <span className="sb-dot" />
            disponível
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

                  <p className="h-role">Backend Engineer · Especialização em Cybersecurity</p>

                  <p className="h-desc">
                    Engenheiro backend com fundações reais em sistemas e redes —
                    <em>microserviços, autenticação, infraestrutura segura.</em>
                    Em especialização progressiva em cybersecurity aplicada a serviços
                    críticos.
                  </p>

                  <div className="h-actions">
                    <a href="#projects" className="btn-primary">
                      ver projetos
                    </a>
                    <a href="#contact" className="btn-sec">
                      entrar em contato
                    </a>
                  </div>
                </div>

                <div className="hero-profile-inline">
                  <img src="/avatar.png" alt="Foto de Kelson Pedro" className="hero-profile-avatar" />
                  <div className="hero-profile-meta">
                    <div className="hero-profile-name">Kelson Pedro</div>
                    <div className="hero-profile-role">backend engineer · cybersecurity</div>
                    <div className="hero-profile-loc">Luanda, Angola · Remoto / Híbrido</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className="id-strip reveal">
          <div className="id-cell">
            <div className="id-key">localização</div>
            <div className="id-val">
              <span className="hl">AO</span> · Luanda, Angola / Remoto
            </div>
          </div>
          <div className="id-cell">
            <div className="id-key">formação</div>
            <div className="id-val">
              <span className="hl">42</span> Luanda
            </div>
          </div>
          <div className="id-cell">
            <div className="id-key">foco</div>
            <div className="id-val">
              Backend <span className="hl-amber">+</span> <span className="hl">InfoSec</span>
            </div>
          </div>
          <div className="id-cell">
            <div className="id-key">status</div>
            <div className="id-val">
              <span className="hl">✓</span> Disponível
            </div>
          </div>
        </div>

        <section className="section" id="stack">
          <div className="s-header reveal">
            <div>
              <div className="s-meta">
                <span className="s-meta-num">01</span>
                <span>stack técnico</span>
              </div>
              <h2 className="s-title">
                Ferramentas
                <br />& Linguagens
              </h2>
            </div>
            <p className="s-desc">
              APIs, microserviços e infraestrutura segura construídos da base para cima. Em
              especialização progressiva em cybersecurity com aplicação prática em ambientes reais.
            </p>
          </div>

          <div className="stack-table reveal">
            {STACK.map((item) => (
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
                <span>projetos</span>
              </div>
              <h2 className="s-title">
                O que
                <br />
                construí
              </h2>
            </div>
            <p className="s-desc">
              Projectos reais com impacto mensurável — desde plataformas com blockchain e
              autenticação robusta até hardening de servidores Linux e simulação de redes TCP/IP.
            </p>
          </div>

          <div className="proj-list reveal">
            {PROJECTS.map((project) => (
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
                <span>background</span>
              </div>
              <h2 className="s-title">
                De onde
                <br />
                venho
              </h2>
            </div>
            <p className="s-desc">
              Sem experiência corporativa — mas com fundações que a maioria dos devs júnior não
              tem: sistemas, redes, microserviços reais e segurança aplicada em projectos concretos.
            </p>
          </div>

          <div className="bg-cards reveal">
            <div className="bg-card">
              <div className="bc-head">
                <div className="bc-title">42 Luanda</div>
                <div className="bc-period">2024 – 2026 · em andamento</div>
              </div>
              <p className="bc-text">
                Common Core concluído + 42 Advanced. Escola baseada em peer-learning sem
                professores, sem aulas e sem provas tradicionais. Cada projecto é avaliado por outros
                alunos e por sistema automatizado.
              </p>
              <ul className="bc-list">
                <li>C/C++, Unix e algoritmos antes de qualquer framework</li>
                <li>Code review obrigatório — dar e receber</li>
                <li>Born2BeRoot: hardening, ACLs, logs, menor privilégio</li>
                <li>NetPractice: TCP/IP, subnetting, routing, troubleshooting</li>
                <li>Reconhecida globalmente por grandes empresas de tech</li>
              </ul>
            </div>

            <div className="bg-card">
              <div className="bc-head">
                <div className="bc-title">Autodidata</div>
                <div className="bc-period">2022 – 2026 · Aprendizagem contínua</div>
              </div>
              <p className="bc-text">
                Percurso de aprendizagem contínua construído de forma autodidata, com foco em
                programação, sistemas, redes, backend e segurança. Estudo com base em projectos,
                leitura técnica e prática deliberada, sempre orientado por arquitectura, clareza e
                responsabilidade técnica.
              </p>
              <ul className="bc-list">
                <li>Aprendizagem orientada por projectos reais e documentação técnica</li>
                <li>Fundamentos sólidos em sistemas operativos, redes e bases de dados</li>
                <li>Construção de backend com foco em manutenção, segurança e escalabilidade</li>
                <li>Prática constante em C, TypeScript, Linux e infraestruturas modernas</li>
                <li>Cybersecurity — aprofundamento aplicado ao desenvolvimento diário</li>
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
              princípios
            </div>
            <div className="prn-grid reveal">
              {PRINCIPLES.map((principle) => (
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
                <span>contato</span>
              </div>
              <h2 className="s-title">
                Vamos
                <br />
                conversar?
              </h2>
            </div>
            <p className="s-desc">
              Aberto a estágio, emprego e contextos de aprendizagem contínua — remoto ou híbrido.
              Foco em cybersecurity, arquitectura de sistemas e backend aplicado. Respondo rápido.
            </p>
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
                <div className="ct-out">Backend Engineer · Especialização em Cybersecurity</div>
                <div className="ct-out">Luanda, Angola · Remoto / Híbrido</div>
                <div className="ct-out">Disponível para: estágio · emprego · freelance</div>
                <br />
                <div className="ct-row">
                  <span className="ct-ps">❯</span>
                  <span className="ct-cmd">echo $RESPONSE_TIME</span>
                </div>
                <div className="ct-out ct-ok">geralmente &lt; 24h</div>
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
              <div className="ci-title">Estágio ou emprego em cybersecurity / backend</div>
              <p className="ci-sub">
                Tenho as fundações que a maioria dos devs júnior não tem — microserviços reais,
                infraestrutura segura, redes e análise de logs. Procuro uma equipa que valorize quem
                pensa antes de copiar da documentação.
              </p>

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
                  <span className="ci-link-label">Telefone</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>© 2026 Kelson Pedro · Backend Engineer · Especialização em Cybersecurity</div>
        <div className="ft-right">
          exit <span>0</span>
        </div>
      </footer>
    </>
  )
}

export default App
