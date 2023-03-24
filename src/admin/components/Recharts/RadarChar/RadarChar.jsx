import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { sendNotification } from '../../../../utils/notifications';

export const RadarChar = ({ socket }) => {
  const [metric, setMetric] = useState([
    { subject: 'NaN', A: 0, fullMark: 0 },
  ]);

  useEffect(() => {
    sendNotification('getRadarChar').then(({ data }) => {
      setMetric(data.response);
    });
  }, []);

  socket.on('getRadarChar', data => {
    setMetric(state => data );
  });

  return (
    <>
      <h4>Stock de productos vs categoria</h4>
      <ResponsiveContainer width='100%' height='100%'>
        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={metric}>
          <PolarGrid />
          <PolarAngleAxis dataKey='subject' />
          <PolarRadiusAxis />
          <Radar
            name='Mike'
            dataKey='A'
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};
