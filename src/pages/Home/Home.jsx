import Banner from "./Banner/Banner";
import CoreFeatures from "./CoreFeatures/CoreFeatures";
import GetStarted from "./GetStarted/GetStarted";
import NavBar from "./HomeComponents/Navbar/NavBar";


const Home = () => {
    return (
        <div className="bg-hero-pattern">
            <div className="">
                <NavBar />
                <Banner />
                <CoreFeatures />
                <GetStarted />
            </div>
        </div>
    );
};

export default Home;