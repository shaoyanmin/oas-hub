import { useAtom } from "jotai";
import { useInitializeFromUrlParams } from "../hooks/useInitializeFromUrlParams";
import { previewerIsLoadingAtom } from "../atoms/previewerAtom";
import { Outlet } from "react-router";
import { useActiveTeamSelect } from "../hooks/useActiveTeamSelect";
import { useActiveArtifactSelect } from "../hooks/useActiveArtifactSelect";
import { useActiveVersionSelect } from "../hooks/useActiveVersionSelect";
import { useOASRoutes } from "../hooks/useOASRoutes";
import { ProjectHeaderSelector } from "./ProjectHeaderSelector";

export const ProjectHeader = () => {
  useInitializeFromUrlParams();
  const [isLoading] = useAtom(previewerIsLoadingAtom);

  const { teamActiveId, setTeamActiveId, teamSelectOptions } =
    useActiveTeamSelect();
  const { artifactActiveId, setArtifactActiveId, artifactSelectOptions } =
    useActiveArtifactSelect();
  const { versionActiveId, setVersionActiveId, versionSelectOptions } =
    useActiveVersionSelect();

  const { navigateToChangelogPage, navigateToPreviewerPage, isChangelogPage } =
    useOASRoutes({
      teamId: teamActiveId,
      artifactId: artifactActiveId,
      versionId: versionActiveId,
    });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-2 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6 mr-3" />
          </div>

          <div className="flex items-center space-x-4">
            <ProjectHeaderSelector
              name="Team:"
              value={teamActiveId ?? ""}
              options={teamSelectOptions}
              onChange={setTeamActiveId}
              isDisabled={isLoading}
              isReadonly={isChangelogPage}
              placeholder="Select a team"
            />

            <ProjectHeaderSelector
              name="Artifact:"
              value={artifactActiveId ?? ""}
              options={artifactSelectOptions}
              onChange={setArtifactActiveId}
              isDisabled={isLoading}
              isReadonly={isChangelogPage}
              placeholder="Select an artifact"
            />

            {!isChangelogPage && (
              <ProjectHeaderSelector
                name="Version:"
                value={versionActiveId ?? ""}
                options={versionSelectOptions}
                onChange={setVersionActiveId}
                isDisabled={isLoading}
                isReadonly={isChangelogPage}
                placeholder="Default version"
              />
            )}

            <div>
              <a
                onClick={() =>
                  isChangelogPage
                    ? navigateToPreviewerPage()
                    : navigateToChangelogPage()
                }
                href="#"
                aria-disabled={isLoading}
                className="mr-4"
              >
                {isChangelogPage ? "Back" : "Changelog"}
              </a>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
