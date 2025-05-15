import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, type FC } from 'react';

Chart.register(...registerables);

/**
 * @see {@link https://www.chartjs.org/docs/latest/getting-started/ Getting Started}
 */
export const Story: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartRef = useRef<Chart>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext('2d');

    if (!context) {
      return;
    }

    chartRef.current = new Chart(context, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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
      <h2>Getting Started | Chart.js</h2>
      <canvas ref={canvasRef} />
    </>
  );
};
