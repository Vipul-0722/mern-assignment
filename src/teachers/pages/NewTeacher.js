import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './TeacherForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const {sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      phone: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/teacher',
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          phone: formState.inputs.phone.value,
          email: formState.inputs.email.value,
          creator: auth.userId
        }),
        { 'Content-Type': 'application/json' }
      );
         history.push('/' + auth.userId + '/teacher');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <form className="teacher-form" onSubmit={placeSubmitHandler}>
  
        <Input
          id="name"
          element="input"
          type="text"
          label="Teacher's Name"
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="phone"
          element="textarea"
          label="Phone No"
          errorText="Please enter a valid phone (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          label="Email Address"
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD TEACHER
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
