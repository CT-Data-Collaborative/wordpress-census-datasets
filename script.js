var ckanUrl = 'http://data.ctdata.org';
var ckan = new CKAN.Client(ckanUrl);

ckan.action('package_search', {
  q: ['US Census'],
  rows: 1000,
}, function(err, res) {

  if (!err) {
    var datasets = res.result.results;

    for (var i = 0; i < datasets.length; i++) {
      var d = datasets[i];
      var name = d.name;
      var niceName = name.split('-').join(' ');

      var domain = '';

      for (var j = 0; j < d.extras.length; j++) {
        if (d.extras[j].key == 'Domain') {
          domain = d.extras[j].value;
          break;
        }
      }

      if (!domain) continue;


      $('#' + domain).append('<li><a href="' + ckanUrl + '/visualization/' + name + '" target="_blank">' + niceName + '</a></li>');
    }

  }

});
