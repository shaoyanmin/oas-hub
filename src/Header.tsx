export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-2 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-6 w-6 mr-3" />
        </div>

        <div className="flex items-center space-x-4">
          <select className="border rounded px-2 py-1 text-sm">
            <option value="">Select OAS File</option>
            <option value="swagger1">swagger1.yaml</option>
            <option value="swagger2">swagger2.yaml</option>
          </select>

          <select className="border rounded px-2 py-1 text-sm">
            <option value="">Select Version</option>
            <option value="v1">v1.0.0</option>
            <option value="v2">v2.0.0</option>
          </select>
        </div>
      </div>
    </header>
  );
};
