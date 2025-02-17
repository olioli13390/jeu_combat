const prompt = require("prompt-sync")()

const fighters = [{
    nom: 'Sombre Lutin'
}, {
    nom: 'Guerrier du feu'
}]

const tabAttack = [{
    attaque: 'Frappe rapide',
    puissance: 10,

},
{
    attaque: 'Soin léger',
    puissance: 15,

},
{
    attaque: 'Coup Puissant',
    puissance: 20,

},
{
    attaque: 'Frappe dévastatrice',
    puissance: 30,

}]

const maxPv = 50

let pvSombreLutin = 50
let pvGuerrierDuFeu = 50

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

while (pvGuerrierDuFeu > 1 && pvSombreLutin > 1) {

    for (let i = 0; i < fighters.length; i++) {
        if (i === 0) {   // choix du joueur
            console.log("Choisis ton attaque : ")
            for (let j = 0; j < tabAttack.length; j++) {
                console.log(`${j + 1} : ${tabAttack[j].attaque}`);
            }
            let choice = Number(prompt())
            while (choice != 1 && choice != 2 && choice != 3 && choice != 4) {
                console.log('Recommence en choisissant entre 1 et 4')
                choice = Number(prompt());
            }
            if (choice > 0 && choice <= tabAttack.length) {
                let res = tabAttack[choice - 1]
                switch (res.attaque) {
                    case 'Frappe rapide':
                        res.precision = randomize(1, 2);
                        break;
                    case 'Soin léger':
                        res.precision = randomize(1, 3);
                        break;
                    case 'Coup Puissant':
                        res.precision = randomize(1, 3);
                        break;
                    case 'Frappe dévastatrice':
                        res.precision = randomize(1, 4);
                        break;
                }
                if (res.precision === 1) {
                    console.log(`${fighters[i].nom} tente ${res.attaque} mais cela échoue`);
                } else if (res.attaque === "Soin léger") {
                    if (pvSombreLutin >= 50) {
                        console.log(`${fighters[i].nom} lance ${res.attaque} mais ses points de vie son déjà au maximum !`);
                    } else {
                        pvSombreLutin += res.puissance
                        if (pvSombreLutin > maxPv) {
                            pvSombreLutin = maxPv
                        }
                        console.log(`${fighters[i].nom} lance ${res.attaque} et se soigne de ${res.puissance} pv`);
                        console.log(`Ses pv remontent à ${pvSombreLutin}`);
                    }
                } else {
                    pvGuerrierDuFeu -= res.puissance
                    console.log(`${fighters[i].nom} lance ${res.attaque} et inflige ${res.puissance} de dégâts`);
                }

                if (pvGuerrierDuFeu <= 0) {
                    console.log('Victoire !');
                    break
                }
                console.log(`Il reste ${pvGuerrierDuFeu} pv au Guerrier du Feu `);
            }

        } else { /// attaque automatique
            let randomizeAttack = randomize(0, tabAttack.length - 1)
            let resDeux = tabAttack[randomizeAttack]
            if (resDeux.precision === 1) {
                console.log(`${fighters[i].nom} lance ${resDeux.attaque} mais cela échoue !`);
            } else if (resDeux.attaque === 'Soin léger') {
                if (pvGuerrierDuFeu >= 50) {
                    console.log(`${fighters[i].nom} lance ${resDeux.attaque} mais ses pv sont déjà au maximum !`);
                } else {
                    pvGuerrierDuFeu += resDeux.puissance
                    if (pvGuerrierDuFeu > maxPv) {
                        pvGuerrierDuFeu = maxPv
                    }
                    console.log(`${fighters[i].nom} lance ${resDeux.attaque} ! Ses pv remontent à ${pvGuerrierDuFeu}`);
                }
            } else {
                pvSombreLutin -= resDeux.puissance
                console.log(`${fighters[i].nom} inflige ${resDeux.puissance} avec ${resDeux.attaque}`);
            }
            console.log(`Il reste ${pvSombreLutin} pv au Sombre Lutin `);
        } 
        if (pvSombreLutin <= 0) {
            console.log('Défaite...');
            break
        }
    }
}




/// Modifier la fin car même si les pv passent à 0, le guerrier attaque après
