import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const TopFooterSection = ({ sectionHeading, sectionList }) => {

    return (
        <div className="w-full md:w-2/6 lg:w-1/6">
            <h4 className="text-pink-400 font-bold pb-3">{sectionHeading}</h4>
            <div className="pb-10">
                <ul className="text-gray-200 flex flex-col gap-3">
                    {
                        sectionList?.map((item, ind) => <li key={ind}> <NavLink to={item}>{item}</NavLink> </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default TopFooterSection;

// prop-types validation
TopFooterSection.propTypes = {
    sectionHeading: PropTypes.string,
    sectionList: PropTypes.array,
};