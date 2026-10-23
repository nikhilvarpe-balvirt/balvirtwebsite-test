import { motion } from 'framer-motion'
import { BulletList, Button, Icon, Reveal, Visual } from './ui'

/** Alternating image / text block with an anchor id, used for services and industries. */
export default function Detail({ item, index, cta, onCta, number = false }) {
  const flip = index % 2 === 1
  return (
    <section id={item.id} className="scroll-mt-28 px-5 py-10 sm:py-14">
      <div className={`mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal y={40}>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><Icon name={item.icon} size={22} /></span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            {number && <span className="text-gradient mr-2">{String(index + 1).padStart(2, '0')}.</span>}{item.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{item.desc}</p>
          <div className="mt-6"><BulletList items={item.points} /></div>
          <div className="mt-8"><Button onClick={onCta} type="button">{cta}</Button></div>
        </Reveal>
        <Reveal delay={0.12} y={40}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="glass glow-border relative overflow-hidden rounded-[2rem] p-3">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/30 blur-3xl" />
            <Visual icon={item.icon} title={item.title} image={item.image} alt={`${item.title} by Balvirt`} chips={item.points.map((p) => p[0])} />
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
