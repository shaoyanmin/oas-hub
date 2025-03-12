import { useEffect } from "react";
import {
  projectBaseAtom,
  projectAtom,
  teamActiveIdAtom,
  artifactActiveIdAtom,
} from "../atoms/projectAtom";
import {
  changelogBaseAtom,
  changelogVersionAtom,
  versionActiveIdAtom,
} from "../atoms/changelogAtom";
import { lastSuccessfulLoadedConfigAtom } from "../atoms/previewerAtom";
import { useAtom } from "jotai";

export function useInitializeFromDefaultConfig() {
  const [{ isPending: isProjectPending, isError: isProjectError }] =
    useAtom(projectBaseAtom);
  const [{ isPending: isChangelogPending, isError: isChangelogError }] =
    useAtom(changelogBaseAtom);
  const isPending = isProjectPending || isChangelogPending;
  const isError = isProjectError || isChangelogError;

  const [projects] = useAtom(projectAtom);
  const [versions] = useAtom(changelogVersionAtom);
  const [teamActiveId, setTeamActiveId] = useAtom(teamActiveIdAtom);
  const [artifactActiveId, setArtifactActiveId] = useAtom(artifactActiveIdAtom);
  const [versionActiveId, setVersionActiveId] = useAtom(versionActiveIdAtom);
  const [lastConfig] = useAtom(lastSuccessfulLoadedConfigAtom);

  useEffect(() => {
    const { teamId, artifactId, versionId } = lastConfig || {};

    if (!isPending && !isError && !teamActiveId && !artifactActiveId) {
      setTeamActiveId(teamId ?? projects[0].teamId ?? null);
      setArtifactActiveId(artifactId ?? projects[0].artifactId ?? null);
    }

    if (!isPending && !isError && !versionActiveId) {
      setVersionActiveId(versionId ?? versions[0]?.version ?? null);
    }
  }, [
    isPending,
    isError,
    projects,
    teamActiveId,
    setTeamActiveId,
    artifactActiveId,
    setArtifactActiveId,
    versionActiveId,
    setVersionActiveId,
    versions,
    lastConfig,
  ]);

  return { isPending, isError };
}
