import ChangeBackground from "@/components/ChangeBackground/ChangeBackground";
import ChangePassword from "@/components/ChnagePassword/ChangePassword";
import Language from "@/components/Language/Language";
import Profile from "@/components/Profile/Profile";
import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "password":
        return <ChangePassword />;
      case "background":
        return <ChangeBackground />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top-right controls */}
        <div className="flex justify-end items-center mb-8 space-x-4">
          <Language />
        </div>

        {/* Glassmorphism card */}
        <div className="backdrop-blur-lg bg-black/40 rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Tabs for main settings */}
          <div
            className="flex overflow-x-auto space-x-4 mb-6 scrollbar-hide"
            style={{
              scrollbarWidth: "none", // Firefox
            }}
          >
            {["profile", "password", "background"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white/20 text-white"
                    : "bg-transparent text-black hover:bg-slate-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;