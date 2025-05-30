import VideoDetailHeader from '@/components/video-detail-header';
import VideoPlayer from '@/components/video-player';
import { getVideoById } from '@/lib/actions/video';
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params }: Params) => {
  const { videoId } = await params;

  const { user, videos } = await getVideoById(videoId);

  if (!videos) notFound();

  return (
    <main className="wrapper page">
      <VideoDetailHeader
        {...videos}
        userImg={user?.image}
        username={user?.name || "Guest"}
        ownerId={videos.userId}
      />
      <section className="video-details">
        <div className="content">
          <VideoPlayer videoId={videos.videoId} />
        </div>
      </section>
    </main>
  )
}

export default Page