
const STORAGE_KEY = "bookExplorerFavorites";

const addButtons = document.querySelectorAll("[data-add-favorite]");

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

  const alreadyFavorite = favorites.some(
    (favorite) => favorite.id === book.id
  );

  if (alreadyFavorite) {
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

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const book = {
      id: button.dataset.bookId,
      title: button.dataset.bookTitle,
      author: button.dataset.bookAuthor,
    };

    const added = addFavorite(book);

    if (added) {
      button.innerHTML =
        '<i class="fa-solid fa-heart" aria-hidden="true"></i> Added to Favorites';
      button.disabled = true;
      button.classList.add("opacity-70", "cursor-not-allowed");
    } else {
      const favorites = getSavedFavorites();
      const alreadyFavorite = favorites.some(
        (favorite) => favorite.id === book.id
      );

      if (alreadyFavorite) {
        button.innerHTML =
          '<i class="fa-solid fa-heart" aria-hidden="true"></i> Already Added';
        button.disabled = true;
        button.classList.add("opacity-70", "cursor-not-allowed");
      } else {
        button.textContent = "Could not save. Try again";
      }
    }
  });
});
