import { Box, Text } from "@chakra-ui/react";

function Prompt() {
  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="sm" m={4}>
      <Text fontSize="lg" fontWeight="medium">
        "Here is your AI-generated prompt for today: Lorem ipsum dolor sit amet,
        consectetur adipiscing elit..."
      </Text>
    </Box>
  );
}

export default Prompt;
