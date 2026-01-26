const input = document.getElementById("search");
const autocomplete = document.getElementById("autocomplete");
const repoList = document.getElementById("repo-list");
// функция debounce
const debounce = (fn, delay) => {
  let timeout;

  return function (...arr) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      (fn.apply(this, arr), delay);
    }, delay);
  };
};

// получение апи

async function fetchRep(query) {
  if (!query.trim()) {
    clearAutocomplete(data.items);
    return;
  }
  try {
    const response = await fetch(
      "https://api.github.com/search/repositories?q=Q",
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
