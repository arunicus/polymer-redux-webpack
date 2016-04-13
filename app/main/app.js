import Polymer from '../main/polymer';
import '../elements/todo-list';
import polymerInit from '../main/init';

// Add to global
polymerInit(document);

class CafienneUi {

  beforeRegister() {
    this.is = 'cafienne-ui';
  }

}

export default new Polymer(CafienneUi);
