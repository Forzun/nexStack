
import { WebsiteInfo } from "@/components/table/columns";
import { isoString, timeAgo } from "@/utils/time-ago";
import axios from "axios";
import { useEffect, useEffectEvent, useState } from "react";

interface ResponseDate {
    id: string;
    url: string;
    time_added: Date;
    user_id: string;
    tick?: {
        id: string;
    createdAt: Date;
        response_time: number;
        status: "UP" | "DOWN" | "UNKNOWN";
    }[];
}

interface WebsiteChartData {
    date: string;
    max: number;
    min: number
}

interface StatusCard { 
    websites: number;
    upTime: number;
    inActive: number;
    avgResponse: number
}

export function useWebsite() {
    const [websites, setWebsites] = useState<WebsiteInfo[]>([]);
    const [dashboardStatus , setDashboardStatus] = useState<StatusCard>({ 
        websites: 0,
        upTime: 0,
        inActive: 0,
        avgResponse: 0
    }) 
    const [chartData, setChartData] = useState<WebsiteChartData[]>([]);
    const [loading, setLoading] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const createWebsite = async (url: string) => {
        try {
            const response = await axios.post("http://localhost:3000/create/website", {
                url: url
            }, {
                headers: {
                    Authorization: token
                }
            })

            const website = response.data
            if (!website) {
                return console.log("website creation faild");
            }
            setWebsites(prev => [...prev, website])
            return true; 
        } catch (error) {
            console.error(error)
        }
    }
    const singleWebsite = async (id: string) => {
        try {
            const response = await axios.get(`${process.env.BACKEND_URL}/${id}`, {
                headers: {
                    Authorization: token
                }
            })

            const data = response.data.webstie;
            if (!data) {
                return console.log("error while fetching single website", data, websites)
            }

            setWebsites(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getAllWebsite = useEffectEvent(async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/websites", {
                headers: {
                    Authorization: token,
                },
            });

            if(!response){ 
                return;
            }

            let active: boolean = true 
            const formatted = response.data.data.map((website: ResponseDate) => {

                const latestTick = website.tick?.[0];
                    if (latestTick?.status == "UNKNOWN" || !latestTick) {
                        active = false
                    }
    
                    const dateOnly = isoString(String(website.time_added))
                    const lastCheck = timeAgo(String(latestTick?.createdAt))
    
                    return {
                        id: website.id,
                        name: website.url,
                        createAt: dateOnly,
                        active: active,
                        status: latestTick?.status ?? "UNKNOWN",
                        response: String(latestTick?.response_time ?? "0"),
                        lastCheck: lastCheck
                    }
            })

            setWebsites(formatted)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    });

    const getWebsiteMatrics = useEffectEvent(async () => {
        try {
            const response = await axios.get('http://localhost:3000/websites/matrics', {
                headers: {
                    Authorization: token,
                }
            })

            if (!response) {
                console.log("something wrong with matrics route")
            }
            setChartData(
                response.data.matrics.map((m: {
                    date: string, 
                    max_ms: number, 
                    min_ms: number
                }) => ({ 
                    date: m.date,
                    max: m.max_ms,
                    min: m.min_ms,
                }))
            )
        } catch (error) {
            console.error(error)
        }
    })

    const getDashboardStatus = useEffectEvent(async () => { 
        try{ 
            const websitesStatus = await axios.get("http://localhost:3000/dashboard/status", 
                {
                    headers:{ 
                        Authorization: token
                    }
                }
            );

            if(!websitesStatus){
                console.error("dashboard data in not loaded yet", websitesStatus);
            }
            setDashboardStatus({
                websites: websitesStatus.data.website,
                upTime: websitesStatus.data.upTime, 
                avgResponse: websitesStatus.data.avgResponse, 
                inActive: websitesStatus.data.inActive
            })
        }catch(error){
            console.error(error)
        }
    })

    useEffect(() => {
        void getAllWebsite();
        void getWebsiteMatrics();
        void getDashboardStatus();
    }, []);

    return {
        websites,
        loading,
        chartData,
        dashboardStatus,
        singleWebsite,
        createWebsite
    };
}

