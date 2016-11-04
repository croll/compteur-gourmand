
function init() {
  var board = new DepartureBoard (document.getElementById ('display'), { rowCount: 7, letterCount: 80 });

  board.setValue ([
    "SUR UN AN, NOUS ALLONS DIMINUER NOTRE EMPREINTE ÉCOLOGIQUE DE 85270 m2",
    "POUR UN MONTANT TOTAL ÉCONOMISÉ DE 14681 €",
    "",
    "Soit un gain d'empreinte équivalent à 8527 repas",
    "",
    "Grâce à ses engagements \"Repas végétarien\" et \"Pain perdu\" sur un an, Marion à économisé 619€",
    "et vient de permettre de diminuer notre empreinte écologique de 3640m2 ! Bravo !"
  ]);


  window.setTimeout (function () {
    document.getElementById('audioplayer').play();
    board.setValue ([
      "SUR UN AN, NOUS ALLONS DIMINUER NOTRE EMPREINTE ÉCOLOGIQUE DE 85323 m2",
      "POUR UN MONTANT TOTAL ÉCONOMISÉ DE 14832 €",
      "",
      "Soit un gain d'empreinte équivalent à 8532 repas",
      "",
      "Grâce à son engagement \"Repas végétarien\" sur un an, Sylvain à économisé 323€",
      "et vient de permettre de diminuer notre empreinte écologique de 1120m2 ! Bravo !"
    ]);
  }, 30000);

  document.getElementById('audioplayer').play();
}
