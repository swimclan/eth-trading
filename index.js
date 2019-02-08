const Chart = require('gdax-candles');
const jStat = require('jStat').jStat;

const product = 'ETH-USD';
const timeframe = '1m';
const ethChart = new Chart({ product, timeframe }).start();
const candles = [];

const CANDLE_COUNT = 120;

ethChart.on('close', candle => {
  candle.price && candle.high && candle.low && candles.push(candle);
  if (candles.length >= CANDLE_COUNT) {
    let highs = [];
    let lows = [];
    let prices = [];
    let indices = [];
    let j=0;
    for (let i=candles.length-CANDLE_COUNT; i < candles.length; i++) {
      highs.push(candles[i].high);
      lows.push(candles[i].low);
      prices.push(candles[i].price);
      indices.push([1, j++]);
    }
    const highModel = jStat.models.ols(highs, indices);
    const lowModel = jStat.models.ols(lows, indices);
    const priceModel = jStat.models.ols(prices, indices);
    const now = new Date();
    console.log('----------------------------------------------------------------');
    console.log(now.toString());
    console.log(`Highest residual (highs): ${Math.max(...highModel.resid)}`);
    console.log(`Lowest residual (lows): ${Math.max(...lowModel.resid)}`);
    console.log(`slope (prices): ${priceModel.coef[1]}`);
    console.log(`y-int (prices): ${priceModel.coef[0]}`);
    console.log(`Predicted next price = ${priceModel.coef[0] + ((CANDLE_COUNT + 1) * priceModel.coef[1])}`)
    console.log('----------------------------------------------------------------');
  }
});