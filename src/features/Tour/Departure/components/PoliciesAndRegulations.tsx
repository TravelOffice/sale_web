import React from 'react';
import i18n from '@config/i18n';
import { Label } from 'reactstrap';
import FormItemEditor from '@components/Form/FormItemEditor';
import { EditorState } from 'draft-js';

type CommonInformationProps = {
  control: any;
  errors: any;
  inclusionAndExclusion: EditorState;
  setInclusionAndExclusion: (value: EditorState) => void
  policyConditionsAndExtraFee: EditorState
  setPolicyConditionsAndExtraFee: (value: EditorState) => void
  cancellationTerms: EditorState;
  setCancellationTerms: (value: EditorState) => void
  tourPlan: EditorState;
  setTourPlan: (value: EditorState) => void
};

const CommonInformation: React.FC<CommonInformationProps> = ({
  control,
  errors,
  inclusionAndExclusion,
  setInclusionAndExclusion,
  policyConditionsAndExtraFee,
  setPolicyConditionsAndExtraFee,
  cancellationTerms,
  setCancellationTerms,
  tourPlan,
  setTourPlan,
}) => (
  <>
    <div className="divider divider-start divider-primary">
      <div className="divider-text text-primary fw-bolder">{i18n.t('TOUR_TEMPLATE.POLICIES_AND_REGULATIONS')}</div>
    </div>
    <div className="mb-1 rdw-editor-wrapper">
      <Label className="form-label">
        {i18n.t('TOUR_TEMPLATE.INCLUSION_AND_EXCLUSION')}
      </Label>
      <FormItemEditor
        name="policiesAndRegulations.inclusionAndExclusion"
        editorState={inclusionAndExclusion}
        setEditorState={setInclusionAndExclusion}
        control={control}
        errors={errors}
      />
    </div>
    <div className="mb-1">
      <Label className="form-label">
        {i18n.t('TOUR_TEMPLATE.POLICY_CONDITIONS_AND_EXTRA_FEE')}
      </Label>
      <FormItemEditor
        name="policiesAndRegulations.policyConditionsAndExtraFee"
        editorState={policyConditionsAndExtraFee}
        setEditorState={setPolicyConditionsAndExtraFee}
        control={control}
        errors={errors}
      />
    </div>
    <div className="mb-1">
      <Label className="form-label">
        {i18n.t('TOUR_TEMPLATE.CANCELLATION_TERMS')}
      </Label>
      <FormItemEditor
        name="policiesAndRegulations.cancellationTerms"
        editorState={cancellationTerms}
        setEditorState={setCancellationTerms}
        control={control}
        errors={errors}
      />
    </div>
    <div className="divider divider-start divider-primary">
      <div className="divider-text text-primary fw-bolder">{i18n.t('TOUR_TEMPLATE.TOUR_PLAN')}</div>
    </div>
    <div className="mb-1">
      <FormItemEditor
        name="tourPlan"
        editorState={tourPlan}
        setEditorState={setTourPlan}
        control={control}
        errors={errors}
      />
    </div>
  </>
);

export default CommonInformation;
