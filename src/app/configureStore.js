import loggerMiddleware from './middleware/logger'
import callApiMiddleware from './middleware/callApi'
import rootReducer from './reducers'


import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

export default function configureAppStore(preloadedState) {
  console.log('preloadedState : ', preloadedState);
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, callApiMiddleware, ...getDefaultMiddleware()],
    preloadedState,
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }
  console.log('store state : ', store.getState());
  return store
}