const initialState = {
  name: 'Danny',
};

function cafienneApp(state = initialState, action) {
  switch (action.type) {
    case 'NAME':
      return { name: 'James Bond' };
    default:
      return state;
  }
}
