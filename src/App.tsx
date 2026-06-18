import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MobileNavToggle, Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import { JavaScriptPage } from "./pages/JavaScriptPage";
import { ReactPage } from "./pages/ReactPage";
import { TypeScriptPage } from "./pages/TypeScriptPage";
import { NextJSPage } from "./pages/NextJSPage";
import { CSSPage } from "./pages/CSSPage";
import { RoleReviewerPage } from "./pages/RoleReviewerPage";
import {
  APIPage,
  CICDPage,
  DesignSystemsPage,
  GitPage,
  HTMLPage,
  PerformancePage,
  SeniorLeadPage,
  AgenticDevPage,
  TestingPage,
} from "./pages/TopicPages";
import { DEFAULT_SECTION, sectionToPath } from "./routes";
import "./App.css";

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />
      <div className="app-main">
        <header className="mobile-top-bar">
          <MobileNavToggle
            onClick={() => setMobileNavOpen((o) => !o)}
            expanded={mobileNavOpen}
          />
          <span className="mobile-top-bar-title">Frontend Reviewer</span>
          <ThemeToggle compact />
        </header>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={sectionToPath(DEFAULT_SECTION)} replace />}
          />
          <Route path="/my-role" element={<RoleReviewerPage />} />
          <Route path="/senior-lead" element={<SeniorLeadPage />} />
          <Route path="/agentic-dev" element={<AgenticDevPage />} />
          <Route path="/javascript" element={<JavaScriptPage />} />
          <Route path="/typescript" element={<TypeScriptPage />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/nextjs" element={<NextJSPage />} />
          <Route path="/css" element={<CSSPage />} />
          <Route path="/html" element={<HTMLPage />} />
          <Route path="/git" element={<GitPage />} />
          <Route path="/api" element={<APIPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/testing" element={<TestingPage />} />
          <Route path="/cicd" element={<CICDPage />} />
          <Route path="/design-systems" element={<DesignSystemsPage />} />
          <Route
            path="*"
            element={<Navigate to={sectionToPath(DEFAULT_SECTION)} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
