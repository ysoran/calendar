import React from "react";

const moment = require("moment");
import Flex, { FlexItem } from "../Flex";
import Typography from "../Typography";
import styled from "styled-components";

const renderData = (dates, day, addMinutes) => {
  return dates.map((each) => {
    const theDate = day + each;
    let start = moment(theDate).utc().format("hh:mmA");
    let end = moment(theDate).utc().add(addMinutes, "minutes").format("hh:mmA");
    return (
      <StyledTimeRange key={`${theDate}`}>
        {start.toLowerCase()} - {end.toLowerCase()}
      </StyledTimeRange>
    );
  });
};

export default function Day({ day, data, addMinutes = 0 }) {
  const dayFormat = moment(day).format("ddd");
  const dateFormat = moment(day).format("MMM DD");
  return (
    <FlexItem seven noPadding>
      <Flex margin="0 0 10px" alignCenter>
        <Typography margin="0 5px 0 0" bold>
          {dayFormat}
        </Typography>
        <Typography margin="0" bold small dimmed>
          {dateFormat}
        </Typography>
      </Flex>
      <Flex>
        {data.length > 0 ? (
          renderData(data, day, addMinutes)
        ) : (
          <StyledEmptyWrapper>
            <StyledEmpty />
          </StyledEmptyWrapper>
        )}
      </Flex>
    </FlexItem>
  );
}

const StyledTimeRange = styled.div`
  margin: 0.5rem 0.5rem 0 0;
  background-color: #3c7ee6;
  color: white;
  font-size: 0.7rem;
  padding: 0.7rem;
`;

const StyledEmpty = styled.div`
  background-color: #eaeaea;
  width: 94%;
  height: 100%;
  position: absolute;
`;

const StyledEmptyWrapper = styled.div`
  position: relative;
  min-height: 35rem;
  background: white;
  width: 100%;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0;
`;
