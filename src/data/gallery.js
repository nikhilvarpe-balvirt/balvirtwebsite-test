// Gallery data: merges the album text (albums.json) with the optimised photo index (gallery-index.json).
// Photos live in /public/images/gallery/<albumId>/<nn>-sm.webp (thumbnail) and -lg.webp (viewer).
import albums from './albums.json'
import index from './gallery-index.json'

// Cover photo (1-based photo number) and a short card line for each album.
const META = {
  1: { cover: 3, tag: 'Festival', line: 'Lights, culture and togetherness across the office.' },
  2: { cover: 1, tag: 'Celebration', line: 'Flag hoisting, games and a proud team moment.' },
  3: { cover: 1, tag: 'Festival', line: 'A festival of lights, smiles and team spirit.' },
  4: { cover: 1, tag: 'Milestone', line: 'Four years of growth, celebrated together.' },
  5: { cover: 1, tag: 'Sports', line: 'Cricket, trophies and friendly competition.' },
  6: { cover: 1, tag: 'Outing', line: 'Hills, waterfalls and a great day out together.' },
  7: { cover: 2, tag: 'Ceremony', line: 'Ribbon cutting, lamp lighting and felicitations.' },
  8: { cover: 2, tag: 'Visit', line: 'Welcoming our guests to the Balvirt office.' },
  9: { cover: 4, tag: 'Sports', line: 'Our Guest of Honor joins us for Sports Day.' },
  10: { cover: 4, tag: 'Festival', line: 'Colour, devotion and togetherness.' },
}
// Display order: newest additions first, then the earlier events.
const ORDER = [6, 7, 8, 9, 10, 5, 4, 3, 1, 2]

const path = (id, n, size) => `/images/gallery/${id}/${n}-${size}.webp`

export const GALLERY = ORDER.map((id) => {
  const a = albums.find((x) => x.id === id)
  const idx = index.find((x) => x.id === id)
  const m = META[id]
  const photos = idx.photos.map((p, i) => ({
    sm: path(id, p.n, 'sm'),
    lg: path(id, p.n, 'lg'),
    w: p.w,
    h: p.h,
    alt: `${a.name}, photo ${i + 1}`,
  }))
  return {
    id,
    name: a.name,
    desc: a.desc,
    tag: m.tag,
    line: m.line,
    photos,
    cover: photos[m.cover - 1] || photos[0],
  }
})

export const TOTAL_PHOTOS = GALLERY.reduce((n, a) => n + a.photos.length, 0)
