import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
// import Login from '../Pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import Manufacturer from '../Pages/Manufacturer'
import Producer from '../Pages/Producer'
import PrivateRoute from './PrivateRoute'
import MyOrder from '../Pages/MyOrder'

const Allroutes = () => {
 const role = useSelector((store)=>store.role)
  // console.log(role)
  const dispatch = useDispatch()

  return (
 <Routes>
    <Route path="/" element={<Signup/>}  />
   {role=="Manufacturer" && <Route path="/Manufacturer" element={ <PrivateRoute> <Manufacturer/> </PrivateRoute> }   /> }
   {role=="Transporter" && <Route path="/Manufacturer" element={ <PrivateRoute> <Producer/> </PrivateRoute>}  /> }
   <Route path="/Manufacturer" element={ <PrivateRoute> <Producer/> </PrivateRoute>}  /> 
   <Route path="/MyOrder/:id" element={<MyOrder/>}  />


 </Routes>
  )
}

export default Allroutes
