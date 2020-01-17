import * as React from 'react'

const Job: React.FC<{ job: any }> = ({job}) => {
  const jobData = job?.node || {}
  return (
    <div className="job">
      <div>
        {jobData.label} {jobData.passed && '√'} {jobData.passed === false && jobData.state === 'FINISHED' && 'X'}
      </div>
    </div>
  )
}

const Jobs: React.FC<{ jobs: any[] }> = ({jobs}) => {

  return (
    <div className="jobs">
      {jobs.filter((job) => job?.node?.id).reverse().map((job) => (
        <Job job={job} key={job?.node?.id}/>
      ))}
    </div>
  )
}

export default Jobs
