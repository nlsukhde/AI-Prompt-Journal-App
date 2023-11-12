import { Box, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import { Heading, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function Prompt() {
  // const [quote, setQuote] = useState("");
  const [genButtonText, setgenButtonText] = useState("Generate Prompt");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [PromptText, setPromptText] = useState(
    "Hit the button below to generate your daily prompt!"
  );

  const handleGenerate = async () => {
    setIsLoading(true); // Start loading
    console.log("function initiated");
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/get-prompt",
        {}
      );
      setIsLoading(false); // Stop loading after fetching data
      console.log(response.data.prompt);
      setPromptText(response.data.prompt);
      window.name = response.data.prompt;
      // Handle success
      toast({
        title: "Prompt retrieved.",
        description: "The prompt has been fetched from api.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle errors
      toast({
        title: "Prompt retreival failed.",
        description: "There was an issue getting the prompt.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error retreiving prompt:", error);
    }
  };
  return (
    <div>
      <VStack spacing={4} width="80%" margin="0 auto">
        <Heading>Daily Journal</Heading>
        <Box p={4} bg="gray.100" borderRadius="md" boxShadow="sm" m={4}>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Text fontSize="lg" fontWeight="medium">
              {PromptText}
            </Text>
          )}
        </Box>
        <Button
          colorScheme="blue"
          onClick={() => {
            setgenButtonText("Regenerate Prompt");
            handleGenerate();
          }}
        >
          {genButtonText}
        </Button>
      </VStack>
    </div>
  );
}

export default Prompt;
