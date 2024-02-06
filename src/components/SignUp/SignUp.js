import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signUpWithEmail,googleSignIn} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState();
    const navigate = useNavigate();


    const handleRegister = data => {
        setSignUpError('')
        signUpWithEmail(data.email, data.password)
        .then(res => {
            if(res.user.uid){
                toast.success("Account Created Successfully");
                navigate('/');
            }
        })
        .catch(err => {
            console.log(err);
            const errorMessage = err.message;
            const errorCode = errorMessage.startsWith('Firebase: Error (auth/') ? errorMessage.slice(22, -2) : errorMessage;
            setSignUpError(errorCode);
        })
    };

    const handleGoogleLogin = () => {
        googleSignIn()
        .then(res => {
          if(res.user.uid){
            navigate('/')
          }
        })
        .catch(err => {
            const errorMessage = err.message;
            const errorCode = errorMessage.startsWith('Firebase: Error (auth/') ? errorMessage.slice(22, -2) : errorMessage;
            setSignUpError(errorCode);
        })
    };
    return (
        <div className=" flex justify-center items-center ">
      <div className="w-96 p-8">
        <h3 className="text-3xl text-center">Sign Up</h3>
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input {...register('name', {
                    required: "Name  is required"
                })}
                type="text" placeholder="Enter your Name" className="input input-bordered w-full max-w-xs" />
                {errors.name && <p className="text-red-600" role="alert">{errors.name.message}</p>}
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input {...register('email', {
                    required: "Email Address is required"
                })}
                type="email" placeholder="Enter your Email" className="input input-bordered w-full max-w-xs" />
                {errors.email && <p className="text-red-600" role="alert">{errors.email.message}</p>}
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input {...register('password', {
                    required: 'Password is required',
                    minLength: {value: 8, message: "Password must be 8 character or long"} ,
                })}
                type="password" placeholder="Enter your Password" className="input input-bordered w-full max-w-xs" />
                
                {errors.password && <p className="text-red-600" role="alert">{errors.password.message}</p>}
            </div>
            {
                signUpError && <p className='text-red-700'>Error: {signUpError}</p>
            }

            <input className='btn btn-accent w-full my-4 text-white' value="Sign Up" type="submit" />
        </form>
        <p>Already have an account? Please <Link to='/login' className="text-secondary">Login.</Link></p>
        <div className="divider">OR</div>
        <div>
            <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
        </div>
      </div>
    </div>
    );
};

export default SignUp;