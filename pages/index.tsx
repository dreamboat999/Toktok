import axios from 'axios';
import { VideoCard, NoResults } from '../components';
import { Video } from '../types';

interface IProps {
  videos: Video[],
}

const Home = ({videos}: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) =>(
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No videos'} />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const {data} = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data
    }
  }
}

export default Home
