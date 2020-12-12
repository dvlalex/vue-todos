module.exports = { components: () => require.context('.', true, /^[^_]+\.(vue|ts)$/, 'lazy') }
