export const isString = (value: unknown) => Object.prototype.toString.call(value) === '[object String]'

export const capitalize = (value: string) => `${value[0].toUpperCase()}${value.slice(1)}`
