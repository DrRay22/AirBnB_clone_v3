#!/usr/bin/env node

const amenitiesList = document.getElementById('amenities-list');
const amenitiesItems = amenitiesList.getElementsByTagName('li');
const checkedAmenities = []; // Array to store the checked amenity IDs

for (let i = 0; i < amenitiesItems.length; i++) {
  const amenityItem = amenitiesItems[i];

  // Create the checkbox element and set attributes
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.style.marginRight = '10px'; // 10px on the left of the Amenity name

  // Get the Amenity ID and Name from the dataset
  const amenityId = amenityItem.dataset.id;
  const amenityName = amenityItem.innerText;

  // Set data attributes for Amenity ID and Name
  checkbox.setAttribute('data-id', amenityId);
  checkbox.setAttribute('data-name', amenityName);

  // Append the checkbox to the list item
  amenityItem.prepend(checkbox);

  // Add event listener to each checkbox
  checkbox.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // If the checkbox is checked, add the Amenity ID to the checkedAmenities array
      checkedAmenities.push(amenityId);
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the checkedAmenities array
      const index = checkedAmenities.indexOf(amenityId);
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
      }
    }

    // Update the h4 tag with the list of checked amenities
    const h4Tag = document.querySelector('#Amenities h4');
    h4Tag.innerText = `Checked Amenities: ${checkedAmenities.join(', ')}`;
  });
}

