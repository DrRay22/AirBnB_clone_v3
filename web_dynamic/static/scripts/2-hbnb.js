// JavaScript code
document.addEventListener('DOMContentLoaded', () => {
  // Create the new div element with the specified attributes
  const apiStatusDiv = document.createElement('div');
  apiStatusDiv.id = 'api_status';
  apiStatusDiv.style.float = 'right';
  apiStatusDiv.style.width = '40px';
  apiStatusDiv.style.height = '40px';
  apiStatusDiv.style.marginTop = '15px';
  apiStatusDiv.style.marginRight = '30px';
  apiStatusDiv.style.backgroundColor = '#cccccc';
  apiStatusDiv.style.borderRadius = '50%';

  // Append the new div to the header tag
  const header = document.querySelector('header');
  header.appendChild(apiStatusDiv);
});

