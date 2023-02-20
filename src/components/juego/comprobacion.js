import React, { useState, useEffect } from 'react';
import correct from '../../images/correct.png';
import wrong from '../../images/wrong.png';
import down from '../../images/down.png';
import up from '../../images/up.png';

function Comprobacion(props) {

    const gen1 = 1
    const gen2 = 152
    const gen3 = 252
    const gen4 = 387
    const gen5 = 494
    const gen6 = 650
    const gen7 = 722
    const gen8 = 810
    const gen9 = 906

    useEffect(() => setGenPokeBueno(getGeneracion(props.pokemon)), []);
    useEffect(() => setGenPokeInvitado(getGeneracion(props.invitado)), []);
    useEffect(() => tipos(), []);


    const [genPoke, setGenPokeBueno] = useState(1);
    const [genPokeInv, setGenPokeInvitado] = useState(1);
    const [tipoPoke1, setTipoPoke] = useState('');
    const [tipoPoke2, setTipoPoke2] = useState('');
    const [victoria, setVictoria] = useState(false);
    
    const genImg = genPoke > genPokeInv ? up : genPoke < genPokeInv ? down : correct;
    const HeightImg = props.pokemon.height > props.invitado.height ? up : props.pokemon.height < props.invitado.height ? down : correct;
    const WeightImg = props.pokemon.weight > props.invitado.weight ? up : props.pokemon.weight < props.invitado.weight ? down : correct;
    
    const [arrayResultados, setArrayResultados] = useState([tipoPoke1, tipoPoke2, WeightImg, HeightImg, genImg]);
    function tipos(){
        if(props.pokemon.types.length == 2 && props.invitado.types.length == 2){
            if(props.pokemon.types[0].type.name === props.invitado.types[0].type.name)
            setTipoPoke(correct);
            else
            setTipoPoke(wrong);
            if(props.pokemon.types[1].type.name === props.invitado.types[1].type.name)
            setTipoPoke2(correct);
            else
            setTipoPoke2(wrong);
        }
        else if(props.pokemon.types.length == 1 && props.invitado.types.length == 1){
            if(props.pokemon.types[0].type.name === props.invitado.types[0].type.name){
                setTipoPoke(correct);
                setTipoPoke2(correct);
            }
            else{
                setTipoPoke(wrong);
                setTipoPoke2(wrong);
            }
        }
        else if(props.pokemon.types.length == 2 && props.invitado.types.length == 1){
            if(props.pokemon.types[0].type.name === props.invitado.types[0].type.name)
            setTipoPoke(correct);
            else
            setTipoPoke(wrong);
            if(props.pokemon.types[1].type.name === props.invitado.types[0].type.name)
            setTipoPoke2(correct);
            else
            setTipoPoke2(wrong);
        }
        else if(props.pokemon.types.length == 1 && props.invitado.types.length == 2){
            if(props.pokemon.types[0].type.name === props.invitado.types[0].type.name)
            setTipoPoke(correct);
            else
            setTipoPoke(wrong);
            if(props.pokemon.types[0].type.name === props.invitado.types[1].type.name)
            setTipoPoke2(correct);
            else
            setTipoPoke2(wrong);
        }
    }
    function getGeneracion(pokemon) {
        const genLimits = {
            1: { min: gen1, max: gen2 },
            2: { min: gen2, max: gen3 },
            3: { min: gen3, max: gen4 },
            4: { min: gen4, max: gen5 },
            5: { min: gen5, max: gen6 },
            6: { min: gen6, max: gen7 },
            7: { min: gen7, max: gen8 },
            8: { min: gen8, max: gen9 },
            9: { min: gen9 },
        };
        let generacion = null;
        
        for (let i = 1; i <= 9; i++) {
            const { min, max } = genLimits[i];
            
            if (pokemon.id >= min && (max === undefined || pokemon.id < max)) {
                generacion = i;
            }
        }
        return generacion;
    }
    
    return(
        <>
        <ul className="nav nav-pills nav-fill mt-3">
            <li className="nav-item col-2">
                <img src={genImg} />
            </li>
             <li className="nav-item col-1">
                <img src={tipoPoke1} />
            </li>
            <li className="nav-item col-1">
                <img src={tipoPoke2} />
            </li>
            <li className="nav-item col-1">
                <img src={HeightImg} />
            </li>
            <li className="nav-item col-1">
                <img src={WeightImg} />
            </li>
            <li className="nav-item col-1">
                    <h5 className='primeraMayus'>{props.invitado.name}</h5>
                </li>
         </ul> 

        </>
    )
}

export default Comprobacion