import { Colors } from 'config';

const getScoreColor = (score) => {
  if (score >= 8) {
    return Colors.topScore;
  } else if (score >= 5 && score < 8) {
    return Colors.goodScore;
  } else if (score >=3 && score < 5) {
    return Colors.warningScore;
  } else if (score < 3) {
    return Colors.badScore;
  }
};

export default getScoreColor;
