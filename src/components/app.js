import React from "react";
import { Routes, Route, Link as BrowserLink, useLocation } from "react-router-dom";
import { Flex, Text, Link, HStack } from "@chakra-ui/react";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavouritesDrawer from "./favourites";
import { FavouritesContextProvider } from "../store/favourites-context";

export default function App() {
  return (
    <div>
    <FavouritesContextProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </FavouritesContextProvider>
    </div>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Link as={BrowserLink} to={'/'} variant="noDecoration">
        <Text
          bgGradient='linear(to-r, #fd1d1d, #fcb045)'
          bgClip='text'
          fontFamily="mono"
          letterSpacing="2px"
          fontWeight="bold"
          fontSize="2xl"
        >
          ¡SPACE·R0CKETS!
        </Text>
      </Link>
      <HStack spacing={6}>
        <NavLink url="/launches" label="Launches"/>
        <NavLink url="/launch-pads" label="Launch Pads"/>
        <FavouritesDrawer/>
      </HStack>
    </Flex>
  );
}

function NavLink({label, url}) {
  const isCurrentPage = useLocation().pathname.includes(url);
  return (
    <Link as={BrowserLink} to={url}>
      <Text 
        fontSize='md'
        fontWeight={isCurrentPage ? 'bold' : 'normal'}
      >{label}</Text>
      </Link>
  )
}