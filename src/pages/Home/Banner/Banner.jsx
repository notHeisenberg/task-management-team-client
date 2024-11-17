import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import { Link } from "react-router-dom";
import banner from '../../../assets/banner/banner01.png';
// import banner2x from '../../../assets/banner/Homepage-hero@2x.webp';

const Banner = () => {
    return (
        <div className=" pt-[140px]">
            <Container>
                <div className="space-y-4 text-center">
                    {/* Responsive heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white max-w-xs sm:max-w-lg lg:max-w-full mx-auto">
                        Project management on your terms,
                    </h1>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-red-300 max-w-xs sm:max-w-lg lg:max-w-full mx-auto">
                        #successguaranteed
                    </h1>
                    <p className="text-sm sm:text-base text-white">
                        Best product. Best price. Best partner.
                    </p>
                </div>

                {/* Button component centered */}
                <div className="flex justify-center my-6">
                    <Link to={'/auth'}>
                        <Button text="Get Started" />
                    </Link>
                </div>

                {/* Responsive banner images */}
                <div className="flex justify-center">
                    {/* Image for small screens */}
                    <img 
                        src={banner} 
                        alt="banner image" 
                        className="block sm:hidden w-full max-w-screen-lg" 
                    />
                    {/* Image for medium and larger screens */}
                    {/* <img 
                        src={banner2x} 
                        alt="banner image" 
                        className="hidden sm:block w-full max-w-screen-lg" 
                    /> */}
                </div>
            </Container>
        </div>
    );
};

export default Banner;