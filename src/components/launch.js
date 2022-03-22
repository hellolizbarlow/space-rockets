import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { format as timeAgo } from "timeago.js";
import { Watch, MapPin, Navigation, Layers } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Image,
  Link,
  Stack,
  AspectRatio,
  StatGroup,
  Tooltip
} from "@chakra-ui/react";
import randomColor from "../utils/randomColor";

import { useSpaceX } from "../utils/use-space-x";
import { formatDateTime } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import FavouriteButton, { TYPES } from "./favourite-button";
import Carousel from "./carousel";


export default function Launch() {
  let { launchId } = useParams();
  const { data: launch, error } = useSpaceX(`/launches/${launchId}`);

  if (error) return <Error />;
  if (!launch) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launches", to: ".." },
          { label: `#${launch.flight_number}` },
        ]}
      />
      <Header launch={launch} />
      <Box m={[3, 6]}>
        <SimpleGrid spacing={4} columns={[1, 1, 2]}>
          <Box>
            <TimeAndLocation launch={launch} />
            <RocketInfo launch={launch} />
          </Box>
          <Box borderRadius="md" overflow="hidden">
            <Carousel>
              <Video launch={launch} />
              {launch.links.flickr_images.map((image) => 
                <Box key={image} bg="gray.800">
                  <Image
                    src={image.replace("_o.jpg", "_z.jpg")}
                    height={["230px", "400px"]}
                    width="auto"
                    display="block"
                    margin="auto"
                  />
                </Box>
              )}
            </Carousel>
          </Box>
        </SimpleGrid>
      </Box>
    </div>
  );
}

function Header({ launch }) {
  const bkgImage = launch.links.flickr_images[0] ? 
    `url(${launch.links.flickr_images[0]})` : 
    `linear-gradient(${randomColor()}, ${randomColor()})`;

  return (
    <Flex
      bgImage={`linear-gradient(to left,rgba(0,0,0,0),rgba(26,32,44,0.8)), ${bkgImage}`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height={["85px", "150px"]}
        objectFit="contain"
        objectPosition="bottom"
      />
      <Box maxW={800}>
        <Heading
          color="white"
          display="inline"
          fontSize={["lg", "5xl"]}
          py="2"
        >
          {launch.mission_name}
        </Heading>
        <Text color="white" fontSize="md" fontWeight="semibold" mt="4" mb="8">
          {launch.details}
        </Text>
        </Box>
      <Stack isInline spacing="3" align="center" bg="blackAlpha.700" borderRadius="md" px="2" py="0.5">
        <Badge colorScheme="purple" fontSize={["xs", "md"]}>
          #{launch.flight_number}
        </Badge>
        {launch.launch_success ? (
          <Badge colorScheme="green" fontSize={["xs", "md"]}>
            Successful
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize={["xs", "md"]}>
            Failed
          </Badge>
        )}
        <FavouriteButton type={TYPES.LAUNCH} item={launch}/>
      </Stack>
    </Flex>
  );
}

export function TimeAndLocation({ launch }) {
  return (
    <SimpleGrid rows={2} spacing={4}>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Stat>
          <StatLabel display="flex">
            <Box as={Watch} width="1em" />{" "}
            <Box ml="2" as="span">
              Launch Date
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>
              <Tooltip hasArrow label={`Your local time: ${formatDateTime(launch.launch_date_local)}`} placement='top'>
                  {formatDateTime(launch.launch_date_local, true)}
              </Tooltip>
          </StatNumber>
          <StatHelpText>{timeAgo(launch.launch_date_utc)}</StatHelpText>
        </Stat>
      </Box>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <Stat>
          <StatLabel display="flex">
            <Box as={MapPin} width="1em" />{" "}
            <Box ml="2" as="span">
              Launch Site
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>
            <Link
              as={RouterLink}
              to={`/launch-pads/${launch.launch_site.site_id}`}
            >
              {launch.launch_site.site_name_long}
            </Link>
          </StatNumber>
          <StatHelpText>{launch.launch_site.site_name}</StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
}

function RocketInfo({ launch }) {
  const cores = launch.rocket.first_stage.cores;

  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      borderWidth="1px"
      mt="4"
      p="4"
      borderRadius="md"
    >
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Rocket
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          {launch.rocket.rocket_name}
        </StatNumber>
        <StatHelpText>{launch.rocket.rocket_type}</StatHelpText>
      </Stat>
      <StatGroup>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              First Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>
            {cores.map((core) => core.core_serial).join(", ")}
          </StatNumber>
          <StatHelpText>
            {cores.every((core) => core.land_success)
              ? cores.length === 1
                ? "Recovered"
                : "All recovered"
              : "Lost"}
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              Second Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>
            Block {launch.rocket.second_stage.block}
          </StatNumber>
          <StatHelpText>
            Payload:{" "}
            {launch.rocket.second_stage.payloads
              .map((payload) => payload.payload_type)
              .join(", ")}
          </StatHelpText>
        </Stat>
      </StatGroup>
    </SimpleGrid>
  );
}

function Video({ launch }) {
  return (
    <AspectRatio maxH="400px" ratio={1.7}>
      <Box
        as="iframe"
        title={launch.mission_name}
        src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
        allowFullScreen
      />
    </AspectRatio>
  );
}