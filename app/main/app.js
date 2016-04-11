import Polymer from '../main/polymer';
import store from '../main/store';
import PolymerRedux from '../../bower_components/polymer-redux/polymer-redux';

// This custom import is required for webpack to traverse over all the imports
import '../elements/todo-list';
import polymerInit from '../main/init';

polymerInit(document);
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
  }
}

export default new Polymer(CafienneUi);
