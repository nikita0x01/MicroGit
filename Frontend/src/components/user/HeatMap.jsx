import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

/**
 * Generate activity data for the past year
 */
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 5);
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

/**
 * HeatMapComponent - Wrapper for contribution activity visualization
 * Displays a GitHub-style contribution graph for the past year
 */
const HeatMapComponent = () => {
  const [activityData, setActivityData] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    // Calculate date range: past year
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setFullYear(startDate.getFullYear() - 1);

    setDateRange({ start: startDate, end: endDate });

    // Generate activity data
    const data = generateActivityData(startDate, endDate);
    setActivityData(data);
  }, []);

  return (
    <div style={{ width: "100%", overflowX: "auto", padding: "12px 0" }}>
      <HeatMap
        value={activityData}
        width="100%"
        startDate={dateRange.start}
        endDate={dateRange.end}
        rectSize={13}
        legendCellSize={0}
        space={4}
        square={true}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        monthLabels={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]}
        panelColors={{
          0: "#ebedf0",
          1: "#c6e48b",
          2: "#7bc96f",
          3: "#239a3b",
          4: "#196127",
        }}
        rectProps={{
          rx: 2,
        }}
      />
    </div>
  );
};

export default HeatMapComponent;