import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import JournalEntry from "./JournalEntry";
import Navbar from "./Navbar";
import Prompt from "./Prompt";
import HomePage from "./HomePage";
import { useDisclosure } from "@chakra-ui/react";
import CreateModal from "./CreateModal";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Navbar onCreateClick={onOpen} /> {/* Pass the onOpen to Navbar */}
      <CreateModal isOpen={isOpen} onClose={onClose} />
      <HomePage></HomePage>
    </>
  );
}

export default App;
