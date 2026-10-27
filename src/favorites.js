
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
