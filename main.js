const prompt = require("prompt-sync")()

//// v1

// const fighters = [{
//     nom: 'Sombre Lutin'
// }, {
//     nom: 'Guerrier du feu'
// }]

// const tabAttack = [{
//     attaque: 'Frappe rapide',
//     puissance: 10,

// },
// {
//     attaque: 'Soin léger',
//     puissance: 15,

// },
// {
//     attaque: 'Coup Puissant',
//     puissance: 20,

// },
// {
//     attaque: 'Frappe dévastatrice',
//     puissance: 30,

// }]

// const maxPv = 50

// let pvSombreLutin = 50
// let pvGuerrierDuFeu = 50

// function randomize(min, max) { //// ALEATOIRE DES ATTAQUES
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// while (pvGuerrierDuFeu > 1 && pvSombreLutin > 1) {   //// COMBAT
//     for (let i = 0; i < fighters.length; i++) {
//         if (i === 0) {   // ATTAQUE DU JOUEUR
//             console.log("Un Guerrier du Feu sauvage apparait ! Sombre Lutin, que fais-tu ? ")
//             for (let j = 0; j < tabAttack.length; j++) {
//                 console.log(`${j + 1} : ${tabAttack[j].attaque}`);
//             }
//             let choice = Number(prompt())
//             while (choice != 1 && choice != 2 && choice != 3 && choice != 4) {
//                 console.log('Recommence en choisissant entre 1 et 4')
//                 choice = Number(prompt());
//             }
//             if (choice > 0 && choice <= tabAttack.length) {
//                 let res = tabAttack[choice - 1]
//                 switch (res.attaque) {
//                     case 'Frappe rapide':
//                         res.precision = randomize(1, 2);
//                         break;
//                     case 'Soin léger':
//                         res.precision = randomize(1, 3);
//                         break;
//                     case 'Coup Puissant':
//                         res.precision = randomize(1, 3);
//                         break;
//                     case 'Frappe dévastatrice':
//                         res.precision = randomize(1, 4);
//                         break;
//                 }
//                 if (res.precision === 1) {
//                     console.log(`${fighters[i].nom} tente ${res.attaque} mais cela échoue`);
//                 } else if (res.attaque === "Soin léger") {
//                     if (pvSombreLutin >= 50) {
//                         console.log(`${fighters[i].nom} lance ${res.attaque} mais ses points de vie son déjà au maximum !`);
//                     } else {
//                         pvSombreLutin += res.puissance
//                         if (pvSombreLutin > maxPv) {
//                             pvSombreLutin = maxPv
//                         }
//                         console.log(`${fighters[i].nom} lance ${res.attaque} et se soigne de ${res.puissance} pv`);
//                         console.log(`Ses pv remontent à ${pvSombreLutin}`);
//                     }
//                 } else {
//                     pvGuerrierDuFeu -= res.puissance
//                     console.log(`${fighters[i].nom} lance ${res.attaque} et inflige ${res.puissance} de dégâts`);
//                 }
//                 if (pvGuerrierDuFeu <= 0) {
//                     console.log('Victoire !');
//                     break
//                 }
//                 console.log(`Il reste ${pvGuerrierDuFeu} pv au Guerrier du Feu `);
//             }

//         } else {  /// ATTAQUE AUTOMATIQUE
//             let randomizeAttack = randomize(0, tabAttack.length - 1)
//             let resDeux = tabAttack[randomizeAttack]
//             if (resDeux.precision === 1) {
//                 console.log(`${fighters[i].nom} lance ${resDeux.attaque} mais cela échoue !`);
//             } else if (resDeux.attaque === 'Soin léger') {
//                 if (pvGuerrierDuFeu >= 50) {
//                     console.log(`${fighters[i].nom} lance ${resDeux.attaque} mais ses pv sont déjà au maximum !`);
//                 } else {
//                     pvGuerrierDuFeu += resDeux.puissance
//                     if (pvGuerrierDuFeu > maxPv) {
//                         pvGuerrierDuFeu = maxPv
//                     }
//                     console.log(`${fighters[i].nom} lance ${resDeux.attaque} ! Ses pv remontent à ${pvGuerrierDuFeu}`);
//                 }
//             } else {
//                 pvSombreLutin -= resDeux.puissance
//                 console.log(`${fighters[i].nom} inflige ${resDeux.puissance} avec ${resDeux.attaque}`);
//             }
//             console.log(`Il reste ${pvSombreLutin} pv au Sombre Lutin `);
//         } 
//         if (pvSombreLutin <= 0) {
//             console.log('Défaite...');
//             break
//         }
//     }
// }


