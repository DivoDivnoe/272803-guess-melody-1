import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import mocks from '../../mocks/questions';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswer: Array.from({length: props.question.answers.length}, () => false)
      };

      this._changeUserAnswer = this._changeUserAnswer.bind(this);
    }

    render() {
      const {question, mistakes, submitHandler} = this.props;
      const {userAnswer} = this.state;

      return (
        <Component
          question={question}
          mistakes={mistakes}
          submitHandler={submitHandler}
          userAnswer={userAnswer}
          changeAnswerHandler={this._changeUserAnswer}
        />
      );
    }

    _changeUserAnswer(index) {
      const userAnswer = this.state.userAnswer.slice();
      userAnswer[index] = !userAnswer[index];

      this.setState({userAnswer});
    }
  }

  WithUserAnswer.propTypes = {
    submitHandler: PropTypes.func.isRequired,
    question: PropTypes.shape({
      type: PropTypes.oneOf([`genre`]).isRequired,
      genre: PropTypes.oneOf(mocks.genres),
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.oneOf(mocks.genres),
      })).isRequired,
    }).isRequired,
    mistakes: PropTypes.number.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
