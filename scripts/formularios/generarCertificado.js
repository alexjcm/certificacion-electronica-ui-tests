/**
 * Retorna true si la fecha de inicio es menor a la fecha de fin.
 * 
 * @param {object}
 * @param {object}
 * @return {boolean}
 */
function fechasValid(fechaInicio, fechaFin) {
  if (fechaInicio && fechaFin) {
    return new Date(fechaInicio) < new Date(fechaFin);
  }
}

/**
 * Valores de la respuesta cuando la llamada falla.
 * 
 * @param {string} Valores de la respuesta fallida.
 * @return {string}
 */
function submit_errors_list(respuestaFallida) {
  if (respuestaFallida && respuestaFallida.explanations) {
    const liElements = respuestaFallida.explanations
      .filter((cause) => cause !== null)
      .map((cause) => "<li>" + cause + "</li>")
      .join("");
    if (liElements) {
      return "<ul>" + liElements + "</ul>";
    }
  }
}

module.exports = fechasValid