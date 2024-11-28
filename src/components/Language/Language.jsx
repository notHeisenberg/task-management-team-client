import { useState } from "react";

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const handleChange = (e) => {
        setSelectedLanguage(e.target.value);
        // Save preference to backend or localStorage
    };

    return (
        <div className="border dark:border-stone-200 rounded-lg absolute">
            <select
                value={selectedLanguage}
                onChange={handleChange}
                className="backdrop-blur-lg dark:text-gray-800 rounded-lg px-4 py-2 text-sm outline-none"
            >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
            </select>
        </div>
    );
};

export default Language;