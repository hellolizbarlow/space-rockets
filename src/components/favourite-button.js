import React, { useContext } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Star } from "react-feather";
import FavouritesContext from '../store/favourites-context';
import { motion } from "framer-motion";


export const TYPES = {
  LAUNCH: "LAUNCH",
  LAUNCHPAD: "LAUNCHPAD"
}

export default function FavouriteButton({type, item}) {
  const { favourites, favouriteLaunch, unfavouriteLaunch, favouriteLaunchPad, unfavouriteLaunchPad } = useContext(FavouritesContext);

  const isFavourite = 
    favourites.launches.find((launch) => launch.flight_number === item.flight_number) || 
    favourites.launchPads.find((launchPad) => launchPad.site_id === item.site_id) 
    ? true : false;

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (type === TYPES.LAUNCH) {
      isFavourite ? unfavouriteLaunch(item) : favouriteLaunch(item);
    }
    if (type === TYPES.LAUNCHPAD) {
      isFavourite ? unfavouriteLaunchPad(item) : favouriteLaunchPad(item);
    }
}

  return (
    <motion.div
      whileTap={{ rotate: 180, scale: 1.4 }}
    >
      <IconButton
        onClick={handleClick}
        as={Star}
        size="md"
        p={2}
        bg="none"
        borderRadius="50%"
        cursor="pointer"
        aria-label={isFavourite ? "Unfavourite" : "Favourite"}
        fill={isFavourite ? "#FFE338" : "none"}
      />
    </motion.div>
  )
}