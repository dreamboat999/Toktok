import React from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router';

import {topics} from '../utils/constants';

const Discover = () => {
  const router = useRouter();
  const {topic} = router.query;

  const activeTopicStyle = "xl:border-2 hover:bg-[#464751] xl:border-[#25b9c1] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#25b9c1]"

  const topicStyle = "xl:border-2 hover:bg-[#464751] bg-[#2D2E36] xl:border-[#777784] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-gray-300"

  return (
    <div className="xl:border-b-2 xl:border-[#2D2E36] pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Popular Topics</p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle :topicStyle}>
              <span className="font-bold text-2xl xl:text-base">
                {item.icon}
              </span>
              <span className="font-medium text-base hidden xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover