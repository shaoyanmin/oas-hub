import { atom } from "jotai";
import { projectActiveAtom } from "./projectAtom";
import { atomEffect } from "jotai-effect";

export type swaggerPreviewer = {
  fileMode: "raw" | "machine-improved"; // version of the file (raw source or enhanced by AI model)
  // language: "ja" | "en"; // language selection
  specUrl: string | null;
  isLoading: boolean;
};

export const swaggerPreviewerAtom = atom<swaggerPreviewer>({
  fileMode: "raw",
  specUrl: null,
  isLoading: false,
});

export const swaggerPreviewerIsLoadingAtom = atom(
  (get) => get(swaggerPreviewerAtom)?.isLoading || false,
  (get, set, nextValue: boolean) => {
    const current = get(swaggerPreviewerAtom);
    set(swaggerPreviewerAtom, {
      ...current,
      isLoading: nextValue,
    });
  },
);

export const swaggerPreviewerSpecUrlAtom = atom(
  (get) => get(swaggerPreviewerAtom)?.specUrl || null,
);

export const loadSpecUrlChangedEffect = atomEffect((get, set) => {
  const project = get(projectActiveAtom);
  let specUrl = get(swaggerPreviewerAtom).specUrl;
  let isLoading = get(swaggerPreviewerAtom).isLoading;

  if (project?.url !== specUrl) {
    specUrl = project?.url ?? null;
    isLoading = true;
  }

  set(swaggerPreviewerAtom, {
    ...get(swaggerPreviewerAtom),
    specUrl,
    isLoading,
  });

  return () => {
    set(swaggerPreviewerAtom, {
      ...get(swaggerPreviewerAtom),
      isLoading: false,
    });
  };
});
