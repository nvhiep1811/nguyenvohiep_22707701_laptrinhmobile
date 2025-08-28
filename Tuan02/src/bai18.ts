export async function fetchUser(id: any): Promise<{id: any, name: string}> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({id, name: "Hiep"});
        }, 1000);
    });
}

// async function run18() {
//     const user = await fetchUser(1);
//     console.log(user);
// }

// run18();