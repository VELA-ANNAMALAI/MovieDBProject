import React from 'react';
import { Button } from "@/components/shadcn/shadcn/button.jsx";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { SignInButton,  UserButton } from "@clerk/clerk-react";


const LoginPage = () => {
    const { user } = useClerk();
    const navigate = useNavigate(); // Assuming you're using React Router v6

    const handleSignIn = async () => {
        try {

            navigate('/');
   
    }

    catch (error) {
            console.error('Sign in error:', error);
                   }
    };

  

    return (
        <div  className="px-52">
            {!user? (

                <SignInButton>
               
               
                <button onClick={handleSignIn} data-label="Register" 
        className="  bg-transparent text-[#ff7576] font-bold text-lg rounded-md shadow-md hover:shadow-lg active:scale-95 transition duration-300 top-0 right-0  py-2 px-6 absolute mt-2 mr-5 ">
  <span className="bg-gradient-to-r from-[#866ee7] to-[#2cca91] bg-clip-text text-transparent">
    Log In
  </span>
</button>
                </SignInButton>
            ) : (
                <div className=" flex items-center  space-x-2 absolute top-0 right-5 m-4 mt-5 ml ">
              <UserButton className="w-14 h-20  rounded-full  "/>
              <span className="text-base  font-medium text-white ">{user.firstName}</span>
              </div>
              

            )}
        </div>
    );
};

export default LoginPage;
