import * as React from 'react'
import { useState } from 'react'
import './Auth.scss'
import { parse, stringify } from 'query-string'
import { compact, union, isArray } from 'lodash'

const Auth: React.FC<{message?: string}> = (props) => {

  const params = parse(location.search) as {
    orz: string
    team: string
    search: string
    token: string
  }

  const searchQuery = isArray(params.search) ? params.search.join('\n') : params.search

  const [token, setToken] = useState(params.token)
  const [team, setTeam] = useState(params.team)
  const [search, setSearch] = useState(searchQuery)
  const [orz, setOrz] = useState(params.orz)

  const submit = () => {

    const parsedSearch = search ? union(compact(search.split(/\n|\s/))) : ''

    location.search = stringify({
      token, team, search: parsedSearch, orz,
    })
  }

  return (
    <div className="auth">
      {props.message && (
        <div className="auth__message">
          {props.message}
        </div>
      )}
      <div>
        <label>
          <span>* Access Token</span>
          <div>
            make sure your access token can access pipelines you filling.
            <a href="https://buildkite.com/user/api-access-tokens" target="_blank">generate a Token </a>
          </div>
          <input type="text"
                 value={token}
                 onChange={(event) => {
                   setToken(event.target.value)
                 }}
                 required={true}
          />
        </label>
      </div>
      <div>
        <label>
          <span>* Organization Name</span>
          <input type="text"
                 value={orz}
                 onChange={(event) => {
                   setOrz(event.target.value)
                 }}
                 required={true}
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
      <div>
        <div className="btn" onClick={submit}>Go!</div>
      </div>
    </div>
  )
}

export default Auth
