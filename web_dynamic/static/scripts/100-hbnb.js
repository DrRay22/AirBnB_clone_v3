#!/usr/bin/env node

document.addEventListener('DOMContentLoaded', () => {
  // Variables to store the selected Amenities, States, and Cities
  const selectedAmenities = [];
  const selectedLocations = [];

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

  // Function to update the Locations h4 tag with selected locations
  function updateLocationsTag() {
    const locationsTag = document.querySelector('#locations h4');
    const selectedLocationsNames = selectedLocations.map((location) => location.name).join(', ');
    locationsTag.innerText = `Locations: ${selectedLocationsNames}`;
  }

  // Function to get the list of checked amenities
  function getCheckedAmenities() {
    const amenities = [];
    const amenitiesCheckboxes = document.querySelectorAll('#amenities-list input[type="checkbox"]:checked');

    amenitiesCheckboxes.forEach((checkbox) => {
      const amenityId = checkbox.getAttribute('data-id');
      amenities.push(amenityId);
    });

    return amenities;
  }

  // Function to get the list of selected locations (states or cities)
  function getSelectedLocations() {
    return selectedLocations.map((location) => location.id);
  }

  // Event listener for changes on input checkboxes (amenities and locations)
  document.querySelectorAll('#amenities-list input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // Update selectedAmenities when an amenity checkbox is changed
      selectedAmenities.length = 0; // Clear the array
      selectedAmenities.push(...getCheckedAmenities());

      // Update the h4 tag inside the div Amenities with the list of Amenities checked
      const amenitiesTag = document.querySelector('#amenities h4');
      amenitiesTag.innerText = `Amenities: ${selectedAmenities.join(', ')}`;
    });
  });

  document.querySelectorAll('#locations-list input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // Update selectedLocations when a location checkbox is changed
      selectedLocations.length = 0; // Clear the array
      const selectedLocationCheckboxes = document.querySelectorAll('#locations-list input[type="checkbox"]:checked');
      selectedLocationCheckboxes.forEach((locationCheckbox) => {
        const locationId = locationCheckbox.getAttribute('data-id');
        const locationName = locationCheckbox.getAttribute('data-name');
        selectedLocations.push({ id: locationId, name: locationName });
      });

      // Update the Locations h4 tag with the list of States or Cities checked
      updateLocationsTag();
    });
  });

  // Event listener for the button click
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {
    // Get the list of checked amenities, cities, and states
    const amenities = getCheckedAmenities();
    const locations = getSelectedLocations();

    // Send a POST request to the API endpoint with the list of amenities, cities, and states
    const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amenities, states: locations, cities: locations }),
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

