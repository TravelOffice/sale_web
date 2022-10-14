import React, { forwardRef, useEffect, useState } from 'react';
import {
  Badge, FormFeedback, Input, InputProps,
} from 'reactstrap';
import { X } from 'react-feather';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export interface TagsInputProps extends InputProps {
  validate?: (value: string) => boolean,
  onChanged?: (tags: string[]) => void,
  defaultTags: string[],
}

const TagsInput = forwardRef<Input, TagsInputProps>((componentProps, ref) => {
  const {
    // eslint-disable-next-line no-unused-vars
    validate, onChanged, onBlur, value, defaultTags, ...rest
  } = componentProps;
  const [tags, setTags] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string>();
  const { t } = useTranslation();
  const schema = yup.string().email(t('MAIL.ERROR_EMAIL_IS_INVALID'));

  useEffect(() => {
    onChanged?.(tags);
  }, [tags]);

  useEffect(() => {
    setTags(defaultTags);
  }, [defaultTags]);

  const setTagValue = (e: any) => {
    const inputRef = (e.target as HTMLInputElement);
    const { value: inputValue } = inputRef;
    if (inputValue === '') {
      setValidationError('');
      return;
    }
    try {
      schema.validateSync(inputValue);
      inputRef.value = '';
      if (!tags.includes(inputValue)) {
        setTags(tags.concat(inputValue));
      }
      setValidationError(undefined);
    } catch (error: any) {
      setValidationError(error.message);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === ' ') {
      setTagValue(e);
    }
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setTagValue(e);
    onBlur?.(e);
  };

  const removeToAddress = (tagToRemove: string) => {
    setTags(tags.filter((tag: string) => tag !== tagToRemove));
  };

  return (
    <div className="d-flex flex-column">
      <ul className="compose-address-ul list-unstyled d-flex flex-wrap flex-grow-1 mb-0 align-items-center">
        {tags.map((tag: string) => (
          <li key={tag}>
            <Badge color="primary" className="bg-primary ms-1">
              {tag}
              {' '}
              <X className="cursor-pointer" onClick={() => removeToAddress(tag)} />
            </Badge>
          </li>
        ))}
        <li className="compose-address-input flex-grow-1">
          <Input ref={ref} id="email-to" onKeyDown={onKeyDown} onBlur={onBlurHandler} {...rest} />
        </li>
      </ul>
      <FormFeedback className={'form-feedback d-block '.concat(validationError ? 'visible' : 'invisible')}>
        {validationError}
      </FormFeedback>
      {' '}

    </div>
  );
});

TagsInput.propTypes = {
  validate: PropTypes.func,
  onChanged: PropTypes.func,
};

TagsInput.defaultProps = {
  validate: () => true,
  onChanged: () => {
  },
};

export default TagsInput;
