import { pool } from '../db.js';

// Use SAME SECRET as authController
const SECRET = process.env.JWT_SECRET || 'dalina05';

// ✅ Get all cart items
// ✅ Get all cart items with parsed subimages
export async function getCartItems(req, res) {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT c.id, c.product_id, c.selected_image, c.quantity,
              p.title, p.price, p.thumbnail, p.subimages
       FROM cart_items c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );

    const cart = result.rows.map(row => {
      // Ensure subimages is always an array
      let subImagesArray = Array.isArray(row.subimages) ? row.subimages : [];

      // Convert each subimage into an object with quantity
      subImagesArray = subImagesArray.map(url => ({
        url,
        quantity: 0
      }));

      return {
        id: row.id,
        product_id: row.product_id,
        title: row.title,
        price: row.price,
        thumbnail: row.thumbnail,
        quantity: row.quantity,
        selected_image: row.selected_image || '',
        sub_images: subImagesArray
      };
    });

    res.json(cart);
  } catch (err) {
    console.error('❌ Error fetching cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
}




// ✅ Add item to cart
export async function addToCart(req, res) {
  try {
    const userId = req.userId;
    const { product_id, selected_image, quantity } = req.body;

    await pool.query(
      `INSERT INTO cart_items (user_id, product_id, selected_image, quantity)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
      [userId, product_id, selected_image ?? '', quantity]
    );

    res.json({ message: 'Added to cart!' });
  } catch (err) {
    console.error('❌ Error adding to cart:', err);
    console.log("Decoded token:", decoded);

    res.status(500).json({ message: 'Server error' });
  }
}

// ✅ Update quantity
export async function updateQuantity(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { quantity } = req.body;

    await pool.query(
      `UPDATE cart_items
       SET quantity = $1
       WHERE id = $2 AND user_id = $3`,
      [quantity, id, userId]
    );

    res.json({ message: 'Quantity updated' });
  } catch (err) {
    console.error('❌ Error updating quantity:', err);
    res.status(500).json({ message: 'Server error' });
  }
}


  // ✅ Remove item from cart (already exists, just make sure Angular calls the correct id)
export async function removeItem(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;

    await pool.query(
      `DELETE FROM cart_items
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error('❌ Error removing item:', err);
    res.status(500).json({ message: 'Server error' });
  }
}






