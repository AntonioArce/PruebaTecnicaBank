import { Router } from 'express';
import { check, header } from 'express-validator';
import { validateFields, validateJWT } from '../middlewares/index.js';
import { getProducts } from '../controllers/products.js';

const router = Router();

router.get( '/all', [
    validateJWT,
    validateFields
], getProducts );

export default router;