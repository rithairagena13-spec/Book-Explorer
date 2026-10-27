
const defaultFavorites = [
  {
    id: "1",
    title: "Pride and Prejudice",
    author: "Jane Austen",
  },
  {
    id: "2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
  },
  {
    id: "3",
    title: "Me Before You",
    author: "Jojo Moyes",
  },
];

const STORAGE_KEY = "bookExplorerFavorites";

function loadFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (savedFavorites !== null) {
      const parsedFavorites = JSON.parse(savedFavorites);

      if (
        Array.isArray(parsedFavorites) &&
        parsedFavorites.every(
          (book) =>
            book &&
            typeof book.id === "string" &&
            typeof book.title === "string" &&
            typeof book.author === "string"
        )
      ) {
        return parsedFavorites;
      }
    }
  } catch (error) {
    console.error("Could not load favorites:", error);
  }

  return [...defaultFavorites];
}

let favorites = loadFavorites();

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Could not save favorites:", error);
  }
}

export function getFavorites() {
  return [...favorites];
}

export function addFavorite(book) {
  const alreadyFavorite = favorites.some(
    (favorite) => favorite.id === book.id
  );

  if (alreadyFavorite) {
    return false;
  }

  favorites.push(book);
  saveFavorites();
  return true;
}

export function removeFavorite(bookId) {
  const index = favorites.findIndex(
    (book) => book.id === bookId
  );

  if (index === -1) {
    return false;
  }

  favorites.splice(index, 1);
  saveFavorites();
  return true;
}

function updateFavoritesPage() {
  const bookList = document.querySelector("#book-list");
  const favoritesCount = document.querySelector("#favorites-count");
  const emptyState = document.querySelector("#empty-state");

  if (!bookList || !favoritesCount || !emptyState) {
    return;
  }

  const favoriteBooks = getFavorites();
  const favoriteIds = new Set(
    favoriteBooks.map((book) => book.id)
  );

  bookList.querySelectorAll("[data-book-card]").forEach((card) => {
    const button = card.querySelector("[data-book-id]");

    if (button && !favoriteIds.has(button.dataset.bookId)) {
      card.remove();
    }
  });

  favoritesCount.textContent = favoriteBooks.length;
  emptyState.classList.toggle("hidden", favoriteBooks.length > 0);
}

function handleFavoriteClick(event) {
  const removeButton = event.target.closest("[data-book-id]");

  if (!removeButton) {
    return;
  }

  const removed = removeFavorite(removeButton.dataset.bookId);

  if (!removed) {
    return;
  }

  const bookCard = removeButton.closest("[data-book-card]");

  if (bookCard) {
    bookCard.remove();
  }

  updateFavoritesPage();
}

function initializeFavoritesPage() {
  const bookList = document.querySelector("#book-list");

  if (!bookList) {
    return;
  }

  
  if (localStorage.getItem(STORAGE_KEY) === null) {
    saveFavorites();
  }

  bookList.addEventListener("click", handleFavoriteClick);
  updateFavoritesPage();
}

initializeFavoritesPage();

