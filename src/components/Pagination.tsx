import { HStack, Icon, Link } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  handleChange: (page: number) => void;
  initialPage?: number;
};

export default function Pagination({
  totalItems,
  itemsPerPage,
  handleChange,
  initialPage = 1,
}: PaginationProps) {
  const [page, setPage] = useState(initialPage);
  const totalPages = useMemo(
    () => Math.round(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );
  const [pages, setPages] = useState(
    [...Array(Math.min(totalPages, 10))].map((_, i) => i + 1)
  );

  useEffect(() => {
    setPages([...Array(Math.min(totalPages, 10))].map((_, i) => i + 1));
    setPage(initialPage);
  }, [totalPages, initialPage]);

  const handleClick = (updatedPage: number) => {
    if (updatedPage < 0 || updatedPage > totalPages) {
      return;
    }

    if (updatedPage === pages[pages.length - 1] && updatedPage !== totalPages) {
      setPages(
        [...Array(Math.min(totalPages - updatedPage + 1, 10))].map(
          (_, i) => i + updatedPage
        )
      );
    }
    if (updatedPage === pages[0] && updatedPage !== 1) {
      setPages([...Array(10)].map((_, i) => updatedPage - i).reverse());
    }

    setPage(updatedPage);
    handleChange(updatedPage);
  };
  return (
    <HStack justify={"center"} align={"center"}>
      <Link onClick={() => handleClick(page - 1)}>
        <Icon color={"blackAlpha.500"} fontSize={"xl"}>
          <FaChevronLeft />
        </Icon>
      </Link>
      {pages.map((v) => (
        <Link
          key={v}
          textColor={v === page ? "purple.500" : "ButtonText"}
          onClick={() => handleClick(v)}
          fontSize={"md"}
        >
          {v}
        </Link>
      ))}
      <Link onClick={() => handleClick(page + 1)}>
        <Icon color={"blackAlpha.500"} fontSize={"xl"}>
          <FaChevronRight />
        </Icon>
      </Link>
    </HStack>
  );
}
