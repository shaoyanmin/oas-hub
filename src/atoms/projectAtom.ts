import { atom } from "jotai";

export type Project = {
  id: string;
  url: string;
  active: boolean;
};

export const projectAtom = atom<Project[]>([
  {
    id: "docker",
    url: "/oas/docker/engine/v1.25/swagger.yaml",
    active: false,
  },
  {
    id: "google",
    url: "/oas/google/calendar/v3/swagger.yaml",
    active: true,
  },
]);

// The project id whose active is true
export const projectActiveIdAtom = atom(
  (get) => {
    const projects = get(projectAtom);
    const activeProject = projects?.find((p) => p.active);
    return activeProject?.id || null;
  },
  (get, set, newActiveId: string | null) => {
    const projects = get(projectAtom);
    set(
      projectAtom,
      projects.map((p) => ({
        ...p,
        active: p.id === newActiveId,
      })),
    );
  },
);

// The project object whose active is true
export const projectActiveAtom = atom((get) => {
  const projects = get(projectAtom);
  return projects.find((p) => p.active) || null;
});

// The project sepc url who is active
export const projectActiveSpecUrlAtom = atom((get) => {
  const projects = get(projectAtom);
  return projects.find((p) => p.active)?.url || null;
});

// Used as HTML Select element options, keys is project id, values is project url
export const projectSelectOptionsAtom = atom((get) => {
  const projects = get(projectAtom);
  return projects.map((p) => ({ key: p.id, value: p.url }));
});
