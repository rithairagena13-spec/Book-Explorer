

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
    return true;
  } catch (error) {
    console.error("Could not save favorites:", error);
    return false;
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
  return saveFavorites();
}

export function removeFavorite(bookId) {
  const index = favorites.findIndex(
    (book) => book.id === bookId
  );

  if (index === -1) {
    return false;
  }

  const removedBook = favorites[index];
  favorites.splice(index, 1);

  if (!saveFavorites()) {
    favorites.splice(index, 0, removedBook);
    return false;
  }

  return true;
}

function createBookCard(book, originalCard) {
  const card = originalCard
    ? originalCard.cloneNode(true)
    : document.querySelector("[data-book-card]")?.cloneNode(true);

  if (!card) {
    return null;
  }

  card.dataset.bookCard = book.id;

  const title = card.querySelector("h3");
  const author = card.querySelector("h3 + p");

  if (title) {
    title.textContent = book.title;
  }

  if (author) {
    author.textContent = `by ${book.author}`;
  }

  const cover = card.querySelector("div > div span");
  const coverContainer = card.querySelector(
    "div.flex.h-36.w-28 > div"
  );

  if (cover) {
    cover.textContent = book.title;
  }

  if (coverContainer) {
    const coverTitle = coverContainer.querySelector("span");

    if (coverTitle) {
      coverTitle.textContent = book.title;
    }

    const coverAuthor = coverContainer.querySelectorAll("span")[1];

    if (coverAuthor) {
      coverAuthor.textContent = book.author;
    }
  }

  const removeButton = card.querySelector("[data-book-id]");

  if (removeButton) {
    removeButton.dataset.bookId = book.id;
    removeButton.setAttribute("aria-pressed", "true");
  }

  return card;
}

function updateFavoritesPage() {
  const bookList = document.querySelector("#book-list");
  const favoritesCount = document.querySelector("#favorites-count");
  const emptyState = document.querySelector("#empty-state");

  if (!bookList || !favoritesCount || !emptyState) {
    return;
  }

  const originalCards = new Map();

  bookList.querySelectorAll("[data-book-card]").forEach((card) => {
    originalCards.set(card.dataset.bookCard, card);
  });

  const templateCard =
    bookList.querySelector("[data-book-card]") ||
    originalCards.values().next().value;

  const fragment = document.createDocumentFragment();

  getFavorites().forEach((book) => {
    const originalCard =
      originalCards.get(book.id) || templateCard;

    const card = createBookCard(book, originalCard);

    if (card) {
      fragment.append(card);
    }
  });

  bookList.replaceChildren(fragment);

  favoritesCount.textContent = favorites.length;
  emptyState.classList.toggle("hidden", favorites.length > 0);
}

function handleFavoriteClick(event) {
  const removeButton = event.target.closest("button[data-book-id]");

  if (!removeButton) {
    return;
  }

  if (removeFavorite(removeButton.dataset.bookId)) {
    updateFavoritesPage();
  }
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
