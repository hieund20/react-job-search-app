import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';

Pagination.propTypes = {
    page: PropTypes.number,
    page_count: PropTypes.number,
    job: PropTypes.object,
    onPageChange: PropTypes.func
};

Pagination.defaultProps = {
    page: null,
    page_count: null,
    job: null,
    onPageChange: null
};

function Pagination(props) {
    const { page, page_count, job, onPageChange } = props;

    console.log('current page', page);
    console.log('page_count', page_count && page_count);

    const handlePageChange = (newPage) => {
        if (!onPageChange) return;
        onPageChange(newPage);
    }

    return (
        <div className="pagination">
            <div></div>
            {
                _.isEmpty(job) &&
                <div className="pagination-container">
                    <button
                        className="pagination-container-pre"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}>
                        <span className="material-icons">
                            chevron_left
                        </span>
                    </button>
                    <button
                        className={`pagination-container-page ${page === 1 && 'active'}`}
                        onClick={() => handlePageChange(1)}>
                        1
                    </button>
                    {
                        page_count && page_count === 3 &&
                        <button
                            className={`pagination-container-page ${page === 2 && 'active'}`}
                            onClick={() => handlePageChange(2)}>
                            2
                        </button>
                    }
                    {
                        page_count && page_count > 3 &&
                        <div className="to-inline">
                            <button
                                className={`pagination-container-page ${page === 2 && 'active'}`}
                                onClick={() => handlePageChange(2)}>
                                2
                            </button>
                            <button
                                className={`pagination-container-page ${page === 3 && 'active'}`}
                                onClick={() => handlePageChange(3)}>
                                3
                            </button>
                        </div>
                    }
                    <div className="pagination-container-more">
                        <span class="material-icons">
                            more_horiz
                        </span>
                    </div>
                    {
                        page_count >= 100 &&
                        <button
                            className="pagination-container-page"
                            onClick={() => handlePageChange(99)}>
                            99
                        </button>
                    }
                    {
                        page_count < 100 &&
                        <button
                            className="pagination-container-page"
                            onClick={() => handlePageChange(page_count)}
                        >
                            {page_count}
                        </button>
                    }
                    <button
                        className="pagination-container-next"
                        disabled={page === page_count}
                        onClick={() => handlePageChange(page + 1)}>
                        <span className="material-icons">
                            chevron_right
                        </span>
                    </button>
                </div>
            }
        </div>
    );
}

export default Pagination;