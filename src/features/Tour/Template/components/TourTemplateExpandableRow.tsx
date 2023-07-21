import React from 'react';
import { ExpanderComponentProps } from 'react-data-table-component/dist/src/DataTable/types';
import { TourTemplate } from '@domain/entities/tour';
import { Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import { formatVND } from '@utils/CommonUtils';
import moment from 'moment';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const TourTemplateExpandableRow: React.FC<ExpanderComponentProps<TourTemplate>> = (
  { data }: ExpanderComponentProps<TourTemplate>,
) => (
  <div className="container py-xxl-1">
    <Row>
      <Col md={6}>
        <strong>{i18n.t('TOUR_TEMPLATE.PRICE')}</strong>
        <ul>
          {data.services.map((service) => (
            <li>
              {service.name}
              :
              {' '}
              {formatVND(service.price)}
            </li>
          ))}
        </ul>
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.CREATOR')}</strong>
        <ul>
          <li>{`${i18n.t('TOUR_TEMPLATE.CREATOR')}: ${data.creatorName} - ${data.creatorId}`}</li>
          <li>{`${i18n.t('COMMON.CREATED_AT')}: ${moment(data.createdAt).format('DD/MM/YYYY')}`}</li>
        </ul>
      </Col>
      <Col md={6}>
        <strong>{i18n.t('TOUR_TEMPLATE.POLICIES_AND_REGULATIONS')}</strong>
        <ul>
          <li>
            {`${i18n.t('TOUR_TEMPLATE.INCLUSION_AND_EXCLUSION')}: `}
            <Editor
              onChange={() => {}}
              readOnly
              editorState={
                  EditorState.createWithContent(
                    ContentState.createFromBlockArray(htmlToDraft(data.policiesAndRegulations.inclusionAndExclusion || '').contentBlocks),
                  )
                }
            />
          </li>
          <li>
            {`${i18n.t('TOUR_TEMPLATE.POLICY_CONDITIONS_AND_EXTRA_FEE')}: `}
            <Editor
              onChange={() => {}}
              readOnly
              editorState={
                  EditorState.createWithContent(
                    ContentState.createFromBlockArray(htmlToDraft(data.policiesAndRegulations.policyConditionsAndExtraFee || '').contentBlocks),
                  )
                }
            />
          </li>
          <li>
            {`${i18n.t('TOUR_TEMPLATE.CANCELLATION_TERMS')}: `}
            <Editor
              onChange={() => {}}
              readOnly
              editorState={
                  EditorState.createWithContent(
                    ContentState.createFromBlockArray(htmlToDraft(data.policiesAndRegulations.cancellationTerms || '').contentBlocks),
                  )
                }
            />
          </li>
        </ul>
      </Col>
    </Row>
  </div>
);

export default TourTemplateExpandableRow;
