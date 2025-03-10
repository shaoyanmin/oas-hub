export interface ChangelogBase {
  teamId: string;
  artifactId: string;
  versions: {
    version: string;
    timestamp: string;
    commitHash: string;
  }[];
}

export interface ChangelogVersion {
  version: string;
  timestamp: string;
  commitHash: string;
}
