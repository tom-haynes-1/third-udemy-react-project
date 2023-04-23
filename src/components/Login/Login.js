import React, { useState, useEffect, useReducer, useContext } from 'react';

import classes from './Login.module.css';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }

  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  // initialState to be passed into useReducer() hook as 2nd argument.
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  // initialState to be passed into useReducer() hook as 2nd argument.
  return { value: '', isValid: false };
};

const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {

    console.log('Effect running');

    return () => {
      console.log('Effect cleanup');
    };

  }, []);

  // Assigning an alias to an property of an object using destructuring syntax.
  // In this example, the form validity stops being checked after every keystroke if the password length exceeds it's condition (length > 6) 
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {

    const identifier = setTimeout(() => {
      console.log('Checking form is valid');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('clean-up');
      clearTimeout(identifier);
    };
    
  } ,[emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={ classes.login }>
      <form 
        onSubmit={ submitHandler }
      >
       <Input
        labelText="E-Mail"
        labelId="email"
        inputType="email"
        inputId="email"
        isValid={ emailIsValid }
        value={ emailState.value }
        onChange={ emailChangeHandler }
        onBlur={ validateEmailHandler }
       /> 
       <Input
        labelText="Password"
        labelId="password"
        inputType="password"
        inputId="password"
        isValid={ passwordIsValid }
        value={ passwordState.value }
        onChange={ passwordChangeHandler }
        onBlur={ validatePasswordHandler }
       />
        <div className={ classes.actions }>
          <Button 
            type="submit" 
            className={ classes.btn } 
            disabled={ !formIsValid }
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
