interface Meanings {
    [word: string]: string;
  }
  
  async function generateRandomWords(): Promise<string[]> {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error generating random words:", error);
      return [];
    }
  }
  
  function displayWords(words: string[]): void {
    const container = document.getElementById("words-container");
    if (!container) return;
  
    container.innerHTML = "";
    words.forEach((word) => {
      const div = document.createElement("div");
      div.textContent = word;
      container.appendChild(div);
    });
  }
  
  function displayMeanings(meanings: Meanings): void {
    const container = document.getElementById("meanings-container");
    if (!container) return;
  
    container.innerHTML = "";
  
    for (const word in meanings) {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${word}:</strong> ${meanings[word]}`;
      container.appendChild(div);
    }
  }
  
  async function fetchMeanings(words: string[]): Promise<Meanings> {
    const meanings: Meanings = {};
    const apiKey = "7f5dd1f2-d14a-4409-bb46-64e1f35b3756";
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/sd3/json/${words}?key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const responseData = await response.json();
      console.log("Response from API:", responseData);
  
      if (Array.isArray(responseData) && responseData.length === 0) {
        console.log("No meanings found for the provided words.");
        return meanings;
      }
  
      responseData.forEach((entry: any, index: number) => {
        if (entry.shortdef) {
          meanings[words[index]] = entry.shortdef[0];
        } else {
          meanings[words[index]] = "Meaning not found";
        }
      });
  
      return meanings;
    } catch (error) {
      console.error("Error fetching meanings:", error);
      return {};
    }
  }
  
  // Event listener for generate words button
  document
    .getElementById("generate-words")
    ?.addEventListener("click", async () => {
      const words = await generateRandomWords();
      displayWords(words);
    });
  
  // Event listener for fetch meanings button
  document
    .getElementById("fetch-meanings")
    ?.addEventListener("click", async () => {
      const container = document.getElementById("words-container");
      if (!container) return;
  
      const words = Array.from(container.children).map(
        (child) => child.textContent || ""
      );
      const meanings = await fetchMeanings(words);
      console.log("Meanings:", meanings);
  
      if (meanings !== null) {
        displayMeanings(meanings);
      } else {
        console.log("Failed to fetch meanings.");
      }
    });