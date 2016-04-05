
import Polymer from './polymer';
// import { createStore } from '../node_modules/redux/dist/redux';
import PolymerRedux from '../bower_components/polymer-redux/polymer-redux';


const store = Redux.createStore((state, action) => {
  switch (action.type) {
    case 'agent':
      return { name: '007' };
    case 'name':
      return { name: 'James Bond' };
    default:
      return { name: 'Danny Kruitbosch' };
  }
}, window.devToolsExtension ? window.devToolsExtension() : undefined);

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
    this.dispatch({ type: 'name' });
  }
  handleAgent() {
    this.dispatch({ type: 'agent' });
  }
}

export default new Polymer(CafienneUi);
