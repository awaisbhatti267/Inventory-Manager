const express = require('express');
const { db } = require('../config/db');

const router = express.Router();


// ===={ SIGNUP ROUTE }==== \\

router.post('/signup', async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Username, email and password required'
    });
  }

  try {

    const [existing] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: 'Email already registered'
      });
    }

    await db.execute(
      'INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    return res.status(201).json({
      message: 'Account created'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


// ===={ LOGIN ROUTE }==== \\

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password required'
    });
  }

  try {

    const [users] = await db.execute(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email]
    );

    const user = users[0];

    if (!user || password !== user.password) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    return res.status(200).json({
      message: 'Login successful',

      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


// ===={ PROFILE ROUTE }==== \\

router.get('/profile/:id', async (req, res) => {

  try {

    const [users] = await db.execute(
      'SELECT id, name, email FROM users WHERE id = ?',
      [req.params.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.json(users[0]);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


// ===={ CHANGE PASSWORD ROUTE }==== \\

router.post('/change-password', async (req, res) => {

  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({
      message: 'User ID, current password and new password required'
    });
  }

  try {

    const [users] = await db.execute(
      'SELECT id, password FROM users WHERE id = ?',
      [userId]
    );

    const user = users[0];

    if (!user || currentPassword !== user.password) {
      return res.status(401).json({
        message: 'Invalid user or current password'
      });
    }

    if (newPassword === user.password) {
      return res.status(400).json({
        message: 'New password must be different'
      });
    }

    const [result] = await db.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [newPassword, user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


// ===={ ADD PRODUCT ROUTE }==== \\

router.post('/add-product', async (req, res) => {

  const { name, category, price, stock } = req.body;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof category !== 'string' || !category.trim() ||
    price === undefined || price === null || price === '' ||
    stock === undefined || stock === null || stock === ''
  ) {
    return res.status(400).json({
      message: 'Name, category, price and stock required'
    });
  }

  const productPrice = Number(price);
  const productStock = Number(stock);

  if (!Number.isFinite(productPrice) || productPrice < 0) {
    return res.status(400).json({
      message: 'Price must be a valid number, zero or greater'
    });
  }

  if (
    !Number.isInteger(productStock) ||
    productStock < 0 ||
    productStock > 1000
  ) {
    return res.status(400).json({
      message: 'Stock must be a whole number between 0 and 1000'
    });
  }

  try {

    const [result] = await db.execute(
      'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
      [
        name.trim(),
        category.trim(),
        productPrice,
        productStock
      ]
    );

    return res.status(201).json({
      message: 'Product added successfully',
      productId: result.insertId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


// ===={ SHOW PRODUCTS ROUTE }==== \\

router.get('/add-product', async (req, res) => {

  try {

    const [products] = await db.execute(
      'SELECT id, name, category, price, stock, image FROM products ORDER BY id DESC'
    );

    return res.status(200).json(products);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


// ===={ EDIT PRODUCT ROUTE }==== \\

router.put('/product/:id', async (req, res) => {

  const { name, category, price, stock } = req.body;

  if (
    !name ||
    !category ||
    price === undefined ||
    stock === undefined
  ) {
    return res.status(400).json({
      message: 'Name, category, price and stock required'
    });
  }

  try {

    const [result] = await db.execute(
      'UPDATE products SET name=?, category=?, price=?, stock=? WHERE id=?',
      [
        name,
        category,
        Number(price),
        Number(stock),
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


// ===={ DELETE PRODUCT ROUTE }==== \\

router.delete('/product/:id', async (req, res) => {

  try {

    const [result] = await db.execute(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});


module.exports = router;