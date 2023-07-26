import React from 'react';
import { ExpanderComponentProps } from 'react-data-table-component/dist/src/DataTable/types';
import { Supplier } from '@domain/entities/supplier';
import { Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { generateI18nForSupplier } from '@utils/SupplierUtils';
import { formatVND } from '@utils/CommonUtils';

const SupplierExpandableRow: React.FC<ExpanderComponentProps<Supplier>> = (
  { data: supplier }:ExpanderComponentProps<Supplier>,
) => (
  <div className="container py-xxl-1">
    <Row>
      <Col md={5}>
        <table className="table">
          <tbody className="table-hover table-striped">
            <tr>
              <td>{i18n.t('SUPPLIER.NAME')}</td>
              <td>{supplier.name}</td>
            </tr>
            <tr>
              <td>{i18n.t('SUPPLIER.BRAND_NAME')}</td>
              <td>{supplier.brandName}</td>
            </tr>
            <tr>
              <td>{i18n.t('SUPPLIER.ESTABLISHMENT_YEAR')}</td>
              <td>{supplier.establishmentYear}</td>
            </tr>
            <tr>
              <td>{i18n.t('SUPPLIER.CITY')}</td>
              <td>{supplier.city}</td>
            </tr>
            <tr>
              <td>{i18n.t('SUPPLIER.DISTRICT')}</td>
              <td>{supplier.district}</td>
            </tr>
            <tr>
              <td>{i18n.t('SUPPLIER.ADDRESS')}</td>
              <td>{supplier.address}</td>
            </tr>
            <tr>
              <td>{i18n.t('SUPPLIER.TAX_ID')}</td>
              <td>{supplier.taxId}</td>
            </tr>
            <tr>
              <td>{i18n.t('SUPPLIER.SERVICES')}</td>
              <td>
                <ul>
                  {supplier.services && supplier.services.map(
                    (item) => <li>{generateI18nForSupplier(item)}</li>,
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <strong>{i18n.t('SUPPLIER.NOTE')}</strong>
        {': '}
        <Editor
          onChange={() => {}}
          readOnly
          editorState={
            EditorState.createWithContent(
              ContentState.createFromBlockArray(htmlToDraft(supplier.note || '').contentBlocks),
            )
          }
        />
        <br />
      </Col>
      <Col md={7}>
        <strong>{i18n.t('SUPPLIER.QUOTE_MANAGEMENT')}</strong>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">{i18n.t('COMMON.INDEX')}</th>
              <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_YEAR')}</th>
              <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_LINK')}</th>
              <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_PRICE')}</th>
            </tr>
          </thead>
          <tbody className="table-hover table-striped">
            {supplier.quotes && supplier.quotes.map((quote, index) => (
              <tr key={index.toString()}>
                <td className="text-center">{index}</td>
                <td>{quote.year}</td>
                <td><a href={quote.link} target="_blank" rel="noreferrer">{quote.link}</a></td>
                <td>{formatVND(quote.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <strong>{i18n.t('SUPPLIER.PAYMENT_INFO')}</strong>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">{i18n.t('COMMON.INDEX')}</th>
              <th scope="col" className="text-center">{i18n.t('SUPPLIER.PAYMENT_INFO')}</th>
            </tr>
          </thead>
          <tbody className="table-hover table-striped">
            {supplier.paymentInfo && supplier.paymentInfo.map((paymentInfo, index) => (
              <tr key={index.toString()}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <b>{i18n.t('SUPPLIER.BANK_NAME')}</b>
                  {': '}
                  {paymentInfo.bankName || ''}
                  <br />
                  <b>{i18n.t('SUPPLIER.BANK_ACCOUNT_NAME')}</b>
                  {': '}
                  {paymentInfo.accountName || ''}
                  <br />
                  <b>{i18n.t('SUPPLIER.BANK_ACCOUNT_NUMBER')}</b>
                  {': '}
                  {paymentInfo.accountNumber || ''}
                  <br />
                  <b>{i18n.t('SUPPLIER.BANK_BRANCH')}</b>
                  {': '}
                  {paymentInfo.bankBranch || ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <strong>{i18n.t('SUPPLIER.CONTACT_LIST')}</strong>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">{i18n.t('COMMON.INDEX')}</th>
              <th scope="col" className="text-center">{i18n.t('SUPPLIER.CONTACT_INFORMATION')}</th>
            </tr>
          </thead>
          <tbody className="table-hover table-striped">
            {supplier.contacts && supplier.contacts.map((contact, index) => (
              <tr key={index.toString()}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <b>{i18n.t('SUPPLIER.CONTACT_NAME')}</b>
                  {': '}
                  {contact.name || ''}
                  <br />
                  <b>{i18n.t('SUPPLIER.CONTACT_PHONE_NUMBER')}</b>
                  {': '}
                  {contact.phoneNumber || ''}
                  <br />
                  <b>{i18n.t('SUPPLIER.CONTACT_EMAIL')}</b>
                  {': '}
                  {contact.email || ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
  </div>
);

export default SupplierExpandableRow;
