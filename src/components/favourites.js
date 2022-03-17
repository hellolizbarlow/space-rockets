import React, { useContext } from "react";
import {
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Heading,
    SimpleGrid,
    Divider
} from '@chakra-ui/core';
import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";
import FavouritesContext from "../store/favourites-context";

export default function FavouritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favourites } = useContext(FavouritesContext);

  return (
    <>
      <Button color="black" onClick={onOpen}>
        Favourites
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        scrollBehavior="inside"
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favourites</DrawerHeader>
          <DrawerBody pb={6}>
            <FavouritesSection 
              name="Launches" 
              data={favourites.launches}
              mapFunction={launch => <LaunchItem key={launch.flight_number} launch={launch}/>}
            />
            <Divider my={8} />
            <FavouritesSection 
              name="Launch Pads" 
              data={favourites.launchPads}
              mapFunction={launchPad => <LaunchPadItem key={launchPad.site_id} launchPad={launchPad}/>}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function FavouritesSection({name, data, mapFunction}) {
  return (
    <>
      <SimpleGrid spacing="4">
        <Heading as='h3' size='sm'>
          {name} ({data.length})
        </Heading>
        {data.map(item => mapFunction(item))}
      </SimpleGrid>
    </>
  )
}
