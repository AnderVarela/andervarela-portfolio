export const TextTypes = {
  P: 'paragraph',
  ParagraphLarge: 'paragraphLarge',
  Lead: 'lead',
  Title: 'title',
  Figure: 'figure',
  Greeting: 'greeting',
  Role: 'role',
  Eyebrow: 'eyebrow',
  Label: 'label',
  Caption: 'caption',
  Note: 'note',
  Micro: 'micro',
} as const;

export type TextType = (typeof TextTypes)[keyof typeof TextTypes];

export const TextTones = {
  Default: 'toneDefault',
  Muted: 'toneMuted',
  Accent: 'toneAccent',
} as const;

export type TextTone = (typeof TextTones)[keyof typeof TextTones];
