# Backend — Inventory IMS

This Express backend uses MongoDB (Mongoose) and exposes CRUD routes for products, suppliers, and transactions. It also provides `/api/products/:sku/adjust` to atomically update stock and record a transaction.

Install and run:

```powershell
cd backend
npm install
npm start
```

By default the backend connects to `mongodb://127.0.0.1:27017/inventory`. You can change this by setting the `MONGODB_URI` environment variable.

If you have an existing `db.json` (file-based data), use the migration script to import it into MongoDB:

```bash
npm run migrate
```

API endpoints (examples):
- `GET /api/products`
- `POST /api/products` {sku,name,description,price,quantity,reorder,supplier}
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/products/:sku/adjust` {delta,type,user}
- `GET /api/suppliers`
- `POST /api/suppliers`
- `GET /api/transactions`

If you prefer to use SQLite or file-based storage, the project includes a `db.json` and a `migrate.js` script to move data into MongoDB.
