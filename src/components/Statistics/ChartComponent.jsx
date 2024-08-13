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
import { useSelector } from "react-redux";
import { selectedMonthDays } from "../../redux/water/selectors-water.js";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
} from "date-fns";
import { useLayoutEffect, useRef, useState } from "react";

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

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <text x={x} y={y} textAnchor="middle" fill="#323f47" fontSize={15} dy={20}>
      {payload.value}
    </text>
  );
};

const ChartComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const isSmallScreen = useMediaQuery("(max-width:767px)");
  const isTabletScreen = useMediaQuery(
    "(min-width:768px) and (max-width:1439px)"
  );

  const monthlyWaterItems = useSelector(selectedMonthDays);
  const today = new Date();

  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);

  const hasCurrentMonthData = monthlyWaterItems.some(
    (item) =>
      format(new Date(item.date), "yyyy-MM") ===
      format(startOfCurrentMonth, "yyyy-MM")
  );

  const { start, end } = hasCurrentMonthData
    ? { start: startOfCurrentMonth, end: endOfCurrentMonth }
    : monthlyWaterItems.length > 0
    ? {
        start: startOfMonth(parseISO(monthlyWaterItems[0].date)),
        end: endOfMonth(parseISO(monthlyWaterItems[0].date)),
      }
    : { start: startOfCurrentMonth, end: endOfCurrentMonth };

  const dateArray = eachDayOfInterval({
    start,
    end,
  }).map((date) => format(date, "yyyy-MM-dd"));

  const dataMap = monthlyWaterItems.reduce((acc, item) => {
    const itemDate = format(new Date(item.date), "yyyy-MM-dd");
    acc[itemDate] = item.sumWaterAmount || 0;
    return acc;
  }, {});

  const chartData = dateArray.map((date) => ({
    date: format(new Date(date), "d"),
    volume: dataMap[date] || 0,
  }));

  const maxVolume = Math.max(...chartData.map((item) => item.volume), 0);

  const formatYAxis = (tickItem) => {
    if (tickItem === 0) {
      return "0%";
    }
    const yTicks = (tickItem / 1000).toFixed(1);
    return `${yTicks} L`;
  };

  const yAxisPadding = isSmallScreen ? 5 : isTabletScreen ? 14 : 14;

  const tickStyle = {
    fontWeight: 400,
    lineHeight: isSmallScreen ? "129%" : "149%",
  };

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setScrollPosition(value);
    if (containerRef.current) {
      requestAnimationFrame(() => {
        containerRef.current.scrollLeft = value;
      });
    }
  };

  const updateMaxScroll = () => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.clientWidth;
      setMaxScroll(scrollWidth - clientWidth);
    }
  };

  useLayoutEffect(() => {
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    return () => {
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, [chartData]);

  return (
    <div className={css.chartContainer}>
      <div className={css.chartWrapper} ref={containerRef}>
        <div className={css.chartContent}>
          <ResponsiveContainer
            width="100%"
            height={isSmallScreen ? 256 : 266}
            style={{ paddingBottom: 0 }}
          >
            <AreaChart
              data={chartData}
              margin={{ top: 42, right: 10, left: 0, bottom: 0 }}
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
                tick={<CustomXAxisTick />}
                interval={0}
                padding={{ top: 0, bottom: 0 }}
                tickMargin={0}
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
                  dx: -45,
                }}
                padding={{ bottom: yAxisPadding }}
                ticks={[...Array(6).keys()].map(
                  (i) => (i / 5) * maxVolume + i * 0.0001
                )}
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
      </div>
      <input
        type="range"
        min="0"
        max={maxScroll}
        value={scrollPosition}
        onChange={handleSliderChange}
        className={css.scrollSlider}
      />
    </div>
  );
};

export default ChartComponent;
