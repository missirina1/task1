const searchForm = document.getElementById("searchForm");
const successRequest = document.getElementById("successRequest");
const invalidRequest = document.getElementById("invalidRequest");
const finallyRequest = document.getElementById("finallyRequest");
const loadingMessage = document.getElementById("loadingMessage");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getServerRequest();
});
function getServerRequest() {
  const changeSelectOption = document.getElementById("changeSelectOption");
  const searchIndex = document.getElementById("searchIndex");
  successRequest.textContent = "";
  invalidRequest.textContent = "";

  try {
    if (searchIndex.value > 10 || searchIndex.value < 1) {
      throw new Error("Индекс должен быть числом от 1 до 10");
    }
    // Показать сообщение о загрузке
    loadingMessage.classList.remove("hidden");

    if (changeSelectOption.value === "planets") {
      fetch(`https://swapi.py4e.com/api/planets/${searchIndex.value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Ошибка API:${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((json) => {
          if (json.name) {
            const namePlanete = JSON.stringify(json.name);
            successRequest.textContent = `Название планеты: ${namePlanete}`;
          } else {
            throw new Error("Данные не найдены");
          }
        })
        .catch((error) => {
          invalidRequest.textContent = error.message;
        });
    }
    if (changeSelectOption.value === "people") {
      fetch(`https://swapi.py4e.com/api/people/${searchIndex.value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Ошибка API:${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((json) => {
          if (json.name) {
            const namePeople = JSON.stringify(json.name);
            successRequest.textContent = `Персонаж: ${namePeople}`;
          } else {
            throw new Error("Данные не найдены");
          }
        })
        .catch((error) => {
          invalidRequest.textContent = error.message;
        });
    }
    if (changeSelectOption.value === "films") {
      fetch(`https://swapi.py4e.com/api/films/${searchIndex.value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Ошибка API:${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((json) => {
          if (json.title) {
            const titleFilms = JSON.stringify(json.title);
            successRequest.textContent = `Название фильма: ${titleFilms}`;
          } else {
            throw new Error("Данные не найдены");
          }
        })
        .catch((error) => {
          invalidRequest.textContent = error.message;
        });
    }
  } catch (error) {
    invalidRequest.textContent = `Ошибка: ${error.message}`;
    loadingMessage.classList.add("hidden");
  } finally {
    loadingMessage.classList.add("hidden");
    finallyRequest.textContent = "Запрос завершён";
  }
}
