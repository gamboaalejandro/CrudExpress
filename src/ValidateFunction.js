function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)){
     return true
    } else {
     return false
    }
  }


  const num = 42.2;
  console.log(Number.isFinite(num)); // true


module.exports = {validarEmail}