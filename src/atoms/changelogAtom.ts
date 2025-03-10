import { atom } from "jotai";
import { ChangelogBase } from "../models/changelog";
import { projectActiveIdAtom } from "./projectAtom";
import { atomWithQuery } from "jotai-tanstack-query";
import { SelectOption } from "../models/selectOption";

export const fetchChangelog = async ({
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

// UI only states

export const versionActiveIdAtom = atom<string | null>(null);

export const versionSelectOptionsAtom = atom<SelectOption[]>((get) => {
  const versions = get(changelogVersionAtom);
  return versions.map((v) => ({
    value: v.version,
    label: v.version,
  }));
});
