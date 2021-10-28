import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';
import moment from 'moment';

Main.propTypes = {
    jobList: PropTypes.object,
    job: PropTypes.object,
    onChosenJob: PropTypes.func
};

Main.defaultProps = {
    jobList: null,
    job: null,
    onChosenJob: null
}

function Main(props) {
    const { jobList, job, onChosenJob } = props;

    console.log(1);
    console.log('final', jobList.results);
    console.log(2);

    const handleJobClick = (job) => {
        if (!onChosenJob) return;
        onChosenJob(job);
    }

    return (
        <div className="main">
            {
                _.isEmpty(job) && jobList.results &&
                jobList.results.slice(0, 5).map((job) => (
                    <div
                        className="main-job"
                        onClick={() => handleJobClick(job)}>
                        <div className="main-job-logo">
                            {
                                job.company.image &&
                                <img src={job.company.image} alt="" />
                            }
                        </div>
                        <div className="main-job-middle">
                            <span>{job.company.name}</span>
                            <span>{job.name}</span>
                            <button>{job.model_type}</button>
                        </div>
                        <span>{moment(job.publication_date).fromNow()}</span>
                        <span>{job.locations[0].name}</span>
                    </div>
                ))
            }
            {
                job && job.company &&
                <div className="main-description">
                    <span>{job.name}</span>
                    <span>{moment(job.publication_date).fromNow()}</span>
                    <span>company: {job.company.name}</span>
                    <img src={job.company.image} alt="" />
                    <span>{job.locations[0].name}</span>
                    {job.contents}
                </div>
            }
        </div>
    );
}

export default Main;