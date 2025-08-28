import { fetchUser } from "./bai18";

async function run20() {
    try {
        const user = await fetchUser(1);
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}

run20();