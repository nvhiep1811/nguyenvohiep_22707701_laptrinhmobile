export async function bai13() {

    try {
        // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');//success
        const response = await fetch('https://api.example.com/data');//error
        if (!response.ok) {
        console.log("-----Bài 13-----");
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("-----Bài 13-----");
        console.log(data);
    } catch (error) {
        console.log("-----Bài 13-----");
        console.error(error);
    }
}