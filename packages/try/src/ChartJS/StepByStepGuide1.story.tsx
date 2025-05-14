import { Chart } from 'chart.js';
import { type FC, useEffect, useMemo, useRef } from 'react';

/**
 * @see {@link https://www.chartjs.org/docs/latest/getting-started/usage.html#build-a-new-application-with-chart-js | Step-by-step guide}
 */
export const Story: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartRef = useRef<Chart>(null);

  const data = useMemo(
    () => [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ],
    [],
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    chartRef.current = new Chart(context, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map((row) => row.count),
          },
        ],
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);

  return (
    <>
      <h2>Build a new application with Chart.js</h2>
      <canvas ref={canvasRef} />
    </>
  );
};
