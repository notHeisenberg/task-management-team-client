

import PropTypes from 'prop-types';

const Button = ({ text }) => {
    return (
        <div>
            <button className="text-white font-semibold py-3 px-4 rounded  hover:opacity-90 transition-opacity" style={{
                                background: "linear-gradient(to right, #ec4899, #3b82f6)",
                            }}>
                <span className=''>{text}</span>
            </button>
        </div>
    );
};
// props-type validation
Button.propTypes = {
    text: PropTypes.string
};
export default Button;