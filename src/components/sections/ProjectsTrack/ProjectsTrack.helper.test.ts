import { PROJECTS } from '@/content/projects';

import { arrangeProjectsForTrack, TrackItemKinds } from './ProjectsTrack.helper';

describe('arrangeProjectsForTrack', () => {
  const trackItems = arrangeProjectsForTrack(PROJECTS);

  it('keeps standalone projects and collapses a group into one item', () => {
    expect(trackItems.map((item) => item.kind)).toEqual([
      TrackItemKinds.SingleProject,
      TrackItemKinds.SingleProject,
      TrackItemKinds.ProjectGroup,
      TrackItemKinds.SingleProject,
      TrackItemKinds.SingleProject,
    ]);
  });

  it('keeps the original index of every grouped project', () => {
    const groupItem = trackItems.find((item) => item.kind === TrackItemKinds.ProjectGroup);

    expect(groupItem?.members.map((member) => member.projectIndex)).toEqual([2, 3, 4]);
  });
});
