import { useEffect, useRef, useState } from 'react'
import './App.css'

const FAB_MARGIN = 12

const SCENES = [
  {
    id: 'cena-1',
    title: 'Cena 1 · Antes',
    context: 'Rotina escolar e brincadeiras no bairro',
    subtitle:
      'Nzola, 10 anos, vive com os tios em um bairro periférico de Luanda. A rotina parece normal: escola, brincadeiras e sonhos.',
    audioSrc: '/media/audios/cena-1.wav',
    media: [
      {
        id: 'img-1',
        type: 'image',
        src: '/media/images/cena-1-img-1.jpg',
        alt: 'Crianças brincando na rua do bairro',
      },
      {
        id: 'img-2',
        type: 'image',
        src: '/media/images/cena-1-img-2.jpg',
        alt: 'Nzola brincando com outras crianças',
      },
      {
        id: 'img-3',
        type: 'image',
        src: '/media/images/cena-1-img-3.jpg',
        alt: 'Rosto de Nzola sorrindo',
      },
      {
        id: 'img-4',
        type: 'image',
        src: '/media/images/cena-1-img-4.jpg',
        alt: 'Nzola indo à escola com mochila',
      },
      {
        id: 'vid-1',
        type: 'video',
        src: '/media/videos/cena-1-video-1.mp4',
        poster: '/media/images/storyboard-collage.jpeg',
        alt: 'Rotina de bairro e escola em Luanda',
      },
    ],
  },
  {
    id: 'cena-2',
    title: 'Cena 2 · Silêncio',
    context: 'Mudanças de comportamento e medo',
    subtitle:
      'Sem mostrar violência explícita, a narrativa revela medo, isolamento e sinais silenciosos que muitas vezes passam despercebidos.',
    audioSrc: '/media/audios/cena-2.wav',
    media: [
      {
        id: 'img-5',
        type: 'image',
        src: '/media/images/cena-2-img-1.jpg',
        alt: 'Nzola com expressão triste e olhar baixo',
      },
      {
        id: 'img-6',
        type: 'image',
        src: '/media/images/cena-2-img-2.jpg',
        alt: 'Porta semiaberta simbolizando medo e silêncio',
      },
      {
        id: 'img-7',
        type: 'image',
        src: '/media/images/cena-2-img-3.jpg',
        alt: 'Detalhe de tensão e insegurança',
      },
      {
        id: 'vid-2',
        type: 'video',
        src: '/media/videos/cena-2-video-1.mp4',
        poster: '/media/images/storyboard-collage.jpeg',
        alt: 'Cena de isolamento e silêncio',
      },
    ],
  },
  {
    id: 'cena-3',
    title: 'Cena 3 · Consequências e apoio',
    context: 'Escuta, proteção e esperança',
    subtitle:
      'Uma adulta de confiança percebe os sinais, oferece apoio e rompe o ciclo do silêncio. A proteção começa quando alguém escuta e age.',
    audioSrc: '/media/audios/cena-3.wav',
    media: [
      {
        id: 'img-8',
        type: 'image',
        src: '/media/images/cena-3-img-1.jpg',
        alt: 'Abraço e acolhimento entre criança e adulta',
      },
      {
        id: 'img-9',
        type: 'image',
        src: '/media/images/cena-3-img-2.jpg',
        alt: 'Nzola retomando confiança',
      },
      {
        id: 'img-10',
        type: 'image',
        src: '/media/images/cena-3-img-3.jpg',
        alt: 'Professora observando e oferecendo apoio',
      },
    ],
  },
]

function MediaCard({ item, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <article
        className={`media-card media-fallback ${className}`.trim()}
        aria-label="Mídia em falta"
      >
        <p>Arquivo não encontrado</p>
        <span>{item.src}</span>
      </article>
    )
  }

  return (
    <article className={`media-card ${className}`.trim()}>
      {item.type === 'image' ? (
        <img src={item.src} alt={item.alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <video
          src={item.src}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
          onError={() => setFailed(true)}
        />
      )}
    </article>
  )
}

