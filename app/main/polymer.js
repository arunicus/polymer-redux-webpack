import PolymerRedux from '../../bower_components/polymer-redux/polymer-redux';
import store from '../main/store';
window.reduxBehavior = new PolymerRedux(store);

export default window.Polymer;
