import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

export default dispatcher;

// dispatcher returns a singleton so it will be the only dispatcher for the whole application.
