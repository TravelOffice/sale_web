import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

import {
  UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from 'reactstrap';

const IntlDropdown = () => {
  const { i18n } = useTranslation();

  const languages = new Map();
  languages.set('en', 'English');
  languages.set('de', 'German');
  languages.set('fr', 'French');
  languages.set('pt', 'Portuguese');

  // ** Function to switch Language
  const handleLangUpdate = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <UncontrolledDropdown href="/" tag="li" className="dropdown-language nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link" onClick={(e) => e.preventDefault()}>
        <ReactCountryFlag
          svg
          className="country-flag flag-icon"
          countryCode={i18n.language === 'en' ? 'us' : i18n.language}
        />
        <span className="selected-language">{languages.get(i18n.language)}</span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        <DropdownItem href="/" tag="a" onClick={() => handleLangUpdate('en')}>
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ms-1">English</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={() => handleLangUpdate('fr')}>
          <ReactCountryFlag className="country-flag" countryCode="fr" svg />
          <span className="ms-1">French</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={() => handleLangUpdate('de')}>
          <ReactCountryFlag className="country-flag" countryCode="de" svg />
          <span className="ms-1">German</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={() => handleLangUpdate('pt')}>
          <ReactCountryFlag className="country-flag" countryCode="pt" svg />
          <span className="ms-1">Portuguese</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default IntlDropdown;
