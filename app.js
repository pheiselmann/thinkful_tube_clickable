var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: YOUTUBE_BASE_URL,
    data: {
      q: searchTerm,
      part: 'snippet',
      key: 'AIzaSyBdbVWr5I6Ms7sLJzk8MWXYVPdieunOSHQ'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}



function displayYouTubeSearchData(data) {
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
      if (item.id.videoId) {
        resultElement += '<p><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src="' + 
        item.snippet.thumbnails.medium.url + '"></a></p>';
      }
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(function(){watchSubmit();});
