import React, { useState } from 'react';
import _, { isBuffer } from 'lodash';
import PropTypes from 'prop-types';
import { categoryData, levelData } from '../../data/data';

import './style.scss';

SideBar.propTypes = {
    job: PropTypes.object,
    filters: PropTypes.object,
    onSubmit: PropTypes.func,
    onBack: PropTypes.func
};

SideBar.defaultProps = {
    job: null,
    filters: null,
    onSubmit: null,
    onBack: null
};

function SideBar(props) {
    const { job, filters, onSubmit, onBack } = props;
    const [searchValue, setSearchValue] = useState('');

    const handleSearchValueChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const handleSubmitSearchValue = (e) => {
        if (!onSubmit) return;
        if (e.key === 'Enter') {
            console.log("Hello");
            filters['location'] = searchValue;
            onSubmit(filters);
        }
    }

    const handleOnChooseLevel = (level) => {
        if (!filters) return;
        filters['level'] = level.target.value;
    }

    const handleOnChooseCategory = (cate) => {
        if (!filters) return;
        filters['category'] = cate.target.value;
    }

    const handleBackToMain = () => {
        if (!onBack) return;
        onBack();
    }

    return (
        < div className="sidebar" >
            {
                _.isEmpty(job) &&
                <div className="sidebar-container">
                    <div className="sidebar-container-top">
                        <input type="checkbox" />
                        <span>Full time</span>
                    </div>
                    <div className="sidebar-container-bottom">
                        <span>LOCATION</span>
                        <input
                            onKeyPress={(e) => handleSubmitSearchValue(e)}
                            type="text"
                            placeholder="City, state, zip code or country"
                            value={searchValue}
                            onChange={handleSearchValueChange} />
                    </div>
                    <div className="filter-box">
                        <div className="filter-box-category">
                            <label>Choose a category:</label>
                            <select onChange={handleOnChooseCategory}>
                                {
                                    categoryData().map((category) => (
                                        <option value={category}>
                                            {category}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="filter-box-level">
                            <label>Choose a level:</label>
                            <select onChange={handleOnChooseLevel}>
                                {
                                    levelData().map((level) => (
                                        <option value={level}>
                                            {level}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>

            }
            {
                !_.isEmpty(job) &&
                <div className="sidebar-container">
                    <div className="sidebar-container-top">
                        <span onClick={() => handleBackToMain()}>
                            Back to search
                        </span>
                    </div>
                    <div className="sidebar-container-bottom">
                        <span>HOW TO APPLY</span>
                        <span>Please email a copy of your resume
                            and online portfolio to wes@kasisto.com
                            & CC eric@kasisto.com</span>
                    </div>
                </div>
            }
        </ div>
    );
}

export default SideBar;