async function fetchUser(id: number): Promise<{ id: number; name: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, name: "Hiep" });
        }, 3000);

        setTimeout(() => {
            reject(new Error("Request timed out"));
        }, 2000);
    });
}

async function run20() {
    try {
        const user = await fetchUser(1);
    console.log(user);
    } catch (error) {
        console.error(error);
    }
}

run20();