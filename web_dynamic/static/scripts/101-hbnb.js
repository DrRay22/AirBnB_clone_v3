// 4-hbnb.js

document.addEventListener('DOMContentLoaded', () => {
  // ... (existing code remains the same)

  // Function to handle fetching and displaying reviews
  function toggleReviews() {
    const reviewsSection = document.querySelector('#reviews-section');
    const reviewsHeader = document.querySelector('#reviews h2 span');
    const isHidden = reviewsHeader.innerText === 'hide';

    if (isHidden) {
      // If reviews are displayed, hide them and change the text to "show"
      reviewsSection.innerHTML = '';
      reviewsHeader.innerText = 'show';
    } else {
      // If reviews are hidden, fetch and display them, and change the text to "hide"
      const placeId = ''; // Add the place ID you want to fetch reviews for
      fetch(`http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((review) => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('Review');
            reviewElement.innerHTML = `
              <h3>${review.user_id}</h3>
              <p>${review.text}</p>
            `;
            reviewsSection.appendChild(reviewElement);
          });
          reviewsHeader.innerText = 'hide';
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    }
  }

  // Event listener for the Reviews span click
  const reviewsToggle = document.querySelector('#reviews h2 span');
  reviewsToggle.addEventListener('click', toggleReviews);
});

