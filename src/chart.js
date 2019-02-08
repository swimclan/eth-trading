const CandleChart = require('gdax-candles');

class Chart {
  constructor(product, timeframe, onClose) {
    this.product = product; 
    this.timeframe = timeframe;
    this.onClose = onClose;
    this.candles = [];
    this.chart = null;
    this.start();
  }

  start() {
    const { product, timeframe } = this;
    this.chart = new CandleChart({ product, timeframe }).start();
    this.chart.on('close', this._closeCallback);
  }

  _closeCallback(candle) {
    this.candles = [...this.chart.candles];
    this.onClose(candle);
  }
}

module.exports = Chart;