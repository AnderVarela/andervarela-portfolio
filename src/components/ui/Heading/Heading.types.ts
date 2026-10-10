export const HeadingTypes = {
  Giant: 'giant',
  Section: 'section',
  SectionCompact: 'sectionCompact',
  Contact: 'contact',
  Detail: 'detail',
} as const;

export type HeadingType = (typeof HeadingTypes)[keyof typeof HeadingTypes];

export const HeadingLevels = {
  Page: 1,
  Section: 2,
} as const;

export type HeadingLevel = (typeof HeadingLevels)[keyof typeof HeadingLevels];
