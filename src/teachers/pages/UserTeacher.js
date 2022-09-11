import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TeacherList from '../components/TeacherList';
const UserTeacher = () => {
  const [loadedteacher, setLoadedTeacher] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/teacher/user/${userId}`
        );
        setLoadedTeacher(responseData.teacher);
      } catch (err) {}
    };
    fetchTeachers();
  }, [sendRequest, userId]);

  const DeletedHandler = deletedId => {
    setLoadedTeacher(prev =>
      prev.filter(place => place.id !== deletedId)
    );
  };

  return (
    <React.Fragment>
    
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedteacher && (
        <TeacherList items={loadedteacher} onDeletePlace={DeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserTeacher;
