import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { categoryData, levelData } from '../../data/data';

import './style.scss';

SideBar.propTypes = {
    job: PropTypes.object,
    onChooseCategory: PropTypes.func,
    onChooseLevel: PropTypes.func,
    onSubmit: PropTypes.func,
    onBack: PropTypes.func
};

SideBar.defaultProps = {
    job: null,
    onChooseCategory: null,
    onChooseLevel: null,
    onSubmit: null,
    onBack: null
};

function SideBar(props) {
    const { job, onChooseCategory, onChooseLevel, onSubmit, onBack } = props;
    const [searchValue, setSearchValue] = useState('');

    const handleSearchValueChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const handleSubmitLocation = (e) => {
        if (!onSubmit) return;
        if (e.key === 'Enter') {
            onSubmit(searchValue);
        }
    }

    const handleOnChooseLevel = (level) => {
        if (!onChooseLevel) return;
        onChooseLevel(level.target.value)
    }

    const handleOnChooseCategory = (cate) => {
        if (!onChooseCategory) return;
        onChooseCategory(cate.target.value)
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
                    <div className="sidebar-container-checkbox">
                        <input type="checkbox" />
                        <span>Full time</span>
                    </div>
                    <div className="sidebar-container-location">
                        <span>LOCATION</span>
                        <div>
                            <span className="material-icons">
                                public
                            </span>
                            <input
                                onKeyPress={(e) => handleSubmitLocation(e)}
                                type="text"
                                placeholder="City, state, zip code or country"
                                value={searchValue}
                                onChange={handleSearchValueChange} />
                            <span className="toolTipText">
                                After typing in the location, press Enter to search
                            </span>
                        </div>
                    </div>
                    <div className="sidebar-container-filter">
                        <div>
                            <label>Category</label>
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
                        <div>
                            <label>Level</label>
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
                        <span class="material-icons">
                            trending_flat
                        </span>
                        <span onClick={() => handleBackToMain()}>
                            Back to search
                        </span>
                    </div>
                    <div className="sidebar-container-bottom">
                        <span>HOW TO APPLY</span>
                        <span>
                            Please email a copy of your resume and online portfolio to
                        </span>
                        <a
                            href={job.company.landing_page}
                            target="_blank" rel="noreferrer">
                            {`${job.company.name} landing page`}
                        </a>
                    </div>
                </div>
            }
        </ div>
    );
}

export default SideBar;