import { useState } from "react";
import { Input, Textarea, Button, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

function JournalEntry() {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/posts", {
        title: title,
        content: entry,
        prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        date: new Date().toISOString().split("T")[0], // Gets current date in 'YYYY-MM-DD' format
      });

      // Handle success
      toast({
        title: "Entry submitted.",
        description: "Your journal entry has been saved.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTitle(""); // Clear the title input
      setEntry(""); // Clear the textarea
    } catch (error) {
      // Handle errors
      toast({
        title: "Submission failed.",
        description: "There was an issue saving your entry.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error submitting journal entry:", error);
    }
  };

  return (
    <VStack spacing={4} width="80%" margin="0 auto">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of your entry"
        size="lg"
      />
      <Textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your journal entry here..."
        size="lg"
      />
      <Button onClick={handleSubmit} colorScheme="blue">
        Submit
      </Button>
    </VStack>
  );
}

export default JournalEntry;
