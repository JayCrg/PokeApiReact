import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useEffect, useState } from "react";


function PruebaFirebase() {

    const [puntos, setPuntos] = useState([]);

    const leerDatos = async () => {
        await getDocs(collection(db, "puntos")).then((querySnapshot) => {
            const listado = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
            
            ///filtros y demas opraciones

            setPuntos(listado);
        });
    }
    useEffect(() => {
        leerDatos();
    }, []);

    const escribirDatos = async () => {

        try {
            const docRef = await addDoc(collection(db, "puntos"), {
                todo:todo,
                titulo:'titulo',
            });
            console.log("Document written with ID: ", docRef.id);
            leerDatos();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <div>
            <h1>Prueba Firebase</h1>
            <ul>
                {puntos.map((punto) => (
                    <li key={punto.id}>{punto.nombre}</li>
                ))}
            </ul>
        </div>
    )
}