import { atom } from "jotai";
import { projectActiveIdAtom } from "./projectAtom";
import { versionActiveIdAtom, changelogVersionAtom } from "./changelogAtom";

// Generate a active route path with the format `/oas/${projectId}/1234567890abcdef`

export const projectActiveProjectSwaggerFileRoutePathAtom = atom((get) => {
  const activeProjectId = get(projectActiveIdAtom);
  const activeVersionId = get(versionActiveIdAtom);
  const versions = get(changelogVersionAtom);
  if (activeProjectId && activeVersionId) {
    return `/oas/${activeProjectId}/${activeVersionId}`;
  } else if (activeProjectId) {
    const versionId = versions[0]?.version;
    return versionId ? `/oas/${activeProjectId}/${versionId}` : null;
  } else {
    return null;
  }
});

export const projectActiveProjectChangelogRoutePathAtom = atom((get) => {
  const activeProjectId = get(projectActiveIdAtom);
  return activeProjectId ? `/oas/${activeProjectId}/changelog` : null;
});
