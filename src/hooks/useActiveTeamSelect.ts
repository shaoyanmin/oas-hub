import { projectAtom } from "../atoms/projectAtom";
import {
  teamActiveIdAtom,
  artifactActiveIdAtom,
  teamSelectOptionsAtom,
} from "../atoms/projectAtom";
import { versionActiveIdAtom } from "../atoms/changelogAtom";
import { useAtom } from "jotai";
import { useAtomDevtools } from "jotai-devtools";

export function useActiveTeamSelect() {
  const [teamActiveId, rawSetTeamActiveId] = useAtom(teamActiveIdAtom);
  const [teamSelectOptions] = useAtom(teamSelectOptionsAtom);
  const [, setArtifactActiveId] = useAtom(artifactActiveIdAtom);
  const [, setVersionActiveId] = useAtom(versionActiveIdAtom);
  const [projects] = useAtom(projectAtom);

  function setTeamActiveId(id: string | null): void {
    if (!id || !projects.length) return;
    const project = projects.find((p) => p.teamId === id);
    if (!project) return;

    rawSetTeamActiveId(id);
    setArtifactActiveId(project.artifactId);
    setVersionActiveId(null);
  }

  useAtomDevtools(teamActiveIdAtom);
  useAtomDevtools(artifactActiveIdAtom);
  useAtomDevtools(versionActiveIdAtom);

  return {
    teamActiveId,
    teamSelectOptions,
    setTeamActiveId,
  };
}
