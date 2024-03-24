import express from 'express';
import { collectionController } from '../controllers/collectionController.js';
import { body } from 'express-validator';

const router = express.Router();

const validateCollection = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required').isIn(['Books', 'Signs', 'Silverware', 'Paintings']).withMessage('Invalid category'),
    body('fields').notEmpty(),
    body('owner').notEmpty().withMessage('Owner is required').isLength({ min: 24 }).withMessage('Invalid input')
];

router.post('/collections', validateCollection, collectionController.createCollection);
router.get('/collections', collectionController.getCollections);
router.get('/collections/:collectionId', collectionController.getCollectionById);
router.put('/collections/:collectionId', collectionController.updateCollection);
router.delete('/collections/:collectionId', collectionController.deleteCollection);

export default router;