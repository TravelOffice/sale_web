import React from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormItemProps } from '@components/Form/FormItemProps';
import FormItemError from '@components/Form/FormItemError';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

export interface FormItemInputProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> extends FormItemProps<TFieldValues, TFieldPath> {
  editorState: EditorState;
  setEditorState: (value: EditorState) => void;
}

export default function FormItemEditor<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FormItemInputProps<TFieldValues, TFieldPath>) {
  const {
    control, errors, name, editorState, placeholder, setEditorState,
  } = props;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ...rest } }) => (
          <Editor
            defaultContentState={convertToRaw(
              ContentState.createFromBlockArray(htmlToDraft(value || '').contentBlocks),
            )}
            editorState={editorState}
            onEditorStateChange={(newEditorState) => {
              setEditorState(newEditorState);
              onChange(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
            }}
            placeholder={placeholder}
            {...rest}
          />
        )}
      />
      <FormItemError fieldError={errors[name]} />
    </>
  );
}
