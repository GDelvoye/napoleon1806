let carte_prusse = [1/3, 2/3];
let carte_france= [1/2, 1/2];
function factorial(n){
            let n_facto = 1;
            for (let i = 1; i < n+1; i++){
                n_facto = n_facto * i;
            }
            return n_facto
}

function coef_binomial(n, k){
            if (k>=n){
                return 1
            }
            else{
            return factorial(n)/(factorial(k)*factorial(n-k))
            }
}

function proba_binomial(n,p,k){
            return coef_binomial(n,k)*p**k*(1-p)**(n-k)
}
    
function proba_combat(d_france, d_prusse, perte_france, perte_prusse){
            let proba = 1;
            proba= proba*proba_binomial(d_france,carte_france[0],perte_france);
            proba=proba*proba_binomial(d_prusse, carte_prusse[0], perte_prusse);
            return proba
}

function proba_resultat(d_france, d_prusse){
            let pv_france = 0;
            let p_egal = 0;
            let pv_prusse = 0;
            for (let p_france = 0; p_france < d_france + 1; p_france++){
                for (let p_prusse = 0; p_prusse < d_prusse +1; p_prusse++){
                    if (p_france > p_prusse){
                        pv_france=pv_france+proba_combat(d_france,d_prusse,p_france,p_prusse);
                    }else if (p_france < p_prusse){
                        pv_prusse=pv_prusse+proba_combat(d_france,d_prusse,p_france,p_prusse);
                    } else{
                        p_egal=p_egal+proba_combat(d_france,d_prusse,p_france,p_prusse);
                    }
                }
            }
            return [pv_france, p_egal, pv_prusse]//round(float(pv_france),2), round(float(p_egal),2), round(float(pv_prusse),2)
}
        
