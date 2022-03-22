import React from "react";
import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavouriteButton, { TYPES } from "./favourite-button";
import { useSpaceXPaginated } from "../utils/use-space-x";
import HoverScale from "./animations/hover-scale";

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function LaunchPadItem({ launchPad }) {
  return (
    <HoverScale>
      <Box
        as={Link}
        to={`/launch-pads/${launchPad.site_id}`}
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        display="block"
        position="relative"
      >
        <Box p="6">
          <Box d="flex" alignItems="center" justifyContent="space-between">
            <Box>
              {launchPad.status === "active" ? (
                <Badge px="2" variant="solid" colorScheme="green">
                  Active
                </Badge>
              ) : (
                <Badge px="2" variant="solid" colorScheme="red">
                  Retired
                </Badge>
              )}
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                mt="1"
              >
                {launchPad.attempted_launches} attempted &bull;{" "}
                {launchPad.successful_launches} succeeded
              </Box>
            </Box>
            <FavouriteButton type={TYPES.LAUNCHPAD} item={launchPad}/>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launchPad.name}
          </Box>
          <Text color="gray.500" fontSize="sm">
            {launchPad.vehicles_launched.join(", ")}
          </Text>
        </Box>
      </Box>
    </HoverScale>
  );
}
