const generateSymbol = (exchange, fromSymbol, toSymbol) => {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${exchange}:${short}`,
  };
};

export default generateSymbol;
