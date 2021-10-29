import { useEffect, useState } from 'react';
import { getCompanyById, getJobList } from './apis/getJobList';
import queryString from 'query-string';
import './App.scss';
import Filters from './components/Filters';
import Header from './components/Header';
import Main from './components/Main';
import Pagination from './components/Pagination';
import SideBar from './components/SideBar';
import Loading from './components/Loading';

function App() {
  const [jobList, setJobList] = useState({});
  const [job, setJob] = useState({});
  const [filters, setFilters] = useState({
    page: 1
  });
  const [loading, setLoading] = useState(true);

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
                image: res.data.refs && res.data.refs.logo_image,
                landing_page: res.data.refs && res.data.refs.landing_page
              }
            })
        ))
        setTimeout(() => {
          setJobList(res.data);
          setLoading(false);
        }, 4000)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [filters])

  const handleChosenJob = (job) => {
    setJob(job);
  }

  const handleBackToMain = () => {
    setJob(null);
  }

  const handlePageChange = (newPage) => {
    setLoading(true);
    setFilters({
      ...filters,
      page: newPage
    })
  }

  const handleCompanySearch = (company) => {
    setLoading(true);
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
        company: company,
        page: 1
      })
    }
  }

  const handleChooseCategory = (category) => {
    setLoading(true);
    setFilters({
      ...filters,
      category: category,
      page: 1
    })
  }

  const handleChooseLevel = (level) => {
    setLoading(true);
    setFilters({
      ...filters,
      level: level,
      page: 1
    })
  }

  const handleSubmitLocation = (location) => {
    setLoading(true);
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
        location: location,
        page: 1
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
      <Loading
        loading={loading}
      />
    </div>
  );
}

export default App;
