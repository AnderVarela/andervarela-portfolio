import type { Translation } from '@/i18n/translations/es';

import { SectionIds, type SectionId } from './sections';

export interface AvatarPose {
  sectionId: SectionId;
  /* La versión más grande, para los navegadores que no entienden `srcset`. */
  imageUrl: string;
  imageSourceSet: string;
  /* Miniatura con la silueta de la pose; va incrustada y se ve mientras llega la imagen. */
  placeholderUrl: string;
  /*
   * Cuánto hay que ampliar la imagen para que el personaje mida lo mismo que en las demás:
   * las poses con algo por encima de la cabeza lo dibujan más pequeño dentro del lienzo.
   */
  figureScale: number;
}

interface PoseImageVariant {
  width: number;
  url: string;
}

const PLACEHOLDER_VARIANT_NAME = 'placeholder';

/* Los genera `npm run optimize:avatar` a partir de los PNG de `assets/avatar`. */
const OPTIMIZED_IMAGE_URLS = import.meta.glob<string>('@/assets/avatar/optimized/*.webp', {
  eager: true,
  import: 'default',
});

function findPoseImageUrls(poseName: string): Map<string, string> {
  const variantPattern = new RegExp(`/${poseName}-(\\w+)\\.webp$`);
  const urlsByVariantName = new Map<string, string>();

  Object.entries(OPTIMIZED_IMAGE_URLS).forEach(([filePath, url]) => {
    const variantName = variantPattern.exec(filePath)?.[1];
    if (variantName) urlsByVariantName.set(variantName, url);
  });

  return urlsByVariantName;
}

function buildPose(sectionId: SectionId, poseName: string, figureScale = 1): AvatarPose {
  const urlsByVariantName = findPoseImageUrls(poseName);
  const variants: PoseImageVariant[] = [...urlsByVariantName]
    .filter(([variantName]) => variantName !== PLACEHOLDER_VARIANT_NAME)
    .map(([variantName, url]) => ({ width: Number(variantName), url }))
    .sort((first, second) => first.width - second.width);

  return {
    sectionId,
    imageUrl: variants.at(-1)?.url ?? '',
    imageSourceSet: variants.map(({ width, url }) => `${url} ${width}w`).join(', '),
    placeholderUrl: urlsByVariantName.get(PLACEHOLDER_VARIANT_NAME) ?? '',
    figureScale,
  };
}

/* Solo las secciones con avatar tienen pose; el resto de la página es contenido. */
export const AVATAR_POSES: readonly AvatarPose[] = [
  buildPose(SectionIds.Home, 'greeting'),
  buildPose(SectionIds.Contact, 'greeting'),
];

export function findAvatarPose(sectionId: SectionId): AvatarPose | undefined {
  return AVATAR_POSES.find((pose) => pose.sectionId === sectionId);
}

/* Qué hace el avatar en cada pose, para su descripción accesible. */
export function describeAvatarPose(pose: AvatarPose, translation: Translation): string {
  return pose.sectionId === SectionIds.Contact
    ? translation.avatarPoses.contact
    : translation.avatarPoses.home;
}
