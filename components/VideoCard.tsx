import React,{ useState,useEffect,useRef } from 'react'
import { NextPage } from 'next';
import { Video } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {

  const [ isHover, setIsHover ] = useState(false);
  const [ playing, setPlaying ] = useState(false)
  const [ isVideoMuted, setIsVideoMuted ] = useState(false)
  

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image 
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-base font-bold text-primary">{post.postedBy.userName} {`
                  `}
                <GoVerified className="text-blue-400 text-base"/>
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div> 
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="rounded-3xl">
          <Link href="/">
            <video
            loop
            className="lg:w[600px] h-[300px] w-[200px] md:h-[400px] lg:h-[530px] rounded-2xl cursor-pointer bg-gray-100"
            src={post.video.asset.url}
            >

            </video>
          </Link>
          {isHover && (
            <div>
              {playing ? (
              <button>
                <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
              </button>
              ) : (
                <button>
                 <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
              <button>
                <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
              </button>
              ) : (
                <button>
                 <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard