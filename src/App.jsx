import { useEffect, useRef, useState } from 'react'
import './App.css'

const SCENES = [
  {
    id: 'cena-1',
    title: 'Cena 1 · Amanhecer e deslocação',
    context: '05:10 - 07:20',
    subtitle:
      'Acordo antes do sol. O primeiro autocarro decide se vou chegar a tempo de tudo.',
    audioSrc: '/media/audios/cena-1.wav',
    media: [
      {
        id: 'img-1',
        type: 'image',
        src: '/media/images/cena-1-img-1.svg',
        alt: 'Despertador tocando antes do amanhecer',
      },
      {
        id: 'img-2',
        type: 'image',
        src: '/media/images/cena-1-img-2.svg',
        alt: 'Café da manhã rápido antes de sair',
      },
      {
        id: 'img-3',
        type: 'image',
        src: '/media/images/cena-1-img-3.svg',
        alt: 'Ponto de ônibus ainda escuro',
      },
      {
        id: 'img-4',
        type: 'image',
        src: '/media/images/cena-1-img-4.svg',
        alt: 'Mãos segurando cadernos durante a viagem',
      },
      {
        id: 'vid-1',
        type: 'video',
        src: '/media/videos/cena-1-video-1.mp4',
        poster: '/media/images/cena-1-img-3.svg',
        alt: 'Trajeto diário em transporte público',
      },
    ],
  },
  {
    id: 'cena-2',
    title: 'Cena 2 · Aula e cansaço acumulado',
    context: '08:00 - 14:30',
    subtitle:
      'Na sala, tento manter foco. O corpo já pede pausa, mas o dia só começou.',
    audioSrc: '/media/audios/cena-2.wav',
    media: [
      {
        id: 'img-5',
        type: 'image',
        src: '/media/images/cena-2-img-1.svg',
        alt: 'Corredor da universidade antes da aula',
      },
      {
        id: 'img-6',
        type: 'image',
        src: '/media/images/cena-2-img-2.svg',
        alt: 'Caderno aberto com anotações do curso',
      },
      {
        id: 'img-7',
        type: 'image',
        src: '/media/images/cena-2-img-3.svg',
        alt: 'Olhar cansado durante intervalo',
      },
      {
        id: 'vid-2',
        type: 'video',
        src: '/media/videos/cena-2-video-1.mp4',
        poster: '/media/images/cena-2-img-3.svg',
        alt: 'Troca rápida de sala entre disciplinas',
      },
    ],
  },
  {
    id: 'cena-3',
    title: 'Cena 3 · Trabalho noturno e retorno',
    context: '18:00 - 23:40',
    subtitle:
      'Quando o turno termina, levo comigo o peso do dia e a esperança de continuar.',
    audioSrc: '/media/audios/cena-3.wav',
    media: [
      {
        id: 'img-8',
        type: 'image',
        src: '/media/images/cena-3-img-1.svg',
        alt: 'Uniforme de trabalho em turno da noite',
      },
      {
        id: 'img-9',
        type: 'image',
        src: '/media/images/cena-3-img-2.svg',
        alt: 'Computador e tarefas no final do expediente',
      },
      {
        id: 'img-10',
        type: 'image',
        src: '/media/images/cena-3-img-3.svg',
        alt: 'Rua vazia no retorno para casa',
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
  const [mediaIndexByScene, setMediaIndexByScene] = useState(() =>
    SCENES.reduce((acc, scene) => {
      acc[scene.id] = 0
      return acc
    }, {}),
  )

  const sceneRefs = useRef({})
  const audioRefs = useRef({})
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSceneId(visible[0].target.id)
        }
      },
      {
        root: container,
        threshold: [0.4, 0.55, 0.7],
        rootMargin: '0px',
      },
    )

    SCENES.forEach((scene) => {
      const element = sceneRefs.current[scene.id]
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
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

  return (
    <main className="story-app">
      <header className="story-header">
        <p className="kicker">Narrativa Multimédia Interativa</p>
        <h1>Rotina de um estudante que trabalha</h1>
        <p className="intro">
          Versão base: apenas visual. Versão enriquecida: áudio e legendas
          controladas pelo utilizador.
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

                {mode === 'enriched' && isSubtitlesEnabled && (
                  <p className="scene-subtitle">{scene.subtitle}</p>
                )}

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

      <aside className="floating-controls" aria-label="Controles narrativos">
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

        {audioBlocked && (
          <p className="audio-help">
            O navegador bloqueou reprodução automática. Clique novamente em
            &quot;Ativar Áudio&quot;.
          </p>
        )}
      </aside>

      <footer className="story-footer">
        <p>
          Substitua os placeholders em <strong>public/media</strong> pelos seus
          conteúdos autorais para entrega final.
        </p>
      </footer>
    </main>
  )
}

export default App
