// ** Third Party Components
import classnames from 'classnames';
import React from 'react';

export interface TimelineProps {
  data: any[],
  className: string,
}

const Timeline = (props: TimelineProps) => {
  // ** Props
  const { data, className } = props;

  return (
    <ul
      className={classnames('timeline', {
        [className]: className,
      })}
    >
      {data.map((item, i) => (
        <li
          key={i.toString()}
          className={classnames('timeline-item', {
            [item.className]: className,
          })}
        >
          <span
            className={classnames('timeline-point', {
              [`timeline-point-${item.color}`]: item.color,
              'timeline-point-indicator': !item.icon,
            })}
          >
            {item.icon ? item.icon : null}
          </span>
          <div className="timeline-event">
            <div
              className={classnames('d-flex justify-content-between flex-sm-row flex-column', {
                'mb-sm-0 mb-1': item.meta,
              })}
            >
              <h6>{item.title}</h6>
              {item.meta ? (
                <span
                  className={classnames('timeline-event-time', {
                    [item.metaClassName]: item.metaClassName,
                  })}
                >
                  {item.meta}
                </span>
              ) : null}
            </div>
            <p
              className={classnames({
                'mb-0': i === data.length - 1 && !item.customContent,
              })}
            >
              {item.content}
            </p>
            {item.customContent ? item.customContent : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
