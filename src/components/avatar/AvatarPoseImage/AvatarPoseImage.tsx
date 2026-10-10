import { useState, type CSSProperties } from 'react';

import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import type { AvatarPose } from '@/content/avatarPoses';
import { joinClassNames } from '@/utils/classNames';

import styles from './AvatarPoseImage.module.css';

interface AvatarPoseImageProps {
  pose: AvatarPose;
  /* Solo en el avatar que sigue al scroll: Avatar.motion.helper funde la capa con ese índice. */
  poseIndex?: number;
  /* La pose con la que abre la página se pide antes que el resto. */
  isPriority?: boolean;
}

/*
 * Ancho que ocupa el avatar: en tableta y escritorio lo fija Avatar.helper según el alto de
 * la ventana; en móvil, el alto del escenario de cada sección.
 */
const DISPLAYED_SIZES = '(width >= 768px) 52vh, 250px';

/*
 * Una pose del avatar. Hasta que la imagen termina de cargar se ve su silueta como skeleton.
 * La descripción accesible la da el contenedor del avatar; la imagen es decorativa.
 */
export function AvatarPoseImage({ pose, poseIndex, isPriority = false }: AvatarPoseImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const silhouette = { '--pose-silhouette': `url("${pose.placeholderUrl}")` } as CSSProperties;

  return (
    <span
      data-avatar-pose={poseIndex}
      className={joinClassNames(
        styles.layer,
        poseIndex !== undefined && styles.scrollDriven,
        isLoaded && styles.loaded,
      )}
    >
      <Skeleton style={silhouette} className={styles.skeleton} />
      <img
        src={pose.imageUrl}
        srcSet={pose.imageSourceSet}
        sizes={DISPLAYED_SIZES}
        alt=""
        draggable={false}
        decoding="async"
        loading={isPriority ? 'eager' : 'lazy'}
        fetchPriority={isPriority ? 'high' : 'auto'}
        className={styles.image}
        onLoad={() => setIsLoaded(true)}
      />
    </span>
  );
}
