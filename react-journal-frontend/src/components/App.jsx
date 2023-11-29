import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import JournalEntry from "./JournalEntry";
import Navbar from "./Navbar";
import Prompt from "./Prompt";
import { Auth } from "./Auth";
import HomePage from "./HomePage";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "./LoginModal";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Navbar onLoginClick={onOpen} /> {/* Pass the onOpen to Navbar */}
      <LoginModal isOpen={isOpen} onClose={onClose} />
      <HomePage></HomePage>
    </>
  );
}

export default App;
