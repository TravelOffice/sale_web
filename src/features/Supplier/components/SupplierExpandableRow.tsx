import React from 'react';
import { ExpanderComponentProps } from 'react-data-table-component/dist/src/DataTable/types';
import { Supplier } from '@domain/entities/supplier';
import { Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const SupplierExpandableRow: React.FC<ExpanderComponentProps<Supplier>> = (
  { data: supplier }:ExpanderComponentProps<Supplier>,
) => (
  <div className="container py-xxl-1">
    <Row>
      <Col md={5}>
        <strong>{i18n.t('SUPPLIER.NAME')}</strong>
        {': '}
        {supplier.name}
        <br />
        <strong>{i18n.t('SUPPLIER.BRAND_NAME')}</strong>
        {': '}
        {supplier.brandName}
        <br />
        <strong>{i18n.t('SUPPLIER.ESTABLISHMENT_YEAR')}</strong>
        {': '}
        {supplier.establishmentYear}
        <br />
        <strong>{i18n.t('SUPPLIER.CITY')}</strong>
        {': '}
        {supplier.city}
        <br />
        <strong>{i18n.t('SUPPLIER.DISTRICT')}</strong>
        {': '}
        {supplier.district}
        <br />
        <strong>{i18n.t('SUPPLIER.ADDRESS')}</strong>
        {': '}
        {supplier.address}
        <br />
        <strong>{i18n.t('SUPPLIER.TAX_ID')}</strong>
        {': '}
        {supplier.taxId}
        <br />
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
              <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_DESCRIPTION')}</th>
            </tr>
          </thead>
          <tbody className="table-hover table-striped">
            {supplier.quotes && supplier.quotes.map((quote, index) => (
              <tr key={index.toString()}>
                <td className="text-center">{index}</td>
                <td>{quote.year}</td>
                <td><a href={quote.link} target="_blank" rel="noreferrer">{quote.link}</a></td>
                <td>{quote.description}</td>
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
