import ApiError from '../exceptions/apiError.js';
import { Item } from '../models/collectionModel.js';

class ItemService {
  async createItem(name, tags, collectionRef, dynamicFields) {
    try {
      const item = await Item.create({ name, tags, collectionRef, dynamicFields });
      return item;
    } catch (error) {
      throw error;
    }
  }

  async updateItem(itemId, updatedFields) {
    try {
      const item = await Item.findByIdAndUpdate(itemId, updatedFields, { new: true });
      if (!item) {
        throw ApiError.BadRequest('Item not found');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(itemId) {
    try {
      const item = await Item.findByIdAndDelete(itemId);
      if (!item) {
        throw ApiError.BadRequest('Item not found');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async getItemsInCollection(collectionId) {
    try {
      const items = await Item.find({ collectionRef: collectionId });
      return items;
    } catch (error) {
      throw error;
    }
  }

  async getItemById(itemId) {
    try {
      const item = await Item.findById(itemId);
      if (!item) {
        throw ApiError.BadRequest('Item not found');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async getItems(req, res, next) {
    try {
      const items = await itemService.getItems();
      return res.json(items);
    } catch (error) {
      next(error);
    }
  }
}


export const itemService = new ItemService();
