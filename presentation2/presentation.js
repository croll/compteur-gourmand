
function init() {
  var board = new DepartureBoard (document.getElementById ('display'), { rowCount: 2, letterCount: 80 });

  board.setValue ([
    "SUR UN AN, NOUS ALLONS DIMINUER NOTRE EMPREINTE ÉCOLOGIQUE DE 85270 m2",
    "POUR UN MONTANT TOTAL ÉCONOMISÉ DE 14681 €",
  ]);


  window.setTimeout (function () {
    document.getElementById('audioplayer').play();
    board.setValue ([
      "SUR UN AN, NOUS ALLONS DIMINUER NOTRE EMPREINTE ÉCOLOGIQUE DE 85323 m2",
      "POUR UN MONTANT TOTAL ÉCONOMISÉ DE 14832 €",
    ]);
  }, 20000);

  document.getElementById('audioplayer').play();
}
