import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import productsRoute from './routes/products.js';
import adminRoute from './routes/admin.js';
import cartRoutes from './routes/cart.js'
import adminCart from './routes/adminCart.js';
import authRoutes from './routes/auth.js';
import cartyRoutes from './routes/carty.js';
import userRoutes from './routes/user.js';
import adminOrder from './routes/adminRoute.js';
import dmRouter from './routes/dmRouter.js';
import dmAdRouter from './routes/admindmRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productsRoute);
app.use('/api/admin', adminRoute);
app.use('/api/cart', cartRoutes);
app.use('/api/adminCart', adminCart);
app.use('/api/auth', authRoutes);
app.use('/api/carty', cartyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', adminOrder);
app.use('/api/dm', dmRouter);
app.use('/api/adm', dmAdRouter);

app.get('/', (req, res) => {
  res.send('✅ API is running with ES Modules!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


