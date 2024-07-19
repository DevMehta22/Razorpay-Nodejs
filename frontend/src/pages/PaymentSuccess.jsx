import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import React from "react";
import {useSearchParams} from "react-router-dom"

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference")
  return (
    <div>
      <Box>
        <VStack h="100vh" justifyContent={"center"}>
          <Heading textTransform={"uppercase"}> Order Successfull</Heading>

          <Text>Reference No. {referenceNum}</Text>
        </VStack>
      </Box>
    </div>
  );
};

export default PaymentSuccess;
