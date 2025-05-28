import VideoPlayer from '@/components/video-player';
import { getVideoById } from '@/lib/actions/video';
import { notFound } from 'next/navigation';
import React from 'react'

const Page =async ({ params } : Params) => {
  const { videoId } = await params;

  const { user , videos } = await getVideoById(videoId);

  if(!videos) notFound();

  return (
    <main className="wrapper page">
        <VideoPlayer videoId={videos.id} />
    </main>
  )
}

export default Page