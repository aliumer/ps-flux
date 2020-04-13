import React, { useState, useEffect } from 'react';
import courseStore from '../pattern/stores/courseStore';
import { loadCourses, deleteCourse  } from '../pattern/actions/courseActions';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';


function CoursePage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }
    // this cleanup function will run on commponent un mount.
    return () => courseStore.removeChangeListener(onChange);
  }, [])
  
  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (<>
    <h2>Courses</h2>
    <Link className="btn btn-primary" to="/course">
    Add New Course
    </Link>
    <CourseList courses={courses} deleteCourse={deleteCourse}/>
  </>);

}

export default CoursePage;