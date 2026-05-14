# Backend — Inventory IMS

This simple Express backend uses SQLite (better-sqlite3) and exposes CRUD routes for products, suppliers, and transactions. It also provides `/api/products/:sku/adjust` to atomically update stock and record a transaction.

Install and run:

```powershell
cd backend
npm install
npm start
```

API endpoints (examples):
- `GET /api/products`
- `POST /api/products` {sku,name,category,price,quantity,reorder}
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/products/:sku/adjust` {delta,type,user}
- `GET /api/suppliers`
- `POST /api/suppliers`
- `GET /api/transactions`
