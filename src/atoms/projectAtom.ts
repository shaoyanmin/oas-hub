import { atom } from "jotai";
import { Project, ProjectBase } from "../models/project";
import { atomWithQuery } from "jotai-tanstack-query";
import { mapProjectToId } from "../utils/projectMapper";
import { generateProjectId } from "../utils/projectMapper";
import { SelectOption } from "../models/selectOption";

const fetchProjects = async (): Promise<ProjectBase[]> => {
  const response = await fetch("/oas/projects.json");
  const data = await response.json();
  return data?.projects ?? [];
};

export const projectBaseAtom = atomWithQuery<ProjectBase[]>(() => ({
  queryKey: ["projects"],
  queryFn: fetchProjects,
}));

export const projectAtom = atom<Project[]>((get) => {
  const { data: baseProject, error } = get(projectBaseAtom);
  if (error) return []; // TODO: Handle error
  if (!baseProject) return [];

  return baseProject.map((project) => {
    const id = mapProjectToId(project);
    return {
      ...project,
      id,
    };
  });
});

// UI only states
export const teamActiveIdAtom = atom<string | null>(null);

export const teamSelectOptionsAtom = atom<SelectOption[]>((get) => {
  const projects = get(projectAtom);
  return projects?.length
    ? Object.keys(
        projects.reduce((acc, next) => ({ ...acc, [next.teamId]: true }), {}),
      ).map((teamId) => ({ value: teamId, label: teamId }))
    : [];
});

export const artifactActiveIdAtom = atom<string | null>(null);

export const artifactSelectOptionsAtom = atom<SelectOption[]>((get) => {
  const projects = get(projectAtom);
  const activeTeamId = get(teamActiveIdAtom);
  return projects?.length && activeTeamId
    ? projects
        .filter((p) => p.teamId === activeTeamId)
        .map((p) => ({ value: p.artifactId, label: p.artifactId }))
    : [];
});

export const projectActiveIdAtom = atom<string | null>((get) => {
  const teamId = get(teamActiveIdAtom);
  const artifactId = get(artifactActiveIdAtom);
  return teamId && artifactId ? generateProjectId(teamId, artifactId) : null;
});
