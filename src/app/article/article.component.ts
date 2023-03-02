import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators } from '@angular/forms';
import { Article } from '../models/article';
import { ArticleServiceService } from '../services/article-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private articleService : ArticleServiceService) {
    this.articleService =articleService;
  }

  ngOnInit(): void {
    this.getAll();
    this.modifierEtatAjout();


  }
  getParamid : any;


  errorMessage :  any;

  successMessage : any;

afficherFormulaire : boolean = false;
article : Article = new Article();


articles : Article[] = [];


fonctionModifierVariable(){
  return this.afficherFormulaire= !this.afficherFormulaire;
}


formulaireAjoutArticle = new FormGroup({

  'designation':new FormControl('',Validators.required),
  'prixUnitaire':new FormControl('',Validators.required),
  'quantite':new FormControl('',Validators.required),
  'description':new FormControl('',Validators.required),

});


getAll(){
  this.articleService.getAll().subscribe(res=>{
    this.articles = res;
  })
}


enregisterArticle(){

  console.log(this.formulaireAjoutArticle.value);

    if(this.formulaireAjoutArticle.valid){

        console.log(this.formulaireAjoutArticle.value);
        this.articleService.ajoutArticle(this.formulaireAjoutArticle.value).subscribe((response)=>{
          console.log(response, "les reponse ==>");
          this.getAll();
          this.formulaireAjoutArticle.reset();

          this.successMessage = "L'article " + this.formulaireAjoutArticle.value+ "a été Ajouters";
          this.fonctionModifierVariable()
        })

    }else{

      // console.log("Tous les champs sont obligatoires")
      this.errorMessage = "Tous les champs sont obligatoire";
    }



}


  //Methode pour dellete
  supprimer(id: number) {
    console.log(id);
    this.articleService.supprimerArticle(id).subscribe(res=>{
      console.log(res);
    })
  }


confirmBox(id: number){
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le !'
  }).then((result) => {
    if (result.isConfirmed) {
      this.supprimer(id);
      this.getAll();
      Swal.fire(
        'Supprimé !',
        'Le role a été supprimé.',
        'success'
      );
      this.getAll();

    }
  })
}


ajout : boolean = false;
etat : boolean= true;

bool  : boolean = false;
modifAj(){
   this.ajout = !this.ajout;
  }

modifier(article : Article){
  console.log(this.article.id);

this.article = article;
this.bool = true;

this.afficherFormulaire  = true;
this.modifAj();



}

modifierEtatAjout(){

if (this.bool ==false){

  this.enregisterArticle()

  }else{
  this.editArticle()
  }
}


editArticle(){
  this.articleService.modificationArticle(this.article.id,this.article).subscribe(
    (res:Article)=>{
      this.article = new Article();
      this.fonctionModifierVariable();
      this.ajout = false;
      this.bool=false;
    }
  )
}


}
