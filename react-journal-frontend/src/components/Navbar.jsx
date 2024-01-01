import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
} from "@chakra-ui/react";

//need to track state if user is logged in already
function Navbar({ onCreateClick }) {
  //for side panel
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box bg="brand.700" p={4}>
      <Flex>
        <Text fontSize="xl" fontWeight="bold" color="white">
          AI Prompt Journaling App
        </Text>
        <Spacer />
        <ButtonGroup>
          <Button
            onClick={onCreateClick}
            colorScheme="blackAlpha"
            variant="ghost"
          >
            Create account
          </Button>
          <Button colorScheme="blackAlpha" variant="ghost">
            Log in
          </Button>
          <Button
            variant="ghost"
            ref={btnRef}
            colorScheme="blackAlpha"
            onClick={onOpen}
          >
            See Your Entries
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>All of Your Entries</DrawerHeader>

              <DrawerBody>
                <Stack spacing="4">
                  {["entry1 title", "entry2 title", "entry3 title"].map(
                    (title) => (
                      <Card size={"sm"}>
                        <CardHeader>
                          <Heading size="md"> {title}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>date of entry</Text>
                        </CardBody>
                      </Card>
                    )
                  )}
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default Navbar;
