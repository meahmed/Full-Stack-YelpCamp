$('#campground-search').on('input', function () {
  var search = $(this).serialize();
  if (search === "search=") {
    search = "all"
  }
  $.get('/campgrounds?' + search, function (data) {
    $('#campground-grid').html('');
    data.forEach(function (campground) {
      $('#campground-grid').append(`
            <div class="card">
                <img class="card-img-top" src="${ campground.image}">
                <div class="text-center card-body">
                    <h5 class="card-title">${ campground.name}</h5>
                    <a class="btn btn-primary btn-sm" href="/campgrounds/${ campground._id}">More Info</a>
                </div>
            </div>
        `);
    });
  });
});

$('#campground-search').submit(function (event) {
  event.preventDefault();
});