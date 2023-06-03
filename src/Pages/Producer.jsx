import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Box ,Button,Flex,FormLabel,Grid,Input,Text, VStack , useToast ,Image } from '@chakra-ui/react'


const Producer = () => {

  const toast = useToast()
  const [Data,setData] = useState([])
 const [toggle,setToggle] = useState(false)
const[price,Setprice] = useState(0)
const[id,setId] = useState(0)
const [ manuid,setManuid] = useState(0)
const[load,setLoad] = useState(false)
const[query,setQuery] = useState("")
const[search,setSearch] = useState(false)
const[search1,setSearch1] = useState(false)
const handleSubmit1 = ()=>{
  setSearch1(true)
  setSearch(true)
console.log(1) 

}  

useEffect(()=>{
    setLoad(true)
axios.get("https://barracuda-beanie.cyclic.app/cargo/Manufacturer" , {headers:{
  'Authorization': localStorage.getItem("cargo")
}}).then((res)=>{console.log(res.data);setData(res.data); setLoad(false)}).catch((err)=>{console.log(err); setLoad(false)})
  },[])

  useEffect(()=>{

    if(query!==""){
      setLoad(true)
     
      
      axios.get("https://barracuda-beanie.cyclic.app/cargo/search1",{
        params:{name:query},
        headers:{
          'Authorization': localStorage.getItem("cargo")
        }
      }).then((res)=>{console.log(res) ;  setSearch(false);console.log(res);setData(res.data);setLoad(false)})
      .catch((err)=>{  setSearch(false);console.log(err);setLoad(false)})
        setQuery("")
      }else{
        setSearch(false)
      toast({
        title: 'enter some queries in search bar.',
       
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:"top"
      })
      }

  },[search])


  const handleToast = (el) =>{
    console.log(1)
    setId(el.orderID)
setToggle(!toggle)
setManuid(el.userID)  
}


  const handleSubmit=()=>{
    
    const obj={
      orderID:id,
    price,
    ManufacturerID: manuid 
    
    }

    axios.post("https://barracuda-beanie.cyclic.app/cargo/chat" , obj, {headers:{
      'Authorization': localStorage.getItem("cargo")
    }}).then((res)=>{console.log(res);setToggle(!toggle); toast({
      title: 'chat sent successfully.',
      position: 'top',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })})
  
  }



  return (

 <Box>

<Box width="300px" mt="50px" p="10px" > <Flex ml="10px" ><Input border="1px solid blue" value={query} type="text" onChange={(e)=>setQuery(e.target.value)} />
  <Button bgColor="blue" _hover={{bgColor:"blue.300" , color:"gold"}} color="white" onClick={handleSubmit1} >Search</Button>   </Flex>  </Box>


{load && <Image margin="auto" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" /> }

<Grid gridTemplateColumns="repeat(3,30%)" mt="50px" > 
{Data && Data.map((el)=>{
//  return console.log(el)
 return <VStack bgColor="gray.200" borderRadius="10px" margin="auto" p="10px" boxShadow="2xl" > <Text> orderID : {el.orderID}</Text>  <Text>From : {el.From}</Text>  <Text>To : {el.To}</Text> 
 <Text>Quantity : {el.Quantity}</Text><Button  bgColor="blue.500" color="white" _hover={{bgColor:"blue.400",color:"white"}}  onClick={ ()=> handleToast(el)} >Reply</Button> </VStack>
})}
</Grid>

{Data.length==0 && <Text fontSize="30px" textAlign="center" >No orders as of yet...</Text> }

{ toggle &&  <Box p="10px"  position="absolute" bgColor="gray.200" borderRadius="10px"  borderColor="black"  boxShadow="2xl" width="200px" height="250px"  left="50%" top="50%" transform="translate(-50%)" >
 <Flex justifyContent="space-between" > <FormLabel>OrderID</FormLabel>  <Text _hover={{cursor:"pointer"}}  onClick={ ()=>setToggle(!toggle) }  >X</Text>    </Flex> 
<Input value={id} disabled={true} />
<FormLabel>price</FormLabel>
<Input type="number"  onChange={(e)=>Setprice(e.target.value)} />
<Button  mt="10px" bgColor="blue.500" color="white" _hover={{bgColor:"blue.400",color:"white"}}  onClick={handleSubmit} >Submit</Button>
 
 
</Box> }

 </Box>
  

  )


}

export default Producer
