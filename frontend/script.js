window.onload = () => {
  const selectAll = document.getElementById("all");
  const firstElemnt = document.createElement("option");
  selectAll.appendChild(firstElemnt);
  firstElemnt.innerHTML = "-Select Country-";

  const mainElement = document.getElementById("country");

  const toolbar = document.getElementById("toolbar");

  const prevButton = document.createElement("button");
  prevButton.id = "prev";
  prevButton.innerText = "Previous Country";
  toolbar.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.innerText = "Next Country";
  toolbar.appendChild(nextButton);
  const visitedCountries = [];

  countries.forEach((country) => {
    const optElem = document.createElement("option");
    optElem.innerText = country.name.common;
    optElem.value = country.cca3;
    selectAll.appendChild(optElem);
  });

  selectAll.addEventListener("change", function () {
    let selectedCountry = countries.find(
      (country) => country.cca3 === selectAll.value
    );

    if (selectedCountry) {
      const flag = selectedCountry.flags.png;
      const commonName = selectedCountry.name.common;
      const region = selectedCountry.region;
      const subregion = selectedCountry.subregion;
      const capital = selectedCountry.capital;

      mainElement.innerHTML = `
        <img src="${flag}" alt="${commonName} flag">
        <h1>${commonName}</h1>
        <h2>Region: ${region}</h2>
        <h3>Subregion: ${subregion}</h3>
        <h4>Capital: ${capital}</h4>
      `;

      visitedCountries.push(selectedCountry);

      currentIndex = visitedCountries.length - 1;

      prevButton.disabled = false;

      nextButton.disabled = true;
    } else {
      mainElement.innerHTML = "Select a country from the list.";
    }
  });

  prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex >= 0) {
      displayDetails(visitedCountries[currentIndex]);

      if (currentIndex === 0) {
        prevButton.disabled = true;
      }

      nextButton.disabled = false;
    } else {
      prevButton.disabled = true;
      nextButton.disabled = true;
    }
  });

  nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < visitedCountries.length) {
      displayDetails(visitedCountries[currentIndex]);

      if (currentIndex === visitedCountries.length - 1) {
        nextButton.disabled = true;
      }
      prevButton.disabled = false;
    } else {
      nextButton.disabled = true;
      prevButton.disabled = true;
    }
  });

  function displayDetails(country) {
    if (country) {
      const flag = country.flags.png;
      const commonName = country.name.common;
      const region = country.region;
      const subregion = country.subregion;
      const capital = country.capital;

      mainElement.innerHTML = `
        <img src="${flag}" alt="${commonName} flag">
        <h1>${commonName}</h1>
        <h2>Region: ${region}</h2>
        <h3>Subregion: ${subregion}</h3>
        <h4>Capital: ${capital}</h4>
      `;
    } else {
      mainElement.innerHTML = "<p>Select a country from the list.</p>";
    }
  }

  const populationButton = document.getElementById("population");
  populationButton.addEventListener("click", () => {
    let selectedCountry = countries.find(
      (country) => country.cca3 === selectAll.value
    );

    let neighborWithLargestPopulation = null;

    if (selectedCountry) {
      selectedCountry.borders.forEach((border) => {
        const neighbor = countries.find((country) => country.cca3 === border);
        if (neighbor) {
          if (
            !neighborWithLargestPopulation ||
            neighbor.population > neighborWithLargestPopulation.population
          ) {
            neighborWithLargestPopulation = neighbor;
          }
        }
      });
    }

    displayDetails(neighborWithLargestPopulation);
  });

  const areaButton = document.getElementById("area");
  areaButton.addEventListener("click", () => {
    let selectedCountry = countries.find(
      (country) => country.cca3 === selectAll.value
    );

    let neighborWithLargestArea = null;

    if (selectedCountry) {
      selectedCountry.borders.forEach((border) => {
        const neighbor = countries.find((country) => country.cca3 === border);
        if (neighbor) {
          if (
            !neighborWithLargestArea ||
            neighbor.area > neighborWithLargestArea.area
          ) {
            neighborWithLargestArea = neighbor;
          }
        }
      });
    }

    displayDetails(neighborWithLargestArea);
  });
};
