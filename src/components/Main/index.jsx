import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';
import moment from 'moment';
import not_found_image from '../../images/not_found.PNG';

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
                        <div
                            className="main-job-logo">
                            {
                                job.company.image &&
                                <img src={job.company.image} alt="" />
                            }
                            {
                                job.company.image === undefined &&
                                <img src={not_found_image} alt="" />
                            }
                        </div>
                        <div className="main-job-infor">
                            <div className="main-job-infor-top">
                                <span>{job.company.name}</span>
                                <span>{job.name}</span>
                            </div>
                            <div className="main-job-infor-bottom">
                                <button>Full time</button>
                                <div>
                                    <div>
                                        <span className="material-icons">
                                            public
                                        </span>
                                        <span>{job.locations[0] && job.locations[0].name}</span>
                                    </div>
                                    <div>
                                        <span className="material-icons">
                                            schedule
                                        </span>
                                        <span>{moment(job.publication_date).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                job && job.company &&
                <div className="main-description">
                    <div className="main-description-company">
                        <div>
                            <span>{job.name}</span>
                            <button>Full time</button>
                        </div>
                    </div>
                    <div className="main-description-time">
                        <span className="material-icons">
                            schedule
                        </span>
                        <span>{moment(job.publication_date).fromNow()}</span>
                    </div>
                    <div className="main-description-block">
                        <div>
                            {
                                job.company.image &&
                                <img src={job.company.image} alt="" />
                            }
                            {
                                job.company.image === undefined &&
                                <img src={not_found_image} alt="" />
                            }
                        </div>
                        <div>
                            <span>{job.company.name}</span>
                            <div>
                                <span className="material-icons">
                                    public
                                </span>
                                <span>{job.locations[0].name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-description-content">
                        <div dangerouslySetInnerHTML={{ __html: job.contents }}></div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Main;