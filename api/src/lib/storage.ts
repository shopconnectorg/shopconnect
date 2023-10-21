/**
 * This API is not finished, and can't be used.
 * See TODO comments below for more details.
 */
import fs from 'fs';
import path from 'path';
import { InMemoryDataSource, AbstractPrivateKeyStore, InMemoryMerkleTreeStorage } from "@0xpolygonid/js-sdk";
import { InMemoryDB, Merkletree, str2Bytes } from "@iden3/js-merkletree";
import EnvVars from '../constants/EnvVars';

export class DataStorage<T> extends InMemoryDataSource<T> {
  path: string;
  
  constructor(key) {
    super();
    this.path = path.join(EnvVars.PolygonId.storagePath, `${key}.json`);
    this.restore();
  }
  
  private persist() {
    /** @ts-ignore */
    fs.writeFileSync(this.path, JSON.stringify(this._data));
  }
  
  private restore() {
    try {
      const raw = fs.readFileSync(this.path).toString();
      /** @ts-ignore */
      this._data = JSON.parse(raw);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  }

  async save(key, value, keyName?) {
    try {
      return await super.save(key, value, keyName);
    } finally {
      this.persist();
    }
  }
  
  async delete(key, keyName?) {
    try {
      return await super.delete(key, keyName);
    } finally {
      this.persist();
    }
  }
  
}

export class KeysStore extends AbstractPrivateKeyStore {
  async get(args) {
    const privateKey = fs.readFileSync(this.makePath(args)).toString();
    if (!privateKey) {
        throw new Error('no key under given alias');
    }
    return privateKey;
  }
  
  async importKey(args) {
    fs.writeFileSync(this.makePath(args), args.key);
  }

  private makePath(args) {
    return path.join(EnvVars.PolygonId.keysPath, args.alias);
  }
}

export class MerkleTreeStorage extends InMemoryMerkleTreeStorage { 
  constructor(_mtDepth) {
    super(_mtDepth);
    this.load();
  }

  private get path() {
    return path.join(EnvVars.PolygonId.treePath, 'dump.json');
  }

  private load() {
    try {
      const raw = fs.readFileSync(this.path).toString();
      const data = JSON.parse(raw);
      for (const items of Object.values(data)) {
        // @ts-ignore
        for (const item of items) {
          const db = new InMemoryDB(str2Bytes(item.metaInfo.treeId));
          for (const [key, value] of Object.entries(item.tree.db.kvMap)) {
            const uint8 = Uint8Array.from(key.split("").map(x => x.charCodeAt(0)))
            //TODO: Deserialize Node object 🙈
            db.put(uint8, value);
          }
          const mt = new Merkletree(db, item.tree.writable, item.tree.maxLevels);
          item.tree = mt;
        }
      }
      this._data = data;
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  }

  private save() {
    fs.writeFileSync(this.path, JSON.stringify(this._data));
  }

  async createIdentityMerkleTrees(identifier) {
    try {
      return await super.createIdentityMerkleTrees(identifier);
    } finally {
      this.save();
    }
  }

  async addToMerkleTree(identifier, mtType, hindex, hvalue) {
    try {
      return await super.addToMerkleTree(identifier, mtType, hindex, hvalue);
    } finally {
      this.save();
    }
  }

  async bindMerkleTreeToNewIdentifier(oldIdentifier, newIdentifier) {
    try {
      return await super.bindMerkleTreeToNewIdentifier(oldIdentifier, newIdentifier);
    } finally {
      this.save();
    }
  }
}