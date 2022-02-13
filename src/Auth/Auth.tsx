import * as React from 'react'
import { useState } from 'react'
import './Auth.scss'
import { saveValue, getValueByKey } from '../Utils/LocalStorageUtils'
import { saveLayouts, getLayouts } from '../Utils/LayoutStorageUtils'
import { DASHBOARD_AUTH, IAuth } from '../Constants/Auth'
import { importJsonFile, downloadConfig } from '../Utils/JsonFileProcessor'
import { convertToJSON, convertToString } from '../Utils/ConvertUtils'
import { splitSearch } from '@root/Utils/StringUtils'

const Auth: React.FC<{
  message?: string
  onConfigChanged?: (auth: IAuth) => void
}> = ({ message, onConfigChanged }) => {
  const downloadFileName = 'dashboardConfig.json'
  const [token, setToken] = useState(getValueByKey(DASHBOARD_AUTH.TOKEN))
  const [team, setTeam] = useState(getValueByKey(DASHBOARD_AUTH.TEAM))
  const [search, setSearch] = useState(
    convertToJSON(getValueByKey(DASHBOARD_AUTH.SEARCH))
  )
  const [oncall, setOncall] = useState(convertToJSON(getValueByKey(DASHBOARD_AUTH.ONCALL)))
  const [orz, setOrz] = useState(getValueByKey(DASHBOARD_AUTH.ORG))

  const storeConfig = () => {
    saveValue(DASHBOARD_AUTH.ORG, orz)
    saveValue(DASHBOARD_AUTH.TEAM, team)
    saveValue(DASHBOARD_AUTH.SEARCH, convertToString(search))
    saveValue(DASHBOARD_AUTH.TOKEN, token)
    saveValue(DASHBOARD_AUTH.ONCALL, convertToString(oncall))
  }

  const submit = () => {
    storeConfig()
    onConfigChanged({
      org: orz,
      team,
      search,
      token,
      oncall,
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
          setSearch(data.search|| [])
          setOncall(data.oncall)
          saveLayouts(data.layout || {})
          console.log('successfully imported')
        },
        (err) => {
          console.error(err)
        }
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
    }
    downloadConfig(
      dlAnchorElem,
      { ...config, layout: getLayouts() },
      downloadFileName
    )
  }

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
            >
              generate a Token{' '}
            </a>
          </div>
          <input
            type="text"
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
            placeholder={`Support multiple projects, like :\npipeline-a\npipeline-b\npipeline-c\npipeline-d`}
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
            placeholder={`{\n"startDate": "2021-09-15", \n"names":["PengChong","FengWen","YiChen","Lina","ZhongRen","XuDong","Zhang Yu"]\n}`}
            value={oncall && convertToString(oncall) || ''}
            onChange={(event) => {
              setOncall(event.target.value)
            }}
          />
        </label>
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
