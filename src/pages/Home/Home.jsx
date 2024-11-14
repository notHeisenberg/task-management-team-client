import Banner from "./Banner/Banner";
import NavBar from "./HomeComponents/Navbar/NavBar";


const Home = () => {
    return (
        <div className="bg-hero-pattern">
            <div className="">
                <NavBar />
                <Banner />
            </div>
        </div>
    );
};

export default Home;