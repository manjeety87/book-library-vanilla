const url =
  "https://api.freeapi.app/api/v1/public/books?page=1&limit=10&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech";
const options = { method: "GET", headers: { accept: "application/json" } };
let books = [];
const getBooks = async () => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    if (data.statusCode === 200) {
      console.log(data);

      books = data.data.data;
      renderBooks();
    }
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

getBooks();

const renderBooks = () => {
  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.innerHTML = `
    <div class="cover">
                  <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}"></div>
                  <div class="description">
                  <p class="title">${book.volumeInfo.title}<br><span class="author">${book.volumeInfo.authors}</span></p>
        </div>
              </div>
          `;
    document.getElementById("book-container").appendChild(bookCard);
  });
};

const listViewBtn = document.getElementById("listViewBtn");
const gridViewBtn = document.getElementById("gridViewBtn");
const bookContainer = document.getElementById("book-container");

// Click event for List View
listViewBtn.addEventListener("click", function () {
  bookContainer.classList.add("list-view");
});

// Click event for Grid View
gridViewBtn.addEventListener("click", function () {
  bookContainer.classList.remove("list-view");
});
