import Polymer from '../polymer';
import Redux from 'redux';

// var warning = 'Polymer Redux: <%s>.%s has "notify" enabled, two-way bindings goes against redux\'s paradigm';


export default function PolymerRedux(store) {
  var warning = 'Polymer Redux: <%s>.%s has "notify" enabled, two-way bindings goes against redux\'s paradigm';
  return function(store) {
    let createListener = function(element, props) {
      return function() {
        const state = store.getState();
        props.forEach((property) => {
          if (typeof property.path === 'function') {
            this[property.name] = property.path.call(this, state);
          } else {
            this[property.name] = Polymer.Base.get(property.path, state);
          }
        }, element);
      };
    };

    return {
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
          listener = createListener(this, props);
          store.subscribe(() => {
            listener();
            fire('state-changed', store.getState());
          });
          listener(); // starts state binding
        }
      },
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
          return store.dispatch(this.actions[name].apply(this, args));
        }

        // function
        if (typeof args[0] === 'function') {
          return store.dispatch(args[0]());
        }

        // object
        if (args[0] != null && typeof args[0] === 'object') {
          return store.dispatch(args[0]);
        }

        throw new TypeError('Polymer Redux: <' + tag + '>.dispatch must be given an action name, function or native redux action object');
      },
      getState() {
        return store.getState();
      },
    };
  };
}
