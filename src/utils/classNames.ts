type ClassNameCandidate = string | false | null | undefined;

export function joinClassNames(...candidates: ClassNameCandidate[]): string {
  return candidates.filter(Boolean).join(' ');
}
