import yaml from "js-yaml";
import { useState, useCallback } from "react";
import { RedocStandalone } from "redoc";

export const ProjectUploader = () => {
  const [spec, setSpec] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setError(null);
        const text = await file.text();
        const spec = yaml.load(text);
        setSpec(spec as object);
      } catch (err) {
        console.error(err);
        setError(
          "Failed to parse the YAML file. Please ensure it's a valid OpenAPI/Swagger specification.",
        );
        setSpec(null);
      }
    },
    [],
  );

  return (
    <div>
      {spec ? (
        <RedocStandalone
          spec={spec}
          options={{
            nativeScrollbars: true,
            theme: { colors: { primary: { main: "#1e88e5" } } },
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-left">
            <div className="text-2xl font-bold mb-4">
              <label htmlFor="file-upload">Upload File: </label>
              <input
                id="file-upload"
                type="file"
                accept=".yaml,.yml"
                onChange={handleFileUpload}
                className="cursor-pointer underline"
                style={{ marginBottom: "20px" }}
              />
            </div>
            {error ? (
              <div className="text-red-400">{error}</div>
            ) : (
              <div className="text-gray-500">
                Upload a OpenAPI spec file to preview.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
