import Bio from "./Bio.home";
import HeatMap from "./HeatMap";

const MainHomePage = () => {
  return (
    <>
      <main id="main-content" className="max-w-2xl px-5 sm:px-12 md:px-2 mx-auto">
        <Bio />
        <HeatMap />
      </main>
    </>
  );
};

export default MainHomePage;
