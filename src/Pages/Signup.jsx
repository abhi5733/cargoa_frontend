import { Box, Button, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack , useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useSelector,useDispatch } from 'react-redux'
import { TransporterFunction, manufacturerFunction, signupFunction } from '../redux/action'

const Signup = () => {
const navigate = useNavigate()
  // const auths = useSelector((store)=>store.isauth)
  // console.log(auths)
  const dispatch = useDispatch()
  const toast = useToast()
  const initialState={name:"",email:"",number:"",role:""}
  const initialState1={email:"",number:""}

    const [state,setState] = useState(initialState)
    const [state1,setState1] = useState(initialState1)


    const handleSubmit=(e)=>{



e.preventDefault()
axios.post("https://barracuda-beanie.cyclic.app/user/signup",state).then((res)=> { toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          position: 'top',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })  }
).catch((err)=>{console.log(err.response.status);{err.response.status==400?toast({
  title: 'user Already registered.',

  position: 'top',
  status: 'error',
  duration: 2000,
  isClosable: true,
}):toast({
  title: 'Account created.',
  description: "We've created your account for you.",
  position: 'top',
  status: 'success',
  duration: 2000,
  isClosable: true,
})}})

console.log(state)

    }



    const handleChange=(e)=>{

        setState({...state,[e.target.name]:e.target.value})
      
    }

    const handleSubmit1=(e)=>{

        e.preventDefault()

   axios.post("https://barracuda-beanie.cyclic.app/user/login",state1).then((res)=>  {
      toast({
    title: 'login sucessfull.',
    position: 'top',
    status: 'success',
    duration: 2000,
    isClosable: true,
  }) ; localStorage.setItem("cargo" , res.data.token )  ; dispatch(signupFunction());res.data.roles=="Manufacturer"?dispatch(manufacturerFunction()):dispatch(TransporterFunction());
  res.data.roles=="Manufacturer"?navigate("/Manufacturer"):navigate("/Manufacturer") }
).catch((err)=>toast({
  title: 'Invalid Credentials',

  position: 'top',
  status: 'error',
  duration: 2000,
  isClosable: true,
}))

}
        
    const handleChange1=(e)=>{
        
    setState1({...state1,[e.target.name]:e.target.value})
              
            }
   

  return (
   <Box>
   <Tabs isFitted variant='enclosed'  width="500px" boxShadow="2xl" borderRadius="5px" margin="20px auto" >
  <TabList mb='1em'>
    <Tab _selected={{ color: 'white', bg: 'blue.500' }}  >Signup</Tab>
    <Tab _selected={{ color: 'white', bg: 'blue.500' }} >Login</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <VStack as="form" borderColor="black" onSubmit={handleSubmit} >

<Input type="text" name="name" onChange={(e)=>handleChange(e)} placeholder='Enter Name' required  />
<Input type="email"  name="email" onChange={(e)=>handleChange(e)} placeholder='Enter Email' required    />
<Input type="number"  name="number" onChange={(e)=>handleChange(e)} placeholder='Enter Number' required />
<Input type="password"  name="pass" onChange={(e)=>handleChange(e)} placeholder='Enter password' required />
<Select borderColor="black" placeholder='Select option' onChange={(e)=>handleChange(e)} name="role" required >
  <option value='Manufacturer'>Manufacturer</option>
  <option value=' Transporter'>Transporter</option>
</Select>
<Button bgColor="blue.500" _hover={{bgColor:"blue.400",color:"white"}} color="white" type="submit">Submit</Button>
     </VStack>
    </TabPanel>
    <TabPanel>

       <VStack as="form" borderColor="black" onSubmit={handleSubmit1}>

<Input type="email"  name="email" onChange={(e)=>handleChange1(e)} placeholder='Enter Email' required  />
<Input type="password"  name="pass" onChange={(e)=>handleChange1(e)} placeholder='Enter password' required />

<Button type="submit" bgColor="blue.500" color="white" _hover={{bgColor:"blue.400",color:"white"}}  >Submit</Button>
     </VStack>
    </TabPanel>
  </TabPanels>
</Tabs>
   </Box>
  )
}

export default Signup
