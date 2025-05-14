import Header from '@/components/header'
import VideoCard from '@/components/video-card'
import React from 'react'

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title='All Videos' subHeader='Public Library' />
      <h1 className="text-2xl font-karla">Welcome to Loom Clone</h1>

      <VideoCard
        id="id"
        title="SnapCast Message - 30 juin 2023"
        thumbnail="/assets/samples/thumbnail (1).png"
        createdAt={new Date("2025-05-01 06:25:54.437")}
        userImg="/assets/images/jason.png"
        username="Jason"
        views={10}
        visibility="public"
        duration={156}
      />
    </main>
  )
}

export default Page