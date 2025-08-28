import { fetchData } from "./bai21";

export async function fetchMultipleURLs(urls: string[]) {
    const promises = urls.map(url => fetchData(url));
    const results = await Promise.allSettled(promises);

    results.forEach((result) => {
        if (result.status === "fulfilled") {
            console.log("Success:", result.value);
        } else {
            console.error("Failed:", result.reason);
        }
    });
}
