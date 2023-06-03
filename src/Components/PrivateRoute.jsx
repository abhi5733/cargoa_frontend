import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate,Navigate} from "react-router-dom"
const PrivateRoute = ({children}) => {
    const navigate = useNavigate()
   const auths = useSelector((store)=>store.isauth)


   if(auths){
    return children
   }else{
    return <Navigate to="/"/> 
   }




}

export default PrivateRoute
