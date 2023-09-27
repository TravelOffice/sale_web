// ** Custom Components
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';

// ** Third Party Components
import classnames from 'classnames';
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

// ** Default Options
import React, { ReactNode } from 'react';

export interface StatsWithAreaChartProps {
  height?: string;
  options?: object;
  className: string;
  icon: ReactNode;
  color: AvatarColor;
  stats: string;
  series: any[];
  statTitle: string;
  type?:
  | 'line'
  | 'area'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'candlestick'
  | 'boxPlot'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'rangeArea'
  | 'treemap';
}

const StatsWithAreaChart = (props: StatsWithAreaChartProps) => {
  // ** Props
  const {
    icon, color, stats, statTitle, series, options, type, height, className, ...rest
  } = props;
  return (
    <Card {...rest}>
      <CardBody
        className={classnames('pb-0', {
          [className]: className,
        })}
      >
        <Avatar className="avatar-stats p-50 m-0" color={color} icon={icon} />
        <h2 className="fw-bolder mt-1">{stats}</h2>
        <p className="card-text">{statTitle}</p>
      </CardBody>
      <Chart options={options} series={series} type={type} height={height || 100} />
    </Card>
  );
};

export default StatsWithAreaChart;
