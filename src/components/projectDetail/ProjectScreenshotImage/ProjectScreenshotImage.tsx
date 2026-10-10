import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton/ImageWithSkeleton';
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
    <ImageWithSkeleton
      imageUrl={screenshot.imageUrl}
      description={screenshot.description}
      hasNaturalHeight={isFeatured}
      className={joinClassNames(styles.screenshot, isFeatured && styles.featured)}
    />
  );
}
