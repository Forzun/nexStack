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

export function useWebsite() {
    const [websites, setWebsites] = useState<WebsiteInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const createWebsite = async(url: string) => { 
        try{ 
            const response = await axios.post("http://localhost:3000/create/website" , { 
                url: url
            }, { 
                headers: { 
                    Authorization: token
                }
            })
            
            const website = response.data.website

            if(!website){
                return console.log("website creation faild");
            }

            setWebsites(prev => [...prev , website])
            console.log(response.data.website)
        }catch(error){
            console.error(error)
        }
    }

    const singleWebsite = async(id: string) => { 
        try{ 
            const response = await axios.get(`${process.env.BACKEND_URL}/${id}` , { 
                headers: { 
                    Authorization: token
                }
            })       

            const data = response.data.webstie; 
            if(!data){
                return console.log("error while fetching single website", data , websites)
            } 

            setWebsites(data)
        }catch(error){
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
        
        
        let active:boolean;
        response.data.data.map((website: ResponseDate) => { 

            const latestTick = website.tick?.[0];

            if(latestTick?.status === "UNKNOWN" || !latestTick){
                active = false
            }else{
                active = true
            }

            const dateOnly = isoString(String(website.time_added))
            const lastCheck = timeAgo(String(latestTick?.createdAt))

            setWebsites(prev => [...prev , { 
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

    useEffect(() => {
        void getAllWebsite();
    }, []);

    return {
        websites,
        loading,
        singleWebsite, 
        createWebsite
    };
}

