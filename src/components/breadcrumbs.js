import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronsRight } from "react-feather";

export default function Breadcrumbs({ items }) {
  return (
    <Breadcrumb
      px="6"
      py="2"
      bg="gray.700"
      spacing="1"
      separator={<Box w="1em" h="1em" as={ChevronsRight} color="gray.300" />}
    >
      {items.map((item, index) => {
        const isCurrentPage = items.length === index + 1;
        return (
          <BreadcrumbItem isCurrentPage={isCurrentPage} key={item.label}>
            <BreadcrumbLink
              as={!isCurrentPage ? Link : undefined}
              to={!isCurrentPage ? item.to : undefined}
            >
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
