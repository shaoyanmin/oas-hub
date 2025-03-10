import { useEffect } from "react";
import { useNavigate } from "react-router";
import { projectActiveProjectSwaggerFileRoutePathAtom } from "../atoms/routeAtom";
import { useAtom } from "jotai";
import { useInitializeProjectQuery } from "../hooks/useInitializeProjectQuery";

export const InitializingPage = () => {
  const navigate = useNavigate();
  const [activeRoutePath] = useAtom(
    projectActiveProjectSwaggerFileRoutePathAtom,
  );
  const { isError } = useInitializeProjectQuery();

  useEffect(() => {
    console.log("Initializing component mounted");
    if (isError) {
      window.confirm("Failed to load initializing data, refresh to try again.");
      document.location.reload();
    } else if (activeRoutePath) {
      navigate(activeRoutePath);
    }
  }, [activeRoutePath, navigate, isError]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-2xl font-bold mb-4">Initializing...</div>
        <div className="text-gray-500">Please wait while loading data.</div>
      </div>
    </div>
  );
};
