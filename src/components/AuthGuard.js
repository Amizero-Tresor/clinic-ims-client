import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function AuthGuard({children}){
    const router = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(!user && !token){
            router("/")
        }
    },[router])
    return children
}