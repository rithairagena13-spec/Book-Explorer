
const API_URL = "https://openlibrary.org/search.json";

export async function fetchBooks(title = "romance") {
  try {
    const params = new URLSearchParams({
      q: title,
      limit: "12",
      fields: "key,title,author_name,cover_i,first_publish_year"
    });

    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch romantic books. Please try again.");
    }

    const data = await response.json();

    return data.docs.map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name?.[0] || "Unknown author",
      coverId: book.cover_i || null,
      year: book.first_publish_year || "Year unavailable"
    }));
  } catch (error) {
    console.error("Error fetching romantic books:", error);
    throw error;
  }
}
