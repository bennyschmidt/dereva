/* eslint-disable no-magic-numbers */

module.exports = {
  capitalizeSlug: source => (
    source
      .split('-')
      .map(word => (
        word.replace(
          word.charAt(0),
          word.charAt(0).toUpperCase()
        ))
      )
      .join(' ')
  ),
  toDollar: number => {
    const dollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return dollar.format(number);
  },
  toSingular: string => {
    let result = string;

    if (result.substr(-3) === 'ies') {
      result = `${result.slice(0, -3)}y`;
    }

    if (result.substr(-1) === 's') {
      result = result.slice(0, -1);
    }

    return result;
  },
  generateUUID: () => {
    const g4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
    };

    return (
      `${g4()}${g4()}-${g4()}-${g4()}-${g4()}-${g4()}${g4()}${g4()}`
    );
  }
};
