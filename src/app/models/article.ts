export class Article {

        id! : number;
        designation! : string;
        prixUnitaire! : string;
        quantite! : number ;
        description! : string ;

        public constructor(){
          this.id = 0;
          this.designation = '';
          this.prixUnitaire = '';
          this.quantite = 0;
          this.description = '';

        }
      }
