// But du programme : convertir une page HTML en un fichier PDF (téléchargeable)

// --------------------------------------------------------------------------------------------------------------------------------------

function generatePDF() {
    var doc = new jsPDF();  //create jsPDF object
     doc.fromHTML(document.getElementById("test"), // page element which you want to print as PDF

     15, // Marge à gauche
     15, // Marge en haut 

     {
       'width': 170  // Largeure maximal prise par le text (ne touche pas)
     },

     function(save) 
      {
       doc.save("Facture.pdf"); // Sauvegarde et télécharge le PDF avec le nom Facture-(numéro).pdf
     });
   }