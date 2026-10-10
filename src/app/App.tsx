import { Avatar } from '@/components/avatar/Avatar/Avatar';
import { PageBackground } from '@/components/layout/PageBackground/PageBackground';
import { SkipLink } from '@/components/layout/SkipLink/SkipLink';
import { MobileBar } from '@/components/navigation/MobileBar/MobileBar';
import { MobileMenu } from '@/components/navigation/MobileMenu/MobileMenu';
import { SectionRail } from '@/components/navigation/SectionRail/SectionRail';
import { UtilityBar } from '@/components/navigation/UtilityBar/UtilityBar';
import { ProjectDetail } from '@/components/projectDetail/ProjectDetail/ProjectDetail';
import { AboutSection } from '@/components/sections/AboutSection/AboutSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection/AchievementsSection';
import { ContactSection } from '@/components/sections/ContactSection/ContactSection';
import { EducationSection } from '@/components/sections/EducationSection/EducationSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection/SkillsSection';
import { Toast } from '@/components/ui/Toast/Toast';

import { useIsOverlayOpen, usePageBehaviours } from './App.helper';
import styles from './App.module.css';

const MAIN_CONTENT_ID = 'main';

/* Las capas se apilan de fondo a frente en el mismo orden en que aparecen aquí. */
export function App() {
  usePageBehaviours();
  const isOverlayOpen = useIsOverlayOpen();

  return (
    <div className={styles.app}>
      <div inert={isOverlayOpen}>
        <SkipLink targetId={MAIN_CONTENT_ID} />
        <PageBackground />
        <SectionRail />
        <UtilityBar />
        <MobileBar />
        <main id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.content}>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <AchievementsSection />
          <EducationSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Avatar />
      </div>
      <ProjectDetail />
      <MobileMenu />
      <Toast />
    </div>
  );
}
