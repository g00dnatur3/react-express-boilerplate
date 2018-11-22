import { JsonConvert, ValueCheckingMode } from 'json2typescript'

const jsonConvert: JsonConvert = new JsonConvert()
jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL

export const deserialize = jsonConvert.deserialize.bind(jsonConvert)

export const deserializeArray = jsonConvert.deserializeArray.bind(jsonConvert)

export const deserializeObject = jsonConvert.deserializeObject.bind(jsonConvert)

function _deserializeMap<String,T>(map: any, clazz: {
	new (): T;
}): Map<String,T> {
	return Object.keys(map).reduce((result: any, key) => {
		result[key] = deserialize(map[key], clazz) as T
		return result
	}, {} as Map<String,T>)
}

export const deserializeMap = _deserializeMap

