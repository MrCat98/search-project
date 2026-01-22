const input = document.getElementById("search");
const autocomplete = document.getElementById("autocomplete");
const repoList = document.getElementById("repo-list");

fetch("https://api.github.com/search/topics?q=Q")
  .then((response) => response.json())
  .then((data) => {
    console.log("data:", data);
  });
