const baseUrl = "https://api.freeapi.app/api/v1/public/books?";
const options = { method: "GET", headers: { accept: "application/json" } };
let bookData = {};
const getBooks = async (page = 1, limit = 10) => {
  let url =
    baseUrl +
    `page=${page}&limit=${limit}&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech`;

  console.log(document.querySelectorAll(".active"));

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.statusCode === 200) {
      console.log(data);
      books = data.data.data;
      bookData = data;

      renderBooks(books); // Clear old books & render new books
      createPagination(data.data.totalItems);
    }

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

getBooks();

const renderBooks = (books) => {
  document.getElementById("book-container").innerHTML = "";
  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    // <p class="title">${book.volumeInfo.title}<br>
    bookCard.innerHTML = `
          <a class="book-link" target="_blank" href="${book.volumeInfo.infoLink}">
          <div class="cover">
          <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}"></div>
          <div class="description">
          Author:<span class="author">${book.volumeInfo.authors}</span>
          </div>
          </div>
          </a>
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

function createPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = `<button id="prev">&laquo;</button>`;
  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.innerHTML = "&raquo;";
  nextButton.addEventListener("click", nextClick);
  pagination.appendChild(nextButton);
  const next = document.getElementById("next");

  const numPages = Math.ceil(totalItems / 10);

  for (let i = 1; i <= numPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerText = i;
    pageBtn.addEventListener("click", function () {
      pageBtn.className = "active";
      console.log("pageBtn", pageBtn);
      getBooks(i);
    });
    nextButton.before(pageBtn);
  }
}

function prevClick() {
  const activeButton = document.querySelector(".active");
  const prevButton = activeButton.previousElementSibling;
  prevButton.className = "active";
  getBooks(prevButton.innerText);
}

function nextClick() {
  const activeButton = document.querySelector(".active");
  console.log("activeButton", activeButton);

  //   const nextButton = activeButton.nextElementSibling;
  //   nextButton.className = "active";
  //   getBooks(nextButton.innerText);
}

// function clearActiveClassFromButton() {
//   const activeButton = document.querySelector(".active");
//   if (activeButton) {
//     activeButton.classList.remove("active");
//   }
// }
