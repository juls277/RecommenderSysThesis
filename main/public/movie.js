
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const startTime = Date.now();


fetch(`/movies/${movieId}`)
  .then(res => res.json())
  .then(movie=>{
    document.getElementById('movie-title').textContent = movie.title || 'Untitled';
    document.getElementById('movie-genres').textContent = `Genres: ${movie.genres || 'N/A'}`;
    document.getElementById('movie-id').textContent = `Movie ID: ${movie.id}`;
    document.getElementById('movie-overview').textContent = movie.overview || 'No description available';
    document.getElementById('movie-release').textContent = `Release Date: ${movie.release_date || 'Unknown'}`;
    
  })
  .catch(error => {
    console.error('Error fetching then', error);
  });
  
   window.addEventListener('load', () => {
      const session = JSON.parse(localStorage.getItem('sessionHistory'));
     console.log('Current session on load:', session);
    });
  // when user leaves or closes the page
  window.addEventListener('beforeunload', () => {
  const secondsSpent = Math.floor((Date.now() - startTime) / 1000);
  const session = JSON.parse(localStorage.getItem('sessionHistory')) || {
    visitedItems: [],
    timeSpent: {}
  };

  // update time spent on this movie
  session.visitedItems.push(movieId);
  session.timeSpent[`item_${movieId}`] =
    (session.timeSpent[`item_${movieId}`] || 0) + secondsSpent;


  localStorage.setItem('sessionHistory', JSON.stringify(session));
  console.log('Saved session:', session);
  });