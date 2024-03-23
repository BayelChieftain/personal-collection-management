import ApiError from '../exceptions/apiError.js';
import { collectionService } from '../service/collectionService.js';

class CollectionController {
  async createCollection(req, res, next) {
    try {
      const { name, description, topic, image, customFields } = req.body;
      const collection = await collectionService.createCollection(name, description, topic, image, customFields);
      return res.json(collection);
    } catch (error) {
      next(error);
    }
  }

  async updateCollection(req, res, next) {
    try {
      const { collectionId } = req.params;
      const { name, description, topic, image, customFields } = req.body;
      const updatedCollection = await collectionService.updateCollection(collectionId, { name, description, topic, image, customFields });
      return res.json(updatedCollection);
    } catch (error) {
      next(error);
    }
  }

  async deleteCollection(req, res, next) {
    try {
      const { collectionId } = req.params;
      const deletedCollection = await collectionService.deleteCollection(collectionId);
      return res.json(deletedCollection);
    } catch (error) {
      next(error);
    }
  }

  async getCollections(req, res, next) {
    try {
      const collections = await collectionService.getCollections();
      return res.json(collections);
    } catch (error) {
      next(error);
    }
  }

  async getCollectionById(req, res, next) {
    try {
      const { collectionId } = req.params;
      const collection = await collectionService.getCollectionById(collectionId);
      return res.json(collection);
    } catch (error) {
      next(error);
    }
  }
}

export const collectionController = new CollectionController();

