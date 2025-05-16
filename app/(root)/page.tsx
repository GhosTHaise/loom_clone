import Header from '@/components/header'
import VideoCard from '@/components/video-card'
import { dummyCards } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title='All Videos' subHeader='Public Library' />

      <section className="video-grid">
        {
          dummyCards.map((card) => (
            <VideoCard key={card.id} {...card} />
          ))
        }
      </section>
    </main>
  )
}

export default Page