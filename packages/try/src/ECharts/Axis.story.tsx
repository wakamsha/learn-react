import { BarChart, LineChart } from 'echarts/charts';
import { init, use, type ECharts } from 'echarts/core';
import { type ECBasicOption } from 'echarts/types/dist/shared';
import { useEffect, useRef, type FC } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
use([BarChart, LineChart]);

/**
 * @see {@link https://echarts.apache.org/handbook/en/concepts/axis | ECharts Axis}
 */
export const Story: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<ECharts>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    chartRef.current = init(containerRef.current);

    const option: ECBasicOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {},
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            rotate: 30,
          },
          data: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          position: 'right',
          axisLabel: {
            formatter: '{value} ml',
          },
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          position: 'left',
          axisLabel: {
            formatter: '{value} °C',
          },
        },
      ],
      series: [
        {
          name: 'Precipitation',
          type: 'bar',
          yAxisIndex: 0,
          data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36, 19.3],
        },
        {
          name: 'Temperature',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [6, 10.2, 10.3, 11.5, 10.3, 13.2, 14.3, 16.4, 18, 16.5, 12, 5.2],
        },
      ],
    };

    chartRef.current.setOption(option);

    return () => {
      chartRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      chartRef.current?.resize();
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <h2>Axis Demo with ECharts</h2>
      <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};
