import React, { useEffect, useState } from 'react';

interface ScrollTopProps extends React.HTMLAttributes<HTMLDivElement> {
  showOffset: number,
  scrollBehaviour?: ScrollBehavior
}

const ScrollTop = (props: ScrollTopProps) => {
  const {
    showOffset, scrollBehaviour, children, ...rest
  } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= showOffset) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }
  }, []);

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: scrollBehaviour });
  };

  return (
    <>
      {visible && (
        <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>
          {children}
        </div>
      )}
    </>
  );
};

ScrollTop.defaultProps = {
  scrollBehaviour: 'smooth',
};

export default ScrollTop;
