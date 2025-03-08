import { useEffect } from "react";
import { useNavigate } from "react-router";
import { projectActiveRoutePathAtom } from "../atoms/projectAtom";
import { useAtom } from "jotai";

export const Initializing = () => {
  const navigate = useNavigate();
  const [activeRoutePath] = useAtom(projectActiveRoutePathAtom);
  useEffect(() => {
    console.log("Initializing component mounted");
    if (activeRoutePath) {
      navigate(activeRoutePath);
    }
  }, [activeRoutePath, navigate]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-2xl font-bold mb-4">Initializing...</div>
        <div className="text-gray-500">Please wait while loading data.</div>
      </div>
    </div>
  );
};
