import {JsonConverter, JsonCustomConvert} from 'json2typescript'
import {deserialize} from '../utils/json'

export const viewOnly = (classRef: any): any => {
  @JsonConverter
  class ViewOnly<T> implements JsonCustomConvert<T> {
        serialize(obj?: any): any {
            return undefined
        }
        deserialize(json: any): T {
          if (classRef === String || Number) return json
          return (typeof json === 'object') ? deserialize(json, classRef) : json
        }
    }
    return ViewOnly
} 

