import { ProjectBase } from "../models/project";

// <project id> ::= <team id> "/" <artifact id>
export function generateProjectId(teamId: string, artifactId: string): string {
  return `${teamId}/${artifactId}`;
}

export function mapProjectToId(project: ProjectBase): string {
  return generateProjectId(project.teamId, project.artifactId);
}
