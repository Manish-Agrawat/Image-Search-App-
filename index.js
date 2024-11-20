const acceskey = "ZnVfwTCkzanh0bOIC42p65ADeBZn5iHKW3niJhcxCp0";
const search = document.querySelector("#search");
const searchbtn = document.querySelector(".btn");
let box = document.querySelector(".data-box");
const showbtn = document.querySelector(".show-more-btn");
let inputsearch = "";
let page = 1;

async function apidata(inputsearch) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputsearch}&client_id=${acceskey}`;
  const respons = await fetch(url);
  const data = await respons.json();
  const results = data.results;

  if (page === 1) {
    box.innerHTML = "";
  }

  results.forEach((image) => {
    const div = document.createElement("div");
    div.classList.add("data");
    const img = document.createElement("img");
    img.classList.add("img");
    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.textContent = image.description ;
    img.src = image.urls.small;
    div.appendChild(img);
    div.appendChild(paragraph);
    box.appendChild(div);
  });

  page++;

  if (results.length < 13) {
    showbtn.style.display = "none";
  } else {
    showbtn.style.display = "block";
  }
}

async function getdata() {
  inputsearch = search.value.trim();
  apidata(inputsearch);
}

search.addEventListener("input", (event) => {
  event.preventDefault();
  page = 1;
  getdata();
});

showbtn.addEventListener("click", () => {
  getdata();
});

search.addEventListener("input", (event) => {
  let searchvalue = search.value.trim();
  if (searchvalue === "") {
    apidata("cat");
  }
});

apidata("dog");
