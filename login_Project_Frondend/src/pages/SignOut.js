import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"



const SignOut =()=>{
    const {signOut} = useContext(AuthContext)
    const nav = useNavigate()
    useEffect(()=>{
        signOut()
        nav('/signin')
    },[])
    return(
        <></>
        )
}
export default SignOut