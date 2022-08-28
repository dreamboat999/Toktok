import React, {useState} from 'react';
import {NextPage} from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im';


import {SuggestedAccounts, Footer, Discover} from './index'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink = 'flex items-center gap-3 hover:bg-[#2D2E36] p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#25b9c1] rounded-xl'

  return (
    <div>
      <div
      className="block xl:hidden m-2 ml-4 mt-3 text-xl"
      onClick={() => setShowSidebar((prevState) => !prevState )}
      >
        {showSidebar ? <ImCancelCircle className="text-gray-400" /> : <AiOutlineMenu className="text-gray-400" />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-600 xl:border-0 p-3">
          <div className="xl:border-b-2 border-[#2D2E36] xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />                
                </p>
                <span className="text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>
        <Discover />
        <SuggestedAccounts />
        <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar