import dispatcher from "../appDispatcher";
import * as courseApi from '../../api/courseApi';
import actionType from './actionTypes';

// action creator function
export function saveCourse(course) {
  return courseApi.saveCourse(course).then(savedCourse => {

    // dispatcher, you need to dispatch this action to stores.
    dispatcher.dispatch({
      // action
      actionType: course.id ? actionType.UPDATE_COURSE : actionType.CREATE_COURSE,
      course: savedCourse
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then(courses => {

    dispatcher.dispatch({
      // action
      actionType: actionType.LOAD_COURSES,
      courses: courses
    });
  });
}

export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {

    dispatcher.dispatch({
      // action
      actionType: actionType.DELETE_COURSE,
      id: id
    });
  });
}
