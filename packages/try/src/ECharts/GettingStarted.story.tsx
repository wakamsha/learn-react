import { init, type ECharts } from 'echarts';
import { type ECBasicOption } from 'echarts/types/dist/shared';
import { useEffect, useRef, type FC } from 'react';

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

    const option: ECBasicOption = {
      title: {
        text: 'ECharts Getting Started Example',
      },
      tooltip: {},
      legend: {
        data: ['sales'],
      },
      xAxis: {
        data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks'],
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            color: 'red',
            opacity: 0.5,
            formatter: 'This is a normal label.',
          },
          emphasis: {
            itemStyle: {
              // Color in emphasis state.
              color: 'blue',
              opacity: 1,
            },
            label: {
              show: true,
              // Text in emphasis.
              formatter: 'This is a emphasis label.',
            },
          },
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
      <h2>Getting Started with ECharts</h2>
      <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};
