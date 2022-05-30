import countries from '@assets/json/countries.json';
import provinces from '@assets/json/provinces.json';
import { Customer, Lead } from '@domain/entities/Lead';

export interface Country {
  name: string,
  nationality: string,
  countryCode: string,
}

export interface Province {
  name: string,
}

export function getCountries() : Country[] {
  return countries.map((country) => ({
    name: country.en_short_name,
    nationality: country.nationality,
    countryCode: country.alpha_2_code,
  }));
}

export function getNationality(nationalityCode: string): Country {
  const nationality = countries.find((country) => country.nationality === nationalityCode)!;
  return {
    name: nationality.en_short_name,
    nationality: nationality.nationality,
    countryCode: nationality.alpha_2_code,
  };
}

export function getCountry(countryCode: string) : Country {
  const country = countries.find((item) => item.alpha_2_code === countryCode)!;
  return {
    name: country.en_short_name,
    nationality: country.nationality,
    countryCode: country.alpha_2_code,
  };
}

export function getProvinces(countryCode?: string) : Province[] {
  if (!countryCode) {
    return [];
  }
  const country = getCountry(countryCode);
  return provinces.filter((item) => item.country === country.countryCode).map((item) => ({
    name: item.name,
  }));
}

export function getLeadById(leads: Array<Lead | Customer>, id: string) {
  return leads.find((lead) => lead.primaryPhoneNumber === id);
}
