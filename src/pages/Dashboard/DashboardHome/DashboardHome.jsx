"use client"

import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon"
import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard/DashboardCard";


const DashboardHome = () => {
    const { user } = useAuth()
    const [res, setRes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.email) {
                try {
                    const response = await axiosCommon.get(`/channel/${user.email}`);
                    setRes(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [user?.email]);
    console.log(res)

    return (
        <div className="mb-10">
            {/* <h1>This is the Dashboard Home page</h1> */}
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            {res.length > 0 ? (
                    res.map((channel) => (
                        <DashboardCard channel={channel} key={channel._id} />
                    ))
                ) : (
                    <p>No channels found.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;