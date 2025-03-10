import { useEffect } from "react";
import {
  versionActiveIdAtom,
  versionSelectOptionsAtom,
  changelogBaseAtom,
} from "../atoms/changelogAtom";
import { useAtom } from "jotai";

export function useActiveVersionSelect() {
  const [versionActiveId, setVersionActiveId] = useAtom(versionActiveIdAtom);
  const [{ isPending, isError }] = useAtom(changelogBaseAtom);
  const [versionSelectOptions] = useAtom(versionSelectOptionsAtom);

  useEffect(() => {
    if (isPending || isError) {
      return;
    }

    if (!versionActiveId && versionSelectOptions[0]) {
      setVersionActiveId(versionSelectOptions[0].value ?? null);
    }
  }, [
    versionActiveId,
    setVersionActiveId,
    versionSelectOptions,
    isPending,
    isError,
  ]);

  return {
    versionActiveId,
    versionSelectOptions,
    setVersionActiveId,
  };
}
