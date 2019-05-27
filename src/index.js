import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import mocks from './mocks/questions';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer/reducer';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

const AppWrapped = withScreenSwitch(App);

const {settings, questions} = mocks;
const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
