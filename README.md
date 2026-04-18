# Trabalho Multimédia · Narrativa Imersiva (React)

Aplicação web em formato **Scroll Story**, preparada para duas versões da mesma história:

- **Versão Base:** apenas visual (imagens/vídeos), sem áudio e sem legendas.
- **Versão Enriquecida:** com interatividade para ativar legendas e áudio.

## Como rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Estrutura de conteúdo

O app já está organizado para 3 cenas narrativas e usa estado global para:

- modo (`base` | `enriched`)
- áudio ativo/inativo
- legendas ativas/inativas
- cena ativa pelo scroll

Pastas de media:

- `public/media/images`
- `public/media/videos`
- `public/media/audios`

## Conteúdo já incluído

- 10 imagens placeholder autorais em SVG
- 3 áudios placeholder em WAV (`cena-1.wav`, `cena-2.wav`, `cena-3.wav`)

## Conteúdo que você deve substituir para entrega

Troque os placeholders pelos seus ficheiros originais autorais, mantendo os nomes abaixo:

### Imagens

- `cena-1-img-1.svg`
- `cena-1-img-2.svg`
- `cena-1-img-3.svg`
- `cena-1-img-4.svg`
- `cena-2-img-1.svg`
- `cena-2-img-2.svg`
- `cena-2-img-3.svg`
- `cena-3-img-1.svg`
- `cena-3-img-2.svg`
- `cena-3-img-3.svg`

### Vídeos (mínimo obrigatório: 2)

- `cena-1-video-1.mp4`
- `cena-2-video-1.mp4`

### Áudios

- `cena-1.wav`
- `cena-2.wav`
- `cena-3.wav`

## Ordem da apresentação (evita penalização)

1. Mostrar **Versão Base** (sem áudio e sem legendas).
2. Mostrar **Versão Enriquecida** (ativando botões de legendas e áudio).
3. Explicar integração multimédia e arquitetura técnica.

## Roteiro técnico para o relatório

- tema e realidade abordada
- storyboard por cena
- significado de cada media isoladamente
- significado após combinação dos media
- comparação direta: versão base vs versão enriquecida
