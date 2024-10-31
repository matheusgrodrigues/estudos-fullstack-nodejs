// TODO: Pulei o capitulo de testes porque o mocha não estava compilando e eu começei a ficar puto.
// Um dia rever o livro e ir criando os testes para a aplicação.
// Ler a doc do mocha.
var assert = require("assert");

describe("Array", function () {
   describe("#indexOf()", function () {
      it("should return -1 when the value is not present", function () {
         assert.equal([1, 2, 3].indexOf(4), -1);
      });
   });
});
