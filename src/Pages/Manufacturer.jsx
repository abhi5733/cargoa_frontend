import { Box, Button, Flex, FormLabel, Grid, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack ,Image,useToast} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Manufacturer = () => {
  const toast = useToast()

    const initialState={orderID:"",To:"",From:"" , Quantity:"" , TransporterID:""}
     const[toggle,setToggle] = useState(true)
    const [state,setState] = useState(initialState)
   const[transporter,setTransporter] = useState([])
const[order,setOrder] = useState([])
const [load,setLoad] = useState(false)  
const[error,setError] = useState(false)
const[query,setQuery] = useState("")
const[search,setSearch] = useState(false)
const[search1,setSearch1] = useState(false)
const handleSubmit1 = ()=>{
  setSearch1(true)
  setSearch(true)
console.log(1) 

}

    const handleSubmit=(e)=>{
    
        e.preventDefault()
        axios.post("https://barracuda-beanie.cyclic.app/cargo/transport",state,{headers:{
          'Authorization': localStorage.getItem("cargo")
        }}).then((res)=>{console.log(res);setOrder(res.data);  toast({
          title: 'order placed sucessfull.',
          position: 'top',
          status: 'success',
          duration: 2000,
          isClosable: true,
        }) }).catch((err)=>console.log(err))
            }
        
            const handleChange=(e)=>{
        
                setState({...state,[e.target.name]:e.target.value})
              
            }

            useEffect(()=>{
console.log("any")
            if(!toggle && !search1 ){       
  console.log("toggle")
              setLoad(true)
                axios.get("https://barracuda-beanie.cyclic.app/cargo/order" , {headers:{
                  'Authorization': localStorage.getItem("cargo")
                }}).then((res)=> {setError(false);setOrder(res.data);setLoad(false)}).catch((err)=>{console.log(err);setLoad(false);setError(true)} )
  
              } 
              
               if(search){
                console.log("search")
                if(query!==""){
                  setLoad(true)
                 
                  setOrder([])
                  axios.get("https://barracuda-beanie.cyclic.app/cargo/search",{
                    params:{name:query},
                    headers:{
                      'Authorization': localStorage.getItem("cargo")
                    }
                  }).then((res)=>{  setSearch(false);console.log(res);setOrder(res.data);setLoad(false);setError(false)})
                  .catch((err)=>{  setSearch(false);console.log(err);setLoad(false);setError(true)})
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
               }              

              axios.get("https://barracuda-beanie.cyclic.app/cargo/transporter", {headers:{
                'Authorization': localStorage.getItem("cargo")
              }}).then((res)=>{setTransporter(res.data)}).catch((err)=>console.log(err))

             function generateRandomAlphaNumeric(length) {
                const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                for (let i = 0; i < length; i++) {
                  const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
                  result += alphanumericChars.charAt(randomIndex);
                }
                return result;
              }
              
              // Generate a random alphanumeric number with a length of 10
              const randomNumber =generateRandomAlphaNumeric(10);
              setState({...state,orderID:randomNumber})
             
  
            },[toggle,search])


            
            
            

            
  return (
   <Box>
    

    <Flex mt="20px" color="white" justifyContent="center" > <Button  onClick={()=>setToggle(true)}  bgColor="blue" isDisabled={toggle}  > New Order </Button> <Button ml="10px" onClick={()=>setToggle(false)} isDisabled={toggle==false?true:false} bgColor="blue"   > My orders </Button> </Flex>
   
    {/* {search  &&  <Text mt="20px" textAlign="center" fontSize="30px" >No orders as of yet </Text> } */}

{toggle &&  <VStack  as="form" onSubmit={handleSubmit} width="400px" boxShadow="2xl" bgColor="gray.200" borderColor="black" borderRadius="10px" margin="50px auto" p="10px" >
<FormLabel width="100%" >Order ID</FormLabel>
<Input type="text" disabled={true} name="orderID" value={state.orderID} onChange={(e)=>handleChange(e)} placeholder='Enter orderID' required  />
<FormLabel width="100%" >To</FormLabel>
<Select borderColor="black"  name="To" placeholder='choose your destination' width="100%"   onChange={(e)=>handleChange(e)}  required  >
  <option value="Delhi" >Delhi</option>
    <option value="Mumbai" >Mumbai</option>
    <option value="Chennai" >Chennai</option>
    <option value="Kolkata" >Kolkata</option>
    <option value="Pune" >Pune</option>
    <option value="Banglore" >Banglore</option>
    <option value="Varanasi" >Varanasi</option>
    <option value="Ahmedabad" >Ahmedabad</option>
    <option value="Srinagar" >Srinagar</option>
  </Select>
<FormLabel width="100%" >From</FormLabel> 
<Select borderColor="black"  name="From" placeholder='choose your origin' width="100%"   onChange={(e)=>handleChange(e)}  required  >
  <option value="Delhi" >Delhi</option>
    <option value="Mumbai" >Mumbai</option>
    <option value="Chennai" >Chennai</option>
    <option value="Kolkata" >Kolkata</option>
    <option value="Pune" >Pune</option>
    <option value="Banglore" >Banglore</option>
    <option value="Varanasi" >Varanasi</option>
    <option value="Ahmedabad" >Ahmedabad</option>
    <option value="Srinagar" >Srinagar</option>
  </Select>
<FormLabel width="100%" >Quantity</FormLabel>
<Select borderColor="black"  name="Quantity" placeholder='choose your Quantity' width="100%"   onChange={(e)=>handleChange(e)}  required  >
 <option value="1" >1</option>
    <option value="2" >2</option>
    <option value="3" >3</option>
    <option value="4" >4</option>
    <option value="5" >5</option>
    <option value="6" >6</option>
    <option value="7" >7</option>
    <option value="8" >8</option>
    <option value="9" >9</option>
    <option value="10" >10</option>
  </Select>
<FormLabel width="100%" >Transporter</FormLabel>
<Select   borderColor="black" placeholder='Select option' onChange={(e)=>handleChange(e)} name="TransporterID" required >
{transporter && transporter.map((el)=>{

return <option value={el._id}>{el.name}</option>
})}
  
  {/* <option value=' Transporter'>Transporter</option> */}
</Select>
<Button type="submit"  bgColor="blue.500" color="white" _hover={{bgColor:"blue.400",color:"white"}}  >Submit</Button>
     </VStack>  } 

 {!toggle && <Box  mt="20px"  >
  {/* <Text  >my orders</Text> */}

<Box width="300px" > <Flex ml="10px" ><Input border="1px solid blue" value={query} type="text" onChange={(e)=>setQuery(e.target.value)} />
  <Button bgColor="blue" _hover={{bgColor:"blue.300" , color:"gold"}} color="white" onClick={handleSubmit1} >Search</Button>   </Flex>  </Box>

  {!toggle && error &&   <Image margin="auto" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc70c43b-aeca-448a-a158-0f8e7c281a0d/dceqwb1-a75b8ac9-8340-45bb-8049-4883b81baa3c.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JjNzBjNDNiLWFlY2EtNDQ4YS1hMTU4LTBmOGU3YzI4MWEwZFwvZGNlcXdiMS1hNzViOGFjOS04MzQwLTQ1YmItODA0OS00ODgzYjgxYmFhM2MuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Xmt2peugw4IY64xOXTkc3Q1IFo5T861ncwbHc1E4rhM" /> }
    {!toggle  && !load &&  order.length==0 &&  <Text mt="20px" textAlign="center" fontSize="30px" >No orders as of yet </Text> }
    {load && !error && <Image margin="auto" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" /> }
<Grid  gridTemplateColumns="repeat(3,30%)" gap="20px"  >
{order && order.map((el)=>{
return<Box borderRadius="10px" bgColor="gray.100" boxShadow="2xl" p="10px" margin="auto" > <Text><span style={{fontWeight:"bold"}} >  orderID : </span> {el.orderID}</Text>  <Text> <span style={{fontWeight:"bold"}} >From : </span>  {el.From}</Text> 
<Text> <span style={{fontWeight:"bold"}} >  To: </span> {el.To}</Text> 
<Text> <span style={{fontWeight:"bold"}} > TransporterID : </span> {el.TransporterID}</Text> 
<Link to={`/MyOrder/${el.orderID}`} >  <Button bgColor="blue.500" color="white" _hover={{bgColor:"blue.400",color:"white"}} >View Reply</Button>  </Link> </Box>  
}) }
 </Grid>

</Box> }

   </Box>
  )
}

export default Manufacturer
