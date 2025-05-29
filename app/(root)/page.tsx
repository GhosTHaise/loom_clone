import EmptyState from '@/components/empty-state'
import Header from '@/components/header'
import VideoCard from '@/components/video-card'
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
              {
                videos.map(({videos, user}) => (
                  <VideoCard 
                    key={videos.id}
                    {...videos}
                    thumbnail={videos.thumbnailUrl}
                    userImg={user?.image || ""}
                    username={user?.name || "Guest"}
                  />
                ))
              }
            </section>
          ) : (
            <EmptyState
              icon="/assets/icons/video.svg"
              title="No Videos Found"
              description="Try adjusting your search"
            />
          )
        }
    </main>
  )
}

export default Page