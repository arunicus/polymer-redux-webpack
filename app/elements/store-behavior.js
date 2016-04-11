import Polymer from '../polymer';
import Redux from 'redux';

const warning = 'Polymer Redux: <%s>.%s has "notify" enabled, two-way bindings goes against redux\'s paradigm';

/*
const createListener = function(element, props) {
  return () => {
    const state = store.getState();
    props.forEach((property) => {
      if (typeof property.path === 'function') {
        this[property.name] = property.path.call(this.state);
      } else {
        this[property.name] = Polymer.Base.get(property.path, state);
      }
    }, element);
  };
};
*/

class PolymerRedux {
  constructor(store) {
    this.store = store;
  }

  /*
  createListener(element, props) {
    return () => {
      const state = this.store.getState();
      props.forEach((property) => {
        if (typeof property.path === 'function') {
          this[property.name] = property.path.call(this.state);
        } else {
          this[property.name] = Polymer.Base.get(property.path, state);
        }
      }, element);
    };
  }
  */


  ready() {
    const props = [];
    const tag = this.constructor.name;
    const fire = this.fire.bind(this);
    let listener;

    // property bindings
    for (const name in this.properties) {
      if (this.properties.hasOwnProperty(name)) {
        if (this.properties[name].statePath) {
          // notify flag, warn against two-way bindings
          if (this.properties[name].notify) {
            console.warn(warning, tag, name);
          }
          props.push({ name, path: this.properties[name].statePath });
        }
      }
    }

    // subscribe properties to state change
    if (props.length) {
      listener = (element, props) => () => {
        let state = this.store.getState();
        props.forEach((property) => {
          if (typeof property.path === 'function') {
            this[property.name] = property.path.call(this.state);
          } else {
            this[property.name] = Polymer.Base.get(property.path, state);
          }
        }, element);
      };
      console.log(listener);
      this.store.subscribe(() => {
        listener();
        console.log('state changed');
        fire('state-changed', this.store.getState());
      });
      listener(); // starts state binding
    }
  }
  dispatch() {
    const args = Array.prototype.slice.call(arguments);
    const tag = this.constructor.name;
    let name;

    // action name
    if (typeof args[0] === 'string') {
      name = args.splice(0, 1);
      if (typeof this.actions[name] !== 'function') {
        throw new TypeError('Polymer Redux: <' + tag + '> has no action "' + action + '"');
      }
      return this.store.dispatch(this.actions[name].apply(this, args));
    }

    // action creator
    if (typeof args[0] === 'function' && args[0].length === 0) {
      return this.store.dispatch(args[0]());
    }

    // action
    return this.store.dispatch(args[0]);
  }

  getState() {
    return this.store.getState();
  }
}

export default PolymerRedux;
