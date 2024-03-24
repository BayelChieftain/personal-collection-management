import express from 'express';
import { collectionController } from '../controllers/collectionController.js';

const router = express.Router();

router.post('/collections', collectionController.createCollection);
router.get('/collections', collectionController.getCollections);
router.get('/collections/:collectionId', collectionController.getCollectionById);
router.put('/collections/:collectionId', collectionController.updateCollection);
router.delete('/collections/:collectionId', collectionController.deleteCollection);

export default router;