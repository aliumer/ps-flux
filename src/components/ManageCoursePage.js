import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import { toast } from "react-toastify";
import courseStore from '../pattern/stores/courseStore';
import * as courseActions from '../pattern/actions/courseActions';


const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: ''
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length ,props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange(event) {
    const updatedCourse = {...course, [event.target.name]: event.target.value};
    setCourse(updatedCourse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(!formIsValid()) return;

    courseActions.saveCourse(course).then(() => { 
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