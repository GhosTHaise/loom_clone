import EmptyState from '@/components/empty-state';
import Header from '@/components/header';
import VideoCard from '@/components/video-card';
import { dummyCards } from '@/constants';
import { getAllVideosByUser } from '@/lib/actions/video';
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params, searchParams }: ParamsWithSearch) => {
    const { id } = await params;
    const { query, filter } = await searchParams;

    const { user, videos } = await getAllVideosByUser(id, query, filter);

    if (!user) notFound();

    return (
        <div className='wrapper page'>
            <Header subHeader={user?.email} title={user?.name} userImg={user?.image ?? ""} />
                {
                    videos?.length > 0 ?
                        (
                            <section className="video-grid">
                                {
                                    videos.map(({ videos, user }) => (
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
                                title="No Videos Available Yet"
                                description="Video will show up once you uploaded them"
                            />
                        )
                }
        </div>
    )
}

export default Page