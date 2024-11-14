import Container from "@/components/shared/Container";
import img01 from "../../../assets/banner/banner.png"
import Button from "@/components/shared/Button";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="bg-hero-pattern pt-[140px]">
            <Container>
                <div className="space-y-4">
                  {/* Responsive text size and wrapping on small screens */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white text-center max-w-xs sm:max-w-lg lg:max-w-full mx-auto">
                        Project management on your terms,
                    </h1>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-red-300 text-center max-w-xs sm:max-w-lg lg:max-w-full mx-auto">
                        #successguaranteed
                    </h1>
                    <p className="text-sm sm:text-base text-white text-center">
                        Best product. Best price. Best partner.
                    </p>
                </div>

                {/* button component */}
                <div className="flex justify-center my-6">
                <Link to={'signup'}>
                <Button text={"Get Started"}/>
                </Link>
                </div>
                {/* banner image */}
                <div className="flex justify-center">
                    <img src={img01} alt="banner image" />
                </div>
            </Container>
        </div>
    );
};

export default Banner;