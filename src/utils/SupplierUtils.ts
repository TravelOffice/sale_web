import { Supplier } from '@domain/entities/supplier';
import { SupplierFilterParams } from '@features/Supplier/components/SupplierFilter';
import i18n from 'i18next';
/**
 * Generates an internationalized translation for supplier-related content
 * based on the specified type.
 *
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForSupplier(type: string) {
  const key = `SUPPLIER.${type}`;
  return i18n.t(key);
}

/**
 * Filters an array of suppliers based on the provided filter parameters.
 *
 * @param allSuppliers - An array of suppliers to filter.
 * @param params - The filter parameters used to determine which suppliers to include.
 * @returns An array of filtered suppliers.
 */
export function filterSuppliers(
  allSuppliers: Supplier[],
  params: SupplierFilterParams,
) {
  const {
    name,
    city,
    district,
    address,
    taxId,
  } = params;

  return allSuppliers.filter(
    (item: Supplier) => {
      if (name && !item.name.toLowerCase().includes(name.toLowerCase())) return false;
      if (city && !item.city.toLowerCase().includes(city.toLowerCase())) return false;
      if (district && !item.district.toLowerCase().includes(district.toLowerCase())) return false;
      if (address && !item.address.toLowerCase().includes(address.toLowerCase())) return false;
      if (taxId && !item.taxId.toLowerCase().includes(taxId.toLowerCase())) return false;
      return true;
    },
  );
}

/**
 * Generates an editable URL for the specified supplier.
 *
 * @param supplier - The supplier object for which to generate the URL.
 * @returns The editable URL for the supplier.
 */
export function generateEditableUrlForSupplier(supplier: Supplier) {
  return `/apps/suppliers/${supplier.code}/edit`;
}
