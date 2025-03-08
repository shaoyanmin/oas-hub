import { RedocStandalone } from "redoc";
import { useAtomDevtools } from "jotai-devtools";

import { useAtom } from "jotai";

import {
  swaggerPreviewerIsLoadingAtom,
  swaggerPreviewerSpecUrlAtom,
  loadSpecUrlChangedEffect,
} from "../atoms/swaggerPreviewerAtom";

export const ProjectSwaggerFile = () => {
  useAtom(loadSpecUrlChangedEffect);
  const [specUrl] = useAtom(swaggerPreviewerSpecUrlAtom);
  const [, setIsPreviewerLoading] = useAtom(swaggerPreviewerIsLoadingAtom);

  useAtomDevtools(swaggerPreviewerSpecUrlAtom);

  console.log("redering ", specUrl);

  return (
    specUrl && (
      <RedocStandalone
        specUrl={specUrl}
        options={{
          hideDownloadButton: true,
          expandResponses: "200,201",
          pathInMiddlePanel: true,
          showObjectSchemaExamples: true,
          showExtensions: true,
        }}
        onLoaded={() => {
          setIsPreviewerLoading(false);
        }}
      />
    )
  );
};
