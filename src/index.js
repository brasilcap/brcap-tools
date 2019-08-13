// @ts-check
const PDFTable = require('./PDFTable').default;
const { retryPromise } = require('./retryPromise');

module.exports = {
  exportTo: {
    pdf: {
      /**
       * @param {Array}  data                 Array com obj page contendo os dados de cada página
       * @param {string} fileName             Nome final do pdf
       * @param {string} [format='l']         Opcional (default 'l') Formato do pdf 'l' ou 'p' (lanscape, portrait)
       * @param {boolean} [checkChrome=true]  Opcional (default true), ignora a verificação de chrome
      */
      table: (data, fileName, format, checkChrome) => {
        const pdf = new PDFTable(data, fileName, format, checkChrome);
        return pdf.isChrome;
      },
    },
  },
  retryPromise,
};
