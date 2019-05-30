import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import mocks from './mocks/questions';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {reducer} from './reducer/reducer';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';
import {Operation} from './reducer/reducer';
import {api} from './api';

const AppWrapped = withScreenSwitch(App);

const {settings, questions} = mocks;
const store = createStore(reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operation.loadQuestions());

const init = () => {
  const main = document.querySelector(`.main`);

  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped settings={settings} questions={questions} />
      </Provider>,
      main
  );
};

init();
