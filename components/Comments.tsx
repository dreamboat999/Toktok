import React, {Dispatch, SetStateAction} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {ref: string, _id: string};
}

const Comments = ({comment, setComment, addComment, comments, isPostingComment}: IProps) => {
  const {userProfile, allUsers} = useAuthStore();

  return (
    <div className="border-2 border-[#777784] pt-4  px-10 bg-[#464751] border-b-2 lg:mb-10 mb-[80px] rounded-xl">
      <div className="overflow-scroll lg:h-[457px]">
      {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className='p-2 items-center' key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-gray-900 hover:text-gray-300'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className='-mt-5 ml-16 text-gray-100 text-[16px] mr-8'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text='No comments yet!' />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 md:pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment"
              className="bg-[#464751] px-6 py-4 text-base font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-[#777784] focus:outline-none focus:border-2 focus:border-gray-300 rounded-lg"
            />
            <button 
             className="text-base text-gray-200"
             onClick={addComment}
            >
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments