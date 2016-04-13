import Polymer from '../main/polymer';
import { addTodo } from '../actions';

class TodoList {

  get behaviors() {
    return this._behaviors || (this._behaviors = [window.reduxBehavior]);
  }

  set behaviors(value) {
    this._behaviors = value;
    return;
  }

  // when the user clicks on the add paper-button run _addNew function
  get listeners() {
    return { 'add.tap': '_addNew' };
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
      }
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
