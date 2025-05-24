import { BarChart, LineChart } from 'echarts/charts';
import { init, use, type ECharts } from 'echarts/core';
import { useEffect, useRef, type FC } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
use([BarChart, LineChart]);

type CustomTooltipParams = {
  seriesName: string;
  value: number;
  color: string;
  marker: string;
  axisValue: string;
};

/**
 *
 * @see {@link https://echarts.apache.org/handbook/en/get-started/ Getting Started}
 */
export const Story: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<ECharts>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    chartRef.current = init(containerRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params: CustomTooltipParams[]) => {
          const { axisValue } = params[0];
          const tooltipHtml = params
            .map((param) => {
              const value = param.seriesName === 'CVR_A' ? `${param.value}%` : param.value;
              return `<div style="color:${param.color};">${param.marker} ${param.seriesName}: ${value}</div>`;
            })
            .join('');

          return `<strong>${axisValue}</strong><br/>${tooltipHtml}`;
        },
        backgroundColor: 'rgba(0,0,0,0.75)',
        borderRadius: 6,
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        data: ['imp_A', 'imp_B', 'CVR_A'],
      },
      xAxis: {
        type: 'category',
        data: ['5/2', '5/3', '5/4', '5/5', '5/6', '5/7', '5/8'],
      },
      yAxis: [
        {
          type: 'value',
          name: 'Impression',
          position: 'left',
        },
        {
          type: 'value',
          name: 'CVR (%)',
          position: 'right',
          axisLabel: {
            formatter: '{value} %',
          },
        },
      ],
      series: [
        {
          name: 'imp_A',
          label: {
            show: true,
            rotate: 45,
            position: 'insideBottom',
            color: 'red',
          },
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0.9, 1],
          itemStyle: {
            color: 'rgba(54, 162, 235, 0.6)',
          },
        },
        {
          name: 'imp_B',
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0.95, 0.95],
          itemStyle: {
            color: 'rgba(255, 159, 64, 0.6)',
          },
        },
        {
          name: 'CVR_A',
          type: 'line',
          yAxisIndex: 1,
          data: [0, 0, 0, 0, 0, 60, 110],
          itemStyle: {
            color: 'rgba(54, 162, 235, 1)',
          },
          lineStyle: {
            width: 2,
          },
          smooth: true,
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
      <h2>Mixed Chart Type with ECharts</h2>
      <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};
