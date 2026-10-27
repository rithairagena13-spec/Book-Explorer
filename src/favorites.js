
const favorites = [
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

  favoritesCount.textContent = favoriteBooks.length;
  emptyState.classList.toggle("hidden", favoriteBooks.length > 0);
}

function handleFavoriteClick(event) {
  const removeButton = event.target.closest("[data-book-id]");

  if (!removeButton) {
    return;
  }

  const bookId = removeButton.dataset.bookId;
  const removed = removeFavorite(bookId);

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

  bookList.addEventListener("click", handleFavoriteClick);
  updateFavoritesPage();
}

initializeFavoritesPage();