function App() {
  const [mode, setMode] = useState('base')
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState(false)
  const [activeSceneId, setActiveSceneId] = useState(SCENES[0].id)
  const [audioBlocked, setAudioBlocked] = useState(false)
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [fabPosition, setFabPosition] = useState({ x: 16, y: 16 })
  const [mediaIndexByScene, setMediaIndexByScene] = useState(() =>
    SCENES.reduce((acc, scene) => {
      acc[scene.id] = 0
      return acc
    }, {}),
  )

  const sceneRefs = useRef({})
  const audioRefs = useRef({})
  const scrollContainerRef = useRef(null)
  const controlsRef = useRef(null)
  const dragStateRef = useRef({
    dragging: false,
    moved: false,
    pointerId: null,
    startPointerX: 0,
    startPointerY: 0,
    startFabX: 0,
    startFabY: 0,
  })

  const clampFabPosition = (x, y) => {
    const controlsElement = controlsRef.current
    const width = controlsElement?.offsetWidth ?? 76
    const height = controlsElement?.offsetHeight ?? 76
    const maxX = Math.max(FAB_MARGIN, window.innerWidth - width - FAB_MARGIN)
    const maxY = Math.max(FAB_MARGIN, window.innerHeight - height - FAB_MARGIN)

    return {
      x: Math.min(Math.max(FAB_MARGIN, x), maxX),
      y: Math.min(Math.max(FAB_MARGIN, y), maxY),
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) {
      return undefined
    }

    const updateActiveScene = () => {
      const containerCenter = container.scrollTop + container.clientHeight / 2

      let closestId = SCENES[0].id
      let closestDistance = Number.POSITIVE_INFINITY

      SCENES.forEach((scene) => {
        const element = sceneRefs.current[scene.id]
        if (!element) {
          return
        }

        const sceneCenter = element.offsetTop + element.offsetHeight / 2
        const distance = Math.abs(sceneCenter - containerCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestId = scene.id
        }
      })

      setActiveSceneId((prev) => (prev === closestId ? prev : closestId))
    }

    let rafId = null
    const onScroll = () => {
      if (rafId !== null) {
        return
      }

      rafId = window.requestAnimationFrame(() => {
        updateActiveScene()
        rafId = null
      })
    }

    updateActiveScene()
    container.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      container.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (mode === 'base') {
      setIsAudioEnabled(false)
      setIsSubtitlesEnabled(false)
    }
  }, [mode])

  useEffect(() => {
    const shouldPlay = mode === 'enriched' && isAudioEnabled

    Object.entries(audioRefs.current).forEach(([sceneId, element]) => {
      if (!element) {
        return
      }

      const isActive = sceneId === activeSceneId

      if (shouldPlay && isActive) {
        element.currentTime = 0
        element
          .play()
          .then(() => setAudioBlocked(false))
          .catch(() => setAudioBlocked(true))
      } else {
        element.pause()
        element.currentTime = 0
      }
    })
  }, [activeSceneId, isAudioEnabled, mode])

  useEffect(() => {
    const activeScene = SCENES.find((scene) => scene.id === activeSceneId)
    if (!activeScene || activeScene.media.length <= 1) {
      return undefined
    }

    const interval = setInterval(() => {
      setMediaIndexByScene((prev) => {
        const current = prev[activeSceneId] ?? 0
        return {
          ...prev,
          [activeSceneId]: (current + 1) % activeScene.media.length,
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [activeSceneId])

  useEffect(() => {
    const saved = window.localStorage.getItem('multimidia-fab-position')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          setFabPosition(clampFabPosition(parsed.x, parsed.y))
          return
        }
      } catch {
        window.localStorage.removeItem('multimidia-fab-position')
      }
    }

    const controlsElement = controlsRef.current
    const width = controlsElement?.offsetWidth ?? 76
    const height = controlsElement?.offsetHeight ?? 76
    const defaultX = window.innerWidth - width - FAB_MARGIN
    const defaultY = window.innerHeight - height - FAB_MARGIN
    setFabPosition(clampFabPosition(defaultX, defaultY))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setFabPosition((prev) => clampFabPosition(prev.x, prev.y))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('multimidia-fab-position', JSON.stringify(fabPosition))
  }, [fabPosition])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!controlsRef.current?.contains(event.target)) {
        setIsControlsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [])

  const handleFabPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const dragState = dragStateRef.current
    dragState.dragging = true
    dragState.moved = false
    dragState.pointerId = event.pointerId
    dragState.startPointerX = event.clientX
    dragState.startPointerY = event.clientY
    dragState.startFabX = fabPosition.x
    dragState.startFabY = fabPosition.y

    const handlePointerMove = (moveEvent) => {
      if (!dragState.dragging || moveEvent.pointerId !== dragState.pointerId) {
        return
      }

      const deltaX = moveEvent.clientX - dragState.startPointerX
      const deltaY = moveEvent.clientY - dragState.startPointerY

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        dragState.moved = true
      }

      const nextPosition = clampFabPosition(
        dragState.startFabX + deltaX,
        dragState.startFabY + deltaY,
      )
      setFabPosition(nextPosition)
    }

    const handlePointerUp = (upEvent) => {
      if (upEvent.pointerId !== dragState.pointerId) {
        return
      }

      dragState.dragging = false
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)

      if (!dragState.moved) {
        setIsControlsOpen((value) => !value)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const shouldOpenPanelBelow = fabPosition.y < 260
  const shouldAlignPanelLeft = fabPosition.x < 280
  const activeSceneIndex = SCENES.findIndex((scene) => scene.id === activeSceneId)

  const goToScene = (step) => {
    const container = scrollContainerRef.current
    if (!container) {
      return
    }

    const nextIndex = activeSceneIndex + step
    if (nextIndex < 0 || nextIndex >= SCENES.length) {
      return
    }

    const targetId = SCENES[nextIndex].id
    const target = sceneRefs.current[targetId]
    if (!target) {
      return
    }

    container.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth',
    })
  }

  return (
    <main className="story-app">
      <header className="story-header">
        <p className="kicker">Narrativa Multimédia Interativa</p>
        <h1>Impacto do abuso infantil na vida de menores em Angola</h1>
        <p className="intro">
          Personagem: Nzola, 10 anos. Esta experiência promove sensibilização,
          proteção e denúncia responsável, sem conteúdo explícito.
        </p>
      </header>

      <div className="scene-indicator" aria-live="polite">
        Cena ativa:{' '}
        {SCENES.find((scene) => scene.id === activeSceneId)?.title ?? SCENES[0].title}
      </div>

      <div className="scenes-wrapper" ref={scrollContainerRef}>
        {SCENES.map((scene) => {
          const isActive = scene.id === activeSceneId
          const currentMediaIndex = mediaIndexByScene[scene.id] ?? 0
          const currentItem = scene.media[currentMediaIndex]
          return (
            <section
              key={scene.id}
              id={scene.id}
              className={`scene ${isActive ? 'active' : ''}`}
              ref={(element) => {
                sceneRefs.current[scene.id] = element
              }}
            >
              <div className="scene-content">
                <div className="scene-heading">
                  <h2>{scene.title}</h2>
                  <span>{scene.context}</span>
                </div>

                <div className="scene-media-player" aria-live="polite">
                  <MediaCard
                    key={`${scene.id}-${currentItem.id}`}
                    item={currentItem}
                    className="media-transition"
                  />

                  {mode === 'enriched' && isSubtitlesEnabled && (
                    <p className="scene-subtitle scene-subtitle-overlay">{scene.subtitle}</p>
                  )}
                </div>

                <div className="media-pagination" aria-label="Progresso das mídias da cena">
                  {scene.media.map((item, index) => (
                    <span
                      key={item.id}
                      className={`media-dot ${index === currentMediaIndex ? 'active' : ''}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <audio
                  ref={(element) => {
                    audioRefs.current[scene.id] = element
                  }}
                  src={scene.audioSrc}
                  preload="metadata"
                />
              </div>
            </section>
          )
        })}
      </div>

      <aside
        ref={controlsRef}
        className={`floating-controls ${isControlsOpen ? 'open' : 'collapsed'} ${
          shouldOpenPanelBelow ? 'panel-below' : 'panel-above'
        } ${shouldAlignPanelLeft ? 'panel-left' : 'panel-right'}`}
        aria-label="Controles narrativos"
        style={{ left: `${fabPosition.x}px`, top: `${fabPosition.y}px` }}
      >
        <button
          type="button"
          className="controls-fab"
          aria-label="Abrir ou fechar controles"
          aria-expanded={isControlsOpen}
          onPointerDown={handleFabPointerDown}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setIsControlsOpen((value) => !value)
            }
          }}
        >
          <span className="fab-icon">{isControlsOpen ? '×' : '☰'}</span>
          <span className="fab-status-badge">
            {mode === 'base' ? 'Base' : 'Enriq'} · {isAudioEnabled ? 'Áudio' : 'Sem áudio'} ·{' '}
            {isSubtitlesEnabled ? 'Legenda' : 'Sem legenda'}
          </span>
        </button>

        <div className="controls-panel">
          <div className="controls-head">
            <p>Controlo da narrativa</p>
            <span>{mode === 'base' ? 'Modo Visual' : 'Modo Enriquecido'}</span>
          </div>

          <div className="mode-toggle">
            <button
              type="button"
              className={mode === 'base' ? 'selected' : ''}
              onClick={() => setMode('base')}
            >
              Versão Base
            </button>
            <button
              type="button"
              className={mode === 'enriched' ? 'selected' : ''}
              onClick={() => setMode('enriched')}
            >
              Versão Enriquecida
            </button>
          </div>

          <button
            type="button"
            disabled={mode !== 'enriched'}
            className="control-btn"
            onClick={() => setIsSubtitlesEnabled((value) => !value)}
          >
            {isSubtitlesEnabled ? 'Ocultar Legendas' : 'Adicionar Legendas'}
          </button>

          <button
            type="button"
            disabled={mode !== 'enriched'}
            className="control-btn"
            onClick={() => setIsAudioEnabled((value) => !value)}
          >
            {isAudioEnabled ? 'Desativar Áudio' : 'Ativar Áudio'}
          </button>

          <div className="scene-nav-controls">
            <button
              type="button"
              className="control-btn"
              onClick={() => goToScene(-1)}
              disabled={activeSceneIndex <= 0}
            >
              Voltar
            </button>
            <button
              type="button"
              className="control-btn"
              onClick={() => goToScene(1)}
              disabled={activeSceneIndex >= SCENES.length - 1}
            >
              Próxima Cena
            </button>
          </div>

          <button
            type="button"
            className="control-btn"
            onClick={() => setIsLearnMoreOpen((value) => !value)}
          >
            {isLearnMoreOpen ? 'Fechar Saber Mais' : 'Saber mais'}
          </button>

          {audioBlocked && (
            <p className="audio-help">
              O navegador bloqueou reprodução automática. Clique novamente em
              &quot;Ativar Áudio&quot;.
            </p>
          )}
        </div>
      </aside>

      {isLearnMoreOpen && (
        <section className="learn-more-panel" aria-live="polite">
          <h3>Proteção infantil e denúncia</h3>
          <p>
            O abuso infantil pode ser físico, emocional, sexual ou por negligência.
            Sinais comuns incluem medo constante, isolamento, mudanças bruscas de
            comportamento e queda no rendimento escolar.
          </p>
          <p>
            Em situações de suspeita, procurar autoridades competentes e serviços
            de proteção é essencial para garantir segurança da criança.
          </p>
        </section>
      )}

      <footer className="story-footer">
        <p>“O silêncio protege o agressor. A denúncia protege a criança.”</p>
      </footer>
    </main>
  )
}

export default App
