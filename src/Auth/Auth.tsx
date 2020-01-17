import * as React from 'react'
import { useState } from 'react'
import './Auth.scss'
import { stringify } from 'query-string'
import { compact, union } from 'lodash'

const Auth: React.FC = () => {

  const [token, setToken] = useState('')
  const [team, setTeam] = useState('')
  const [search, setSearch] = useState('')
  const [orz, setOrz] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {

    if (token && team && search && orz) {

      const parsedSearch = union(compact(search.split(/\n|\s/)))

      location.search = stringify({
        token, team, search: parsedSearch, orz,
      })
    } else {
      setError(true)
    }
  }

  return (
    <div className="auth">
      <div>
        <label>
          <span>Access Token</span>
          <div>
            make sure your access token can access pipelines you filling.
            <a href="https://buildkite.com/user/api-access-tokens" target="_blank">generate a Token </a>
          </div>
          <input type="text"
                 value={token}
                 onChange={(event) => {
                   setToken(event.target.value)
                 }}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Organization Name</span>
          <input type="text"
                 value={orz}
                 onChange={(event) => {
                   setOrz(event.target.value)
                 }}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Team Name</span>
          <input type="text"
                 value={team}
                 onChange={(event) => {
                   setTeam(event.target.value)
                 }}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Pipeline Name</span>
          <textarea
            placeholder={`pipeline-a\npipeline-b\npipeline-c\npipeline-d`}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
            }}
          />
        </label>
      </div>
      {error && <div className="auth__error">Need fill all!</div>}
      <div>
        <div className="btn" onClick={submit}>Go!</div>
      </div>
    </div>
  )
}

export default Auth
