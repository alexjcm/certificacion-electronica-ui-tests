/**
 * Retorna el estado del pdf para rellenar el contrato, dicho estado
 * puede ser: 'Generado' o 'Regenerar'.
 *
 * @param {string}
 * @return {json}
 */
function getPayload(estado) {
  return { contratoEstadoPDF: estado };
}

module.exports = getPayload;
