import Header from '@/components/header'
import VideoCard from '@/components/video-card'
import { dummyCards } from '@/constants'
import { getAllVideos } from '@/lib/actions/video'
import React from 'react'

const Page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = await searchParams;

  const { videos, pagination } = await getAllVideos(query, filter, Number(page) || 1)
  return (
    <main className="wrapper page">
      <Header title='All Videos' subHeader='Public Library' />

      {
        videos?.length > 0 ?
          (
            <section className="video-grid">
              {videos[0].video.title}
            </section>
          ) : (
            <div>EMPTY</div>
          )
        }
    </main>
  )
}

export default Page