import React from "react";
import { Box, Tooltip, Link, Image } from "@chakra-ui/react";
import { Link as BrowserLink } from "react-router-dom";
import { motion } from "framer-motion";
import HoverScale from "./animations/hover-scale";
import HoverWiggle from "./animations/hover-wiggle";

export default function Home() {
  
  return (
    <Box
      bg="url('/images/stars.svg'), radial-gradient(at bottom left, #00b0ff 20%, #1a202c 60%)"
      bgSize={["60%, cover", "50%, cover"]}
      bgPos="top right"
      backgroundRepeat="no-repeat"
      h={["calc(100vh - 124px)", "calc(100vh - 88px)" , null]}
    >
      <Image
        position="absolute"
        bottom="0"
        left="0"
        src={"/images/earth.svg"}
        width="38vw"
      />
      <PageLink
        url="/launch-pads"
        label="Browse Launch Pads"
        image="/images/launch-pad.svg"
        imageWidth="18vw"
        bottom="7vw"
        left="8vw"
      />
      <Tooltip label='Browse Rockets (coming soon!)' placement='right' hasArrow fontSize="xl" >
        <Image
          display="block"
          position="absolute"
          bottom="11.5vw"
          left="14.7vw"
          src={"/images/rocket.svg"}
          width="13vw"
        />
      </Tooltip>
      <PageLink
        url="/launches"
        label="Browse Launches"
        image="/images/launch.svg"
        imageWidth={["20vw", "12vw"]}
        bottom="calc(50% - 6vw)"
        left="calc(50% - 6vw)"
      />
      <Box
        position="absolute"
        bottom={4}
        right="0"
        height={["40vw","30vw"]}
        width={["40vw","30vw"]}
      >
        <motion.div
          animate={{
            x: 0,
            y: [0,10,0]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <Tooltip 
            label='Hey there! Click on an image to browse the SpaceX data!' 
            placement='top' 
            fontSize="lg" 
            defaultIsOpen
            hasArrow 
            m={4}
            p={2}
          >
            <Image
              display="block"
              src={"/images/astronaut.svg"}
              height={["40vw","30vw"]}
              width={["40vw","30vw"]}
            />
          </Tooltip>
        </motion.div>
      </Box>
      {/* <Image
        position="absolute"
        top="0"
        right="0"
        src={"/images/roadster.svg"}
        height={["200px", "20vw"]}
        objectFit="contain"
        objectPosition="bottom"
      /> */}
    </Box>
  );
}

function PageLink({ url, label, image, imageWidth, ...position }) {
  return (
    <Tooltip 
      label={label} 
      placement='auto' 
      hasArrow 
      fontSize="xl"
    >
       <Link 
        as={BrowserLink} 
        to={url}
        position="absolute"
        {...position}
        width={imageWidth}
       >
        <HoverWiggle>
          <Image
            display="block"
            src={image}
            width={imageWidth}
          />
        </HoverWiggle>
      </Link>
    </Tooltip>
  );
}
