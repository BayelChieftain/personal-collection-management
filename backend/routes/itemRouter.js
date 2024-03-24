import express from 'express';
import { itemController } from '../controllers/itemController.js';

const router = express.Router();

router.post('/collections/items', itemController.createItem);
router.put('/collections/items/:itemId', itemController.updateItem);
router.delete('/collections/items/:itemId', itemController.deleteItem);
router.get('/collections/:collectionId/items', itemController.getItemsInCollection); // get all items in col.
router.get('/collections/items/:itemId', itemController.getItemById);

export default router;
