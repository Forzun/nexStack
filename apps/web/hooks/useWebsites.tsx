import { WebsiteInfo } from "@/components/table/columns";
import { isoString, timeAgo } from "@/utils/time-ago";
import axios from "axios";
import { cache, useEffect, useEffectEvent, useState } from "react";

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

export function useWebsite() {
    const [websites, setWebsites] = useState<WebsiteInfo[]>([]);
    const [chartData, setChartData] = useState<WebsiteChartData[]>([
        { date: "2026-03-08", max: 180, min: 80 },
        { date: "2026-03-09", max: 220, min: 110 },
        { date: "2026-03-10", max: 195, min: 90 },
        { date: "2026-03-11", max: 240, min: 130 },
        { date: "2026-03-12", max: 170, min: 75 },
        { date: "2026-03-13", max: 260, min: 140 },
        { date: "2026-03-14", max: 210, min: 100 },
        { date: "2026-03-15", max: 500, min: 120 },
    ]);
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

            const website = response.data.website

            if (!website) {
                return console.log("website creation faild");
            }

            setWebsites(prev => [...prev, website])
            console.log(response.data.website)
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


            let active: boolean;
            response.data.data.map((website: ResponseDate) => {

                const latestTick = website.tick?.[0];

                if (latestTick?.status === "UNKNOWN" || !latestTick) {
                    active = false
                } else {
                    active = true
                }

                const dateOnly = isoString(String(website.time_added))
                const lastCheck = timeAgo(String(latestTick?.createdAt))

                setWebsites(prev => [...prev, {
                    id: website.id,
                    name: website.url,
                    createAt: dateOnly,
                    active: active ?? false,
                    status: latestTick?.status ?? "UNKNOWN",
                    response: String(latestTick?.response_time ?? "0"),
                    lastCheck: lastCheck
                }])
            })
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
            console.log(response.data.matrics)
            setChartData(response.data.matrics)
        } catch (error) {
            console.error(error)
        }
    })

    useEffect(() => {
        void getAllWebsite();
        // void getWebsiteMatrics();
    }, []);

    return {
        websites,
        loading,
        chartData,
        singleWebsite,
        createWebsite
    };
}

