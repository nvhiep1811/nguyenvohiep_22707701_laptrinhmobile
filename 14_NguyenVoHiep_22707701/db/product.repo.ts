import { Product } from "@/model/type";
import { getDBConnection } from "./db";

export async function getProductsByCategory(categoryId: number) {
    const db = await getDBConnection();
    const res = await db.getAllAsync<Product>(`
        SELECT * FROM products where category_id = ? AND is_deleted = 0;`,
        [categoryId]
    );

    return res;
}

export async function getAllProducts() {
    const db = await getDBConnection();
    const res = await db.getAllAsync<Product>(`
        SELECT * FROM products WHERE is_deleted = 0;`
    );

    return res;
}

export async function addProduct(product: Product) {
    const db = await getDBConnection();
    const result = await db.runAsync(
        `INSERT INTO products (name, price, unit, description, image_uri, category_id, remote_id, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'));`,
        [
            product.name,
            product.price,
            product.unit,
            product.description || null,
            product.image_uri || null,
            product.category_id,
            product.remote_id || null
        ]
    );
    return result.changes;
}

export async function softDeleteProduct(productId: number) {
    const db = await getDBConnection();
    const result = await db.runAsync(
        `UPDATE products SET is_deleted = 1, updated_at = datetime('now') WHERE id = ?;`,
        [productId]
    );
    return result.changes;
}

export async function updateProduct(product: Product) {
    const db = await getDBConnection();
    const result = await db.runAsync(
        `UPDATE products 
         SET name = ?, price = ?, unit = ?, description = ?, image_uri = ?, category_id = ?, remote_id = ?, updated_at = datetime('now') 
         WHERE id = ?;`,
        [
            product.name,
            product.price,
            product.unit,
            product.description || null,
            product.image_uri || null,
            product.category_id,
            product.remote_id || null,
            product.id
        ]
    );
    return result.changes;
}

export async function getProductById(productId: number) {
    const db = await getDBConnection();
    return await db.getFirstAsync<Product>(
        `SELECT * FROM products WHERE id = ? AND is_deleted = 0;`,
        [productId]
    );
}

export async function seedProduct() {
    const db = await getDBConnection();
    const results = await db.getFirstAsync<{count: number}>(`SELECT COUNT(*) as count FROM products;`);
    if (results?.count === 0) {
        const defaultProducts = [
            { name: "Apple Juice", price: 2.99, unit: "bottle", description: "Fresh apple juice", image_uri: "https://png.pngtree.com/png-vector/20241224/ourlarge/pngtree-natural-apple-juice-bottle-with-fresh-red-apples-and-green-leaves-png-image_14843477.png", category_id: 1 },
            { name: "Orange Juice", price: 3.49, unit: "bottle", description: "Citrus orange juice", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-fresh-orange-juice-in-glass-png-image_5808443.png", category_id: 1 },
            { name: "Grape Juice", price: 3.99, unit: "bottle", description: "Sweet grape juice", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-fresh-grape-juice-in-glass-png-image_5808451.png", category_id: 1 },
            { name: "Potato Chips", price: 1.99, unit: "bag", description: "Crispy potato chips", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-potato-chips-bag-png-image_5808431.png", category_id: 2 },
            { name: "Chocolate Bar", price: 2.49, unit: "bar", description: "Delicious chocolate bar", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-chocolate-bar-png-image_5808423.png", category_id: 2 },
            { name: "Mixed Nuts", price: 4.99, unit: "pack", description: "Healthy mixed nuts", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-mixed-nuts-pack-png-image_5808461.png", category_id: 2 },
            { name: "Whole Milk", price: 2.79, unit: "gallon", description: "Fresh whole milk", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-fresh-milk-gallon-png-image_5808471.png", category_id: 3 },
            { name: "Cheddar Cheese", price: 3.59, unit: "block", description: "Aged cheddar cheese", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-cheddar-cheese-block-png-image_5808481.png", category_id: 3 },
            { name: "Yogurt", price: 1.29, unit: "cup", description: "Creamy yogurt", image_uri: "https://png.pngtree.com/png-vector/20220716/ourlarge/pngtree-yogurt-cup-png-image_5808491.png", category_id: 3}
        ];
        for (const product of defaultProducts) {
            await addProduct(product);
        }
    }
}