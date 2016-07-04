/// <reference path="../typings/index"/>
/// <reference path="../node_modules/reflect-metadata/typings.d.ts"/>
import ReflectType from './ReflectType';
import 'reflect-metadata';
import {
    ObjectID
} from 'mongodb';

export default class Model {
    public __collection__: string;
    public __schema__: {
        [key: string]: new () => any;
    };
    toJSON() {
        let ret = {};
        for (const key in this.__schema__) {
            const value = this[key];
            if (value) {
                if (value.toString) {
                    ret[key] = value.toString();
                } else if (value.toJSON) {
                    ret[key] = value.toJSON();
                } else {
                    ret[key] = value;
                }
            }
        }
        return ret;
    }
}

export class ObjectId {
    private value: string;
    constructor(id?: string | ObjectID | ObjectId) {
        if (id instanceof String) {
            this.value = id;
        } else if (id instanceof ObjectID) {
            this.value = id.toHexString();
        } else if (id instanceof ObjectId) {
            this.value = id.value;
        }
    }
    public toString(): string {
        return this.value;
    }
    public toObjectID(): ObjectID {
        return new ObjectID(this.value);
    }
    public equals(value: ObjectID | string | ObjectId): boolean {
        if (value instanceof String) {
            return this.value === value;
        } else if (value instanceof ObjectId) {
            return this.value === value.value;
        } else if (value instanceof ObjectID) {
            return this.value === value.toHexString();
        }
    }
}

export function fromDb<T extends Model>(model: new() => T, data): T {
    let result = new model();
    const schema = model.prototype.__schema__;
    for (const key in schema) {
        if (data[key]) {
            result[key] = new schema[key](data[key]);
        }
    }
    return result;
}

export function Field<T extends Model>(prototype: T, key: string): void {
    const type = Reflect.getMetadata(ReflectType.TYPE, prototype, key);
    prototype.__schema__ = prototype.__schema__ || {};
    prototype.__schema__[key] = type;
}

export function Collection(name: string) {
    return function<T extends Model>(target: new () => T) {
        Object.defineProperty(target.prototype, '__collection__', {
            configurable: false,
            writable: false,
            enumerable: false,
            value: name
        });
        Object.defineProperty(target.prototype, '__schema__', {
            configurable: false,
            writable: false,
            enumerable: false,
            value: target.prototype.__schema__
        });
    }
}
