import Polymer from '../main/polymer';
import '../main/init';
import '../elements/todo-list';

class CafienneUi {

  beforeRegister() {
    this.is = 'cafienne-ui';
  }

}

export default new Polymer(CafienneUi);
