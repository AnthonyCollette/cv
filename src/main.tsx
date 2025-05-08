import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Works from "./views/Works.tsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

// eslint-disable-next-line react-refresh/only-export-components
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              className="w-full h-screen overflow-hidden bg-black"
              initial={{ y: "0", borderRadius: "0" }}
              animate={{ y: "0", borderRadius: "0" }}
              exit={{ y: "100%", borderRadius: "100% 100% 0 0" }}
              transition={{
                y: { duration: 0.6, ease: "easeInOut" },
                borderRadius: { duration: 0.6, ease: "easeInOut", delay: 0.3 },
              }}
            >
              <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <App />
              </motion.div>
            </motion.div>
          }
        />
        <Route
          path="/works"
          element={
            <motion.div
              className="bg-[#b8b8b8] w-full h-screen overflow-hidden"
              initial={{ y: "100%", borderRadius: "100% 100% 0 0" }}
              animate={{ y: "0", borderRadius: "0" }}
              transition={{
                y: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
                borderRadius: {
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
            >
              <motion.div
                className="bg-[#656565]"
                initial={{ y: "100%", borderRadius: "100% 100% 0 0" }}
                animate={{ y: "0", borderRadius: "0" }}
                exit={{ y: "100%", borderRadius: "100% 100% 0 0" }}
                transition={{
                  y: { duration: 0.6, ease: "easeInOut", delay: 0.4 },
                  borderRadius: {
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.7,
                  },
                }}
              >
                <motion.div
                  className="w-full h-screen bg-black"
                  initial={{ y: "100%", borderRadius: "100% 100% 0 0" }}
                  animate={{ y: "0", borderRadius: "0" }}
                  exit={{ y: "100%", borderRadius: "100% 100% 0 0" }}
                  transition={{
                    y: { duration: 0.6, ease: "easeInOut", delay: 0.6 },
                    borderRadius: {
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.9,
                    },
                  }}
                >
                  <Works />
                </motion.div>
              </motion.div>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
