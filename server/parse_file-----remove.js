let json = require("./stat_output.json");
let x = (`for f in *; do stat -c "${JSON.stringify(json).replace("\n", "").replace('"', '\\"')}" $f; done`)
console.log(x)
