import { init, type ECharts } from 'echarts';
import { type ECBasicOption } from 'echarts/types/dist/shared';
import { useEffect, useRef, type FC } from 'react';

/**
 *
 * @see {@link https://echarts.apache.org/handbook/en/concepts/legend | ECharts Legend}
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
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        // backgroundColor: '#333',
        // textStyle: {
        //   color: '#fff',
        // },
        data: [
          {
            name: '2015',
            icon: 'rect',
          },
          {
            name: '2016',
            icon: 'circle',
          },
          {
            name: '2017',
            icon: 'pin',
          },
        ],
      },
      tooltip: {},
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1],
        ],
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
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
      <h2>Legend Demo with ECharts</h2>
      <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};
