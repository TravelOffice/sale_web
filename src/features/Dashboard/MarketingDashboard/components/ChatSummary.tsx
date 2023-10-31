import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import Chart from 'react-apexcharts';
import { useQuery } from '@tanstack/react-query';
import { travelStatisticRepository } from '@adapter/repositories';
import { Calendar } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import { ConversationPlatformStatistic } from '@domain/entities/statistic/TravelStatistic';

export function getPreviousDay(date: Date, time: number) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - time);
  return previous;
}

function ChatSummary() {
  const defaultEndTime = Date.now();
  const defaultStartTime = defaultEndTime - 7 * 24 * 60 * 60 * 1000;
  const [selectedStartTime, setSelectedStartTime] = useState<number>(defaultStartTime);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(defaultEndTime);
  const [xLabel, setXLabel] = useState<Array<string>>([]);
  const [series, setSeries] = useState<Array<any>>([]);

  const {
    data,
    refetch,
  } = useQuery(
    ['conversationPlatformStatistic'],
    async () => travelStatisticRepository.getConversationPlatformStatistic(
      selectedStartTime.toString(),
      (selectedEndTime + 24 * 60 * 60 * 1000).toString(),
    ),
  );

  useEffect(() => {
    refetch();
  }, [selectedEndTime, selectedStartTime]);

  useEffect(() => {
    let mergedDate: Array<string> = [];
    const dataSeries: Array<any> = [];
    if (data !== undefined && Array.isArray(data)) {
      data.forEach((obj) => {
        const dates = obj.date;
        mergedDate = mergedDate.concat(dates);
      });

      // Sort date
      mergedDate.sort((a, b) => new Date(a).getMilliseconds() - new Date(b).getMilliseconds());
      // Remove duplicate date
      mergedDate = Array.from(new Set(mergedDate));
      setXLabel(mergedDate);

      // Merge data
      // if date not exist, set value to 0
      data.forEach((obj) => {
        const dates = obj.date;
        const dataSeriesItem: ConversationPlatformStatistic = {
          name: obj.name,
          data: [],
          date: [],
        };
        mergedDate.forEach((dateItem) => {
          const index = dates.indexOf(dateItem);
          if (index !== -1) {
            dataSeriesItem.data.push(obj.data[index]);
          } else {
            dataSeriesItem.data.push(0);
          }
          dataSeriesItem.date.push(dateItem);
        });
        dataSeries.push(dataSeriesItem);
      });
      setSeries(dataSeries);
    }
  }, [data]);

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: xLabel,
    },
    yaxis: {
      title: {
        text: 'Số lượng',
      },
    },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return "$ " + val + " thousands";
    //     },
    //   },
    // },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Tổng số cuộc chat trên các kênh</CardTitle>
        <div className="d-flex align-items-center">
          <Calendar size={17} />
          <Flatpickr
            className="form-control flat-picker bg-transparent border-0 shadow-none"
            options={{
              mode: 'range',
              // eslint-disable-next-line no-mixed-operators
              defaultDate: [defaultStartTime, defaultEndTime],
              locale: Vietnamese,
              dateFormat: 'd-m-Y',
            }}
            onChange={(selectedDates) => {
              if (selectedDates[0] && selectedDates[1]) {
                setSelectedStartTime(selectedDates[0].getTime());
                setSelectedEndTime(selectedDates[1].getTime());
              }
            }}
          />
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options as any}
          series={series}
          type="bar"
          height={350}
        />
      </CardBody>
    </Card>
  );
}

export default ChatSummary;
