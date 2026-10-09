import { SectionIds } from '@/content/sections';

import { buildProjectHash, buildSectionHash, parseDeepLink } from './locationHash.helper';

describe('locationHash', () => {
  it('parses a section hash', () => {
    expect(parseDeepLink('#logros')).toEqual({
      sectionId: SectionIds.Achievements,
      projectId: null,
    });
  });

  it('parses a project hash', () => {
    expect(parseDeepLink('#proyectos/requify')).toEqual({
      sectionId: SectionIds.Projects,
      projectId: 'requify',
    });
  });

  it('ignores unknown sections', () => {
    expect(parseDeepLink('#main').sectionId).toBeNull();
    expect(parseDeepLink('').sectionId).toBeNull();
  });

  it('builds section and project hashes', () => {
    expect(buildSectionHash(SectionIds.Skills)).toBe('#skills');
    expect(buildProjectHash('requify')).toBe('#proyectos/requify');
  });
});
