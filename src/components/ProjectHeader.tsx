import { useAtom } from "jotai";
import { useInitializeFromUrlParams } from "../hooks/useInitializeFromUrlParams";
import { previewerIsLoadingAtom } from "../atoms/previewerAtom";
import { Outlet } from "react-router";
import { useActiveTeamSelect } from "../hooks/useActiveTeamSelect";
import { useActiveArtifactSelect } from "../hooks/useActiveArtifactSelect";
import { useActiveVersionSelect } from "../hooks/useActiveVersionSelect";
import { useOASRoutes } from "../hooks/useOASRoutes";
import { ProjectHeaderSelect } from "./ProjectHeaderSelector";

export const ProjectHeader = () => {
  useInitializeFromUrlParams();

  const [isLoading] = useAtom(previewerIsLoadingAtom);

  const { teamActiveId, setTeamActiveId, teamSelectOptions } =
    useActiveTeamSelect();
  const { artifactActiveId, setArtifactActiveId, artifactSelectOptions } =
    useActiveArtifactSelect();
  const { versionActiveId, setVersionActiveId, versionSelectOptions } =
    useActiveVersionSelect();

  const {
    navigateToChangelogPage,
    navigateToPreviewerPage,
    navigateToHomePage,
    navigateToUploaderPage,
    isChangelogPage,
    isUploaderPage,
  } = useOASRoutes({
    teamId: teamActiveId,
    artifactId: artifactActiveId,
    versionId: versionActiveId,
  });

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 bg-white shadow-md px-2 py-0 z-50 flex justify-between items-center"
        style={{ minHeight: "48px" }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center ml-4 font-bold text-gray-700 text-2xl">
            OAS Hub
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <a
                onClick={() =>
                  isUploaderPage
                    ? navigateToHomePage()
                    : navigateToUploaderPage()
                }
                href="#"
                aria-disabled={isLoading}
                className="mr-4 underline text-gray-400"
              >
                {isUploaderPage ? "Back" : "Upload a spec file"}
              </a>
            </div>

            {!isUploaderPage && (
              <>
                <ProjectHeaderSelect
                  name="Team:"
                  value={teamActiveId}
                  options={teamSelectOptions}
                  onChange={setTeamActiveId}
                  isDisabled={isLoading}
                  placeholder="Select a team"
                />

                <ProjectHeaderSelect
                  name="Artifact:"
                  value={artifactActiveId}
                  options={artifactSelectOptions}
                  onChange={setArtifactActiveId}
                  isDisabled={isLoading}
                  placeholder="Select an artifact"
                />

                <ProjectHeaderSelect
                  name="Version:"
                  value={versionActiveId}
                  options={versionSelectOptions}
                  onChange={setVersionActiveId}
                  isDisabled={isLoading}
                  placeholder="Default version"
                />

                <div>
                  <a
                    onClick={() =>
                      isChangelogPage
                        ? navigateToPreviewerPage()
                        : navigateToChangelogPage()
                    }
                    href="#"
                    aria-disabled={isLoading}
                    className="mr-4 underline"
                  >
                    {isChangelogPage ? "Back" : "Changelog"}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
