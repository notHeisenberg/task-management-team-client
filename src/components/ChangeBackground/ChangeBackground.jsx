import { useState } from "react";

const ChangeBackground = () => {
  const [background, setBackground] = useState("");

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
    // Save to backend or apply as inline style
  };

  return (
    <div className="space-y-6">
      <label className="block text-white text-sm font-medium mb-2">
        Background Image URL:
      </label>
      <input
        type="text"
        value={background}
        onChange={handleBackgroundChange}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
        placeholder="Enter image URL"
      />
      <div
        style={{
          blockSize: "200px",
          background: `url(${background}) no-repeat center/cover`,
        }}
        className="w-full border border-white/10 rounded-lg"
      >
        <p className="text-center text-white pt-8">
          Preview your background here.
        </p>
      </div>
    </div>
  );
};

export default ChangeBackground;