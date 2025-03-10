import { RedocStandalone } from "redoc";

import { useMemo } from "react";

import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  previewerIsLoadingAtom,
  previewerSpecUrlAtom,
} from "../atoms/previewerAtom";

export const ProjectPreviewer = () => {
  const [specUrl] = useAtom(previewerSpecUrlAtom);
  const [, setPreviewIsLoading] = useAtom(previewerIsLoadingAtom);
  const cachedSpecUrl = useMemo(() => specUrl, [specUrl]);

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
        options={{
          hideDownloadButton: true,
          expandResponses: "200,201",
          pathInMiddlePanel: true,
          showObjectSchemaExamples: true,
          showExtensions: true,
          hideSecuritySection: true,
          disableSearch: true,
          nativeScrollbars: true,
        }}
        onLoaded={() => {
          setPreviewIsLoading(false);
          // console.log("Previewer end loading.");
        }}
      />
    )
  );
};
