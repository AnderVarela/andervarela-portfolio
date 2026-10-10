import { useState } from 'react';

import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import { joinClassNames } from '@/utils/classNames';

import styles from './ImageWithSkeleton.module.css';

interface ImageWithSkeletonProps {
  imageUrl: string;
  description: string;
  /* Tamaño, proporción y fondo del marco; la imagen lo rellena. */
  className?: string;
  /* Al cargar, el marco deja su proporción y toma la de la imagen, que se ve entera. */
  hasNaturalHeight?: boolean;
}

/* Imagen que muestra un skeleton en su hueco hasta que termina de cargar. */
export function ImageWithSkeleton({
  imageUrl,
  description,
  className,
  hasNaturalHeight = false,
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span
      className={joinClassNames(
        styles.frame,
        hasNaturalHeight && styles.naturalHeight,
        isLoaded && styles.loaded,
        className,
      )}
    >
      <Skeleton className={styles.skeleton} />
      <img
        src={imageUrl}
        alt={description}
        loading="lazy"
        decoding="async"
        className={styles.image}
        onLoad={() => setIsLoaded(true)}
      />
    </span>
  );
}
