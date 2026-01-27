const searchInput = document.getElementById("search-input");
const autocompleteList = document.getElementById("autocomplete-list");
const repoList = document.getElementById("repo-list");
// функция debounce
const debounce = (fn, delay) => {
  let timeout;

  return function (...arr) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      (fn.apply(this, arr));
    }, delay);
  };
};

// получение апи

async function fetchRep(query) {
  if (!query.trim()) {
    clearAutocomplete();
    return;
  }
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=5`
    );
    if (response.ok) {
      const data = await response.json();
      showAutocomplete(data.items);
    }
  } catch (e) {
    console.error("Ошибка запроса", e);
  }
}

// Автокомплит

function showAutocomplete(repos) {
  clearAutocomplete();

  repos.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("autocomplete-item");
    li.textContent = element.name;
    li.addEventListener("click", () => addRepoToList(element));
    autocompleteList.appendChild(li);
  });
}

function clearAutocomplete() {
  autocompleteList.innerHTML = "";
}

// добавление репозитория в список

function addRepoToList(repo) {
  const li = document.createElement("li");
  li.classList.add("repo-item");

  li.innerHTML = `
        <div>
            Name: ${repo.name}<br>
            Owner: ${repo.owner.login}<br>
            Stars: ${repo.stargazers_count}
        </div>
        <button class = 'btn-del'>&times;</button>
        `;
  // кнопка удоления при нажатие удоляет список
  li.querySelector(".btn-del").addEventListener("click", () => li.remove());

  repoList.appendChild(li);
  searchInput.value = ""; //очистка инпута
  clearAutocomplete(); //очистка вариантов
}

//задержка слушателя ввода

searchInput.addEventListener(
  "input",
  debounce((e) => {
    fetchRep(e.target.value);
  }, 500),
);
