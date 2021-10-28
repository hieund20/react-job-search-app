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
    // category: 'IT',
    // location: 'New York, NY',
    page: 1
  });
  // const [paramsString, setParamsString] = useState(queryString.stringify(filters));

  console.log('dem1');

  //first loading data
  useEffect(() => {
    const paramsString = queryString.stringify(filters);
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
  }, [filters])

  console.log('update job list 2', jobList.results);

  // const handleFiltersJobs = (searchValue) => {
  //   if (!searchValue) return;
  //   const paramsString = queryString.stringify(searchValue);
  //   setParamsString(paramsString);
  //   console.log('param string', paramsString)
  // }

  const handleChosenJob = (job) => {
    setJob(job);
  }

  const handleBackToMain = () => {
    setJob(null);
  }

  const handlePageChange = (newPage) => {
    console.log('test1');
    setFilters({
      ...filters,
      page: newPage
    })
  }

  const handleCompanySearch = (company) => {
    if (company === '') {
      setFilters((prevData) => {
        const newData = { ...prevData }
        delete newData['company']
        return newData;
      })
    }
    else {
      setFilters({
        ...filters,
        company: company
      })
    }
  }

  const handleChooseCategory = (category) => {
    setFilters({
      ...filters,
      category: category
    })
  }

  const handleChooseLevel = (level) => {
    setFilters({
      ...filters,
      level: level
    })
  }

  const handleSubmitLocation = (location) => {
    if (location === '') {
      setFilters((prevData) => {
        const newData = { ...prevData }
        delete newData['location']
        return newData;
      })
    }
    else {
      setFilters({
        ...filters,
        location: location
      })
    }
  }


  return (
    <div className="app">
      <Header />
      <Filters
        onSubmit={handleCompanySearch}
      />
      <div className="app-flex">
        <SideBar
          job={job}
          onChooseCategory={handleChooseCategory}
          onChooseLevel={handleChooseLevel}
          onSubmit={handleSubmitLocation}
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
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
