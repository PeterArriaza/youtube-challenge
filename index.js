const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      maxResults: 5,
      part: 'snippet',
      key: 'AIzaSyBXZuDnAq_e5cb-hLwVHmCYsMfAqIcLFOU',
      type: 'video'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  // console.log(${result.videoId});
  return `
    <div class="result-container">
      <div class="img-block result">
        <img src="${result.snippet.thumbnails.medium.url}" class="thumbnail">
      </div>
      <div class="title-block result">
        <h2>
        <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
        <p>${result.snippet.description}</p>
        </h2>
      </div>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  $('.js-search-results').append(`<button class="next-Page">Next Page</button>`);
  loadNextPage(data);
  console.log(data);
}

function loadNextPage(currentData) {
  $('.js-search-results').on('click', '.next-Page', function (event) {
     const results = currentData.items.map((item, index) => renderResult(item));
     ('.js-search-results').html(results);
  });
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(this).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);

