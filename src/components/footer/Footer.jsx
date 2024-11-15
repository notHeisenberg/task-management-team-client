import { NavLink } from "react-router-dom";
import Container from "../shared/Container";
import TopFooterSection from "./TopFooterSection";


const Footer = () => {
    const company = ["About", "Contact", "Press", "Careers", "Ambassadors", "Partner Program", "Accessibility"];
    const features = ["About", "Contact", "Press", "Careers", "Ambassadors", "Partner Program", "Accessibility"];
    const resources = ["About", "Contact", "Press", "Careers", "Ambassadors", "Partner Program", "Accessibility"];
    const compare = ["About", "Contact", "Press", "Careers", "Ambassadors", "Partner Program", "Accessibility"];
    return (
        <div className="bg-primary shadow py-5">
            <Container>
                <div className="pb-5 pt-14 flex gap-5">
                    <div className="w-full md:w-4/6 lg:w-2/6">
                        <div className="pb-10">
                            <NavLink>
                                <h4 className="text-4xl font-bold text-gray-200">Airtable</h4>
                            </NavLink>
                        </div>
                        <div>
                            <ul className="flex gap-5 items-center text-gray-200">
                                <li> <NavLink>Facebook</NavLink> </li>
                                <li> <NavLink>Twitter</NavLink> </li>
                                <li> <NavLink>LinkedIn</NavLink> </li>
                            </ul>
                        </div>
                    </div>

                    <TopFooterSection sectionList={company} sectionHeading="Company" />
                    <TopFooterSection sectionList={features} sectionHeading="Features" />
                    <TopFooterSection sectionList={resources} sectionHeading="Resources" />
                    <TopFooterSection sectionList={compare} sectionHeading="Compare" />

                </div>
                <div className="flex justify-between items-center border-t-2 border-gray-400 pt-5 px-5">
                    <p className="text-gray-200">&copy; {new Date().getFullYear()} All rights reserved</p>
                    <div>
                        <ul className="text-gray-300 flex gap-5 items-center justify-between">
                            <li> <NavLink>Terms of Service</NavLink> </li>
                            <li> <NavLink>Privacy Policy</NavLink> </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;