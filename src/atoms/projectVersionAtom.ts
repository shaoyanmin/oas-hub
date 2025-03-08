import { atom } from "jotai";

export type ProjectVersion = {
  id: string;
  version: string;
};

export const projectVersionAtom = atom<ProjectVersion[]>([
  {
    id: "docker",
    version: "1.0.0",
  },
  {
    id: "google",
    version: "1.0.0",
  },
]);
