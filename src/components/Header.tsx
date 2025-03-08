import { useAtom } from "jotai";
import { swaggerPreviewerIsLoadingAtom } from "../atoms/swaggerPreviewerAtom";

import {
  projectActiveIdAtom,
  projectSelectOptionsAtom,
} from "../atoms/projectAtom";

export const Header = () => {
  const [projectActiveId, setProjectActiveId] = useAtom(projectActiveIdAtom);
  const [projectSelectOptions] = useAtom(projectSelectOptionsAtom);
  const [isLoading] = useAtom(swaggerPreviewerIsLoadingAtom);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-2 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-6 w-6 mr-3" />
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="project" className="mr-4">
              Project
            </label>
            <select
              id="project"
              className="border rounded px-2 py-1 text-sm"
              value={projectActiveId ?? ""}
              onChange={(e) => setProjectActiveId(e.target.value ?? null)}
              disabled={isLoading}
            >
              <option value="" disabled>
                Select OAS File
              </option>
              {projectSelectOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="version" className="ml-2 mr-4">
              Version
            </label>
            <select
              id="version"
              className="border rounded px-2 py-1 mr-4 text-sm"
              disabled={isLoading}
            >
              <option value="">Select Version</option>
              <option value="v1">v1.0.0</option>
              <option value="v2">v2.0.0</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
