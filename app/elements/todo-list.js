import Polymer from '../main/polymer';
import { addTodo, completeTodo } from '../actions';

class TodoList {

  get behaviors() {
    return this._behaviors || (this._behaviors = [window.reduxBehavior]);
  }
  set behaviors(value) {
    this._behaviors = value;
    return;
  }

  get listeners() {
    return {
      'add.tap': '_addNew',
    };
  }

  beforeRegister() {
    this.is = 'todo-list';
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
    this.dispatch(addTodo(todo));
    this.$.new.value = '';
  }

  clearInput() {
    this.$.new.value = '';
  }
  _computeClass(isSelected, completed) {
    let classes = 'item';
    if (isSelected) {
      classes += ' selected';
    }
    if (completed) {
      classes += ' completed';
    }

    return classes;
  }
  _completeTodo(e) {
    const args = e.target.getAttribute('data-args').split(',');
    this.dispatch(completeTodo(args[0]));
  }
}

export default new Polymer(TodoList);
