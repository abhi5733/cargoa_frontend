import { Box, Image ,Text} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MyOrder = () => {
    
    const[chat,setChat] = useState([])
const params = useParams()
const [load,setLoad] = useState(false)  
// console.log(params)
useEffect(()=>{
  setLoad(true)
axios.get(`https://barracuda-beanie.cyclic.app/cargo/chatorder/${params.id}`,{headers:{
    'Authorization': localStorage.getItem("cargo")
  }}).then((res)=>{console.log(res);setChat(res.data);setLoad(false)}).catch((err)=>{console.log(err);setLoad(false)})

},[])

  return (
   <Box>

{load && <Image margin="auto" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" /> }

   {chat && chat.map((el)=>{
    return <Box>Price : {el.price} </Box>
   })}
   { !load && chat.length==0 && <Text p="5px"> not responded yet</Text>}
   </Box>
  )
}

export default MyOrder
