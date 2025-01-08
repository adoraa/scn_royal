import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

function PaginationSection({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage < 3) {
        pageNumbers.push(1, 2, "...", totalPages);
      } else if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(1, "...", currentPage, "...", totalPages);
      } else {
        pageNumbers.push(1, "...", totalPages - 1, totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="pb-4">
      <PaginationPrevious
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="cursor-pointer"
      ></PaginationPrevious>

      <PaginationContent>
        {pageNumbers.map((number, index) => (
          <React.Fragment key={index}>
            {number === 1 ||
            number === totalPages ||
            Math.abs(currentPage - number) <= 2 ? (
              <PaginationItem iscurrent={currentPage === number}>
                {currentPage === number ? (
                  <PaginationLink
                    iscurrent
                    aria-current="page"
                    className="bg-primary-Green text-primary-Blue cursor-pointer"
                  >
                    {number}
                  </PaginationLink>
                ) : (
                  <PaginationLink onClick={() => onPageChange(number)}>
                    {number}
                  </PaginationLink>
                )}
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            )}
          </React.Fragment>
        ))}
      </PaginationContent>

      <PaginationNext
        variant="ghost"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer"
      ></PaginationNext>
    </Pagination>
  );
}

export default PaginationSection;
