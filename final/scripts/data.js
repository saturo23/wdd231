// data.js

export async function fetchTools() {
    try {
        const response = await fetch("../data/tools.json");
        if (!response.ok) {
            throw new Error("Failed to load tools data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading tools:", error);
        return [];
    }
}
