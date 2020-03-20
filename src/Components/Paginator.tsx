import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

type PaginationType = {
    currentPage: number
    totalPages: number
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

const PaginationElements = ({ currentPage, totalPages }: PaginationType) => {
    const paginationNumbers: any = getPaginationNumbers(currentPage, totalPages)

    return (
        <>
            {paginationNumbers.map((page: any) => {
                return (
                    <PaginationItem active={page === currentPage}>
                        <PaginationLink href="#">
                            { page }
                        </PaginationLink>
                    </PaginationItem>
                )
            })}
        </>
    )
}

const Paginator = ({ currentPage, totalPages }: PaginationType) => {

    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>

            <PaginationElements 
                currentPage={currentPage}
                totalPages={totalPages}
            />

            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
        </Pagination>
    )
}

export default Paginator