import React, {
  CSSProperties, forwardRef, ReactNode,
} from 'react';
import classnames from 'classnames';
import { Badge } from 'reactstrap';

export type AvatarSize = 'sm' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';
export type AvatarBadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'dark' | 'light-primary' | 'light-secondary' | 'light-success' | 'light-danger' | 'light-info' | 'light-warning' | 'light-dark';
export type AvatarColor = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'dark' | 'light-primary' | 'light-secondary' | 'light-success' | 'light-danger' | 'light-info' | 'light-warning' | 'light-dark';

interface AvatarProps extends React.HTMLAttributes<any> {
  img?: string,
  size?: AvatarSize,
  icon?: ReactNode,
  color?: AvatarColor,
  status?: AvatarStatus,
  badgeUp?: boolean,
  content?: string,
  imgWidth?: string | number,
  className?: string,
  badgeText?: string,
  imgHeight?: string | number,
  badgeColor?: AvatarBadgeColor,
  imgClassName?: string,
  contentStyles?: CSSProperties,
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  // ** Props
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  // ** Function to extract initials from content
  const getInitials = (str: string | undefined) => {
    if (!str) {
      return '';
    }
    const results: string[] = [];
    const wordArray = str.split(' ');
    wordArray.forEach((e) => {
      results.push(e[0]);
    });
    return results.join('');
  };

  return (
    <div
      className={classnames('avatar', className, {
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {!img ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp,
          })}
          style={contentStyles}
        >
          {getInitials(content)}

          {icon || null}
          {badgeUp ? (
            <Badge color={badgeColor || 'primary'} className="badge-sm badge-up" pill>
              {badgeText || '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames(imgClassName)}
          src={img}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        />
      ) : null}
    </div>
  );
});

Avatar.defaultProps = {
  img: undefined,
  icon: undefined,
  color: undefined,
  imgWidth: 10,
  imgClassName: undefined,
  className: undefined,
  content: undefined,
  badgeText: undefined,
  badgeUp: false,
  badgeColor: 'primary',
  contentStyles: undefined,
  imgHeight: 10,
  size: undefined,
  status: undefined,
};

export default Avatar;
