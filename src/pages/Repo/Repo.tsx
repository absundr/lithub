import { Flex, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import {
  fetchRepo,
  fetchRepoContent,
  fetchRepoContents,
} from "../../api-service";
import FileItemHOC from "../../components/FileItemHOC";
import { FileItem, RepoContent, Repository } from "../../types";

function mapFileItems(repoContent: RepoContent[]) {
  return repoContent.map((c) => {
    return {
      name: c.name,
      fullName: c.path,
      type: c.type,
      downloadUrl: c.download_url,
      subDirectories: null,
    } as FileItem;
  });
}
async function getFileItems(
  owner: string,
  repo: string,
  path: string
): Promise<FileItem[]> {
  const fileItems: FileItem[] = mapFileItems(
    await fetchRepoContents(owner, repo, path)
  );

  for (const fileItem of fileItems) {
    if (fileItem.type === "dir") {
      fileItem.subDirectories = await getFileItems(
        owner,
        repo,
        fileItem.fullName
      );
    }
  }

  return fileItems;
}

export default function Repo() {
  const { id } = useParams();
  const [repo, setRepo] = useState<Repository>();
  const [contents, setContents] = useState<FileItem[]>([]);
  const [item, setItem] = useState<string>("README.md");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getRepo() {
      const rep = await fetchRepo(id as string);
      setRepo(rep);
    }
    getRepo();
  }, [id]);

  useEffect(() => {
    async function getContents() {
      setLoading(true);
      const repoContent = await getFileItems(
        repo?.owner.login as string,
        repo?.name as string,
        ""
      );
      setContents(repoContent);
      setLoading(false);
    }

    if (repo?.owner.login && repo?.name) {
      getContents();
    }
  }, [repo?.owner, repo?.name]);

  useEffect(() => {
    async function getContent() {
      const content = await fetchRepoContent(
        repo?.owner.login as string,
        repo?.name as string,
        item
      );
      const raw = await fetch(content.download_url).then((response) =>
        response.text()
      );
      setContent(raw);
    }

    if (repo?.owner.login && repo?.name) {
      getContent();
    }
  }, [repo?.owner, repo?.name, item]);

  if (!repo) {
    return <></>;
  }

  if (loading) {
    return (
      <Flex padding={"20"} justify={"center"} align={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <VStack
      flex={1}
      align={"flex-start"}
      justify={"flex-start"}
      paddingInline={"4"}
    >
      {/* Heading */}
      <VStack align={"flex-start"} w={"full"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          {repo.name}
        </Text>
        <Text fontSize={"md"} fontWeight={"hairline"} color={"GrayText"}>
          {repo.description}
        </Text>
      </VStack>

      {/* Seperator */}
      <Flex borderBottomWidth={1} borderBottomColor={"gray.100"} w={"full"} />

      {/* Repo contents */}
      <VStack flex={1} align={"flex-start"} w={"full"} paddingBottom={"4"}>
        <HStack flex={1} w={"full"} align={"flex-start"}>
          {/* File tree */}
          <VStack
            align={"flex-start"}
            flex={1}
            minWidth={0}
            minHeight={0}
            overflow={"auto"}
            h={"full"}
            __css={{
              "&::-webkit-scrollbar": {
                w: "2",
                h: "2",
              },
              "&::-webkit-scrollbar-track": {
                w: "4",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10",
                bg: `gray.200`,
              },
              "&::-webkit-scrollbar-corner": {
                w: "0",
              },
            }}
          >
            <VStack
              flex={1}
              align={"flex-start"}
              minWidth={"-webkit-min-content"}
              minHeight={"-webkit-min-content"}
              maxH={0}
              paddingInline={"4"}
            >
              {contents.map((content) => (
                <FileItemHOC
                  fileItem={content}
                  handleClick={setItem}
                  selectedFile={item}
                />
              ))}
            </VStack>
          </VStack>

          {/* Seperator */}
          <VStack
            h={"full"}
            borderRight={"1px"}
            borderRightColor={"gray.100"}
          />

          {/* File contents */}
          <VStack
            flex={4}
            align={"flex-start"}
            minWidth={0}
            minHeight={0}
            overflow={"auto"}
            h={"full"}
            __css={{
              "&::-webkit-scrollbar": {
                w: "2",
                h: "2",
              },
              "&::-webkit-scrollbar-track": {
                w: "4",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10",
                bg: `gray.200`,
              },
              "&::-webkit-scrollbar-corner": {
                w: "0",
              },
            }}
          >
            <VStack
              flex={1}
              align={"flex-start"}
              minWidth={"-webkit-min-content"}
              minHeight={"-webkit-min-content"}
              maxH={0}
              borderRadius={"lg"}
            >
              <VStack
                align={"flex-start"}
                borderRadius={"lg"}
                paddingInline={"6"}
              >
                {item.endsWith(".md") ? (
                  <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                  <pre>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: hljs.highlightAuto(content).value,
                      }}
                    ></div>
                  </pre>
                )}
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
