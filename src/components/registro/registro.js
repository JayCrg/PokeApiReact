import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./registro.css";



function Registro() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [errorSign, setErrorSign] = useState(null);
    const [exito, setExito] = useState(null);
    const [exitoSign, setExitoSign] = useState(null);

    function procesarDatos (e) {
        e.preventDefault();
        if (!email.trim()) {
            setError('Write your email');
            return;
        }
        if (!new RegExp("[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2,3})?").test(email)) {
            setError('Email must have a valid format: u5er.@domain.com(.co)');
            return;
        }
        if (!password.trim()) {
            setError('Write a password');
            return;
        }
        if (!confirmPassword.trim()) {
            setError('Write password confirmation');
            return;
        }
        if (!new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})').test(password)) {
            setError('The password must have at least 6 characters, an uppercase, a lowercase, a number and a special character (! @ # $% ^ & *)');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError(null);
        registrar();        
    }

    const registrar = React.useCallback(async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);
            setExito('Usuario registrado correctamente');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError(null);

        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-email') {
                setError('Not valid email');
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email already in use');
            }
        }
    }, [email, password, confirmPassword]);

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setExitoSign('Session started correctly');
                // ...
                
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                
                // ...
            });
    }

    function signInWithGithub() {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setExitoSign('Session started correctly');
                // ...
                
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });
    }

    function procesarDatosSingUp(e){
        e.preventDefault();
        if (!email.trim()) {
            setErrorSign('Write your email');
            return;
        }
        if (!new RegExp("[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2,3})?").test(email)) {
            setErrorSign('Email must have a valid format: u5er.@domain.com(.co)');
            return;
        }
        if (!password.trim()) {
            setErrorSign('Write a password');
            return;
        }
        if (!new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})').test(password)) {
            setErrorSign('The password must have at least 6 characters, an uppercase, a lowercase, a number and a special character (! @ # $% ^ & *)');
            return;
        }
        setErrorSign(null);
        IniciarSesion()        
    }
    const IniciarSesion = React.useCallback(async () => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log(res.user);
            setExitoSign('Usuario registrado correctamente');
            setEmail('');
            setPassword('');
            setError(null);
            setExitoSign('Session started correctly');
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-email') {
                setErrorSign('Not valid email');
            }
            if (error.code === 'auth/wrong-password') {
                setErrorSign('Incorrect password');
            }
            if (error.code === 'auth/user-not-found') {
                setErrorSign('User not found');
            }
        }
    }, [email, password]);



    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="mt-5">
                    <h3 className="text-center">Sign Up</h3>
                    <hr />
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                            {
                                errorSign && (
                                    <div className="alert alert-danger">
                                        {errorSign}
                                    </div>
                                )
                            }
                            {
                                exitoSign && (
                                    <div className="alert alert-success">
                                        {exitoSign}
                                    </div>
                                )
                            }
                            <form onSubmit={procesarDatosSingUp}>
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    placeholder="Write down your email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input
                                    type="password"
                                    className="form-control mb-2"
                                    placeholder="Write down password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                                <div className='d-flex justify-content-start align-content-center w-100 '>
                                    <button className="btn btn-dark btn-lg btn-block" type="submit">Sign Up</button>
                                    <span onClick={signInWithGoogle} className="ms-3 mt-2"><i className='fa-brands fa-google fa-2x altSign'></i></span>
                                    <span onClick={signInWithGithub} className="ms-3 mt-2"><i className='fa-brands fa-github fa-2x altSign'></i></span>
                                </div>
                            </form>
                        </div>
                            <img src={require("../../images/torkinator.webp")} alt="torkinator" className="img-fluid col-12 col-sm-8 col-md-6 col-xl-4" />
                    </div>
                </div>
                <div className="mt-5">
                    <h3 className="text-center">Create a new account</h3>
                    <hr />
                    <div className="row justify-content-center">
                            <img src={require("../../images/volcarona.webp")} alt="torkinator" className="img-fluid col-12 col-sm-8 col-md-6 col-xl-4" />
                        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                            {
                                error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )
                            }
                            {
                                exito && (
                                    <div className="alert alert-success">
                                        {exito}
                                    </div>
                                )
                            }
                            <form onSubmit={procesarDatos}>
                            <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Name"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    placeholder="Write down your email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input
                                    type="password"
                                    className="form-control mb-2"
                                    placeholder="Write down password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                                <input
                                    type="password"
                                    className="form-control mb-2"
                                    placeholder="Repeat password"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                />
                                    <button className="btn btn-dark btn-lg btn-block" type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registro;