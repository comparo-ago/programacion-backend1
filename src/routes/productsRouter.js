import { Router } from "express";
import {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController
} from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.post('/', createProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router