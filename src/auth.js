// import {auth} from './firebaseConfig';
// import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// function signUp(){

//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const onSubtmit = (e) => {
    //     e.preventDefault();}

    //     setLoading(true);
    //     setError(null);
    //     await createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
    //             setLoading(false);
    //             navigate('/lista'); // a donde toque
    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // ..
    //         });
//         }
//     return (
//         <div>
//         </div>
//     )
// }
