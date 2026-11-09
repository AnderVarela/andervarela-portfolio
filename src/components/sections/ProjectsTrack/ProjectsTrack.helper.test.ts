import { listProjects } from '@/content/projects';
import { spanishTranslation } from '@/i18n/translations/es';

import { arrangeProjectsForTrack, TrackItemKinds } from './ProjectsTrack.helper';

describe('arrangeProjectsForTrack', () => {
  const trackItems = arrangeProjectsForTrack(listProjects(spanishTranslation));

  it('keeps standalone projects and collapses a group into one item', () => {
    expect(trackItems.map((item) => item.kind)).toEqual([
      TrackItemKinds.ProjectGroup,
      TrackItemKinds.SingleProject,
      TrackItemKinds.SingleProject,
      TrackItemKinds.SingleProject,
    ]);
  });

  it('keeps the original index of every grouped project', () => {
    const groupItem = trackItems.find((item) => item.kind === TrackItemKinds.ProjectGroup);

    expect(groupItem?.members.map((member) => member.projectIndex)).toEqual([0, 1, 2]);
  });
});
