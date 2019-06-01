import PropTypes from 'prop-types';
import mocks from '../../mocks/questions';

const App = (props) => {
  const {renderScreen} = props;

  return renderScreen();
};

App.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          type: PropTypes.oneOf([`artist`]).isRequired,
          answers: PropTypes.arrayOf(PropTypes.shape({
            picture: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
          })).isRequired,
          song: PropTypes.shape({
            src: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
          }).isRequired,
        }),
        PropTypes.shape({
          type: PropTypes.oneOf([`genre`]).isRequired,
          genre: PropTypes.oneOf(mocks.genres),
          answers: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
            genre: PropTypes.oneOf(mocks.genres),
          })).isRequired,
        })
      ])
  ).isRequired,
  step: PropTypes.number.isRequired,
  renderScreen: PropTypes.func.isRequired,
};

export default App;