///// v2

const fighters = [{/////JOUEURS
    nom: 'Sombre Lutin',
    pv: 50,
}, {
    nom: 'Guerrier du feu',
    pv: 50,
}];

const tabAttack = [{///ATTAQUES
    attaque: 'Frappe rapide',
    puissance: 10,
    type: ' de dégâts',
    precisionMin: 1,
    precisionMax: 2,
    precision: 0

}, {
    attaque: 'Soin léger',
    puissance: 15,
    type: ' de soin',
    precisionMin: 1,
    precisionMax: 3,
    precision: 0

}, {
    attaque: 'Coup Puissant',
    puissance: 20,
    type: ' de dégâts',
    precisionMin: 1,
    precisionMax: 3,
    precision: 0

}, {
    attaque: 'Frappe dévastatrice',
    puissance: 30,
    type: ' de dégâts',
    precisionMin: 1,
    precisionMax: 4,
    precision: 0
}];

const maxPv = 50
const minPv = 0

function randomize(min, max) {//// randomize
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function fight(attacker, defenser, attackIndex) { /// tour d'attaque
    let hit = tabAttack[attackIndex]
    hit.precision = randomize(hit.precisionMin, hit.precisionMax)

    if (hit.precision === 1) { /// vérifie si touche
        console.log(`${attacker.nom} lance ${hit.attaque} mais cela échoue`);
    } else if (hit.attaque === 'Soin léger') {/// heal
        console.log(`${attacker.nom} lance ${hit.attaque} et se soigne de ${hit.puissance} pv`);

        if (attacker.pv >= maxPv) { /// vérif pv max
            attacker.pv = maxPv
            console.log(`Ses points de vie sont déjà à ${attacker.pv}`);

        } else { // ramène pv
            attacker.pv += hit.puissance
            console.log(`${attacker.nom} ramène ses pv à ${attacker.pv}`);
        }

    } else { //// dégats
        console.log(`${attacker.nom} lance ${hit.attaque} et inflige ${hit.puissance} de dégats`);
        defenser.pv -= hit.puissance
    }
}

while (fighters[0].pv >= 1 && fighters[1].pv >= 1) { //// fight
    for (let i = 0; i < fighters.length; i++) {
        if (i == 0) {//// tour joueur
            console.log(`${fighters[i].nom} à toi de jouer !`);   ///joueur 1
            for (let j = 0; j < tabAttack.length; j++) {   //// listing attaques
                console.log(`${j + 1} : ${tabAttack[j].attaque}, ${tabAttack[j].puissance}${tabAttack[j].type}`)
            }
            let choice = Number(prompt());
            while (choice < 1 || choice > 4) { //// sécurité du prompt
                console.log('Recommence en choisissant entre 1 et 4');
                choice = Number(prompt());
            }

            fight(fighters[0], fighters[1], choice - 1);  /// jouer la fonction fight

            if (fighters[1].pv <= 0) { // condi victoire
                console.log('Victoire !');
                break;
            }

            console.log(`Il reste ${fighters[1].pv} pv au Guerrier du Feu `);


        } else {   /// tour robot / attaque automatique
            let randomizeAttack = randomize(0, tabAttack.length - 1); /// choix d'une attaque
            fight(fighters[i], fighters[0], randomizeAttack);
            if (fighters[0].pv <= minPv) {
                fighters[0].pv = minPv
            }
            console.log(`Il reste ${fighters[0].pv} pv au Sombre Lutin `);
            if (fighters[0].pv <= minPv) {
                console.log('Défaite...'); break;
            }
        }
    }
}