import VideoPlayer from '@/components/video-player';
import { getVideoById } from '@/lib/actions/video';
import { notFound } from 'next/navigation';
import React from 'react'

const Page =async ({ params } : Params) => {
  const { videoId } = await params;

  const { user , video } = await getVideoById(videoId);

  if(!video) notFound();

  return (
    <main className="wrapper page">
        <VideoPlayer videoId={video.id} />
    </main>
  )
}

export default Page