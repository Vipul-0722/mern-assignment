import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './TeacherForm.css';

const UpdateTeacher = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedteacher, setLoadedTeacher] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      phone: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequest(
          `/api/teacher/${placeId}`
        );
        setLoadedTeacher(responseData.teacher);
        setFormData(
          {
            name: {
              value: responseData.teacher.name,
              isValid: true
            },
            phone: {
              value: responseData.teacher.phone,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchTeacher();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/teacher/${placeId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          phone: formState.inputs.phone.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/' + auth.userId + '/teacher');
    } catch (err) {}
  };

  

  return (
    <React.Fragment>
  
      {!isLoading && loadedteacher && (
        <form className="teacher-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="name"
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedteacher.name}
            initialValid={true}
          />
          <Input
            id="phone"
            element="textarea"
            label="phone"
            errorText="Please enter a valid phone (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedteacher.phone}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateTeacher;
