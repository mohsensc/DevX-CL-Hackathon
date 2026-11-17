import { useState } from 'react'
import { AiCreditsSection } from './components/AiCreditsSection/AiCreditsSection'
import { AlumniBand } from './components/AlumniBand/AlumniBand'
import { EventSection } from './components/EventSection/EventSection'
import { FaqSection } from './components/FaqSection/FaqSection'
import { Footer } from './components/Footer/Footer'
import { Hero } from './components/Hero/Hero'
import { Nav } from './components/Nav/Nav'
import { PeopleSection } from './components/PeopleSection/PeopleSection'
import { PhoneActionBar } from './components/PhoneActionBar/PhoneActionBar'
import { PixelDivider } from './components/PixelDivider/PixelDivider'
import { SponsorCta } from './components/SponsorCta/SponsorCta'
import { SponsorSection } from './components/SponsorSection/SponsorSection'
import { TracksSection } from './components/TracksSection/TracksSection'
import { WeekendSection } from './components/WeekendSection/WeekendSection'
import { useTouchGaze } from './hooks/useTouchGaze'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useTouchGaze()

  return (
    <>
      <Nav isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} />
      <div inert={isMenuOpen}>
        <main>
          <Hero />
          <PixelDivider from="var(--devx-night)" to="var(--cl-paper)" />
          <EventSection />
          <SponsorSection />
          <AiCreditsSection />
          <TracksSection />
          <PeopleSection />
          <PixelDivider from="var(--cl-paper)" to="#101017" />
          <AlumniBand />
          <PixelDivider from="#101017" to="var(--cl-paper)" />
          <WeekendSection />
          <FaqSection />
          <PixelDivider from="var(--cl-paper)" to="var(--devx-night)" />
          <SponsorCta />
        </main>
        <Footer />
      </div>
      <PhoneActionBar isSuppressed={isMenuOpen} />
    </>
  )
}
