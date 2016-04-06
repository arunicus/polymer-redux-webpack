
import Polymer from './polymer';
// import Redux from 'redux';
import { addTodo } from './actions';
import store from './store';
import PolymerRedux from '../bower_components/polymer-redux/polymer-redux';

// require('redux');

const ReduxBehavior = new PolymerRedux(store);

class CafienneUi {
  get listeners() {
    return {
      'nameBtn.tap': 'handleName',
      'agentBtn.tap': 'handleAgent',
    };
  }

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
      name: {
        type: String,
        statePath: 'name',
      },
    };
  }
  ready() {
    console.log('Cafienne UI Ready');
  }
  handleName() {
    this.dispatch(addTodo('Enter your name'));
  }
  handleAgent() {
    this.dispatch(addTodo('Enter your secret agent code'));
  }
}

export default new Polymer(CafienneUi);
