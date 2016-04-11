import Polymer from '../main/polymer';
import store from '../main/store';
import { addTodo } from '../actions';
import PolymerRedux from '../../bower_components/polymer-redux/polymer-redux';

const ReduxBehavior = new PolymerRedux(store);

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
      foo: {
        type: String,
        value: 'todo-list',
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
}

export default new Polymer(TodoList);
