import Nav from "./components/Nav.tsx";
import Hero from "./components/Hero.tsx";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";
import { Link } from "react-router";

function App() {
  return (
    <AnimatePresence>
      <div className="bg-black h-screen flex flex-col">
        <Nav />
        <main className="container flex flex-col justify-between pb-[40px] flex-1/2">
          <Hero />
          <div className="flex justify-between items-end">
            <motion.div
              className="w-[355px] p-[16px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h2 className="text-white relative text-md font-secondary before:content-[''] before:w-[7px] before:h-[7px] before:absolute before:bg-light-gray before:rounded-full before:right-[calc(100%+11px)] before:top-1/2 before:-translate-y-1/2 ml-[17px]">
                info
              </h2>
              <p className="text-white text-md font-secondary my-[16px] leading-[120%]">
                Combinant l'esthétique et l'utilité, je crée des interfaces
                utilisateur solides d'une manière artistique. J'aime passer du
                temps à améliorer l'esthétique des produits numériques sans
                oublier la convivialité.
              </p>
              <Link
                to="/works"
                className="text-white text-md font-secondary flex items-center group"
              >
                explore
                <div className="inline-block w-[15px] h-[2px] bg-white ml-[10px] relative duration-300 before:content-[''] before:w-[10px] before:h-[10px] before:absolute before:top-[-4px] before:left-[calc(100%-10px)] before:border-t-[2px] before:border-r-[2px] before:border-white before:rotate-45 group-hover:w-[75px]"></div>
              </Link>
            </motion.div>
            <div>
              <motion.a
                href="https://github.com/AnthonyCollette"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.9 }}
                className="text-white text-md font-secondary mr-6"
                target="_blank"
              >
                github
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/graphisteind%C3%A9pendant/"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                className="text-white text-md font-secondary"
                target="_blank"
              >
                linkedin
              </motion.a>
            </div>
          </div>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
