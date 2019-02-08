const Gdax = require('gdax');

class Exchange {
  constructor(product, { key, passphrase, secret }) {
    this.key = key;
    this.passphrase = passphrase;
    this.secret = secret;
    this.product = product;
    this.client = new Gdax.AuthenticatedClient(
      key,
      secret,
      passphrase,
      apiURI
    );

  }
}

module.exports = Exchange;