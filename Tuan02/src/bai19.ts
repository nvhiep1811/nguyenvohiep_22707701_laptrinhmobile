import { fetchUser } from "./bai18";

async function fetchUsers(ids: number[]): Promise<{id: any, name: string}[]> {
    const users = await Promise.all(ids.map(id => fetchUser(id)));
    return users;
}

async function run19() {
    const users = await fetchUsers([1, 2, 3]);
    console.log(users);
}

run19();