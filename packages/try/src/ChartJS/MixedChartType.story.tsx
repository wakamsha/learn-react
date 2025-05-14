import { Chart } from 'chart.js';
import { type FC, useEffect, useRef } from 'react';

/**
 * @see {@link https://www.chartjs.org/docs/latest/charts/mixed.html | Mixed Chart Type}
 */
export const Story: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartRef = useRef<Chart>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    chartRef.current = new Chart(context, {
      data: {
        datasets: [
          {
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 50],
          },
          {
            type: 'line',
            label: 'Line Dataset',
            data: [50, 20, 40, 45],
          },
        ],
        labels: ['January', 'February', 'March', 'April', 'May'],
      },
      options: {
        animation: false,
        plugins: {
          title: {
            display: true,
            text: 'Custom Chart Title',
          },
          subtitle: {
            display: true,
            text: 'Custom Chart Subtitle',
          },
          legend: {
            // display: false,
            position: 'bottom',
            align: 'end',
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <h2>Mixed Chart Type | Chart.js</h2>
      <canvas ref={canvasRef} />
    </>
  );
};
