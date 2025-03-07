import "./App.css";
import { Header } from "./Header";
import { RedocStandalone } from "redoc";

// const docUrl = new URL(
//   '../public/oas/docker-engine.v1.25.yaml',
//   import.meta.url,
// ).href;

// const docUrl = 'https://petstore3.swagger.io/api/v3/openapi.json';

// const docUrl =
// "https://api.apis.guru/v2/specs/googleapis.com/calendar/v3/openapi.yaml";

const ProjectSpecUrl = {
  a: "/oas/docker/engine/v1.25/swagger.yaml",
  b: "/oas/google/calendar/v3/swagger.yaml ",
};

const App = () => {
  return (
    <>
      <Header />
      <RedocStandalone
        specUrl={ProjectSpecUrl.a}
        options={{
          hideDownloadButton: true,
          expandResponses: "200,201",
          pathInMiddlePanel: true,
          showObjectSchemaExamples: true,
          showExtensions: true,
        }}
      />
    </>
  );
};

export default App;
