import "./App.css";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectPreviewer } from "./components/ProjectPreviewer";
import { ProjectChangelog } from "./components/ProjectChangelog";
import { InitializingPage } from "./components/InitializingPage";
import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="oas" element={<ProjectHeader />}>
          <Route
            path=":teamId/:artifactId/changelog"
            element={<ProjectChangelog />}
          />
          <Route
            path=":teamId/:artifactId/:version"
            element={<ProjectPreviewer />}
          />
        </Route>
        <Route path="*" element={<InitializingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
