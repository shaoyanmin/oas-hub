import "./App.css";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectSwaggerFilePreviewer } from "./components/ProjectSwaggerFilePreviewer";
import { ProjectSwaggerFileChangelog } from "./components/ProjectSwaggerFileChangelog";
import { Initializing } from "./components/Initializing";
import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="oas" element={<ProjectHeader />}>
          <Route
            path=":teamId/:artifactId/:version/changelog"
            element={<ProjectSwaggerFileChangelog />}
          />
          <Route
            path=":teamId/:artifactId/:version"
            element={<ProjectSwaggerFilePreviewer />}
          />
        </Route>
        <Route path="*" element={<Initializing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
