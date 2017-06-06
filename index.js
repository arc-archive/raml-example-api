const raml2obj = require('raml2obj');
const {RamlJsonGenerator} = require('raml-json-enhance-node');
const fs = require('fs');

function write(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        return reject(new Error(err));
      }
      resolve();
    });
  });
}

const enhancer = new RamlJsonGenerator('api.raml', {
  output: 'raml-json-enhance.json'
});

raml2obj.parse('api.raml')
.then(function(ramlObj) {
  var parsed = JSON.stringify(ramlObj);
  return write('raml-2-obj.json', parsed);
})
.then(() => enhancer.generate());
