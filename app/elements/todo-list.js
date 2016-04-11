import Polymer from '../polymer';
import store from './store';
import { addTodo } from '../actions';
// import PolymerRedux from '../../bower_components/polymer-redux/polymer-redux';
// import PolymerRedux from './redux-behavior';

const ReduxBehavior = window.PolymerRedux(store);

class TodoList {
  get listeners() {
    return { 'add.tap': '_addNew' };
  }
  get behaviors() {
    return this._behaviors || (this._behaviors = [ReduxBehavior]);
  }

  set behaviors(value) {
    this._behaviors = value;
    return;
  }
  beforeRegister() {
    this.is = 'todo-list';
    this._behaviors = [ReduxBehavior];
    this.properties = {
      selectedItem: {
        type: Object,
      },
      todo: {
        type: Object,
      },
      todos: {
        type: Array,
        statePath: (state) => state.todos,
      },
    };
  }
  _addNew() {
    const todo = this.$.new.value;
    store.dispatch(addTodo(todo));
    this.$.new.value = '';
  }
  clearInput() {
    this.$.new.value = '';
  }
  _computeClass(isSelected) {
    console.log(this.selectedItem);
    let classes = 'item';
    if (isSelected) {
      classes += ' selected';
    }
    return classes;
  }
  _completeTodo(e) {
    console.log(e.model);
    let classes = 'item';
    classes += ' completed';
    return classes;
  }
}

export default new Polymer(TodoList);
