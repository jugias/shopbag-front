import React, { useState, useEffect } from 'react';
import './PieChar.scss';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { sendNotification } from '../../../../utils/notifications';

export const PieChar = ({ socket }) => {
  const [data, setData] = useState([
    {
      name: 'Nan',
      value: '0',
    },
  ]);

  useEffect(() => {
    sendNotification('getPieChar').then(({ data }) => {
      setData(data.response);
    });
  }, []);

  socket.on('getPieChar', data => {
    setData(state => data);
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    value,
  }) => {
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='black'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {data[index].name} ({value})
      </text>
    );
  };

  return (
    <>
      <div className='container_piechart'>
        <h4>Catidad de productos vs categoria</h4>
        <ResponsiveContainer>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              // labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
