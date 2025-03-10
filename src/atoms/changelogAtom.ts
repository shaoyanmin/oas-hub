import { atom } from "jotai";
import { ChangelogBase } from "../models/changelog";
import { projectActiveIdAtom } from "./projectAtom";
import { atomWithQuery } from "jotai-tanstack-query";
import { SelectOption } from "../models/selectOption";

const fetchChangelog = async ({
  queryKey: [, projectId],
}: {
  queryKey: (string | null)[];
}): Promise<ChangelogBase | null> => {
  if (!projectId) return null;
  const response = await fetch(`/oas/${projectId}/changelog.json`);
  const data: { changelog: ChangelogBase } = await response.json();
  return data?.changelog || null;
};

export const changelogBaseAtom = atomWithQuery((get) => ({
  queryKey: ["changelog", get(projectActiveIdAtom)],
  queryFn: fetchChangelog,
}));

export const changelogVersionAtom = atom((get) => {
  const { data: baseChangelog, error } = get(changelogBaseAtom);
  if (error) return [];
  if (!baseChangelog) return [];
  return baseChangelog.versions;
});

const fetchDiffMakrdown = async ({
  queryKey: [, projectId, versionId],
}: {
  queryKey: (string | null)[];
}): Promise<string | null> => {
  if (!projectId || !versionId) return null;
  const response = await fetch(`/oas/${projectId}/${versionId}/diff.md`);
  const data = await response.text();
  return data || null;
};

export const diffMarkdownAtom = atomWithQuery((get) => ({
  queryKey: ["diff", get(projectActiveIdAtom), get(versionActiveIdAtom)],
  queryFn: fetchDiffMakrdown,
}));

// UI only states

export const versionActiveIdAtom = atom<string | null>(null);

export const versionSelectOptionsAtom = atom<SelectOption[]>((get) => {
  const versions = get(changelogVersionAtom);
  return versions.map((v) => ({
    value: v.version,
    label: v.version,
  }));
});

export const versionPaginationAtom = atom((get) => {
  const versions = get(changelogVersionAtom);
  const versionActiveId = get(versionActiveIdAtom);
  const idx = versions.findIndex((v) => v.version === versionActiveId);
  if (idx === -1) return { prev: null, current: null, next: null };

  // Versions are ordered by date, from newest to oldest
  const prev = versions[idx + 1]?.version || null;
  const next = versions[idx - 1]?.version || null;
  return { prev, current: versionActiveId, next };
});
