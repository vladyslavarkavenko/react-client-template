import React from 'react';
import ReactPaginate from 'react-paginate';

import ArrowUp from '../../../../public/assets/svg/arrow-up.regular.svg';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.handlePagination = this.handlePagination.bind(this);
  }

  handlePagination({ selected }) {
    const { onPageChanged } = this.props;
    onPageChanged(selected + 1);
  }

  render() {
    const { currentPage, lastPage } = this.props;

    if (lastPage <= 1) {
      return <div className="pagination" />;
    }

    return (
      <div className="pagination">
        <ReactPaginate
          onPageChange={this.handlePagination}
          initialPage={1}
          forcePage={currentPage}
          pageCount={lastPage}
          containerClassName="pagination__list"
          pageClassName="pagination__page"
          breakClassName="pagination__break"
          nextClassName="pagination__next"
          previousClassName="pagination__prev"
          breakLinkClassName="pagination__link"
          pageLinkClassName="pagination__link"
          previousLinkClassName="pagination__link"
          nextLinkClassName="pagination__link"
          activeClassName="active"
          nextLabel={<ArrowUp />}
          previousLabel={<ArrowUp />}
        />
      </div>
    );
  }
}
