// cSpell: words Aquisitions cubejs XVCJ
import cube from '@cubejs-client/core';
import { Chart } from 'chart.js';
import { type FC, Suspense, use, useEffect, useRef } from 'react';

/**
 * @see {@link https://www.chartjs.org/docs/latest/getting-started/usage.html#real-world-data | Step-by-step guide}
 */
export const Story: FC = () => {
  const dataPromise = getAquisitionsByYear();

  return (
    <>
      <h2>Real-world data with Chart.js</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Presentation dataPromise={dataPromise} />
      </Suspense>
    </>
  );
};

type AcquisitionRow = {
  year: number;
  count: number;
};

type Props = {
  dataPromise: Promise<AcquisitionRow[]>;
};

const Presentation: FC<Props> = ({ dataPromise }) => {
  const data = use(dataPromise);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartRef = useRef<Chart>(null);

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

  return <canvas ref={canvasRef} />;
};

async function getAquisitionsByYear(): Promise<AcquisitionRow[]> {
  const apiUrl = 'https://heavy-lansford.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1';
  const cubeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6NTAwMDAwMDAwMH0.OHZOpOBVKr-sCwn8sbZ5UFsqI3uCs6e4omT7P6WVMFw';

  const cubeApi = cube(cubeToken, { apiUrl });

  const acquisitionsByYearQuery = {
    dimensions: ['Artworks.yearAcquired'],
    measures: ['Artworks.count'],
    filters: [
      {
        member: 'Artworks.yearAcquired',
        operator: 'set',
      },
    ],
    order: {
      'Artworks.yearAcquired': 'asc',
    },
  } as const;

  const resultSet = await cubeApi.load(acquisitionsByYearQuery);

  return resultSet.tablePivot().map((row) => ({
    year: Number(row['Artworks.yearAcquired']),
    count: Number(row['Artworks.count']),
  }));
}
