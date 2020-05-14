module.exports = api => {
  api.cache(true)
  return {
    presets: [
      [
        '@vue/cli-plugin-babel/preset',
        {
          targets: {
            node: 'current'
          },
          useBuiltIns: 'usage',
          corejs: 3
        }
      ]
    ]
  }
}
