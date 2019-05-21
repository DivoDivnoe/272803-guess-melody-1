import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import mocks from './mocks/questions';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer/reducer';

const {settings, questions} = mocks;
const store = createStore(reducer);

const init = () => {
  const main = document.querySelector(`.main`);

  ReactDOM.render(
      <Provider store={store}>
        <App settings={settings} questions={questions} />
      </Provider>,
      main
  );
};

init();
