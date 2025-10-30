import { Category } from "@/model/type";
import { getDBConnection } from "./db";

export async function getAllCategories() {
    const db = await getDBConnection();
    return await db.getAllAsync<Category>("SELECT * FROM categories;");
}

export async function addCategory(category: Category) {
    const db = await getDBConnection();
    const result = await db.runAsync(
        `INSERT INTO categories (name, remote_id, updated_at) VALUES (?, ?, datetime('now'));`,
        [category.name, category.remote_id || null]
    );
    return result.changes;
}

export async function seedCategory() {
    const db = await getDBConnection();
    const results = await db.getFirstAsync<{count: number}>(`SELECT COUNT(*) as count FROM categories;`);
    if (results?.count === 0) {
        const defaultCategories = [
            { name: "Beverages" },
            { name: "Snacks" },
            { name: "Dairy" },
        ];
        for (const category of defaultCategories) {
            await addCategory(category as Category);
        }
    }
}