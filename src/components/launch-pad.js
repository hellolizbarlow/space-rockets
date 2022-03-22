import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Navigation } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Grid, 
  GridItem,
  Box,
  Text,
  Spinner,
  Stack,
  AspectRatio,
  Divider,
} from "@chakra-ui/react";
import randomColor from "../utils/randomColor";

import { useSpaceX } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import { LaunchItem } from "./launches";
import FavouriteButton, { TYPES } from "./favourite-button";

export default function LaunchPad() {
  let { launchPadId } = useParams();
  const { data: launchPad, error } = useSpaceX(`/launchpads/${launchPadId}`);

  const { data: launches } = useSpaceX(launchPad ? "/launches/past" : null, {
    limit: 3,
    order: "desc",
    sort: "launch_date_utc",
    site_id: launchPad?.site_id,
  });

  if (error) return <Error />;
  if (!launchPad) {
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
          { label: "Launch Pads", to: ".." },
          { label: launchPad.name },
        ]}
      />
      <Header launchPad={launchPad} />
      <Box m={[3, 6]}>
        <Grid gap={4} templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)']} >
          <GridItem>
            <LocationAndVehicles launchPad={launchPad} />
          </GridItem>
          <GridItem colSpan={[1, 1, 1, 2]}>
            <Map location={launchPad.location} />
          </GridItem>
        </Grid>
        <RecentLaunches launches={launches} />
      </Box>
    </div>
  );
}

function Header({ launchPad }) {
  return (
    <Flex
      background={`linear-gradient(${randomColor()}, ${randomColor()})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="15vh"
      position="relative"
      flexDirection={["column", "row"]}
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Box>
        <Heading
          color="gray.900"
          display="inline-block"
          mt="4"
          fontSize={["md", "3xl"]}
          borderRadius="lg"
        >
          {launchPad.site_name_long}
        </Heading>
        <Text maxW={800} color="gray.700" fontWeight="semibold" fontSize={"md"} mt="4" mb="8">
          {launchPad.details}
        </Text>
      </Box>
      <Stack isInline spacing="3" align="center" bg="blackAlpha.700" borderRadius="md" px="2" py="0.5">
        <Badge colorScheme="purple" fontSize={["sm", "md"]}>
          {launchPad.successful_launches}/{launchPad.attempted_launches}{" "}
          successful
        </Badge>
        {launchPad.stats === "active" ? (
          <Badge colorScheme="green" fontSize={["sm", "md"]}>
            Active
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize={["sm", "md"]}>
            Retired
          </Badge>
        )}
        <FavouriteButton type={TYPES.LAUNCHPAD} item={launchPad}/>
      </Stack>
    </Flex>
  );
}

function LocationAndVehicles({ launchPad }) {
  return (
    <SimpleGrid spacing="4" borderRadius="md">
      <Stat borderWidth="1px" p="4" borderRadius="md">
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Location
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">{launchPad.location.name}</StatNumber>
        <StatHelpText>{launchPad.location.region}</StatHelpText>
      </Stat>
      <Stat borderWidth="1px" p="4" borderRadius="md">
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Vehicles
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">
          {launchPad.vehicles_launched.join(", ")}
        </StatNumber>
      </Stat>
    </SimpleGrid>
  );
}

function Map({ location }) {
  return (
    <AspectRatio ratio={16 / 5}>
      <Box
        as="iframe"
        src={`https://maps.google.com/maps?q=${location.latitude}, ${location.longitude}&z=15&output=embed`}
        alt="demo"
      />
    </AspectRatio>
  );
}

function RecentLaunches({ launches }) {
  if (!launches?.length) {
    return null;
  }
  return (
    <>
      <Divider my="8"/>
      <Stack my="8" spacing="3">
        <Text fontSize="xl" fontWeight="bold">
          Last launches
        </Text>
        <SimpleGrid minChildWidth="350px" spacing="4">
          {launches.map((launch) => (
            <LaunchItem launch={launch} key={launch.flight_number} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
