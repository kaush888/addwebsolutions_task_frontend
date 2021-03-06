import { combineReducers } from 'redux';

import { authentication } from './useraction.reducer';

const rootReducer = combineReducers({
  authentication
});

export default rootReducer;