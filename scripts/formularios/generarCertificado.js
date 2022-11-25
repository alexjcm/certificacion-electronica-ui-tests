/**
 * Retorna true si la fecha de inicio es menor a la fecha de fin.
 * 
 * @param {Date}
 * @param {Date}
 * @return {boolean}
 */
function fechasValid(fechaInicio, fechaFin) {
  if (fechaInicio && fechaFin) {
    return new Date(fechaInicio) < new Date(fechaFin);
  }

  return false
}

module.exports = fechasValid