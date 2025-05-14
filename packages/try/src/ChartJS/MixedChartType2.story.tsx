import { Chart, type ChartData, type ChartOptions } from 'chart.js';
import { type FC, useEffect, useMemo, useRef } from 'react';

/**
 * @see {@link https://www.chartjs.org/docs/latest/charts/mixed.html | Mixed Chart Type}
 */
export const Story: FC = () => {
  const data: ChartData<'bar' | 'line'> = useMemo(
    () => ({
      datasets: [
        {
          type: 'bar',
          label: 'imp_A',
          data: [0, 0, 0, 0, 0, 0.9, 1],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          yAxisID: 'y',
          barThickness: 8,
        },
        {
          type: 'bar',
          label: 'imp_B',
          data: [0, 0, 0, 0, 0, 0.95, 0.95],
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          yAxisID: 'y',
          barThickness: 8,
        },
        {
          type: 'line',
          label: 'CVR_A',
          data: [0, 0, 0, 0, 0, 60, 110],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
          yAxisID: 'y1',
          tension: 0.1,
          borderWidth: 2,
        },
      ],
      labels: ['5/2', '5/3', '5/4', '5/5', '5/6', '5/7', '5/8'],
    }),
    [],
  );

  const options: ChartOptions<'bar' | 'line'> = useMemo(
    () => ({
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          // mode: 'index',
          // intersect: false,
          enabled: false, // デフォルトツールチップを無効化
          external: (context) => {
            const tooltipModel = context.tooltip;
            const tooltipElement = tooltipRef.current;

            if (tooltipModel.opacity === 0) {
              tooltipElement.style.opacity = '0';
              return;
            }

            const bodyLines = tooltipModel.body.flatMap((b) => b.lines);
            tooltipElement.innerHTML = bodyLines.map((line) => `<div>${line}</div>`).join('');

            const { offsetLeft: positionX, offsetTop: positionY } = context.chart.canvas;
            tooltipElement.style.opacity = '1';
            tooltipElement.style.left = `${positionX + tooltipModel.caretX}px`;
            tooltipElement.style.top = `${positionY + tooltipModel.caretY}px`;
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          position: 'left',
          title: {
            display: true,
            text: 'Impression',
          },
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          title: {
            display: true,
            text: 'CVR (%)',
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    }),
    [],
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartRef = useRef<Chart>(null);

  const tooltipRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    if (document.body.contains(tooltipRef.current)) return;

    const tooltipElement = tooltipRef.current;

    // ツールチップ要素のスタイルを設定
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.background = 'rgba(0,0,0,0.7)';
    tooltipElement.style.color = 'white';
    tooltipElement.style.padding = '8px';
    tooltipElement.style.borderRadius = '4px';
    tooltipElement.style.pointerEvents = 'none';
    tooltipElement.style.transition = 'all .1s ease';
    tooltipElement.style.boxShadow = '4px 4px #ff67b3';
    tooltipElement.style.opacity = '0';
    document.body.append(tooltipElement);

    return () => {
      if (document.body.contains(tooltipElement)) {
        tooltipElement.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    chartRef.current = new Chart(context, {
      type: 'bar',
      data,
      options,
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, options]);

  return (
    <>
      <h2>Mixed Chart Type | Chart.js</h2>
      <canvas ref={canvasRef} />
    </>
  );
};
