import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import * as courseApi from '../api/courseApi';
import { toast } from "react-toastify";


const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: ''
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      courseApi.getCourseBySlug(slug).then((_course) => {
        setCourse(_course);
      });
    }
  }, [props.match.params.slug]);

  function handleChange(event) {
    const updatedCourse = {...course, [event.target.name]: event.target.value};
    setCourse(updatedCourse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(!formIsValid()) return;
    courseApi.saveCourse(course).then(() => { 
      props.history.push('/courses');
      toast.success('Course saved.');
    });
  }

  function formIsValid() {
    const _errors = {};

    if(!errors.title) _errors.title = 'Title is required.';
    if(!errors.authorId) _errors.authorId = 'Author Id is required.';
    if(!errors.category) _errors.category = 'Category is required.';

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  return (
  <>
    
    <h2>Manage course page</h2>
    <CourseForm 
      errors={errors}
      course={course} 
      onChange={handleChange} 
      onSubmit={handleSubmit} />

  </>);
}

export default ManageCoursePage;