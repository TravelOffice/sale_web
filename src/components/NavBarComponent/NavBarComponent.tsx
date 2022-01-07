import React from 'react';
import NavbarUser from './NavbarUser';
import NavbarBookmarks from './NavbarBookmarks';
import 'react-perfect-scrollbar/dist/css/styles.css';

interface NavbarComponentProps {
  skin: string,
  setSkin: (skin: string) => void,
  setMenuVisibility?: (visibility: boolean) => void,
}

const NavbarComponent = (props: NavbarComponentProps) => {
  const { skin, setSkin, setMenuVisibility = () => {} } = props;
  return (
    <>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </>
  );
};

NavbarComponent.defaultProps = {
  setMenuVisibility: () => {},
};

export default NavbarComponent;
