import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';

Pagination.propTypes = {
    page: PropTypes.number,
    page_count: PropTypes.number,
    job: PropTypes.object,
    filters: PropTypes.object,
    onPageChange: PropTypes.func
};

Pagination.defaultProps = {
    page: null,
    page_count: null,
    job: null,
    filters: null,
    onPageChange: null
};

function Pagination(props) {
    const { page, page_count, job, filters, onPageChange } = props;
    console.log('page', page);
    console.log('page_count', page_count && page_count);

    const handlePageChange = (newPage) => {
        if (!onPageChange) return;
        filters.page = newPage;
        onPageChange(filters);
    }

    return (
        <div className="pagination">
            {
                _.isEmpty(job) &&
                <div className="pagination-container">
                    <button
                        className="pagination-container-pre"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}>
                        <span className="material-icons">
                            arrow_back_ios
                        </span>
                    </button>
                    <button className="pagination-container-page">
                        1
                    </button>
                    <button
                        className="pagination-container-page"
                        onClick={handlePageChange(2)}>
                        2
                    </button>
                    <span class="material-icons">
                        more_horiz
                    </span>
                    <button className="pagination-container-page">
                        {page_count}
                    </button>
                    <button
                        className="pagination-container-next"
                        disabled={page === page_count}
                        onClick={() => handlePageChange(page + 1)}>
                        <span className="material-icons">
                            arrow_forward_ios
                        </span>
                    </button>
                </div>
            }
        </div>
    );
}

export default Pagination;