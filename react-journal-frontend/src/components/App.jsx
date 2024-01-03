import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import JournalEntry from "./JournalEntry";
import Navbar from "./Navbar";
import Prompt from "./Prompt";
import HomePage from "./HomePage";
import { useDisclosure } from "@chakra-ui/react";
import CreateModal from "./CreateModal";
import LoginModal from "./LoginModal";

function App() {
  // Disclosure for Create Account Modal
  const {
    isOpen: isCreateModalOpen,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();

  // Disclosure for Login Modal
  const {
    isOpen: isLoginModalOpen,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const [loginStatus, setLoginStatus] = useState("Log in");

  return (
    <>
      <Navbar
        onCreateClick={onOpenCreateModal}
        onLoginClick={onOpenLoginModal}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />
      <CreateModal isOpen={isCreateModalOpen} onClose={onCloseCreateModal} />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={onCloseLoginModal}
        setLoginStatus={setLoginStatus}
      />
      <HomePage />
    </>
  );
}

export default App;
