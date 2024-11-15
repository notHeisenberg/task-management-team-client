
const CoreFeatures = () => {
    
    return (
        <div className="elementor-element elementor-element-49b1717 headerLight e-flex e-con-boxed e-con e-parent e-lazyloaded">
            <div className="e-con-inner">
                <div className="elementor-element elementor-element-e040644 e-flex e-con-boxed e-con e-child" >
                    <div className="e-con-inner text-center">
                        <div className="elementor-element elementor-element-745641b noMargin elementor-widget elementor-widget-heading" >
                            <div className="elementor-widget-container text-4xl text-white font-semibold">
                                <h2 className="elementor-heading-title elementor-size-default"><span className="gradiantText text-pink-400">Project views</span> that work for you</h2>
                            </div>
                        </div>
                        <div className="elementor-element elementor-element-a3b1b86 elementor-widget__width-initial elementor-widget elementor-widget-text-editor">
                            <div className="elementor-widget-container text-gray-300 text-sm">
                                <div data-slate-type="paragraph">Visualize your projects and tasks in the way that works best for you.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-white container mx-auto">
                    <div className="slick-list draggable">
                        <div className="slick-track" style={{ opacity: 1, width: '1224px', transform: 'translate3d(0px, 0px, 0px)' }}>
                            <div className="elementor-element elementor-element-9c94c8d e-con-full pvTab active e-flex e-con e-child slick-slide slick-current slick-active">
                                <div className="elementor-element elementor-element-6fa2bb4 e-con-full pvTabImage e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-105387c elementor-widget elementor-widget-image">
                                        <div className="elementor-widget-container">
                                            <img loading="lazy" decoding="async" width="32" height="32" src="https://hive.com/wp-content/uploads/2024/08/Kanban.svg" className="attachment-large size-large wp-image-150151" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="elementor-element elementor-element-a98445a elementor-widget elementor-widget-text-editor">
                                    <p>Kanban</p>
                                </div>
                            </div>
                            {/* Repeat similar structure for other tabs */}
                        </div>
                    </div>
                </div>
                <div className="elementor-element">
                    <div className="widget widget-image flex justify-center">
                        <img loading="lazy" decoding="async" src="https://hive.com/wp-content/uploads/2024/08/MAV-9-scaled.webp" className="max-w-screen-md" alt="" />
                    </div>
                </div>
                {/* Repeat similar structure for other tab contents */}
            </div>
        </div>
    );
};

export default CoreFeatures;