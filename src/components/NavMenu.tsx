import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import AnimatedLink from "./AnimatedLink";

const NavMenu = ({ open }: { open: boolean }) => {
  const testRef = useRef<HTMLUListElement>(null);
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Works", path: "/works" },
    { name: "Contact", path: "/contact" },
  ];
  const subLinks = [
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/in/graphisteind%C3%A9pendant/",
    },
    { name: "Github", path: "https://github.com/AnthonyCollette" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          exit={{ opacity: 0, x: "100vw" }}
          className="fixed inset-0 h-screen backdrop-blur-md"
        >
          <div className="container pt-60 pb-16 flex justify-between">
            <ul ref={testRef} className="flex flex-col">
              {links.map((link, index) => (
                <li className="flex items-center overflow-hidden font-primary text-9xl w-fit text-white tracking-[-0.25px] before:content-[''] before:h-[10px] before:bg-white before:w-[0px] before:inline-block hover:before:w-[75px] before:duration-300 hover:before:mr-10">
                  <Link to={link.path}>
                    <AnimatedLink
                      link={link.name}
                      key={link.name}
                      delay={index * 0.3 + 0.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col mr-[350px]">
              <ul className="flex flex-col gap-[24px] mb-[155px] overflow-hidden">
                {subLinks.map((link) => (
                  <li
                    key={link.name}
                    className="font-secondary text-md text-white lowercase origin-top"
                  >
                    <Link
                      to={link.path}
                      className="flex items-center justify-between"
                    >
                      {link.name}
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.456 3.16165L1.35906 3.16165L1.35908 0.500023L16 0.5L16 15.1409L13.3384 15.1409L13.3384 5.044L1.88235 16.5L0 14.6176L11.456 3.16165Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <p className="font-secondary text-white text-md">email</p>
                <a
                  href="mailto:contactpro@anthonycollette.fr"
                  className="font-secondary text-white text-lg underline"
                >
                  contactpro@anthonycollette.fr
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
