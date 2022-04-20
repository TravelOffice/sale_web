import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

import {
  UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from 'reactstrap';
import { Languages } from '@utils/Constants';

const IntlDropdown = () => {
  const { i18n } = useTranslation();

  const languages = new Map();
  languages.set('vi', Languages.VIETNAMESE);
  languages.set('en', Languages.ENGLISH);

  // ** Function to switch Language
  const handleLangUpdate = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const languageToFlag: { [key: string]: string } = {
    vi: 'vn',
    en: 'us',
  };

  return (
    <UncontrolledDropdown href="/" tag="li" className="dropdown-language nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link" onClick={(e) => e.preventDefault()}>
        <ReactCountryFlag
          svg
          className="country-flag flag-icon"
          countryCode={languageToFlag[i18n.language]}
        />
        <span className="selected-language">{languages.get(i18n.language)}</span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        <DropdownItem href="/" tag="a" onClick={() => handleLangUpdate('vi')}>
          <ReactCountryFlag className="country-flag" countryCode="vn" svg />
          <span className="ms-1">Việt Nam</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={() => handleLangUpdate('en')}>
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ms-1">English</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default IntlDropdown;
