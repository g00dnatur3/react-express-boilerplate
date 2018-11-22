
import {deserialize} from '../../utils/json'
import {MongoClient, Db, WriteOpResult, MongoError, FilterQuery} from 'mongodb'
import getLog from '../../utils/log'

const log = getLog(__filename)

// Connection URL
const url: string = 'mongodb://localhost:27017'

// Database Name
const dbName = 'test'

//type DocType = Entity1 | Entity2 | Entity3 | ...

//type CollectionName = 'entities1' | 'entities2' | 'entities3' | ...

// function toCollectionName(doc: DocType): CollectionName | null {
//     return doc instanceof Entity1 ? 'entities1' 
//       : doc instanceof Entity2 ? 'entities2'
//       : doc instanceof Entity3 ? 'entities3'
//       : null
// }

class Dao {

  _db?: Db
  _client?: MongoClient

  async db(): Promise<Db> {
    if (this._db) return this._db
    else {
      this._client = await MongoClient.connect(url)
      this._db = await this._client.db(dbName)
      this._db.on('error', (err: MongoError) => log.error(err))
      this._db.on('close', (err: MongoError) => log.info('close'))
      this._db.on('timeout', (err: MongoError) => log.error(err))
      this._db.on('parseError', (err: MongoError) => log.error(err))
      return this._db
    }
  }

  // async save(doc: DocType): Promise<WriteOpResult | null> {
  //   const db = await this.db()
  //   const name: CollectionName | null = toCollectionName(doc)
  //   if (name != null && doc.validate) {
  //     //log.info('doc', doc)
  //     const validationErr = doc.validate()
  //     if (validationErr) throw validationErr
  //     const _doc = jsonConvert.serialize(doc)
  //     return await db.collection(name).save(_doc)
  //   }
  //   else {
  //     log.error(`save', 'invalid doc type: ${typeof doc}`)
  //     return null
  //   }
  // }

  async dropDatabase() {
    if (dbName === 'test') {
      const db = await this.db()
      return db.dropDatabase() 
    }
    else log.error('dropDatabase', 'can only drop [test] db')
  }

  // async dropCollection(name: CollectionName) {
  //   if (dbName === 'test') {
  //     const db = await this.db()
  //     try {
  //       return await db.dropCollection(name)
  //     }
  //     catch (err) {
  //       log.error('dropCollection', err)
  //       return false
  //     }
  //   }
  //   else {
  //     log.error('dropCollection', 'can only drop collection from [test] db')
  //     return false
  //   }
  // }

  async close() {
    if (this._client) await this._client.close()
    else log.error('close', 'not connected')
  }
  
}

export default new Dao