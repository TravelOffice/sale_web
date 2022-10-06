import React, { forwardRef, useEffect, useState } from 'react';
import {
  Badge, FormFeedback, Input, InputProps,
} from 'reactstrap';
import { X } from 'react-feather';
import PropTypes from 'prop-types';

export interface TagsInputProps extends InputProps {
  validate?: (value: string) => boolean,
  onChanged?: (tags: string[]) => void,
}

const TagsInput = forwardRef<Input, TagsInputProps>((componentProps, ref) => {
  const {
    // eslint-disable-next-line no-unused-vars
    validate, onChanged, value, ...rest
  } = componentProps;
  const [tags, setTags] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string>();

  useEffect(() => {
    onChanged?.(tags);
  }, [tags]);

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputRef = (e.target as HTMLInputElement);
      const { value: inputValue } = inputRef;
      inputRef.value = '';
      if (validate && !validate(inputValue)) {
        setValidationError('err');
      } else {
        if (!tags.includes(inputValue)) {
          setTags(tags.concat(inputValue));
        }
        setValidationError(undefined);
      }
    }
  };

  const removeToAddress = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="d-flex flex-column">
      <ul className="list-unstyled d-flex flex-wrap flex-grow-1 mb-0 align-items-center">
        <li>
          {tags.map((tag) => (
            <Badge color="primary" className="bg-primary ms-1" key={tag}>
              {tag}
              {' '}
              <X className="cursor-pointer" onClick={() => removeToAddress(tag)} />
            </Badge>
          ))}
        </li>
        <li className="flex-grow-1">
          <Input ref={ref} id="email-to" onKeyDown={onEnter} {...rest} />
        </li>
      </ul>
      <FormFeedback>{validationError}</FormFeedback>
    </div>
  );
});

TagsInput.propTypes = {
  validate: PropTypes.func,
  onChanged: PropTypes.func,
};

TagsInput.defaultProps = {
  validate: () => true,
  onChanged: () => {},
};

export default TagsInput;
