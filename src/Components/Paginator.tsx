import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

type PaginationType = {
    currentPage: number
    totalPages: number
    fetchPage: (arg0: number) => void
}

const beginningPages = (totalPages: number) => {
    return [...Array(totalPages + 1).keys()].slice(1)
}

const endingPages = (totalPages: number) => {
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
}

const middlePages = (currentPage: number) => {
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
}

const getPaginationNumbers = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
        return beginningPages(totalPages)
    }

    if (currentPage <= 3) {
        return beginningPages(5)
    }

    if (currentPage >= (totalPages - 2)) {
        return endingPages(totalPages)
    }
    
    return middlePages(currentPage)
}

const PaginationElements = ({ currentPage, totalPages, fetchPage }: PaginationType) => {
    const paginationNumbers: any = getPaginationNumbers(currentPage, totalPages)

    return (
        <>
            {paginationNumbers.map((page: any) => {
                return (
                    <PaginationItem active={page === currentPage}>
                        <PaginationLink onClick={() => fetchPage(page)}>
                            { page }
                        </PaginationLink>
                    </PaginationItem>
                )
            })}
        </>
    )
}

const Paginator = ({ currentPage, totalPages, fetchPage }: PaginationType) => {

    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first onClick={() => fetchPage(1)} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous onClick={() => fetchPage(currentPage - 1)} />
            </PaginationItem>

            <PaginationElements 
                currentPage={currentPage}
                totalPages={totalPages}
                fetchPage={fetchPage}
            />

            <PaginationItem>
                <PaginationLink next onClick={() => fetchPage(currentPage + 1)} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last onClick={() => fetchPage(totalPages)} />
            </PaginationItem>
        </Pagination>
    )
}

export default Paginator