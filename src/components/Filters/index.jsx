import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';


Filters.propTypes = {
    onSubmit: PropTypes.func,
    filters: PropTypes.object
};

Filters.defaultProps = {
    onSubmit: null,
    filters: null
};

function Filters(props) {
    const { onSubmit, filters } = props;
    const [searchValue, setSearchValue] = useState('');

    // console.log(filters);

    const handleSearchValueChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    //Searching for company name
    const handleSubmitSearchValue = () => {
        if (!onSubmit) return;
        console.log('submit', searchValue);
        onSubmit(filters);
    }


    return (
        <div className="filter">
            <div
                className="search">
                <div className="search-container">
                    <span className="material-icons">
                        work_outline
                    </span>
                    <input
                        type="text"
                        placeholder="Title, companies, expertise or benefits"
                        value={searchValue}
                        onChange={handleSearchValueChange} />
                    <button onClick={() => handleSubmitSearchValue()}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filters;