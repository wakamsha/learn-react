import { Chart } from 'chart.js';
import { type FC, useEffect, useRef } from 'react';

/**
 * @see {@link https://www.chartjs.org/docs/latest/charts/mixed.html | Mixed Chart Type}
 */
export const Story: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartRef = useRef<Chart>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    // ツールチップ用の div を生成
    if (!tooltipRef.current) {
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.background = 'rgba(0,0,0,0.7)';
      element.style.color = 'white';
      element.style.padding = '8px';
      element.style.borderRadius = '4px';
      element.style.pointerEvents = 'none';
      element.style.transition = 'all .1s ease';
      document.body.append(element);
      tooltipRef.current = element;
    }

    chartRef.current = new Chart(context, {
      type: 'bar',
      data: {
        labels: ['5/2', '5/3', '5/4', '5/5', '5/6', '5/7', '5/8'],
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
      },
      options: {
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
              if (!tooltipElement) return;

              if (tooltipModel.opacity === 0) {
                tooltipElement.style.opacity = '0';
                return;
              }

              const bodyLines = tooltipModel.body.flatMap((b) => b.lines);
              tooltipElement.innerHTML = bodyLines.map((line) => `<div>${line}</div>`).join('');

              const { offsetLeft: positionX, offsetTop: positionY } = context.chart.canvas;
              tooltipElement.style.opacity = '1';
              tooltipElement.style.boxShadow = '4px 4px #ff67b3';
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
      },
    });

    return () => {
      chartRef.current?.destroy();
      tooltipRef.current?.remove();
    };
  }, []);

  return (
    <>
      <h2>Mixed Chart Type | Chart.js</h2>
      <canvas ref={canvasRef} />
    </>
  );
};
