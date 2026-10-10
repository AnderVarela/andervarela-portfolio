const ORDINAL_LENGTH = 2;

export function formatAsTwoDigits(value: number): string {
  return String(value).padStart(ORDINAL_LENGTH, '0');
}

export function formatPositionInTotal(position: number, total: number): string {
  return `${formatAsTwoDigits(position)} / ${formatAsTwoDigits(total)}`;
}
