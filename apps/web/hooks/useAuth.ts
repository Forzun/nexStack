import axios from "axios";
import { useState } from "react"


export function useAuth(){
    const [user , setUser] = useState(null);
    const [loading  ,setLoading] = useState(true);

    const Signup = async(email: string , password: string) => { 
        try{ 
            const data = await axios.post("http://localhost:3000/user/signup" , { 
                username: email, 
                password: password
            },);
            setUser(data.data)
        }catch(error){
            console.error(error)
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
        Login
    } 
}



    