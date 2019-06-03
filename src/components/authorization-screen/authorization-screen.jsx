import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const AuthorizationScreen = (props) => {
  const {mistakes, authUserHandler, restart} = props;

  const submitHandler = (evt) => {
    evt.preventDefault();

    const data = {
      email: evt.target.name.value,
      password: evt.target.password.value,
    };

    return authUserHandler(data, () => props.history.push(`/win`));
  };

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">
        За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив {mistakes} ошибки
      </p>
      <p className="login__text">
        Хотите сравнить свой результат с предыдущими попытками? Представтесь!
      </p>
      <form className="login__form" action="" onSubmit={submitHandler}>
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name" required />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password" required />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <Link className="replay" to="/" onClick={restart}>Сыграть ещё раз</Link>
    </section>
  );
};

AuthorizationScreen.propTypes = {
  mistakes: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
  authUserHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default AuthorizationScreen;
