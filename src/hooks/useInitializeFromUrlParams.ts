import { useEffect } from "react";
import { useParams } from "react-router";
import { teamActiveIdAtom, artifactActiveIdAtom } from "../atoms/projectAtom";
import { versionActiveIdAtom } from "../atoms/changelogAtom";
import { useAtom } from "jotai";

export function useInitializeFromUrlParams() {
  const { teamId, artifactId, version } = useParams();
  const [teamActiveId, setTeamActiveId] = useAtom(teamActiveIdAtom);
  const [artifactActiveId, setArtifactActiveId] = useAtom(artifactActiveIdAtom);
  const [versionActiveId, setVersionActiveId] = useAtom(versionActiveIdAtom);

  // Run only once when mounted
  useEffect(() => {
    if (!teamActiveId && teamId && artifactId) {
      setTeamActiveId(teamId);
    }

    if (!artifactActiveId && artifactId) {
      setArtifactActiveId(artifactId);
    }

    if (!versionActiveId && version) {
      setVersionActiveId(version);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
