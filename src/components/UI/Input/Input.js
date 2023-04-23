import React from "react";

import classes from './Input.module.css';

const Input = (props) => {
    return (
      <>
        <div
          className={ `${classes.control} ${
            props.isValid === false ? classes.invalid : ""
          }` }
        >
          <label 
            htmlFor={ props.labelId }
          >
            { props.labelText }
          </label>
          <input 
            type={ props.inputType }
            id={ props.inputId }
            value={ props.value }
            onChange={ props.onChange }
            onBlur={ props.onBlur } 
          />
        </div>
      </>
    );
};

export default Input;