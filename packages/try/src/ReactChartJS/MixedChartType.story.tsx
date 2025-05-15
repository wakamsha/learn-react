import { type ChartData, type Chart as ChartJS, type ChartOptions, type InteractionItem } from 'chart.js';
import { useRef, type FC, type MouseEvent } from 'react';
import { Chart, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2';

/**
 * @see {@link https://www.chartjs.org/docs/latest/charts/mixed.html | Mixed Chart Type}
 */
export const Story: FC = () => {
  const data: ChartData<'bar' | 'line'> = {
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
  };

  const options: ChartOptions<'bar' | 'line'> = {
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
    },
  };

  const chartRef = useRef<ChartJS<'bar' | 'line'>>(null);

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (dataset.length === 0) return;

    const { datasetIndex } = dataset[0];

    console.info(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (element.length === 0) return;

    const { datasetIndex, index } = element[0];

    console.info(data.labels?.[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (elements.length === 0) return;

    console.info(elements.length);
  };

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chartRef.current, event));
    printElementAtEvent(getElementAtEvent(chartRef.current, event));
    printElementsAtEvent(getElementsAtEvent(chartRef.current, event));
  };

  return (
    <>
      <h2>Mixed Chart Type | Chart.js</h2>
      <Chart ref={chartRef} type="bar" data={data} options={options} onClick={handleClick} />
    </>
  );
};
