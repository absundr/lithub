import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { QueryFilters } from "../pages/Explore/Explore";

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setQuery: React.Dispatch<React.SetStateAction<QueryFilters>>;
  values: Filters;
};

type Filters = {
  user: string;
  org: string;
  lang: string;
};

const initFilters: Filters = {
  user: "",
  org: "",
  lang: "",
};

export default function FiltersModal({
  isOpen,
  onClose,
  setQuery,
  values,
}: FiltersModalProps) {
  const [filters, setFilters] = useState<Filters>(values);
  useEffect(() => {
    setFilters({
      user: values.user,
      lang: values.lang,
      org: values.org,
    } as Filters);
  }, [values.user, values.lang, values.org]);

  const handleChange = (value: string, key: keyof typeof values): void =>
    setFilters((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });

  const handleSave = () => {
    setQuery((prev) => {
      return {
        query: prev.query,
        ...filters,
      };
    });
    onClose();
  };

  const handleClear = () => {
    setQuery((prev) => {
      return {
        query: prev.query,
        ...initFilters,
      };
    });
    setFilters(initFilters);
    onClose();
  };

  const handleClose = () => {
    setFilters(values);
    onClose();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent margin={"4"}>
        <ModalHeader>Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <HStack>
              <FaSearch />
              <Text fontSize={"l"} fontWeight={"semibold"}>
                Search by
              </Text>
            </HStack>
            <Input
              placeholder="User"
              size="md"
              onChange={(e) => handleChange(e.target.value, "user")}
              value={filters.user}
            />
            <Input
              placeholder="Organization"
              size="md"
              onChange={(e) => handleChange(e.target.value, "org")}
              value={filters.org}
            />
            <Input
              placeholder="Language"
              size="md"
              onChange={(e) => handleChange(e.target.value, "lang")}
              value={filters.lang}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" mr={2} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" colorScheme="purple" onClick={handleClear}>
            Clear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
