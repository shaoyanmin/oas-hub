import {
  projectAtom,
  teamActiveIdAtom,
  artifactActiveIdAtom,
  artifactSelectOptionsAtom,
} from "../atoms/projectAtom";
import { versionActiveIdAtom } from "../atoms/changelogAtom";
import { useAtom } from "jotai";

export function useActiveArtifactSelect() {
  const [teamActiveId] = useAtom(teamActiveIdAtom);
  const [artifactActiveId, rawSetArtifactActiveId] =
    useAtom(artifactActiveIdAtom);
  const [projects] = useAtom(projectAtom);
  const [artifactSelectOptions] = useAtom(artifactSelectOptionsAtom);
  const [, setVersionActiveId] = useAtom(versionActiveIdAtom);

  function setArtifactActiveId(id: string | null): void {
    if (!teamActiveId || !id || !projects.length) return;
    const project = projects.find(
      (p) => p.teamId === teamActiveId && p.artifactId === id,
    );
    if (!project) return;

    rawSetArtifactActiveId(id);
    setVersionActiveId(null);
  }

  return {
    artifactActiveId,
    artifactSelectOptions,
    setArtifactActiveId,
  };
}
