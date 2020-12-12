import { Factory } from '@/core/utils/factory'

class SomeClass {
  something: string

  static get Name(): string {
    return 'SomeClass'
  }

  constructor(something: string) {
    this.something = something
  }
}

describe('core/utils/factory', () => {
  let instance: SomeClass

  test('cache should be empty', () => {
    const cache = Factory.Cache

    expect(cache.size).toEqual(0)
  })

  test('should return an instance', () => {
    instance = Factory.createInstance<SomeClass>(SomeClass, 'something in class')

    expect(instance).toBeInstanceOf(SomeClass)
    expect(instance.something).toEqual('something in class')
    expect(Factory.Cache.size).toEqual(1)
  })

  test('should return the same instance', () => {
    const retrieveInstance = Factory.createInstance<SomeClass>(SomeClass, 'something new in class')

    expect(retrieveInstance).toBe(instance)
    expect(Factory.Cache.size).toEqual(1)
  })

  test('should remove an instance from cache', () => {
    Factory.removeInstance(SomeClass)

    expect(Factory.Cache.size).toEqual(0)
  })

  test('should return a different instance', () => {
    const retrieveInstance = Factory.createInstance<SomeClass>(SomeClass, 'something in class')

    expect(retrieveInstance).not.toBe(instance)
    expect(Factory.Cache.size).toEqual(1)
  })
})
