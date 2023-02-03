const {Category} = require("./models");
//function to valide if a string is a email
function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)){
     return true
    } else {
     return false
    }
  }

module.exports = {validarEmail}