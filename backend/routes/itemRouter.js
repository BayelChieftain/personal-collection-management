import express from 'express';
import { itemController } from '../controllers/itemController.js';
import { body } from 'express-validator';

const router = express.Router();

const validateItem = [
    body('name').notEmpty().withMessage('Name is required'),
    body('collectionRef').notEmpty().withMessage('Collection reference is required').isLength({ min: 24, max: 24 }).withMessage('Invalid collection reference'),
    body('dynamicFields').notEmpty()
];

router.post('/collections/items', validateItem, itemController.createItem);
router.put('/collections/items/:itemId', itemController.updateItem);
router.delete('/collections/items/:itemId', itemController.deleteItem);
router.get('/collections/:collectionId/items', itemController.getItemsInCollection); // get all items in col.
router.get('/collections/items/:itemId', itemController.getItemById);

router.get('/items', itemController.getItems);

export default router;
