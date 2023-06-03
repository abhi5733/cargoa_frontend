import React from 'react'
import { Box, Flex , Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import cargo from "../Images/cargo.png"

const Navbar = () => {
  return (
    <Box>
    <Flex justifyContent="space-between" fontFamily="serif" fontSize="30px" alignItems="center" p="2" bgColor="blue"  color="white" > <Image height="100px" width="200px" src={cargo} /> <Link to="/" >  <Text> Signup/login </Text> </Link> <Link  to="/Manufacturer">  <Text> Landing page</Text> </Link>  </Flex>
  </Box>
  )
}

export default Navbar
