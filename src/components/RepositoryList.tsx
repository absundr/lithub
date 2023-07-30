import { Box, Link as CLink, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Repository } from "../types";

type RepositoryListProps = {
  repos?: Repository[];
};

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

  const Header = () => (
    <Flex
      flex={1}
      w="full"
      fontSize={"l"}
      fontWeight={"bold"}
      letterSpacing={"wider"}
      paddingBottom={"4"}
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
    </Flex>
  );

  const renderItem = (
    id: number,
    name: string,
    desc: string,
    owner: string,
    stars: string,
    lang: string
  ) => (
    <Flex flex={1} w="full" letterSpacing={"wider"} paddingBlock={"2"}>
      <Flex flex={1} h="full" minWidth={0} wordBreak={"break-word"}>
        <Text fontWeight={"semibold"}>{name}</Text>
      </Flex>
      <Box paddingInline={"2"} />
      <Flex flex={2} h="full" minWidth={0} wordBreak={"break-word"}>
        <Text textColor={"InfoText"}>
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
    </Flex>
  );

  return (
    <Flex flex={1} paddingBlock={"8"}>
      <VStack flex={1} w="full">
        {/* Header */}
        <Header />
        {repos.map((repo, i) => (
          <VStack key={repo.full_name} flex={1} w="full">
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
    </Flex>
  );
}
