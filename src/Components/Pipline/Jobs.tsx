import * as React from 'react'
import Job from './Job'

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
