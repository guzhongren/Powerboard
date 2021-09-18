import * as React from "react";
import useSWR from "swr";
import { parse } from "query-string";
import { useState, useEffect } from "react";
import * as dayjs from "dayjs";
import { Responsive, WidthProvider, Layouts } from "react-grid-layout";
import { isEqual } from "lodash";
import { buildKiteQuery, fetcher } from "@root/fetcher";
import { mergePipelinesWithResponse } from "@root/help";
import Pipeline from "@root/Pipline/Pipeline";
import Titan from "@root/Titan/Titan";
import Auth from "@root/Auth/Auth";
import { getLayouts, saveLayouts } from "../Utils/LayoutStorageUtils";
import { DEFAULT_ITEM_LAYOUT } from "../Constants/Grid";
import { PIPELINE_AUTO_REFRESH_PERIOD } from "../Constants/Config";
import { IAuth } from "../Constants/Auth";

const ReactGridLayout = WidthProvider(Responsive);

const Grid: React.FC<{
  authConfig?: IAuth;
}> = ({ authConfig }) => {
  const [lastUpdateTime, setLastUpdateTime] = useState(dayjs());
  const [layouts] = useState(getLayouts() || {});
  const [auth, setAuth] = useState(authConfig);

  const { data, error } = useSWR(
    [buildKiteQuery(auth?.org, auth?.team, auth?.search), auth?.token],
    fetcher,
    {
      refreshInterval: PIPELINE_AUTO_REFRESH_PERIOD,
      onSuccess: () => {
        setLastUpdateTime(dayjs());
      },
    }
  );
  if (error) {
    return (
      <>
        <div className="window-error">
          <pre>{JSON.stringify(error?.response, null, 2)}</pre>
        </div>
        <Auth
          message="API ERROR, Please check your config"
          onConfigChanged={(auth: IAuth) => {
            setAuth(auth);
          }}
        />
      </>
    );
  }

  const mergedData = mergePipelinesWithResponse(data);

  const pipelines = mergedData?.organization?.pipelines?.edges || [];

  const defaultLayoutProps = {
    className: "container",
    cols: { lg: 100, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 6,
    onLayoutChange: (layout: any, layoutsParam: Layouts) => {
      const storedLayout = getLayouts();
      if (layout.length === 0 && layoutsParam.lg.length <= 0) {
        console.info("init");
      } else {
        if (!isEqual(layoutsParam, storedLayout)) {
          saveLayouts(layoutsParam);
        }
      }
    },
  };
  return (
    <React.Fragment>
      <Titan
        lastUpdate={lastUpdateTime}
        onConfigChanged={(auth) => setAuth(auth)}
      />
      {pipelines.length === 0 && data && (
        <Auth
          message="No pipelines found, Please check your config"
          onConfigChanged={(auth: IAuth) => setAuth(auth)}
        />
      )}
      <ReactGridLayout {...defaultLayoutProps} layouts={layouts}>
        {pipelines.map((pipeline: any, index: number) => {
          const layoutProps = layouts.lg ? layouts.lg[index] : {};
          return (
            <div
              key={index}
              className="pipelines"
              data-grid={{
                ...DEFAULT_ITEM_LAYOUT,
                ...layoutProps,
                y: index + 10,
              }}
            >
              <Pipeline pipeline={pipeline} key={pipeline.node.name} />
            </div>
          );
        })}
      </ReactGridLayout>
    </React.Fragment>
  );
};

export default Grid;
