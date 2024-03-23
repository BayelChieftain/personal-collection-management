import express from 'express';
import { collectionController } from '../controllers/collectionController.js';

const router = express.Router();

router.post('/collections', collectionController.createCollection);
router.get('/collections', collectionController.getCollections);
router.get('/collections/:id', collectionController.getCollectionById);
router.put('/collections/:id', collectionController.updateCollection);
router.delete('/collections/:id', collectionController.deleteCollection);

export default router;