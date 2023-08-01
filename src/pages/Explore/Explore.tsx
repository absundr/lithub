import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { fetchRepos } from "../../api-service";
import FiltersModal from "../../components/FiltersModal";
import Pagination from "../../components/Pagination";
import RepositoryList from "../../components/RepositoryList";
import { ITEMS_PER_PAGE } from "../../constants";
import { Repositories } from "../../types";

export type QueryFilters = {
  query: string;
  user?: string;
  org?: string;
  lang?: string;
};

export default function Explore() {
  const [filters, setFilters] = useState<QueryFilters>({ query: "" });
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState<Repositories>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = debounce(
    (text) =>
      setFilters((prev) => {
        return {
          ...prev,
          query: text,
        };
      }),
    500
  );

  const handlePageChange = (updatedPage: number) => setPage(updatedPage);

  // TODO: Split the function calls in a way that it will skip deboucing for anything other than the query
  useEffect(() => {
    async function getRepos() {
      if (!filters.query || filters.query.length < 3) {
        setRepos(undefined);
      } else {
        const res = await fetchRepos(
          filters.query,
          page,
          filters.user,
          filters.org,
          filters.lang
        );
        setRepos(res);
      }
    }

    getRepos();
  }, [filters.query, page, filters.lang, filters.org, filters.user]);

  return (
    <Flex flex={1} flexDirection={"column"} padding={"4"}>
      <Flex flex={1} flexDirection="column">
        {/* Search bar */}
        <HStack flex={1}>
          <Flex flex={[3, 2]}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" h="full" paddingLeft={"4"}>
                <BsSearch />
              </InputLeftElement>
              <Input
                focusBorderColor={"purple.300"}
                placeholder="Search for a repository..."
                size={"lg"}
                paddingLeft={"16"}
                onChange={(e) => handleChange(e.target.value)}
              />
            </InputGroup>
          </Flex>
          <Flex flex={[0.5, 1]}>
            <IconButton
              display={{ base: "block", sm: "none", md: "none" }}
              colorScheme={"purple"}
              variant={"solid"}
              aria-label="Filters"
              icon={
                <Icon fontSize={"24px"}>
                  <FaTools />
                </Icon>
              }
              onClick={onOpen}
              size={"lg"}
            />
            <Button
              display={{ base: "none", sm: "block", md: "block" }}
              leftIcon={<FaTools />}
              colorScheme={"purple"}
              variant={"solid"}
              size={"lg"}
              w="full"
              onClick={onOpen}
            >
              Filters
            </Button>
            <Button
              display={{ base: "none", md: "block" }}
              colorScheme={"purple"}
              variant={"ghost"}
              size={"lg"}
              w="full"
              onClick={() =>
                setFilters((prev) => {
                  return {
                    query: prev.query,
                  };
                })
              }
            >
              Reset filters
            </Button>
          </Flex>
        </HStack>

        {/* Repositories table */}
        <RepositoryList repos={repos?.items} />

        {/* Pages */}
        {repos && repos.items && (
          <Pagination
            totalItems={repos.total_count}
            itemsPerPage={ITEMS_PER_PAGE}
            initialPage={page}
            handleChange={handlePageChange}
          />
        )}

        {/* Filter modal */}
        <FiltersModal
          isOpen={isOpen}
          onClose={onClose}
          setQuery={setFilters}
          values={{
            lang: filters.lang ?? "",
            user: filters.user ?? "",
            org: filters.org ?? "",
          }}
        />
      </Flex>
    </Flex>
  );
}
