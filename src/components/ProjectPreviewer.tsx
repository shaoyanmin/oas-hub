import { RedocStandalone } from "redoc";

import { useMemo } from "react";

import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  previewerIsLoadingAtom,
  previewerSpecUrlAtom,
  previewerRenderConfigAtom,
} from "../atoms/previewerAtom";

export const ProjectPreviewer = () => {
  const [specUrl] = useAtom(previewerSpecUrlAtom);
  const [, setPreviewIsLoading] = useAtom(previewerIsLoadingAtom);
  const cachedSpecUrl = useMemo(() => specUrl, [specUrl]);
  const [config] = useAtom(previewerRenderConfigAtom);

  useEffect(() => {
    if (specUrl) {
      setPreviewIsLoading(true);
      // console.log("Previewer loading ...", specUrl);
    }
  }, [specUrl, setPreviewIsLoading]);

  return (
    cachedSpecUrl && (
      <RedocStandalone
        specUrl={cachedSpecUrl}
        options={config}
        onLoaded={() => {
          setPreviewIsLoading(false);
          // console.log("Previewer end loading.");
        }}
      />
    )
  );
};
