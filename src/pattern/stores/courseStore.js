// this is node event emmitter.
import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _course = [];

class CourseStore extends EventEmitter {

  addChangeListener(callBack) {
    this.on(CHANGE_EVENT, callBack);
  }

  removeChangeListener(callBack) {
    this.removeListener(CHANGE_EVENT, callBack);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _course;
  }

  getCourseBySlug(slug) {
    return _course.find(c => c.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register(action => {
  switch(action.actionType) {
    case actionTypes.CREATE_COURSE:
      _course.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _course = _course.map(c => c.id===action.course.id ? action.course : c);
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      _course = _course.filter(c => c.id !== parseInt(action.id, 10));
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _course = action.courses;
      store.emitChange();
      break;
    default:
      // nothing to do.
  }
})

export default store;