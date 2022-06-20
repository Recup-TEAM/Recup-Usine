// But du programme : convertir une page HTML en un fichier PDF (téléchargeable)

// --------------------------------------------------------------------------------------------------------------------------------------

document.getElementById("test-2").style.display = "none"; // Masquer une div

function generatePDF() {

    document.getElementById("test-2").style.display = "block"; // Afficher sue le PDF la div nécessaire

    var doc = new jsPDF();  // Créer l'objet jsPDF

     doc.fromHTML(document.getElementById("bigDiv"), // Page à afficher
     15, // Marge à gauche
     15, // Marge en haut 

     {
       'width': 170  // Largeure maximal prise par le text (ne touche pas)
     },

     function(save) 
      {
       doc.save("Facture.pdf"); // Sauvegarde et télécharge le PDF avec le nom Facture-(numéro).pdf
     });
     document.getElementById("test-2").style.display = "none"; // Remasquer la div
   }
