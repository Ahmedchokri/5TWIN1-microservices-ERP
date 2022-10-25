import { CancurantsModel } from "./cancurants.model";
export class opportunityanalysis {
    id: string;
    chiffre_affaire: string;
    maitrise_sujet: string;
    maitrise_client: string;
    maitrise_client_remarque : string;
    disponibilite_ressoures: string;
    maitrise_sujet_remarque :string[];
    risque: number;
    cancurants : CancurantsModel[] ;
  }