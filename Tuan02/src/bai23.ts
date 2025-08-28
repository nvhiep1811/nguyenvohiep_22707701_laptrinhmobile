export async function fetchTodos(link:string) {
    try {
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.filter((todo: any) => todo.completed);
    } catch (error) {
        console.error(error);
    }
}