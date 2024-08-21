import { Router } from 'express';
import { check, header } from 'express-validator';
import { login } from '../controllers/auth.js';
import { validateFields } from '../middlewares/validateFields.js';

const router = Router();

router.post( '/login', [
    check( 'mail', 'El email del usuairo es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    validateFields
], login);

export default router;