import {
  Box,
  Link as CLink,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Repository } from "../types";

type RepositoryListProps = {
  repos?: Repository[];
};

const renderItem = (
  id: number,
  name: string,
  desc: string,
  owner: string,
  stars: string,
  lang: string
) => (
  <>
    {/* Desktop view */}
    <HStack
      w="full"
      letterSpacing={"wider"}
      paddingBlock={"2"}
      display={{ base: "none", md: "flex" }}
    >
      <Flex flex={1} h="full" minWidth={0} wordBreak={"break-word"}>
        <Text fontWeight={"semibold"}>{name}</Text>
      </Flex>
      <Box paddingInline={"2"} />
      <Flex flex={2} h="full" minWidth={0} wordBreak={"break-word"}>
        <Text textColor={"GrayText"}>
          {desc?.length > 80 ? desc.slice(0, 80) + "..." : desc}
        </Text>
      </Flex>
      <Box paddingInline={"2"} />
      <Flex flex={1} h="full" minWidth={0} wordBreak={"break-word"}>
        <CLink
          textDecoration={"underline"}
          textColor="purple.300"
          onClick={() => alert("todo")}
        >
          {owner}
        </CLink>
      </Flex>
      <Box paddingInline={"2"} />
      <Flex
        flex={0.8}
        h="full"
        minWidth={0}
        wordBreak={"break-word"}
        justify={"flex-end"}
        align={"flex-start"}
      >
        <Flex align={"center"}>
          <Icon fontSize={"20"} color={"yellow.300"}>
            <FaStar />
          </Icon>
          <Text paddingRight={"2"} fontWeight={"medium"}>
            {Number(stars).toLocaleString()}
          </Text>
        </Flex>
      </Flex>
      <Box paddingInline={"2"} />
      <Flex flex={1} h="full" minWidth={0} wordBreak={"break-word"}>
        <Text>{lang ?? "-"}</Text>
      </Flex>
      <Flex flex={0.2} h="full" minWidth={0} marginRight={"4"}>
        <Link to={`/repo/${id}`}>
          <Icon fontSize={20} color={"purple.300"}>
            <FaChevronRight />
          </Icon>
        </Link>
      </Flex>
    </HStack>
    {/* Mobile view */}
    <HStack display={{ base: "flex", md: "none" }} w="full" paddingBlock={"2"}>
      <Flex
        flexDirection={"column"}
        align={"flex-start"}
        justify={"flex-start"}
        minWidth={0}
        flex={9}
      >
        <Text fontWeight={"semibold"}>{name}</Text>
        <Text textColor={"GrayText"}>
          {desc?.length > 80 ? desc.slice(0, 80) + "..." : desc}
        </Text>
      </Flex>
      <Flex
        minWidth={0}
        flex={1}
        align={"center"}
        justify={"flex-end"}
        h={"full"}
      >
        <Link to={`/repo/${id}`}>
          <Icon fontSize={20} color={"purple.300"}>
            <FaChevronRight />
          </Icon>
        </Link>
      </Flex>
    </HStack>
  </>
);

const Header = () => (
  <HStack
    w="full"
    fontSize={"l"}
    fontWeight={"bold"}
    letterSpacing={"wider"}
    paddingBottom={"4"}
    display={{ base: "none", md: "flex" }}
  >
    <Flex flex={1} borderRight={"1px solid"} borderColor={"gray.300"}>
      <Text>Name</Text>
    </Flex>
    <Box paddingInline={"2"} />
    <Flex flex={2} borderRight={"1px solid"} borderColor={"gray.300"}>
      <Text fontSize={"l"} fontWeight={"bold"}>
        Description
      </Text>
    </Flex>
    <Box paddingInline={"2"} />
    <Flex flex={1} borderRight={"1px solid"} borderColor={"gray.300"}>
      <Text fontSize={"l"} fontWeight={"bold"}>
        Owner
      </Text>
    </Flex>
    <Box paddingInline={"2"} />
    <Flex
      flex={0.8}
      borderRight={"1px solid"}
      borderColor={"gray.300"}
      justify={"flex-end"}
    >
      <Text fontSize={"l"} fontWeight={"bold"} paddingRight={"2"}>
        Stars
      </Text>
    </Flex>
    <Box paddingInline={"2"} />
    <Flex flex={1}>
      <Text fontSize={"l"} fontWeight={"bold"}>
        Language
      </Text>
    </Flex>
    <Flex flex={0.2} minWidth={0} marginRight={"4"} />
  </HStack>
);

export default function RepositoryList({ repos }: RepositoryListProps) {
  if (!repos || !repos.length) {
    return (
      <VStack justify="center" align="center" h="full">
        <Text fontSize={"2xl"} color={"GrayText"}>
          It's empty here
        </Text>
      </VStack>
    );
  }

  return (
    <VStack justify="center" align="center" h="full" paddingBlock={"8"}>
      <VStack flex={1} w="full">
        {/* Header */}
        <Header />
        {repos.map((repo, i) => (
          <VStack key={repo.full_name} flex={1} w="full" align={"flex-start"}>
            {i && (
              <Flex
                flex={1}
                border={"1px"}
                borderColor={"gray.100"}
                w={"full"}
              />
            )}
            {renderItem(
              repo.id,
              repo.name,
              repo.description,
              repo.owner.login,
              repo.stargazers_count.toString(),
              repo.language
            )}
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
