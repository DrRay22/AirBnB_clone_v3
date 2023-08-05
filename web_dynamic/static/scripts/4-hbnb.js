#!/usr/bin/env node

document.addEventListener('DOMContentLoaded', () => {
  // Function to create the article tag for a place
  function createPlaceArticle(place) {
    const article = document.createElement('article');
    article.innerHTML = `
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
      </div>
      <div class="description">${place.description}</div>
    `;
    return article;
  }

  // Function to update the places section with the retrieved places data
  function updatePlacesSection(places) {
    const placesSection = document.querySelector('section.places');
    placesSection.innerHTML = ''; // Clear existing content

    places.forEach((place) => {
      const article = createPlaceArticle(place);
      placesSection.appendChild(article);
    });
  }

  // Function to get the list of checked amenities
  function getCheckedAmenities() {
    const checkedAmenities = [];
    const amenitiesCheckboxes = document.querySelectorAll('#amenities-list input[type="checkbox"]:checked');

    amenitiesCheckboxes.forEach((checkbox) => {
      const amenityId = checkbox.getAttribute('data-id');
      checkedAmenities.push(amenityId);
    });

    return checkedAmenities;
  }

  // Event listener for the button click
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {
    // Get the list of checked amenities
    const amenities = getCheckedAmenities();

    // Send a POST request to the API endpoint with the list of amenities
    const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amenities }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Call the function to update the places section with the retrieved places data
        updatePlacesSection(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  });
});
