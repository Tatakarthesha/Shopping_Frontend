import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth, provider } from '../firebase';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Set the username in Firebase user profile
      await updateProfile(userCredential.user, {
        displayName: username.trim(),
      });

      alert('✅ Sign up successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('✅ Signed up with Google!');
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };
const adminlogin = ()=>{
  navigate('/admin')
}




  return (
    <form onSubmit={signup} className="auth-form">
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

    <input
  type="password"
  placeholder="Password"
  required
  value={password}
  onChange={e => setPassword(e.target.value)}
  pattern=".{6,}"
  title="Password must be at least 6 characters long"
/>

      <button type="submit">Sign Up</button>

      <button type="button" onClick={signupWithGoogle}>
        Sign Up with Google
      </button>
<button type="button" onClick={adminlogin}>
        admin login
      </button>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
};

export default Signup;
