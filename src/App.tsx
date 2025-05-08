import { Link } from "react-router";
import Nav from "./components/Nav.tsx";
import Hero from "./components/Hero.tsx";

function App() {
  return (
    <div className="bg-[#121111]">
      {/* <div className="bg-[url(./assets/images/bg-test.jpg)] bg-cover bg-no-repeat bg-center h-screen -z-1 fixed inset-0 before:content-[''] before:inset-0 before:absolute before:bg-black before:opacity-40"></div> */}
      <Nav />
      <main className="container flex flex-col justify-between h-[calc(100vh-104px)] pb-[40px]">
        <Hero />
        <div className="flex justify-between items-end">
          <div className="w-[355px] backdrop-blur-sm rounded-[16px] p-[16px]">
            <h2 className="text-white relative text-md font-secondary before:content-[''] before:w-[7px] before:h-[7px] before:absolute before:bg-light-gray before:rounded-full before:right-[calc(100%+11px)] before:top-1/2 before:-translate-y-1/2 ml-[11px]">
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
