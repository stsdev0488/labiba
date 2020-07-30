import { Colors } from 'config';

const getScoreColor = (score) => {
  if (score >= 8) {
    return Colors.topScore;
  } else if (score >= 5 && score < 8) {
    return Colors.goodScore;
  } else if (score >= 3 && score < 5) {
    return Colors.warningScore;
  } else if (score < 3) {
    return Colors.badScore;
  }
};

export const getValueColor = (value, steps, width, category) => {
  const sectionWidth = width / 4;
  if (value < steps[1] && value >= steps[0]) {
    return {
      color: Colors.topScore,
      status: `Less ${category}`,
      width: (value * sectionWidth) / (steps[1] - steps[0]),
    };
  } else if (value < steps[2] && value >= steps[1]) {
    return {
      color: Colors.goodScore,
      status: `A bit less ${category}`,
      width:
        sectionWidth +
        (sectionWidth * (value - steps[1])) / (steps[2] - steps[1]),
    };
  } else if (value < steps[3] && value >= steps[2]) {
    return {
      color: Colors.warningScore,
      status: `A bit too ${category}`,
      width:
        sectionWidth * 2 +
        (sectionWidth * (value - steps[2])) / (steps[3] - steps[2]),
    };
  } else if (value >= steps[3]) {
    return {
      color: Colors.badScore,
      status: `Too ${category}`,
      width:
        sectionWidth * 3 +
          (sectionWidth * (value - steps[3])) / (steps[4] - steps[3]) >
        width
          ? width
          : sectionWidth * 3 +
            (sectionWidth * (value - steps[3])) / (steps[4] - steps[3]),
    };
  }
};

export default getScoreColor;
