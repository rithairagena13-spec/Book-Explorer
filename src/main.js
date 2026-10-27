
import { fetchBooks } from "./fetchBooks.js";

const STORAGE_KEY = "bookExplorerFavorites";

const bookGrid = document.querySelector("#book-grid");
const bookStatus = document.querySelector("#book-status");

function getSavedFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (savedFavorites === null) {
      return [];
    }

    const favorites = JSON.parse(savedFavorites);
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error("Could not load favorites:", error);
    return [];
  }
}

function addFavorite(book) {
  const favorites = getSavedFavorites();

  if (favorites.some((favorite) => favorite.id === book.id)) {
    return false;
  }

  favorites.push(book);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error("Could not save favorites:", error);
    return false;
  }
}

function createBookCard(book, index) {
  const article = document.createElement("article");
  article.className =
    "group rounded-2xl border border-[#e9e5dc] bg-[#fffdf8] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg";

  const coverArea = document.createElement("div");
  coverArea.className =
    "flex min-h-56 items-center justify-center overflow-hidden rounded-xl bg-[#e9e7d9] p-6";

  if (book.coverId) {
    const cover = document.createElement("img");
    cover.src = `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`;
    cover.alt = `Cover of ${book.title}`;
    cover.loading = "lazy";
    cover.className = "h-56 max-w-full rounded-lg object-contain shadow-md";

    cover.addEventListener("error", () => {
      cover.remove();
      const fallback = document.createElement("div");
      fallback.className =
        "flex h-44 w-32 items-center justify-center rounded-lg bg-[#8b9a82] p-4 text-center text-white";
      fallback.innerHTML =
        '<i class="fa-solid fa-book-open text-3xl" aria-hidden="true"></i>';
      coverArea.append(fallback);
    }, { once: true });

    coverArea.append(cover);
  } else {
    const fallback = document.createElement("div");
    fallback.className =
      "flex h-44 w-32 items-center justify-center rounded-lg bg-[#8b9a82] p-4 text-white";
    fallback.innerHTML =
      '<i class="fa-solid fa-book-open text-3xl" aria-hidden="true"></i>';
    coverArea.append(fallback);
  }

  const details = document.createElement("div");
  details.className = "px-2 pb-2 pt-5";

  const category = document.createElement("span");
  category.className =
    "rounded-full bg-[#e9ede4] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#657861]";
  category.textContent = "Romance";

  const title = document.createElement("h3");
  title.className =
    "mt-4 font-['Playfair_Display'] text-2xl font-semibold";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "mt-2 text-sm text-[#777b70]";
  author.textContent = `By ${book.author}`;

  const year = document.createElement("p");
  year.className = "mt-4 border-t border-[#eeeae1] pt-4 text-sm text-[#777b70]";
  year.textContent = `First published: ${book.year}`;

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.addFavorite = "";
  button.dataset.bookId = book.id;
  button.dataset.bookTitle = book.title;
  button.dataset.bookAuthor = book.author;
  button.className =
    "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#788a75] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f735d]";

  details.append(category, title, author, year);
  article.append(coverArea, details, button);

  updateFavoriteButton(button);

  return article;
}

function updateFavoriteButton(button) {
  const favorites = getSavedFavorites();
  const isFavorite = favorites.some(
    (favorite) => favorite.id === button.dataset.bookId
  );

  const icon = document.createElement("i");
  icon.className = isFavorite
    ? "fa-solid fa-heart"
    : "fa-regular fa-heart";
  icon.setAttribute("aria-hidden", "true");

  button.replaceChildren(
    icon,
    document.createTextNode(
      isFavorite ? " Added to Favorites" : " Add to Favorites"
    )
  );

  button.disabled = isFavorite;
  button.classList.toggle("opacity-70", isFavorite);
  button.classList.toggle("cursor-not-allowed", isFavorite);
}

function updateAllFavoriteButtons() {
  bookGrid.querySelectorAll("[data-add-favorite]").forEach(updateFavoriteButton);
}

bookGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-favorite]");

  if (!button || !bookGrid.contains(button)) {
    return;
  }

  const book = {
    id: button.dataset.bookId,
    title: button.dataset.bookTitle,
    author: button.dataset.bookAuthor
  };

  const added = addFavorite(book);

  if (added) {
    updateAllFavoriteButtons();
  } else {
    button.textContent = "Could not save. Try again";
  }
});

async function loadRomanticBooks() {
  bookStatus.textContent = "Loading romantic books...";
  bookGrid.replaceChildren();

  try {
    const books = await fetchBooks();

    if (books.length === 0) {
      bookStatus.textContent = "No romantic books were found.";
      return;
    }

    const fragment = document.createDocumentFragment();

    books.forEach((book, index) => {
      fragment.append(createBookCard(book, index));
    });

    bookGrid.append(fragment);
    bookStatus.textContent = `Showing ${books.length} romantic books.`;
  } catch (error) {
    console.error("Could not load romantic books:", error);
    bookStatus.textContent =
      "We couldn't load the books. Please refresh and try again.";
  }
}

loadRomanticBooks();
