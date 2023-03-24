import './chart.scss';
import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { es } from 'dayjs/locale/es';
import localeData from 'dayjs/plugin/localeData';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { sendNotification } from '../../../utils/notifications';

dayjs.locale('es');
dayjs.extend(localeData);

const Chart = ({ aspect, title, socket}) => {
  const [data, setData] = useState([{ name: '', Total: 0 }]);

  const dateBetween = (date, number, unit = 'day') => {
    const init = dayjs().subtract(number, unit).startOf(unit);
    const end = dayjs().format().substring(0, 10);

    return date >= init.format().substring(0, 10) && date <= end;
  };

  useEffect(() => {
    sendNotification('salesReport').then(({ data: { response } }) => {
      const validDates = response.filter(({ date }) => dateBetween(date, 7));
      setData(
        validDates.map(({ date, total }) => ({ name: date, Total: total })).reverse()
      );
    });
  }, []);

  socket.on('salesReport', data => {
		const validDates = data.filter(({ date }) => dateBetween(date, 7));
		setData(
			validDates.map(({ date, total }) => ({ name: date, Total: total })).reverse()
		);
  });


  return (
    <div className='chart'>
      <div className='title'>{title}</div>
      <ResponsiveContainer width='100%' aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke='gray' />
          <CartesianGrid strokeDasharray='3 3' className='chartGrid' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Total'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#total)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
