const Chart = require('gdax-candles');
const jStat = require('jStat').jStat;

const product = 'ETH-USD';
const timeframe = '15m';
const ethChart = new Chart({ product, timeframe }).start();
const candles = [];
ethChart.on('close', candle => {
  candle.price && candle.high && candle.low && candles.push(candle);
  if (candles.length >= 20) {
    let highs = [];
    let lows = [];
    let prices = [];
    let indices = [];
    let j=0;
    for (let i=candles.length-20; i < candles.length; i++) {
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
    console.log('----------------------------------------------------------------');
  }
});