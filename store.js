import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const createStoreWithMiddleWare = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleWare(reducers);

export default store;