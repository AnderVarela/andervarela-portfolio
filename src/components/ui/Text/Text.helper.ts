import { TextTypes, type TextType } from './Text.types';

const BLOCK_TEXT_TYPES: readonly TextType[] = [
  TextTypes.P,
  TextTypes.ParagraphLarge,
  TextTypes.Lead,
];

export function rendersAsParagraph(kind: TextType, isInline: boolean): boolean {
  return BLOCK_TEXT_TYPES.includes(kind) && !isInline;
}
