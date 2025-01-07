import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationSection({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="pb-4">
      <PaginationPrevious asChild>
        <Button
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="cursor-pointer"
        >
          Previous
        </Button>
      </PaginationPrevious>

      <PaginationContent>
        {pageNumbers.map((number) => (
          <PaginationItem key={number} isCurrent={currentPage === number}>
            {currentPage === number ? (
              <PaginationLink
                isCurrent
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
        ))}

        {totalPages > 5 && <PaginationEllipsis />}
      </PaginationContent>

      <PaginationNext asChild>
        <Button
          variant="ghost"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="cursor-pointer"
        >
          Next
        </Button>
      </PaginationNext>
    </Pagination>
  );
}

export default PaginationSection;
