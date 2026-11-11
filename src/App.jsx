import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// The archive is only needed on /projects, so it is split out of the main bundle.
const AllProjects = lazy(() => import("./pages/AllProjects"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<AllProjects />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LazyMotion>
    </MotionConfig>
  );
}
