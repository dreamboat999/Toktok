import React, {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import {Video} from '../../types'

interface IProps {
  postDetails: Video,
}

const Detail = ({postDetails}: IProps) => {
  const [post,setPost] = useState(postDetails);
  const [playing,setPlaying] = useState(false);
  const [isVideoMuted,setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoClick = () => {
    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  }


  if(!post) return null;

  return (
    <div className="flex w-full absolute top-0 left-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className="text-white text-[35px]"/>
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
             src={post.video.asset.url}
             ref={videoRef}
             loop
             onClick={onVideoClick}
             className="h-full cursor-pointer"
             >
            </video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
          {!playing && (
            <button onClick={onVideoClick}>
              <BsFillPlayFill className="text-white text-6xl lg:text-8xl"/>
            </button>
          )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-white text-2xl lg:text-4xl"/>
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
              </button>
            )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params: {id}} : {params: {id: string}}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {postDetails: data}
  }
}

export default Detail