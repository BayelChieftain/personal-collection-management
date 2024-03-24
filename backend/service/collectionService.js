import ApiError from '../exceptions/apiError.js';
import { Collection } from '../models/collectionModel.js';

class CollectionService {
  async createCollection(name, description, category, imageUrl, fields, owner) {
    try {
        const collection = await Collection.create({ name, description, category, imageUrl, fields, owner });
        return collection;
      } catch (error) {
        throw error;
      }
  }

  async updateCollection(collectionId, updatedFields) {
    try {
        const collection = await Collection.findByIdAndUpdate(collectionId, updatedFields, { new: true });
        if (!collection) {
          throw ApiError.BadRequest('Collection not found');
        }
        return collection;
      } catch (error) {
        throw error;
      }
  }

  async deleteCollection(collectionId) {
    try {
        const collection = await Collection.findByIdAndDelete(collectionId);
        if (!collection) {
          throw ApiError.BadRequest('Collection not found');
        }
        return collection;
      } catch (error) {
        throw error;
      }
  }

  async getCollections() {
    try {
        const collections = await Collection.find();
        return collections;
      } catch (error) {
        throw error;
      }
  }

  async getCollectionById(collectionId) {
    try {
        const collection = await Collection.findById(collectionId);
        if (!collection) {
          throw ApiError.BadRequest('Collection not found');
        }
        return collection;
      } catch (error) {
        throw error;
      }
  }
}

export const collectionService = new CollectionService();
