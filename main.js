const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const inputWord = document.getElementById("input-word");
const searchBtn = document.getElementById("search-btn");
const resultContainer = document.querySelector(".result-container");

let pronunciation = document.getElementById("pronunciation");

// Get word meaning from API and build HTML to display it
function getMeaning() {
  fetch(`${url}${inputWord.value.trim()}`)
    .then((response) => response.json())
    .then((data) => {
      resultContainer.innerHTML = `
      <div class="dynamic-result-container">
          <div class="word-volume-container">
            <h1 id="word">${inputWord.value.trim().toLowerCase()}</h1>
            <button id="pronunciation-btn" onclick="pronounce()">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>

          ${
            data[0]?.phonetic || data[0]?.phonetics?.[0]?.text
              ? `<p id="phonetic">${
                  data[0].phonetic || data[0].phonetics[0].text
                }</p>`
              : ""
          }

          ${
            data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
            data[0]?.meanings?.[0]?.definitions?.[1]?.definition ||
            data[0]?.meanings?.[0]?.definitions?.[2]?.definition
              ? `<p id="meaning">${
                  data[0].meanings[0].definitions[0].definition ||
                  data[0].meanings[0].definitions[1].definition ||
                  data[0].meanings[0].definitions[2].definition
                }</p>`
              : ""
          }

          ${
            data[0]?.meanings?.[0]?.definitions?.[0]?.example ||
            data[0]?.meanings?.[0]?.definitions?.[1]?.example ||
            data[0]?.meanings?.[0]?.definitions?.[2]?.example
              ? `<p id="example">${
                  data[0].meanings[0].definitions[0].example ||
                  data[0].meanings[0].definitions[1].example ||
                  data[0].meanings[0].definitions[2].example
                }</p>`
              : ""
          }
        </div>
      `;

      pronunciation.setAttribute("src", "");
      for (let i = 0; i < data[0].phonetics.length; i++) {
        if (data[0].phonetics[i]?.audio) {
          pronunciation.setAttribute("src", data[0].phonetics[i].audio);
          break;
        }
      }
    })
    .catch(() => {
      resultContainer.innerHTML = `<p class="error-message">Sorry, the word you entered was not found.</p>`;
    });
}

// Start search on click or when Enter key is pressed
function startFetchingData() {
  searchBtn.addEventListener("click", getMeaning);

  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      getMeaning();
    }
  });
}

function pronounce() {
  pronunciation.play();
}

startFetchingData();
