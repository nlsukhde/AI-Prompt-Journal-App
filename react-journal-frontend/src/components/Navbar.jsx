import { Box, Flex, Text, Spacer, Button, ButtonGroup } from "@chakra-ui/react";

function Navbar() {
  return (
    <Box bg="brand.700" p={4}>
      <Flex>
        <Text fontSize="xl" fontWeight="bold" color="white">
          AI Prompt Journaling App
        </Text>
        <Spacer />
        <ButtonGroup>
          <Button colorScheme="blackAlpha" variant="ghost">
            Log in
          </Button>
          <Button colorScheme="blackAlpha" variant="ghost">
            See Your Entries
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default Navbar;
