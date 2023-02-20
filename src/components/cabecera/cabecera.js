import "./cabecera.css"
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Cabecera() {
    const [isLogged, setIsLogged] = useState(false)
    const [userID, setUserID] = useState("");
    const [name, setname] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserID(user.uid);
        setname(user.email);
        setUserPhoto(user.photoURL);
        setIsLogged(true)
        // ...
      } else {
        // User is signed out
        // ...
        setIsLogged(false)
        setUserID('')
        setname('')
        setUserPhoto('')
      }
    })
    }, []);

    const logOut = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
        setIsLogged(false);
              setUserID("");
            setname("");
            setUserPhoto("");
            navigate("/");
        }).catch((error) => {
        // An error happened.
        });
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link to="/"><img src={require("../../images/poke.png")} alt="pokemon" /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav d separar">
          {isLogged ? <li className="nav-link" tabindex="-1">Welcome {name}</li> : ''}
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
          <Link className="nav-link" to="/lista">List</Link>
          {isLogged ? <Link className="nav-link" to="/juego">Game</Link> : ''}
          {isLogged ? <li onClick={logOut} className="nav-link" tabindex="-1">Log Out</li> : <Link className="nav-link" to="/registro" tabindex="-1" href="/registro">Log In</Link>}
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Cabecera;