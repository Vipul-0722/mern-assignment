import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import TeacherItem from './TeacherItem';
import Button from '../../shared/components/FormElements/Button';
import './TeacherList.css';

const TeacherList = props => {
  if (props.items.length === 0) {
    return (
      <div className="teacher-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/teacher/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="teacher-list">
      {props.items.map(teacher => (
        <TeacherItem
          key={teacher.id}
          id={teacher.id}
          name={teacher.name}
          phone={teacher.phone}
          email={teacher.email}
          creatorId={teacher.creator}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default TeacherList;
