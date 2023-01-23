import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef=useRef();
  const authCtx=useContext(AuthContext);

  const history=useHistory();

  const submitHandler=(e)=>{
    e.preventDefault();

    const enteredPassword=newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAjAh1g9MQvnFuvQV79fBtLhQ3lc4buXxw',{
      method:'POST',
      body:JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      if(res.ok){
        history.replace('/')
        console.log('successfull');
      }else{
        console.log('failled');
      }
    })

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
