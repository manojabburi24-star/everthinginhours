import { MotionConfig } from 'motion/react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'
import { Work } from './components/Work'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { OverlayStack } from './components/OverlayStack'
import { SectionMotion } from './components/SectionMotion'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full border-2 border-ink bg-butter px-5 py-3 font-semibold focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {/* One overlay only: the rest of the page slides up over the hero. */}
        <OverlayStack anchors={['top']}>
          <Hero />
          <div className="bg-white">
            <Marquee />
            <Services />
            {/* Every following section opens up from an inset card as it scrolls in (Framer Motion). */}
            <SectionMotion>
              <WhyUs />
            </SectionMotion>
            <SectionMotion>
              <Work />
            </SectionMotion>
            <SectionMotion>
              <Process />
            </SectionMotion>
            <SectionMotion>
              <Contact />
            </SectionMotion>
          </div>
        </OverlayStack>
      </main>
      <Footer />
    </MotionConfig>
  )
}
