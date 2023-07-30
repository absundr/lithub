import {
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <VStack>
      <Flex
        w="100%"
        minHeight={"16"}
        justify={"center"}
        align={"center"}
        paddingInline={"4"}
      >
        <Logo />
        <Heading
          size="lg"
          fontWeight="extrabold"
          color="purple.300"
          paddingLeft={"2"}
        >
          Lithub
        </Heading>
        <Spacer />
        <IconButton
          ml={9}
          icon={isDark ? <FaSun /> : <FaMoon />}
          isRound={true}
          onClick={toggleColorMode}
          aria-label={""}
        />
      </Flex>
    </VStack>
  );
}
