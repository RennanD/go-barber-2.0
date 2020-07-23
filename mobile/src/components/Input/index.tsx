import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';
import { Container, TextInput, InputIcon, ErrorMessage } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputComponentRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputComponentRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(inputRef: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Container isFocused={isFocused} isErrored={!!error}>
        <InputIcon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#ff9000' : '#666360'}
        />
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholderTextColor="#666360"
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
    </>
  );
};

export default forwardRef(Input);
