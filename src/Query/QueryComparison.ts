/// <reference path="../../typings/index"/>
import Query from './';
import Model from '../Model';
import * as _ from 'lodash';
export default class QueryComparison<T extends Model> {
    private key: string;
    private model: new() => T;
    private query: {[key: string] : any};
    constructor(model: new() => T, query: {[key: string] : any}, key: string) {
        this.key = key;
        this.model = model;
        this.query = query;
    }
    public eq(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $eq: value
            }
        }, this.query));
    }
    public ne(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $ne: value
            }
        }, this.query));
    }
    public gt(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $gt: value
            }
        }, this.query));
    }
    public lt(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $lt: value
            }
        }, this.query));
    }
    public gte(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $gte: value
            }
        }, this.query));
    }
    public lte(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $lte: value
            }
        }, this.query));
    }
    public in(value: Array<any>): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $in: value
            }
        }, this.query));
    }
    public nin(value: Array<any>): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $nin: value
            }
        }, this.query));
    }
    public exist(value: Boolean): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $exist: value
            }
        }, this.query));
    }
    public type(value: string): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $type: value
            }
        }, this.query));
    }
}
