// ** React Imports
import React, { Fragment } from 'react';

// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';

// ** Custom Components Imports
import Avatar, { AvatarSize } from '@components/Avatar/Avatar';
import { Placement } from '@popperjs/core';
import { UserStatusType } from '@domain/entities/User';

export interface UserAvatarItem {
  key: string,
  className?: any;
  placement?: Placement,
  title?: string,
  content?: string,
  size?: AvatarSize,
  img?: string,
  status?: UserStatusType
}

interface AvatarGroupProps {
  data: Array<UserAvatarItem>,
}

const AvatarGroup = (props: AvatarGroupProps) => {
  // ** Props
  const { data } = props;

  // ** Render Data
  const renderData = () => data.map((item) => (
    <Fragment key={item.key}>
      {item.title ? (
        <UncontrolledTooltip placement={item.placement} target={item.title.split(' ').join('-')}>
          {item.title}
        </UncontrolledTooltip>
      ) : null}
      <Avatar
        className="pull-up"
        content={item.content}
        {...(item.title ? { id: item.title.split(' ').join('-') } : {})}
        {...item}
      />
    </Fragment>
  ));

  return (
    <div
      className={classnames('avatar-group')}
    >
      {renderData()}
    </div>
  );
};

export default AvatarGroup;
