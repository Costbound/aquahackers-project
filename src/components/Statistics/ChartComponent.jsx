import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import css from "./ChartComponent.module.css";
import { useMediaQuery } from "@mui/material";
import sprite from "../../img/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectedMonthDays } from "../../redux/water/selectors-water.js";
import { format, subDays } from "date-fns";

const CustomTooltip = ({ active = false, payload = [], coordinate }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate;

    return (
      <svg
        className={css.tooltipIcon}
        width="80"
        height="48"
        style={{ left: x, top: y }}
      >
        <use href={`${sprite}#icon-Tooltip`}></use>
        <text className={css.label}>{`${payload[0].value} ml`}</text>
      </svg>
    );
  }
  return null;
};

const ChartComponent = () => {
  const monthlyWaterItems = useSelector(selectedMonthDays);
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const dateArray = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    dateArray.push(format(date, "yyyy-MM-dd"));
  }

  const dataMap = monthlyWaterItems.reduce((acc, item) => {
    const itemDate = format(new Date(item.date), "yyyy-MM-dd");
    if (new Date(item.date) >= sevenDaysAgo) {
      acc[itemDate] = item.sumWaterAmount || 0;
    }
    return acc;
  }, {});

  const chartData = dateArray.map((date) => ({
    date: format(new Date(date), "d"),
    volume: dataMap[date] || 0,
  }));

  const maxVolume = Math.max(...chartData.map((item) => item.volume));

  const formatYAxis = (tickItem) => {
    if (tickItem === 0) {
      return "0%";
    }
    const yTicks = (tickItem / 1000).toFixed(1);
    return `${yTicks} L`;
  };

  const isSmallScreen = useMediaQuery("(max-width:767px)");
  const isTabletScreen = useMediaQuery(
    "(min-width:768px) and (max-width:1439px)"
  );

  const yAxisPadding = isSmallScreen ? 5 : isTabletScreen ? 14 : 14;

  const tickStyle = {
    fontWeight: 400,
    lineHeight: isSmallScreen ? "129%" : "149%",
  };

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer
        width="100%"
        height={isSmallScreen ? 256 : 260}
        style={{ paddingBottom: 0 }}
      >
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="colorValue"
              x1="189.618"
              y1="257"
              x2="193.11"
              y2="7.79258"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9be1a0" stopOpacity={0} />
              <stop offset="1" stopColor="#9be1a0" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#323f47",
              fontSize: 15,
              ...tickStyle,
            }}
            padding={{ top: 0, bottom: 0 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxis}
            tick={{
              fill: "#323f47",
              fontSize: isSmallScreen ? 14 : 15,
              ...tickStyle,
              textAnchor: "start",
              dx: -40,
            }}
            padding={{ bottom: yAxisPadding }}
            ticks={[...Array(6).keys()].map((i) => (i / 5) * maxVolume)}
            domain={[0, maxVolume]}
            type="number"
            scale="linear"
            interval="preserveEnd"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            dataKey="volume"
            stroke="#87d28d"
            strokeWidth={isSmallScreen ? 2 : 3}
            fill="url(#colorValue)"
            dot={{
              r: isSmallScreen ? 6 : 9,
              stroke: "#87d28d",
              fill: "#ffffff",
              fillOpacity: 1,
              strokeWidth: isSmallScreen ? 2 : 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
