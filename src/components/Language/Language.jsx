import { useState } from "react";

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const handleChange = (e) => {
        setSelectedLanguage(e.target.value);
        // Save preference to backend or localStorage
    };

    return (
        <div className="border-2 border-stone-500 rounded-lg absolute">
            <select
                value={selectedLanguage}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
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