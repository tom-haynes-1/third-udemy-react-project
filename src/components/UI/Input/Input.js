import React, { useRef, useImperativeHandle, forwardRef } from "react";

import classes from './Input.module.css';

const Input = forwardRef((props, ref) => {
    const inputRef = useRef();

    const focusInput = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: focusInput
        };
    });

  return (
    <>
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={ props.labelId }>
            { props.labelText }
        </label>
        <input
          ref={ inputRef }  
          type={ props.inputType }
          id={ props.inputId }
          value={ props.value }
          onChange={ props.onChange }
          onBlur={ props.onBlur }
        />
      </div>
    </>
  );
});

export default Input;