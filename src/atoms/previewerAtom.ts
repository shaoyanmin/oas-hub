import { atom } from "jotai";
import { observe } from "jotai-effect";
import { atomWithStorage } from "jotai/utils";
import { RedocRawOptions } from "redoc";
import {
  projectActiveIdAtom,
  teamActiveIdAtom,
  artifactActiveIdAtom,
} from "./projectAtom";
import { versionActiveIdAtom } from "./changelogAtom";
import { generateOASSpecUrl } from "../utils/oasMapper";
import { Previewer } from "../models/previewer";

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
  (get, set, isLoading: boolean) => {
    const previewer = get(previewerAtom);
    const specUrl = get(previewerSpecUrlAtom);

    if (previewer.specUrl !== specUrl && isLoading === true) {
      set(previewerAtom, { ...previewer, isLoading: true, specUrl });
    } else if (previewer.specUrl === specUrl && isLoading === false) {
      set(previewerAtom, { ...previewer, isLoading: false });
    } else {
      // Each URL should only be rendered once.
      // Set loading state to true when URL changes,
      // set to false after initial render,
      // then ignore subsequent events.
    }
  },
);

export const lastSuccessfulLoadedConfigAtom = atomWithStorage<{
  teamId: string | null;
  artifactId: string | null;
  versionId: string | null;
}>("__OAS_HUB__lastSuccessfulLoadedConfig", {
  teamId: null,
  artifactId: null,
  versionId: null,
});

observe((get, set) => {
  const teamId = get(teamActiveIdAtom);
  const artifactId = get(artifactActiveIdAtom);
  const versionId = get(versionActiveIdAtom);
  const isLoading = get(previewerIsLoadingAtom);
  if (teamId && artifactId && versionId && !isLoading) {
    set(lastSuccessfulLoadedConfigAtom, {
      teamId: teamId,
      artifactId: artifactId,
      versionId: versionId,
    });
  }
});

export const previewerRenderConfigAtom = atom<RedocRawOptions>(() => ({
  hideDownloadButton: true,
  expandResponses: "200,201",
  pathInMiddlePanel: true,
  showObjectSchemaExamples: true,
  showExtensions: true,
  hideSecuritySection: true,
  disableSearch: true,
  nativeScrollbars: true,
}));
