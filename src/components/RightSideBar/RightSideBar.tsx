// ** Third Party Components
import { X } from 'react-feather';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import React, { ReactNode } from 'react';

export interface RightSideBarProps {
  open: boolean,
  size: 'lg' | 'sm',
  title: string,
  width?: number,
  children?: ReactNode,
  closeBtn?: ReactNode,
  className?: string,
  toggleSidebar: () => void,
  bodyClassName?: string,
  contentClassName: string,
  wrapperClassName?: string,
  headerClassName: string,
  onClosed: () => void,
}

const RightSideBar = (props: RightSideBarProps) => {
  // ** Props
  const {
    open,
    size,
    title,
    width,
    children,
    closeBtn,
    className,
    toggleSidebar,
    bodyClassName,
    contentClassName,
    wrapperClassName,
    headerClassName,
    ...rest
  } = props;

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = closeBtn || <X className="cursor-pointer" size={16} onClick={toggleSidebar} />;

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      contentClassName={classnames('overflow-hidden', contentClassName)}
      modalClassName={classnames('modal-slide-in', wrapperClassName)}
      className={classnames({
        className,
        'sidebar-lg': size === 'lg',
        'sidebar-sm': size === 'sm',
      })}
      /*eslint-disable */
      {...(width !== undefined
        ? {
            style: { width: String(width) + 'px' }
          }
        : {})}
      /* eslint-enable */
      {...rest}
    >
      <ModalHeader
        className={classnames({
          [headerClassName]: headerClassName,
        })}
        toggle={toggleSidebar}
        close={renderCloseBtn}
        tag="div"
      >
        <h5 className="modal-title">
          <span className="align-middle">{title}</span>
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody
          className={classnames('flex-grow-1', {
            bodyClassName,
          })}
        >
          {children}
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default RightSideBar;
