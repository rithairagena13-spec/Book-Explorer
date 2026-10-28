# 📚 Book Explorer

**Discover stories. Keep your favorites. Stay curious.**

Book Explorer is a responsive, interactive, multi-page web application designed to make discovering books simple and enjoyable. Built as part of the *Responsive & Interactive Web App Development* capstone, the project brings together modern web design, JavaScript interactivity, asynchronous API integration, and GitHub version control.

## 🌿 Project Overview

Book Explorer allows readers to explore books, search for titles, save their favorite discoveries, and revisit their personal collections. The application uses the Open Library API to retrieve real book data and provides a responsive experience across mobile phones, tablets, and desktop screens.

The project demonstrates how HTML, Tailwind CSS, and JavaScript work together to create a modern web application.

## ✨ Features

- **Responsive Design:** Adapts to mobile, tablet, and desktop screen sizes.
- **Book Discovery:** Displays book information retrieved from the Open Library API.
- **Search Functionality:** Allows users to search for books by title.
- **Favorites Management:** Add and remove books from a personal favorites collection.
- **Persistent Storage:** Uses browser `localStorage` to retain favorites across page refreshes.
- **Multiple Pages:** Includes Home, Favorites, and About pages.
- **Dynamic User Interface:** Updates displayed content in response to user interactions.
- **Loading and Empty States:** Provides feedback while data loads and when searches or favorites return no results.
- **Modular JavaScript:** Organizes application functionality into reusable ES modules.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| Tailwind CSS | Responsive layouts and interface styling |
| JavaScript (ES6+) | Interactivity and dynamic content |
| ES Modules | Organized and maintainable JavaScript |
| Open Library API | Book data and search results |
| Fetch API | Retrieving remote data |
| Async/Await | Managing asynchronous operations |
| localStorage | Saving favorite books in the browser |
| Git & GitHub | Version control and project collaboration |
| Vite | Local development server and build tooling, if configured |

## 📄 Application Pages

### 1. Home
The homepage introduces Book Explorer and provides the main book discovery experience. It includes navigation, a search interface, and a responsive grid for displaying book results.

### 2. Favorites
The Favorites page displays books saved by the user. Users can manage their collection, remove unwanted favorites, and return to their saved books later.

### 3. About
The About page explains the purpose of Book Explorer and presents its design philosophy through an editorial-inspired layout.

## 🔌 API Integration

Book Explorer uses the **Open Library Search API** to retrieve book information.

API endpoint:

`https://openlibrary.org/search.json`

The application can request search results by title using the `title` query parameter.

Example:

`https://openlibrary.org/search.json?title=harry+potter`

The Fetch API and `async/await` are used to retrieve and process the response. Loading, empty-result, and error states help communicate the status of API requests to users.

API documentation: [Open Library Search API](https://openlibrary.org/dev/docs/api/search)

## 📱 Responsive Design

The interface follows a mobile-first approach using Tailwind CSS responsive utilities.

- **Mobile:** Compact navigation and layouts suited to smaller screens.
- **Tablet:** Adjusted spacing and multi-column layouts where appropriate.
- **Desktop:** Wider content areas and expanded book grids.

The goal is to provide a consistent and accessible browsing experience across screen sizes.

## 🗂️ Project Structure

The project uses separate pages and JavaScript modules to keep the application organized.

```text
Book-Explorer/
├── index.html
├── favorites.html
├── about.html
├── src/
│   ├── input.css
│   ├── main.js
│   ├── about.js
│   ├── favorites.js
│   └── fetchBooks.js
├── package.json
├── package-lock.json
└── README.md
```

*Note: The structure above is an example. Update it to match the files and folders actually present in your repository.*

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- Git
- A modern web browser

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/rithairagena13-spec/Book-Explorer.git
```

**2. Navigate to the project directory**

```bash
cd Book-Explorer
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

If the project uses Vite, run:

```bash
npm run dev
```

Open the local address shown in your terminal to view the application.

*If your project uses a different development setup, follow the scripts defined in `package.json`.*

## 🧑‍💻 GitHub Workflow

Git and GitHub support the development process by making changes easier to track and manage.

The project workflow includes:

- Creating feature branches for individual tasks.
- Committing changes with meaningful messages.
- Pushing branches to GitHub.
- Tracking bugs and improvements through GitHub Issues.
- Using pull requests to review and integrate changes.
- Organizing work into tasks with GitHub Projects when available.

Example feature branch:

```bash
git switch -c feature/search
```

Example commit and push:

```bash
git add .
git commit -m "Add book search functionality"
git push -u origin feature/search
```

## 🎯 Learning Outcomes

This capstone brings together the following skills:

1. Building responsive web pages with HTML and Tailwind CSS.
2. Handling user interactions and updating the DOM with JavaScript.
3. Retrieving and displaying API data using Fetch and `async/await`.
4. Organizing functionality using ES6 modules.
5. Persisting application data with `localStorage`.
6. Managing development work through Git branches, commits, and GitHub collaboration tools.

## 🔮 Future Improvements

Potential improvements include:

- Adding filters by author, publication year, or subject.
- Introducing pagination or a load-more feature.
- Improving keyboard navigation and screen-reader support.
- Adding more detailed book information.
- Enhancing error messages and offline handling.

## 👩‍💻 Author

**Ritha Iragena**

IT Student | Front-End Web Development Learner

## 📜 Acknowledgements

- [Open Library](https://openlibrary.org/) for providing book search data.
- [Tailwind CSS](https://tailwindcss.com/) for responsive styling utilities.
- The facilitators of the Responsive & Interactive Web App Development capstone for the learning experience.

---

*Book Explorer — Every discovery begins with a page.*