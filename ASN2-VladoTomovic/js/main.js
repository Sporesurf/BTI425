var page = 1; // number
const perPage = 10; // nummber

function loadMovieData(title = null) {
  // Set the page to 1 if the title parameter is not null
  if (title !== null) {
    page = 1;
    document.querySelector('.pagination').classList.add('d-none');
  } else {
    document.querySelector('.pagination').classList.remove('d-none');
  }

  // Fetch the movie data from the API
  let url = '/api/movies?page=' + page + '&perPage=' + perPage;
  if (title !== null) {
    url += '&title=' + title;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Format and add the data to the DOM
      // ...
      // Add click events to each row item
      // ...
      // Populate and show the modal window
      // ...
    });
}
