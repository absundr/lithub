import { FileItem } from "../types";
import RepoDirectory from "./RepoDirectory";
import RepoFile from "./RepoFile";

type FileItemProps = {
  fileItem: FileItem;
  handleClick: (value: React.SetStateAction<string>) => void;
  selectedFile: string;
};

const FileItemHOC = ({
  fileItem,
  handleClick,
  selectedFile,
}: FileItemProps) => {
  switch (fileItem.type) {
    case "dir":
      return (
        <RepoDirectory
          fileItem={fileItem}
          handleClick={handleClick}
          selectedFile={selectedFile}
        />
      );
    case "file":
      return (
        <RepoFile
          fileItem={fileItem}
          handleClick={handleClick}
          selectedFile={selectedFile}
        />
      );
    default:
      return <></>;
  }
};

export default FileItemHOC;
