import axios, { AxiosError } from "axios";
import { useState } from "react"

interface ApiResponseError{ 
    message: string;
    status?: number;
    error?: string;
}

export function useAuth(){
    const [user , setUser] = useState();
    const [loading  ,setLoading] = useState(false);
    const [userError , setUseErorr] = useState<string | ApiResponseError>();

    const Signup = async(email: string , password: string) => { 
        setLoading(true)
        try{ 
            const data = await axios.post("http://localhost:3000/user/signup" , { 
                username: "user1@gmail.com", 
                password: "12345678"
            },);
            setUser(data.data)
            return data.data
        }catch(error: any){
            const axiosError = error as AxiosError<ApiResponseError>;
            const message = axiosError.response?.data.message;
            setUseErorr(message)
        }finally{ 
            setLoading(true)
        }
    }
    
    const Login = async(email: string , password: string) => { 
        try{   
            setLoading(true);
            const token = localStorage.getItem("token")
            const data = await axios.post("http://localhost:3000/user/signin" , { 
                username: email, 
                password: password
            },)
            if(token){
                localStorage.setItem("token", data.data.token)
                setLoading(false);
                setUser(data.data)
            }
        }catch(error){
            console.error(error)
        }
    }

    return { 
        user, 
        loading,
        Signup, 
        Login, 
        userError
    } 
}
