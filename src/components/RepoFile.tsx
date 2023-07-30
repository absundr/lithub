import { HStack, Icon, Link, Text } from "@chakra-ui/react";
import { FaRegFile } from "react-icons/fa";
import { FileItem } from "../types";

type RepoFileProps = {
  fileItem: FileItem;
  handleClick: (value: React.SetStateAction<string>) => void;
  selectedFile: string;
};

const RepoFile = ({ fileItem, handleClick, selectedFile }: RepoFileProps) => {
  const isSelected = fileItem.fullName === selectedFile;
  return (
    <Link
      w={"full"}
      color={isSelected ? "purple.400" : "gray.600"}
      onClick={() => handleClick(fileItem.fullName)}
    >
      <HStack flex={1} align={"center"}>
        <Icon>
          <FaRegFile />
        </Icon>
        <Text>{fileItem.name}</Text>
      </HStack>
    </Link>
  );
};

export default RepoFile;
