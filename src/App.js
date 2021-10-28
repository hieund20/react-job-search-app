import { useEffect, useState } from 'react';
import { getCompanyById, getJobList } from './apis/getJobList';
import queryString from 'query-string';
import './App.scss';
import Filters from './components/Filters';
import Header from './components/Header';
import Main from './components/Main';
import Pagination from './components/Pagination';
import SideBar from './components/SideBar';

function App() {
  const [jobList, setJobList] = useState({});
  const [job, setJob] = useState({});
  const [filters, setFilters] = useState({
    category: 'IT',
    location: 'New York, NY',
    page: 1
  });
  const [paramsString, setParamsString] = useState(queryString.stringify(filters));

  console.log('dem1');

  //first loading data
  useEffect(() => {
    getJobList(paramsString)
      .then((res) => {
        res.data.results && res.data.results.map((job) => (
          getCompanyById(job.company.id)
            .then((res) => {
              job.company = {
                ...job.company,
                image: res.data.refs && res.data.refs.logo_image
              }
            })
        ))
        setTimeout(() => {
          setJobList(res.data);
        }, 2000)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [paramsString])

  console.log('update job list 2', jobList.results);

  const handleFiltersJobs = (searchValue) => {
    if (!searchValue) return;
    // console.log('value search', searchValue);
    const paramsString = queryString.stringify(searchValue);
    setParamsString(paramsString);
  }

  const handleChosenJob = (job) => {
    setJob(job);
  }

  const handleBackToMain = () => {
    // console.log('Back to main');
    setJob(null);
  }

  return (
    <div className="app">
      <Header />
      <Filters
        onSubmit={handleFiltersJobs}
        filters={filters}
      />
      <div className="app-flex">
        <SideBar
          job={job}
          filters={filters}
          onSubmit={handleFiltersJobs}
          onBack={handleBackToMain}
        />
        <Main
          jobList={jobList}
          job={job}
          onChosenJob={handleChosenJob}
        />
      </div>
      <Pagination
        page={jobList.page}
        page_count={jobList.page_count}
        job={job}
        filters={filters}
        onPageChange={handleFiltersJobs}
      />
    </div>
  );
}

export default App;
