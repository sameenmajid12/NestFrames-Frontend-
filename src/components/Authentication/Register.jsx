import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegisterCSS from '../../styles/register.module.css'; 
import '../../styles/general.css'
function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "body-signIn";
    return () => {
      document.body.className = '';
    };
  }, []);

  const [userInfo, setUserInfo] = useState({
    fullname: "",
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3002/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    });

    if (response.status === 201) {
      setUserInfo({
        fullname: "",
        username: "",
        email: "",
        password: ""
      });
      navigate('/Sign-in');
    } else {
      console.log(`Error code:${response.status}, User Already exists?`);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = `Error code:${response.status}, User Already exists?`;
      document.querySelector(`.${RegisterCSS.errorDisplayRegister}`).append(errorMessage);
      
      setTimeout(() => {
        document.querySelector(`.${RegisterCSS.errorDisplayRegister}`).innerHTML = '';
      }, 5000);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={RegisterCSS.registerPage}>
      <div className={RegisterCSS.registerContainer}>
        <img className={RegisterCSS.whiteLogo} src='/assets/White Logo.png' alt="Logo" />
        <div className={RegisterCSS.registerHeader}>
          <h1>Sign up now</h1>
          <h2>Create a free account today</h2>
        </div>
        
        <div className={RegisterCSS.registerBodyContainer}>
          {["fullname", "username", "email", "password"].map((field, index) => (
            <div className={RegisterCSS.inputContainer} key={index}>
              <p className={RegisterCSS.inputDescription}>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
              <input 
                value={userInfo[field]} 
                name={field} 
                onChange={handleChange} 
                className={RegisterCSS.input} 
                type={field === "password" ? "password" : "text"}
              />
            </div>
          ))}
          <div className={RegisterCSS.passwordErrorContainer}>
            <div className={RegisterCSS.errorDisplayRegister}></div>
          </div>
          
          <div className={RegisterCSS.create}>
            <span className={RegisterCSS.margin}>o</span>
            <button onClick={handleSubmit}>Create Account</button>
          </div>
          
          <div className={RegisterCSS.or}>
            <span>or</span>
          </div>
          
          <div className={RegisterCSS.signupGoogle}>
            <button>
              <div className={RegisterCSS.googleLogoContainer}>
                <img className={RegisterCSS.googleLogo} src="/assets/googleLogo.png" alt="Google Logo" />
              </div>
              Sign up with Google
            </button>
          </div>
          
          <p className={RegisterCSS.existingUser}>
            Already have an Account? 
            <Link to="/Sign-in">
              <span> Login</span>
            </Link>
          </p>  
        </div>
      </div>
    </div>
  );
}

export default Register;