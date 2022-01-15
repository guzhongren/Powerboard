import * as React from 'react'

const Job: React.FC<{ job: any }> = ({ job }) => {
  const jobData = job?.node || {}
  return (
    <div className="job">
      <div>
        {jobData.label}
        {jobData.passed && <i className="icon check" />}
        {jobData.passed === false && jobData.state === 'FINISHED' && (
          <i className="icon error" />
        )}
        {jobData.state === 'RUNNING' && <i className="icon loading" />}
        {jobData.state === 'WAITING' && <i className="icon waiting" />}
      </div>
    </div>
  )
}

const Jobs: React.FC<{ jobs: any[] }> = ({ jobs }) => {
  return (
    <div className="jobs">
      {jobs
        .filter((job) => job?.node?.id)
        .reverse()
        .map((job) => (
          <Job job={job} key={job?.node?.id} />
        ))}
    </div>
  )
}

export default Jobs
