import { NavLink } from "react-router-dom";
import Container from "../shared/Container";
import TopFooterSection from "./TopFooterSection";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const company = ["About", "Contact", "Press", "Careers", "Ambassadors", "Partner Program", "Accessibility"];
    const features = ["Product", "Features", "Pricing", "Integrations", "API", "Updates"];
    const resources = ["Documentation", "Guides", "Support", "FAQs", "Community", "Blog"];
    const compare = ["Compare Plans", "Alternatives", "Case Studies", "Success Stories", "Customer Reviews"];

    return (
        <div className="bg-primary shadow py-5">
            <Container>
                {/* Header Section */}
                <div className="pb-5 pt-14 gap-5 flex flex-col md:flex-row">
                    <div className="w-full md:w-4/6 lg:w-2/6 flex-grow">
                        <div className="pb-10">
                            <NavLink>
                                <h4 className="text-4xl font-bold text-gray-200">Airtable</h4>
                            </NavLink>
                        </div>
                        <div className="pb-10">
                            <ul className="flex gap-5 items-center text-gray-200">
                                <li><a href="" target="_blank"> <FaFacebook className="text-4xl font-bold text-gray-200" /> </a></li>
                                <li><a href="" target="_blank"> <FaTwitter className="text-4xl font-bold text-gray-200" /> </a></li>
                                <li><a href="" target="_blank"> <FaLinkedinIn className="text-4xl font-bold text-gray-200" /> </a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Dynamic Section Layout */}

                    <TopFooterSection sectionList={company} sectionHeading="Company" />
                    <TopFooterSection sectionList={features} sectionHeading="Features" />
                    <TopFooterSection sectionList={resources} sectionHeading="Resources" />
                    <TopFooterSection sectionList={compare} sectionHeading="Compare" />

                </div>

                {/* Footer Bottom Section */}
                <div className="flex flex-wrap justify-between items-center border-t-2 border-gray-400 pt-5 px-5">
                    <p className="text-gray-200">&copy; {new Date().getFullYear()} All rights reserved</p>
                    <div>
                        <ul className="text-gray-300 flex gap-5 items-center justify-between">
                            <li><NavLink>Terms of Service</NavLink></li>
                            <li><NavLink>Privacy Policy</NavLink></li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
