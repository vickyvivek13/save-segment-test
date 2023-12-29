const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://vickyvivek13.github.io/api',
    createProxyMiddleware({
      target: 'https://webhook.site/49e3dd13-222d-43e4-93be-d14d45b9f491',
      changeOrigin: true,
    })
  );
};
