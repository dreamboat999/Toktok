import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/grafftok-logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[130px] md:w-[160px]">
          <Image 
          className="cursor-pointer"
          src={Logo}
          alt="GraffTok"
          layout="responsive"
          />
        </div>
      </Link>
      <div>
        SEARCH
      </div>
      <div>
        {userProfile ? (
          <div>{userProfile.userName}</div>
        ) : (
          <GoogleLogin
           onSuccess={(response) => createOrGetUser(response, addUser)}
           onError={() => console.log('Error')}
           />
        )}
      </div>
    </div>
  )
}

export default Navbar