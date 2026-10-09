import { ScreenshotPlaceholder } from '@/components/projectDetail/ScreenshotPlaceholder/ScreenshotPlaceholder';
import { Text } from '@/components/ui/Text/Text';
import { TextTones, TextTypes } from '@/components/ui/Text/Text.types';
import type { Project } from '@/content/projects';
import { useTranslation } from '@/i18n/useTranslation';

import styles from './ProjectGallery.module.css';

const SECONDARY_SCREENSHOT_NUMBERS = [2, 3];

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const translation = useTranslation();
  const { gallery, mainScreenshot, screenshot } = translation.projectDetail;

  return (
    <div className={styles.gallery}>
      <span className={styles.title}>
        <Text kind={TextTypes.Label} label={gallery} tone={TextTones.Muted} />
      </span>
      <ScreenshotPlaceholder label={`${mainScreenshot} · ${project.shortName}`} isFeatured />
      {SECONDARY_SCREENSHOT_NUMBERS.map((screenshotNumber) => (
        <ScreenshotPlaceholder key={screenshotNumber} label={`${screenshot} ${screenshotNumber}`} />
      ))}
    </div>
  );
}
