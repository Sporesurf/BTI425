var page = 1; // number
const perPage = 10; // nummber

async function loadMovieData(title = null) {
  let url = `/api/movies?page=${page}&perPage=${perPage}`;
  if (title) {
    url += `&title=${title}`;
    document.querySelector('.pagination').classList.add('d-none');
    page = 1;
  } else {
    document.querySelector('.pagination').classList.remove('d-none');
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let rows = '';
      data.forEach((movie) => {
        const id = movie._id;
        const year = movie.year;
        const title = movie.title;
        const plot = movie.plot || 'N/A';
        const rated = movie.rated || 'N/A';
        const runtime = movie.runtime;
        let hours = 0;
        let minutes = 0;
        if (runtime) {
          hours = Math.floor(runtime / 60);
          minutes = (runtime % 60).toString().padStart(2, '0');
        }

        rows += `
          <tr data-id="${id}">
            <td>${year}</td>
            <td>${title}</td>
            <td>${plot}</td>
            <td>${rated}</td>
            <td>${hours}:${minutes}</td>
          </tr>
        `;
      });

      document.querySelector('#moviesTable tbody').innerHTML = rows;

      const trElements = document.querySelectorAll('#moviesTable tbody tr');
      trElements.forEach((tr) => {
        tr.addEventListener('click', (event) => {
          const id = event.currentTarget.getAttribute('data-id');
          fetch(`/api/movies/${id}`)
            .then((response) => response.json())
            .then((data) => {
              // Populate and show the modal window with the movie data
            });
        });
      });

      document.querySelector('#current-page').innerHTML = page;
    });
}

loadMovieData();

// async function loadMovieData(title = null) {
//   let url = `/api/movies?page=${page}&perPage=${perPage}`;

//   if (title !== null) {
//     url += `&title=${title}`;
//     page = 1;
//     document.querySelector('.pagination').classList.add('d-none');
//   } else {
//     document.querySelector('.pagination').classList.remove('d-none');
//   }
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       let movieRows = data.map((movie) => {
//         let moviePlot = movie.plot ? movie.plot : 'N/A';
//         let movieRated = movie.rated ? movie.rated : 'N/A';
//         let movieRuntime = movie.runtime
//           ? `${Math.floor(movie.runtime / 60)}:${(movie.runtime % 60)
//               .toString()
//               .padStart(2, '0')}`
//           : 'N/A';
//         return `<tr data-id="${movie._id}">
//                   <td>${movie.year}</td>
//                   <td>${movie.title}</td>
//                   <td>${moviePlot}</td>
//                   <td>${movieRated}</td>
//                   <td>${movieRuntime}</td>
//                 </tr>`;
//       });
//       document.querySelector('#moviesTable tbody').innerHTML =
//         movieRows.join('');
//     });
// }
