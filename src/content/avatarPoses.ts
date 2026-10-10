import { SectionIds, type SectionId } from './sections';

export interface AvatarPose {
  sectionId: SectionId;
  /* La versión más grande, para los navegadores que no entienden `srcset`. */
  imageUrl: string;
  imageSourceSet: string;
  /* Miniatura con la silueta de la pose; va incrustada y se ve mientras llega la imagen. */
  placeholderUrl: string;
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

function buildPose(sectionId: SectionId, poseName: string): AvatarPose {
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
  };
}

/* Una pose por sección, en el mismo orden que SECTIONS. La descripción la da la traducción. */
export const AVATAR_POSES: readonly AvatarPose[] = [
  buildPose(SectionIds.Home, 'greeting'),
  buildPose(SectionIds.About, 'arms-crossed'),
  buildPose(SectionIds.Experience, 'laptop'),
  buildPose(SectionIds.Projects, 'hands-in-pockets'),
  buildPose(SectionIds.Achievements, 'trophy'),
  buildPose(SectionIds.Education, 'graduation-cap'),
  buildPose(SectionIds.Skills, 'arms-raised'),
  buildPose(SectionIds.Contact, 'greeting'),
];

export const ORBITING_TECHNOLOGY_LABELS: readonly string[] = ['TS', 'R', 'JS', 'AWS'];
