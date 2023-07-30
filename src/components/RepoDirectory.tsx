import { HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FileItem } from "../types";
import FileItemHOC from "./FileItemHOC";

type RepoDirectoryProps = {
  fileItem: FileItem;
  handleClick: (value: React.SetStateAction<string>) => void;
  selectedFile: string;
};

const RepoDirectory = ({
  fileItem,
  handleClick,
  selectedFile,
}: RepoDirectoryProps) => {
  const [showSubdirs, setShowSubdirs] = useState(false);
  return (
    <VStack flex={1} w={"full"} align={"flex-start"}>
      <Link
        w={"full"}
        color={"gray.600"}
        onClick={() => setShowSubdirs((prev) => !prev)}
      >
        <HStack flex={1} h={"full"} align={"center"}>
          <Icon>{showSubdirs ? <FaChevronDown /> : <FaChevronRight />}</Icon>
          <Text>{fileItem.name}</Text>
        </HStack>
      </Link>
      {fileItem.subDirectories && showSubdirs && (
        <VStack paddingLeft={"2"}>
          {fileItem.subDirectories.map((file) => (
            <FileItemHOC
              fileItem={file}
              handleClick={handleClick}
              selectedFile={selectedFile}
            />
          ))}
        </VStack>
      )}
      ;
    </VStack>
  );
};

export default RepoDirectory;
