import Banner from "./Banner/Banner";
import CoreFeatures from "./CoreFeatures/CoreFeatures";
import GetStarted from "./GetStarted/GetStarted";
import NavBar from "./HomeComponents/Navbar/NavBar";
import MarqueAnimation from "./MarqueAnimation/MarqueAnimation";
import Review from "./Review/Review";


const Home = () => {
    return (
        <div className="">
            <div className="">
                <NavBar />
                <Banner />
                <MarqueAnimation />
                <CoreFeatures />
                <Review />
                <GetStarted />
            </div>
        </div>
    );
};

export default Home;