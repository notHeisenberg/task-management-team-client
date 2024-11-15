import { useState } from 'react';

const tabs = [
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/Kanban.svg",
        imgAlt: "Kanban",
        text: "Kanban",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-9-2048x1108.webp",
    },
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/Gantt.svg",
        imgAlt: "Gantt",
        text: "Gantt",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-1-2-1536x831.webp",
    },
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/list-timeline-light-1.svg",
        imgAlt: "Timeline",
        text: "Timeline",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-2-2-1600x866.webp",
    },
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/Table.svg",
        imgAlt: "Table",
        text: "Table",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-3-2-1600x866.webp",
    },
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/list-ul-regular-1.svg",
        imgAlt: "List",
        text: "List",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-6-1-2048x1108.webp",
    },
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/calendarLight.svg",
        imgAlt: "Calendar",
        text: "Calendar",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-4-1-scaled.webp",
    },
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/bars-progress-solid-1.svg",
        imgAlt: "Portfolio",
        text: "Portfolio",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-5-1-1600x866.webp",
    },
    {
        imgSrc: "https://hive.com/wp-content/uploads/2024/08/bars-progress-solid-1.svg",
        imgAlt: "Progress",
        text: "Progress",
        widgetImgSrc: "https://hive.com/wp-content/uploads/2024/08/MAV-8-1-1600x866.webp",
    }
];

const CoreFeatures = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="elementor-element elementor-element-49b1717 headerLight e-flex e-con-boxed e-con e-parent e-lazyloaded">
            <div className="e-con-inner">
                <div className="elementor-element elementor-element-e040644 e-flex e-con-boxed e-con e-child">
                    <div className="e-con-inner text-center">
                        <div className="elementor-element elementor-element-745641b noMargin elementor-widget elementor-widget-heading">
                            <div className="elementor-widget-container text-4xl text-white font-semibold">
                                <h2 className="elementor-heading-title elementor-size-default">
                                    <span className="gradiantText text-pink-400">Project views</span> that work for you
                                </h2>
                            </div>
                        </div>
                        <div className="elementor-element elementor-element-a3b1b86 elementor-widget__width-initial elementor-widget elementor-widget-text-editor">
                            <div className="elementor-widget-container text-gray-300 text-sm">
                                <div data-slate-type="paragraph">
                                    Visualize your projects and tasks in the way that works best for you.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto text-white text-center my-10 px-10">
                    <div
                        className="flex justify-around items-center lg:flex-wrap overflow-x-auto gap-2  scrollbar-hide"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer space-y-1 flex-none w-[30%] md:w-[23%] lg:w-auto`}
                                style={{ scrollSnapAlign: 'start' }}
                                onClick={() => setActiveTab(index)}
                            >
                                <div className={`elementor-widget-img flex flex-col justify-center items-center rounded-xl hover:scale-90 transition-all duration-300 ease-in-out border-transparent p-3 md:p-0
                                ${activeTab === index ? 'bg-[#a55eff]' : 'bg-[#1d1e1f] hover:border hover:border-[#a55eff]'}`}>
                                    <img
                                        loading="lazy"
                                        decoding="async"
                                        src={tab.imgSrc}
                                        className="m-4 w-8 h-8"
                                        alt={tab.imgAlt}
                                    />
                                </div>
                                <div className="elementor-widget-text-editor text-xs">
                                    <p>{tab.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="elementor-element max-w-full">
                    <div className="widget widget-image container mx-auto mb-20 p-3 flex justify-center">
                        <img
                            key={activeTab}
                            loading="lazy"
                            decoding="async"
                            src={tabs[activeTab].widgetImgSrc}
                            className="max-w-screen lg:max-w-4xl"
                            alt={tabs[activeTab].imgAlt}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreFeatures;