import { type ChartData, type ChartOptions } from 'chart.js';
import { type FC } from 'react';
import { Bar } from 'react-chartjs-2';

/**
 * @see {@link https://react-chartjs-2.js.org/examples/vertical-bar-chart | Vertical Bar Chart}
 */
export const Story: FC = () => {
  const options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const data: ChartData<'bar'> = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h2>Vertical Bar</h2>
      <Bar data={data} options={options} />
    </>
  );
};
