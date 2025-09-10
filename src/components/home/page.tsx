import HomeCards from "./cards";
import HomeGraph from "./graph";

const HomePage = () => {
  return (
    <div className="space-y-8 p-6">
      <HomeCards />

      {/* Graph section */}
      <div className="w-full h-[500px]">  
        <HomeGraph />
      </div>
    </div>
  );
};

export default HomePage;
