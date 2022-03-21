import React, { useContext } from "react";
import {
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    Heading,
    SimpleGrid,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";
import FavouritesContext from "../store/favourites-context";
import { Star } from "react-feather";

export default function FavouritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favourites } = useContext(FavouritesContext);

  return (
    <>
    <Box>
      <IconButton
        onClick={onOpen}
        as={Star}
        size="md"
        p={2}
        bg="none"
        cursor="pointer"
        aria-label={"Favourites"}
        fill="orange.400"
        stroke="orange.400"
      />
      </Box>
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
            <Accordion defaultIndex={[0]} allowMultiple>
              <FavouritesSection 
                name="Launches" 
                data={favourites.launches}
                mapFunction={launch => <LaunchItem key={launch.flight_number} launch={launch}/>}
              />
              <FavouritesSection 
                name="Launch Pads" 
                data={favourites.launchPads}
                mapFunction={launchPad => <LaunchPadItem key={launchPad.site_id} launchPad={launchPad}/>}
              />
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function FavouritesSection({name, data, mapFunction}) {
  return (
    <AccordionItem>
      <Heading as='h3' size='sm'>
        <AccordionButton justifyContent="space-between">
          <Box>
            {name} ({data.length})
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel px={0.5} p={4}>
        <SimpleGrid spacingY="4">
          {data.map(item => mapFunction(item))}
        </SimpleGrid>
      </AccordionPanel>
    </AccordionItem>
  )
}
