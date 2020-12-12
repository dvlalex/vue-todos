import { ClassType } from '@/core/types'

/**
 * Factory utility class
 */
export class Factory {
  private static _factories = new Map<string, unknown>()

  static get Cache(): Map<string, unknown> {
    return this._factories
  }

  /**
   * Create an instance of a class and cache it
   * @param Type
   * @param args
   */
  static createInstance<T>(Type: ClassType & { Name: string }, ...args: unknown[]): T {
    const create = (instanceKey: string) => {
      const instance = new Type(...args)
      this._factories.set(instanceKey, instance)
      return instance
    }

    return <T>this._factories.get(Type.Name) || create(Type.Name)
  }

  /**
   * Remove an instance from the cache
   * @param Type
   */
  static removeInstance<T extends { Name: string }>(Type: T): void {
    this._factories.delete(Type.Name)
  }
}
