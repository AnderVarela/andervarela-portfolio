import type { ProjectScreenshot } from '@/content/projects';
import { joinClassNames } from '@/utils/classNames';

import styles from './ProjectScreenshotImage.module.css';

interface ProjectScreenshotImageProps {
  screenshot: ProjectScreenshot;
  isFeatured?: boolean;
}

export function ProjectScreenshotImage({
  screenshot,
  isFeatured = false,
}: ProjectScreenshotImageProps) {
  return (
    <img
      src={screenshot.imageUrl}
      alt={screenshot.description}
      loading="lazy"
      className={joinClassNames(styles.screenshot, isFeatured && styles.featured)}
    />
  );
}
