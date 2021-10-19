import * as React from "react";
import { useState } from "react";
import * as dayjs from "dayjs";
import { useEffect } from "react";
import "./OncallPannel.scss";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { isMemberName } from "typescript";

dayjs.extend(relativeTime);

const OncallPannel: React.FC<{ oncallListJSONString?: string }> = ({
  oncallListJSONString,
}) => {
  const [isEmptyString, setIsEmptyString] = useState(
    oncallListJSONString.length === 0 || !oncallListJSONString
  );
  let startDate;
  let names;
  let index;
  let nextIndex;

  if (!isEmptyString) {
    const data = JSON.parse(oncallListJSONString);
    startDate = dayjs(data.startDate);
    names = data.names;
    const diffDays = dayjs().diff(startDate, "day");
    index = Math.floor(diffDays / 7) % names.length;
    nextIndex = index + 1 >= names.length ? 0 : index + 1;
  }

  return (
    <React.Fragment>
      {!isEmptyString && (
        <div className="notice">
          <div className="oncall">
            <div className="oncall__item">
              <span className="oncall__item-title">Primary On-call</span>
              <span className="oncall__item-name">{names[index]}</span>
            </div>
            <div className="oncall__item">
              <span className="oncall__item-title">Secondary On-call</span>
              <span className="oncall__item-name">{names[nextIndex]}</span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default OncallPannel;
