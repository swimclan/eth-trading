const jStat = require('jStat').jStat;

class PriceRegression {
  constructor(prices) {
    this.endog = prices;
    this.exog = this._generateExog(prices);
    this.model = jStat.models.ols(this.endog, this.exog);
  }

  _generateExog(prices) {
    let counter = 0;
    let indices = [];
    prices.forEach(() => indices.push([1, counter++]));
    return indices;
  }

  getCoefficients() {
    return this.model.coef;
  }

  getResiduals() {
    return this.model.resid;
  }

  getMaxResidual() {
    return Math.max(...this.model.resid);
  }

  getMinResidual() {
    return Math.min(...this.model.resid);
  }
}

module.exports = PriceRegression;