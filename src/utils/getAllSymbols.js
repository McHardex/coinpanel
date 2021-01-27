import generateSymbol from "./generateSymbol";
const rp = require("request-promise").defaults({ json: true });

const getAllSymbols = async (api_root, config) => {
  const data = await rp(api_root);
  let allSymbols = [];

  for (const exchange of config.exchanges) {
    const pairs = data.Data.exchanges[exchange.value].pairs;

    for (const leftPairPart of Object.keys(pairs)) {
      const symbolPairs = Object.keys(pairs[leftPairPart].tsyms);
      const symbols = symbolPairs.map((rightPairPart) => {
        const symbol = generateSymbol(
          exchange.value,
          leftPairPart,
          rightPairPart
        );
        return {
          symbol: symbol.short,
          full_name: symbol.full,
          description: symbol.short,
          exchange: exchange.value,
          type: "crypto",
        };
      });

      allSymbols = [...allSymbols, ...symbols];
    }
  }
  return allSymbols;
};

export default getAllSymbols;
