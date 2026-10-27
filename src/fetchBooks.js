
const API_URL = "https://openlibrary.org/search.json";

export async function fetchBooks(title = "romance") {
  try {
    const searchTitle = title.trim() || "romance";

    const params = new URLSearchParams({
      q: searchTitle,
      limit: "50",
      fields: "key,title,author_name,cover_i,first_publish_year"
    });

    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch books. Please try again.");
    }

    const data = await response.json();

    const books = data.docs.map((book) => ({
      id: book.key,
      title: book.title || "Untitled",
      author: book.author_name?.[0] || "Unknown author",
      coverId: book.cover_i || null,
      year: book.first_publish_year || "Year unavailable"
    }));

    const normalizedSearch = searchTitle.toLowerCase();

    books.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      const aExact = titleA === normalizedSearch;
      const bExact = titleB === normalizedSearch;

      if (aExact !== bExact) {
        return aExact ? -1 : 1;
      }

      const aStartsWith = titleA.startsWith(normalizedSearch);
      const bStartsWith = titleB.startsWith(normalizedSearch);

      if (aStartsWith !== bStartsWith) {
        return aStartsWith ? -1 : 1;
      }

      const aContains = titleA.includes(normalizedSearch);
      const bContains = titleB.includes(normalizedSearch);

      if (aContains !== bContains) {
        return aContains ? -1 : 1;
      }

      return 0;
    });

    return books.slice(0, 12);
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}
