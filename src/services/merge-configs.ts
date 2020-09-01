import { Configuration } from 'webpack'
import { isRegExp, isBoolean, isString, isArray, isObject } from 'util'

function assign(from, to) {
    let result = to

    if (isRegExp(from)) result = from
    else if (isBoolean(from)) result = from
    else if (isString(from)) result = "" + from
    else if (isArray(from)) {
        if (!isArray(to)) result = []
        from.forEach((entry, i) => {
            if (result[i] !== undefined) result[i] = assign(entry, result[i])
            else result.push(entry)
        })
    } else if (isObject(from)) {
        if (!isObject(result)) result = {}
        Object.keys(from).forEach((key) => {
            result[key] = assign(from[key], result[key])
        })
    } else result = JSON.parse(JSON.stringify(from))

    return result
}

export default function merge(...configs: Array<Configuration>): Configuration {
    let merged: Configuration = {}

    configs.forEach((config) => {
        merged = assign(config, merged)
    })

    return merged
}