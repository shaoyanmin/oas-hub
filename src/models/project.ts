// Server states
export interface ProjectBase {
  teamId: string;
  artifactId: string;
  name: string;
  repositoryUrl: string;
}

export interface Project extends ProjectBase {
  // Include derived states
  id: string;
}
