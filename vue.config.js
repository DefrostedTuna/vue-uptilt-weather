module.exports = {
  devServer: {
    // The host check must be disabled when running in docker through a reverse proxy.
    // This is for local development via docker-compose and will not apply in production.
    disableHostCheck: true,
    public: `http://${process.env.VIRTUAL_HOST}/`
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
    },
  }
}