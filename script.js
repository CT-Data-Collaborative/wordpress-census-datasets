var ckanUrl = 'http://data.ctdata.org';
var ckan = new CKAN.Client(ckanUrl);

ckan.action('package_search', {
  q: ['US Census'],
  rows: 1000,
}, function(err, res) {

  if (!err) {
    var datasets = res.result.results;

    // Sort datasets alphabetically
    datasets.sort(function(a, b) { return ('' + b.title).localeCompare(a.title) } );  // sort in reverse alphabetical order

    for (var i = 0; i < datasets.length; i++) {
      var d = datasets[i];
      var name = d.name;
      var title = d.title;

      var domain = '';
      var subdomain = '';
      var source = '';

      for (var j = 0; j < d.extras.length; j++) {
        if (d.extras[j].key == 'Domain') {
          domain = d.extras[j].value;
        }
        if (d.extras[j].key == 'Subdomain') {
          subdomain = d.extras[j].value.replace(' ', '');
        }
        if (d.extras[j].key == 'Source') {
          source = d.extras[j].value;
        }
      }

      if (source != 'US Census') continue;

      if (!domain || !subdomain) continue;

      var elem = (domain == 'Health' || domain == 'Education')
        ?  '#' + domain + ' li:first-child'
        :  '#' + subdomain;

      $(elem).after('<li><a href="' + ckanUrl + '/visualization/' + name + '" target="_blank">' + title + '</a></li>');

    }

  }

});
