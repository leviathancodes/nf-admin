import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 1.5em;
`;

const PaginateWrap = styled.div`
  .pagination {
    display: flex;
    align-items: center;
  }

  .pagination__page {

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5em;

    &.selected {
      background-color: ${props => props.theme.color.primaryBlue};
      color: white;
      display: inline-block;
      padding: 1em;

      & a {
        color: white;
        text-align: center;
      }
    }

    .pagination__link {
      width: 1em;
      height: 1em;
      color: ${props => props.theme.color.primaryBlue};
    }
  }
`;

const Pagination = props => {
  return (
    <Container>
      <PaginateWrap>
        <ReactPaginate
          containerClassName="pagination"
          pageClassName="pagination__page"
          pageLinkClassName="pagination__link"
          pageCount={props.pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={3}
          onPageChange={props.changeHandler}
        />
      </PaginateWrap>
    </Container>
  );
};

export default Pagination;
