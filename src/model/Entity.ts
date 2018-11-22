import {JsonObject, JsonProperty} from 'json2typescript'
import {ObjectID} from 'bson'

@JsonObject
abstract class Entity {

  @JsonProperty('_id', String)
  _id?: string = undefined

  @JsonProperty('createTime', Number)
  createTime?: number = undefined

  constructor() {
    this.createTime = Date.now()
    this._id = new ObjectID().toHexString()
  }

  validate? = (): null | string => null

}

export default Entity