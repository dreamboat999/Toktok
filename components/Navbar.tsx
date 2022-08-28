import React,{useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import  { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/grafftok-logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: {preventDefault: () => void}) => {
    e.preventDefault();

    if(searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-[#2D2E36] py-2 px-4">
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
      <div className="relative hidden md:block">
        <form
        onSubmit={handleSearch}
        className="absolute md:static top-10 -left-20 bg-[#24252D]"
        >
          <input 
          type="text" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search accounts and videos"
          className="bg-[#1B1A21] p-3 md:text-base font-medium border-2 border-[#595963] focus:outline-none focus:border-2 focus:border-[#747483] w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
          onClick={handleSearch}
          className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-400 pl-4 text-2xl text-gray-300"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 border-[#595963] bg-[#1B1A21] px-2 md:px-4 text-base font-semibold flex items-center gap-2 rounded">
                <IoMdAdd className="text-xl text-gray-300"/> {` `}
                <span className="hidden text-gray-300 md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                <Image
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                src={userProfile.image}
                alt="profile photo"
                />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="#4F4F4F" fontSize={24} />
            </button>
              </div>
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