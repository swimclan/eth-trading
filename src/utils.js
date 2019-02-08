module.exports.filterNullCandles = function(candles) {
  return candles.filter(candle => candle.price && candle.high && candle.low && candle.open);
}

module.exports.filterLastNCandles(candles, n) {
  return [...candles.slice(-Math.abs(n))];
}