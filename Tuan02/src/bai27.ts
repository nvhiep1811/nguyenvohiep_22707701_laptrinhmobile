export async function fetchWithRetry(url: string, retries: number) {
    for (let index = 1; index <= retries; index++) {
        try {
            console.log(`Retry ${index} to fetch ${url}`);

            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
            

            return resp.json();
        } catch (error) {
            console.log(`Failed to fetch after ${index} retries`);
            if (index === retries) {
                throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
            }
        }
    }
}