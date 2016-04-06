import Polymer from './polymer';
import store from './elements/store';
import { addTodo } from './actions';
import PolymerRedux from '../bower_components/polymer-redux/polymer-redux';

require('./elements/todo-list');

const ReduxBehavior = new PolymerRedux(store);

class CafienneUi {
  /*
  get listeners() {
    return {
      'nameBtn.tap': 'handleName',
      'agentBtn.tap': 'handleAgent',
    };
  }
  */

  get behaviors() {
    return this._behaviors || (this._behaviors = [ReduxBehavior]);
  }

  set behaviors(value) {
    this._behaviors = value;
    return;
  }

  beforeRegister() {
    this.is = 'cafienne-ui';
    this._behaviors = [ReduxBehavior];
    this.properties = {
      store: {
        type: Object,
      },
    };
  }
  ready() {
    this.store = store;
    store.dispatch(addTodo('Test Polymer and Redux'));
    // console.log(this.store);
  }
}

export default new Polymer(CafienneUi);
