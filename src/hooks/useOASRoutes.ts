import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";

/**
 * Sync UI states to URL params for pages under path `/oas/*`
 * and export some helper functions
 */
export function useOASRoutes({
  teamId,
  artifactId,
  versionId,
}: {
  teamId: string | null;
  artifactId: string | null;
  versionId: string | null;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    teamId: urlTeamId,
    artifactId: urlArtifactId,
    version: urlVersionId,
  } = useParams();

  const isChangelogPage =
    location.pathname.startsWith("/oas") &&
    location.pathname.includes("changelog");
  const isUploaderPage =
    location.pathname.startsWith("/oas") &&
    location.pathname.includes("uploader");
  const isPreviewerPage =
    location.pathname.startsWith("/oas") && !isChangelogPage && !isUploaderPage;

  const changelogPageUrl = `/oas/${teamId}/${artifactId}/${versionId}/changelog`;
  const previewerPageUrl = `/oas/${teamId}/${artifactId}/${versionId}`;

  // Sync states to URL params
  useEffect(() => {
    if (
      !(isChangelogPage || isPreviewerPage) ||
      !teamId ||
      !artifactId ||
      !versionId
    ) {
      return;
    }

    if (
      teamId === urlTeamId &&
      artifactId === urlArtifactId &&
      versionId === urlVersionId
    ) {
      return;
    }

    if (isChangelogPage) {
      navigate(`${changelogPageUrl}${location.search}${location.hash}`);
    } else if (isPreviewerPage) {
      navigate(`${previewerPageUrl}${location.search}${location.hash}`);
    }
  }, [
    teamId,
    artifactId,
    versionId,
    urlTeamId,
    urlArtifactId,
    urlVersionId,
    navigate,
    isChangelogPage,
    isPreviewerPage,
    isUploaderPage,
    changelogPageUrl,
    previewerPageUrl,
    location,
  ]);

  function navigateToChangelogPage() {
    if (teamId && artifactId && versionId) navigate(changelogPageUrl);
  }

  function navigateToPreviewerPage() {
    if (teamId && artifactId && versionId) navigate(previewerPageUrl);
  }

  const defaultPreviewerPageUrl =
    teamId && artifactId && versionId
      ? `/oas/${teamId}/${artifactId}/${versionId}`
      : null;

  function navigateToHomePage() {
    navigate("/");
  }

  function navigateToUploaderPage() {
    navigate("/oas/uploader");
  }

  return {
    isChangelogPage,
    isPreviewerPage,
    isUploaderPage,
    defaultPreviewerPageUrl,
    navigateToChangelogPage,
    navigateToPreviewerPage,
    navigateToUploaderPage,
    navigateToHomePage,
  };
}
