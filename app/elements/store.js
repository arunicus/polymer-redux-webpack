import { createStore, compose } from 'redux';
import todoApp from '../reducers';

export default createStore(
  todoApp,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);
