import React from "react";

import Day from "../Day";
import Flex from "../Flex";
const moment = require("moment");

const renderDays = (dataMap, addMinutes) => {
  const currentWeek = Object.keys(dataMap);
  return currentWeek.map((day) => {
    return (
      <Day
        key={day.toString()}
        day={day}
        data={dataMap[day]}
        addMinutes={addMinutes}
      />
    );
  });
};

const fillSortedMap = (map, firstDate) => {
  const sortedMap = [];
  let nextDate = firstDate;
  for (let i = 0; i < 7; i++) {
    const timeString = moment(nextDate).format("YYYY-MM-DD");
    const mapKey = timeString.substring(0, 10);
    sortedMap[mapKey] = map[mapKey] ? map[mapKey] : [];
    nextDate = moment(nextDate).add(1, "days");
  }

  return sortedMap;
};

const normalizeData = (data) => {
  const map = [];
  let firstDate = null;
  data.data.timeslots.forEach((eachTime) => {
    const date = eachTime.substring(0, 10);
    if (!firstDate) {
      firstDate = eachTime;
    }
    const time = eachTime.substring(10);
    if (map[date]) {
      map[date].push(time);
    } else {
      const timeArray = [];
      timeArray.push(time);
      map[date] = timeArray;
    }
  });
  return fillSortedMap(map, firstDate);
};

const getMinutes = (data) => {
  return data.data.timeslotLengthMinutes;
};

export default function Calendar(data) {
  const dataMap = normalizeData(data);
  const addMinutes = getMinutes(data);
  return <Flex justifyAround>{renderDays(dataMap, addMinutes)}</Flex>;
}
