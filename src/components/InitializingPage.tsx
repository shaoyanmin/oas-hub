import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { useInitializeFromDefaultConfig } from "../hooks/useInitializeFromDefaultConfig";
import { useOASRoutes } from "../hooks/useOASRoutes";
import { teamActiveIdAtom, artifactActiveIdAtom } from "../atoms/projectAtom";
import { versionActiveIdAtom } from "../atoms/changelogAtom";

export const InitializingPage = () => {
  const navigate = useNavigate();
  const { isError } = useInitializeFromDefaultConfig();
  const [teamActiveId] = useAtom(teamActiveIdAtom);
  const [artifactActiveId] = useAtom(artifactActiveIdAtom);
  const [versionActiveId] = useAtom(versionActiveIdAtom);

  const { defaultPreviewerPageUrl } = useOASRoutes({
    teamId: teamActiveId,
    artifactId: artifactActiveId,
    versionId: versionActiveId,
  });

  useEffect(() => {
    console.log("Initializing component mounted");
    if (isError) {
      window.confirm("Failed to load initializing data, refresh to try again.");
      document.location.reload();
    } else if (defaultPreviewerPageUrl) {
      navigate(defaultPreviewerPageUrl);
    }
  }, [defaultPreviewerPageUrl, navigate, isError]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-2xl font-bold mb-4">Initializing...</div>
        <div className="text-gray-500">Please wait while loading data.</div>
      </div>
    </div>
  );
};
