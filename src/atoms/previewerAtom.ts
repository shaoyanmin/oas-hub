import { atom } from "jotai";
import { projectActiveIdAtom } from "./projectAtom";
import { versionActiveIdAtom } from "./changelogAtom";
import { generateOASSpecUrl } from "../utils/oasMapper";
import { Previewer } from "../models/previewer";

// const previewerCache = atom<{
//   activeTeamId: string | null;
//   activeArtifactId: string | null;
//   activeVersionId: string | null;
// }>({
//   activeTeamId: null,
//   activeArtifactId: null,
//   activeVersionId: null,
// });

const previewerAtom = atom<Previewer>({
  isLoading: false,
  specUrl: null,
});

export const previewerSpecUrlAtom = atom((get) => {
  const projectId = get(projectActiveIdAtom);
  const versionId = get(versionActiveIdAtom);

  if (!projectId || !versionId) return null;

  const specUrl = generateOASSpecUrl(projectId, versionId);
  return specUrl;
});

export const previewerIsLoadingAtom = atom(
  (get) => {
    const previewer = get(previewerAtom);
    return previewer.isLoading;
  },
  (get, set, newValue: boolean) => {
    const previewer = get(previewerAtom);
    const specUrl = get(previewerSpecUrlAtom);

    if (previewer.specUrl !== specUrl && newValue === true) {
      set(previewerAtom, { ...previewer, isLoading: true, specUrl });
    } else if (previewer.specUrl === specUrl && newValue === false) {
      set(previewerAtom, { ...previewer, isLoading: false });
    } else {
      // Suppose the same URL only will ben rendered ONLY once
      // Then only set true when changed, and set false when rendered,
      // and ignore all following events after the first false
    }
  },
);
