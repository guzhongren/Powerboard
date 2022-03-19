import * as React from 'react'
import { useState } from 'react'
import './Auth.scss'
import { saveValue, getValueByKey } from '../../Utils/LocalStorageUtils'
import { saveLayouts, getLayouts } from '../../Utils/LayoutStorageUtils'
import { DASHBOARD_AUTH, IAuth } from '../../Constants/Auth'
import { importJsonFile, downloadConfig } from '../../Utils/JsonFileProcessor'
import { convertToJSON, convertToString } from '../../Utils/ConvertUtils'
import { splitSearch } from '../../Utils/StringUtils'

const defaultColumnCount = 10

const Auth: React.FC<{
  message?: string
  onConfigChanged?: (auth: IAuth) => void
}> = ({ message, onConfigChanged }) => {
  const downloadFileName = 'dashboardConfig.json'
  const [token, setToken] = useState(getValueByKey(DASHBOARD_AUTH.TOKEN) || '')
  const [team, setTeam] = useState(getValueByKey(DASHBOARD_AUTH.TEAM) || '')
  const [search, setSearch] = useState(
    convertToJSON(getValueByKey(DASHBOARD_AUTH.SEARCH)),
  )
  const [oncall, setOncall] = useState(
    convertToJSON(getValueByKey(DASHBOARD_AUTH.ONCALL)),
  )
  const [orz, setOrz] = useState(getValueByKey(DASHBOARD_AUTH.ORG) || '')
  const [isOnlyMainBranch, setIsOnlyMainBranch] = useState(
    getValueByKey(DASHBOARD_AUTH.IS_ONLY_MAIN_BRANCH) === 'true',
  )
  const [columnCount, setColumnCount] = useState(
    parseInt(getValueByKey(DASHBOARD_AUTH.COLUMN_COUNT)) || 1,
  )

  const storeConfig = () => {
    saveValue(DASHBOARD_AUTH.ORG, orz)
    saveValue(DASHBOARD_AUTH.TEAM, team)
    saveValue(DASHBOARD_AUTH.SEARCH, convertToString(search))
    saveValue(DASHBOARD_AUTH.TOKEN, token)
    saveValue(DASHBOARD_AUTH.ONCALL, convertToString(oncall))
    saveValue(DASHBOARD_AUTH.IS_ONLY_MAIN_BRANCH, `${isOnlyMainBranch}`)
    saveValue(DASHBOARD_AUTH.COLUMN_COUNT, columnCount)
  }

  const submit = () => {
    storeConfig()
    onConfigChanged({
      org: orz,
      team,
      search,
      token,
      oncall,
      isOnlyMainBranch,
      columnCount,
    })
  }

  const importConfig = (evt: any) => {
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0]
      importJsonFile(file).then(
        (data: any) => {
          setToken(data.token || 'Invalided access token!')
          setOrz(data.org || 'Invalided organization name!')
          setTeam(data.team || '')
          setSearch(data.search || [])
          setOncall(data.oncall)
          setIsOnlyMainBranch(data.isOnlyMainBranch || false)
          setColumnCount(data.columnCount || 1)
          saveLayouts(data.layout || {})
          console.log('successfully imported')
        },
        (err) => {
          console.error(err)
        },
      )
    }
  }

  const exportConfigHandler = () => {
    const dlAnchorElem = document.getElementById('downloadAnchorElem')
    const config: IAuth = {
      org: orz,
      team,
      search,
      token,
      oncall,
      isOnlyMainBranch,
      columnCount,
    }
    downloadConfig(dlAnchorElem, config, downloadFileName)
  }
  const columChangeHandler = (evt: any) => {
    setColumnCount(parseInt(evt.target.value) || 0)
  }

  const oncallPlaceholder = () =>
    JSON.stringify(
      {
        startDate: '2021-09-15',
        names: ['P', 'F', 'Y', 'L', 'Z', 'X', 'Yu'],
      },
      null,
      2,
    )

  return (
    <div className="auth">
      {message && <div className="auth__message">{message}</div>}
      <div>
        <label>
          <span>* Access Token</span>
          <div>
            make sure your access token can access pipelines you filling.
            <a
              href="https://buildkite.com/user/api-access-tokens"
              target="_blank"
              rel="noreferrer"
            >
              generate a Token{' '}
            </a>
          </div>
          <input
            type="password"
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
          <input
            type="text"
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
          <input
            type="text"
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
            id="pipelines"
            placeholder={
              'Support multiple projects, like :\npipeline-a\npipeline-b\npipeline-c\npipeline-d'
            }
            value={search?.join('\n')}
            onChange={(event) => {
              setSearch(splitSearch(event.target.value || ''))
            }}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Oncall List</span>
          <textarea
            id="oncallList"
            placeholder={oncallPlaceholder()}
            value={(oncall && convertToString(oncall)) || ''}
            onChange={(event) => {
              setOncall(event.target.value)
            }}
          />
        </label>
      </div>
      <div className="auth__message-line">
        <span>
          <input
            type="checkbox"
            id="justOnlyMainBranch"
            checked={isOnlyMainBranch}
            onChange={() => setIsOnlyMainBranch(!isOnlyMainBranch)}
          />
          <label htmlFor="justOnlyMainBranch">Just only show master</label>
        </span>
        <span>
          <label htmlFor="columnCount">Column count</label>
          <select
            name="columnCount"
            value={columnCount}
            onChange={columChangeHandler}
          >
            {Array.from(Array(defaultColumnCount + 1).keys())
              .splice(1)
              .map((x) => {
                return (
                  <option key={x} value={x}>
                    {x}
                  </option>
                )
              })}
          </select>
        </span>
      </div>
      <div className="operation">
        <div>
          <label htmlFor="import">Import config</label>
          <input
            className="import"
            onChange={importConfig}
            type="file"
            id="import"
            name="import"
            multiple={false}
          />
        </div>
        <div>
          <a id="downloadAnchorElem" style={{ display: 'none' }} />
          <button id="download" onClick={exportConfigHandler}>
            Export config
          </button>
        </div>
      </div>

      <div>
        <div className="btn" onClick={submit}>
          Go!
        </div>
      </div>
    </div>
  )
}

export default Auth
