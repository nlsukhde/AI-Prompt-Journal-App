import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import JournalEntry from "./JournalEntry";
import Navbar from "./Navbar";
import Prompt from "./Prompt";
import { Auth } from "./Auth";
import LoginPage from "./LoginPage";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <LoginPage></LoginPage>
      <Prompt></Prompt>
      <JournalEntry></JournalEntry>
    </>
  );
}

export default App;
