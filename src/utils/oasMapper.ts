export function generateOASSpecUrl(
  projectId: string,
  versionId: string,
): string {
  return `/oas/${projectId}/${versionId}/swagger.yaml`;
}
