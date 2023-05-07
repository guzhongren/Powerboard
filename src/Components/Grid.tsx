import * as React from 'react'
import useSWR from 'swr'
import { useState, useEffect, useMemo } from 'react'
import * as dayjs from 'dayjs'
import { Responsive, WidthProvider, Layouts } from 'react-grid-layout'
import { isEqual } from 'lodash'
import { buildKiteQuery, fetcher } from '../fetcher'
import { mergePipelinesWithResponse } from '../help'
import Pipeline from './Pipline/Pipeline'
import Titan from './Titan/Titan'
import Auth from './Auth/Auth'
import { getLayouts, saveLayouts } from '../Utils/LayoutStorageUtils'
import {
  DEFAULT_ITEM_LAYOUT,
  GRID_ITEM_DEFAULT_HEIGHT,
  SCREEN_WIDTH,
} from '../Constants/Grid'
import { PIPELINE_AUTO_REFRESH_PERIOD } from '../Constants/Config'
import { IAuth } from '../Constants/Auth'
import OncallPannel from './OncallPannel/OncallPannel'
import { convertToJSON } from '../Utils/ConvertUtils'

const ReactGridLayout = WidthProvider(Responsive)

const FAILED = 'FAILED'

const Grid: React.FC<{
  authConfig?: any
}> = ({ authConfig }) => {
  const [lastUpdateTime, setLastUpdateTime] = useState(dayjs())
  const [layouts, setLayouts] = useState(getLayouts() || {})
  const [auth, setAuth] = useState(authConfig)
  const [retry, setRetry] = useState(true)

  const { data, error } = useSWR(
    [
      buildKiteQuery(
        auth?.org,
        auth?.team,
        auth?.search,
        auth.isOnlyMainBranch,
      ),
      auth?.token,
    ],
    fetcher,
    {
      refreshInterval: PIPELINE_AUTO_REFRESH_PERIOD,
      onSuccess: () => {
        setLastUpdateTime(dayjs())
      },
    },
  )
  if (error) {
    return (
      <>
        <div className="window-error">
          <pre>{JSON.stringify(error?.response, null, 2)}</pre>
        </div>
        <Auth
          message="API ERROR, Please check your config"
          onConfigChanged={(auth: IAuth) => {
            setAuth(auth)
          }}
        />
      </>
    )
  }

  const mergedData = mergePipelinesWithResponse(data)

  const pipelines = mergedData?.organization?.pipelines?.edges || []

  useEffect(() => {
    const timer = setInterval(() => {
      setRetry(!retry)
      const statuses = pipelines.map(
        (pipeline: any) => pipeline.node?.builds?.edges?.[0]?.node?.state,
      )
      if (statuses.includes(FAILED)) {
        if (retry) {
          const failedCount = statuses.filter(
            (status: any) => status === FAILED,
          ).length
          document.title = `🚨 ${failedCount} Failed`
        } else {
          defaultTitle()
        }
      } else {
        defaultTitle()
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  const defaultTitle = () => {
    document.title = 'Powerboard'
  }

  const defaultLayoutProps = {
    className: 'container',
    cols: {
      lg: SCREEN_WIDTH,
    },
    rowHeight: GRID_ITEM_DEFAULT_HEIGHT,
    onLayoutChange: (layout: any, layoutsParam: Layouts) => {
      const storedLayout = getLayouts()
      if (
        layout.length === 0 &&
        (layoutsParam.md?.length <= 0 || layoutsParam.lg?.length <= 0)
      ) {
        console.info('init')
      } else {
        if (!isEqual(layoutsParam, storedLayout)) {
          saveLayouts(layoutsParam)
        }
      }
    },
  }

  const authChangeHandler = (auth: IAuth) => {
    setAuth(auth)
    setLayouts((layouts: Layouts) => {
      const lg = layouts?.lg?.map((item: any) => {
        item.w = SCREEN_WIDTH / auth.columnCount
        return item
      })
      return {
        layouts: {
          lg,
        },
      }
    })
  }

  const authColumnCount = auth?.columnCount || 1

  useEffect(() => {
    const columnWidth = SCREEN_WIDTH / authColumnCount
    const newLayout: Array<any> = pipelines.map(
      (pipeline: any, index: number) => {
        const layoutProps = layouts.lg ? layouts.lg[index] : {}
        const currentColumn = index % authColumnCount
        return {
          ...DEFAULT_ITEM_LAYOUT,
          ...layoutProps,
          i: index,
          x: columnWidth * currentColumn,
          y: index + GRID_ITEM_DEFAULT_HEIGHT,
          w: columnWidth,
        }
      },
    )
    setLayouts({ lg: newLayout })
  }, [authColumnCount, data])

  const pipelineGrid = useMemo(() => {
    const authColumnCount = auth.columnCount || 1
    const breakpoints = { lg: SCREEN_WIDTH }
    return (
      <ReactGridLayout
        {...defaultLayoutProps}
        layouts={layouts}
        breakpoints={breakpoints}
      >
        {pipelines.map((pipeline: any, index: number) => {
          const layoutProps = getLayouts()?.lg ? getLayouts().lg[index] : {}
          const currentColumn = index % authColumnCount
          const columnWidth = SCREEN_WIDTH / authColumnCount
          const dataGrid = {
            ...DEFAULT_ITEM_LAYOUT,
            ...layoutProps,
            i: index,
            w: columnWidth,
            x: columnWidth * currentColumn,
            y: index + GRID_ITEM_DEFAULT_HEIGHT,
          }
          return (
            <div key={index} className="pipelines" data-grid={dataGrid}>
              <Pipeline pipeline={pipeline} key={pipeline.node.name} />
            </div>
          )
        })}
      </ReactGridLayout>
    )
  }, [auth.columnCount, pipelines])

  return (
    <React.Fragment>
      <Titan lastUpdate={lastUpdateTime} onConfigChanged={authChangeHandler} />
      {pipelines.length === 0 && data && (
        <Auth
          message="No pipelines found, Please check your config"
          onConfigChanged={authChangeHandler}
        />
      )}
      {auth.oncall && (
        <OncallPannel oncallListJSON={convertToJSON(auth.oncall)} />
      )}
      {pipelineGrid}
    </React.Fragment>
  )
}

export default Grid
