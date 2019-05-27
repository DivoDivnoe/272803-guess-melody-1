import PropTypes from 'prop-types';

const App = (props) => {
  const {questions, step, renderScreen} = props;

  return renderScreen(questions[step]);
};

App.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
          answers: PropTypes.arrayOf(PropTypes.shape({
            picture: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
          })).isRequired,
          audio: PropTypes.shape({
            src: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
          }).isRequired,
        }),
        PropTypes.shape({
          type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
          genre: PropTypes.oneOf([`rock`, `jazz`, `pop`, `blues`, `indie`]),
          answers: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
            genre: PropTypes.oneOf([`rock`, `jazz`, `pop`, `blues`, `indie`]),
          })).isRequired,
        })
      ])
  ).isRequired,
  step: PropTypes.number.isRequired,
  renderScreen: PropTypes.func.isRequired,
};

export default App;
