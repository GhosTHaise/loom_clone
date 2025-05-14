import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VideoCard = ({
    id,
    title,
    thumbnail,
    createdAt,
    userImg,
    username,
    views,
    visibility,
    duration
}: VideoCardProps) => {
    return (
        <Link
            href={`/videos/${id}`}
            className="video-card">
            <Image src={thumbnail} alt='thumbnail' width={290} height={160} className='thumbnail' />
            <article>
                <div>
                    <figure>
                        <Image src={userImg} alt='avatar' width={34} height={34} className='rounded-full aspect-square' />
                        <figcaption>
                            <h3>{username}</h3>
                            <p>{visibility}</p>
                        </figcaption>
                    </figure>
                    <aside>
                        <Image src="/assets/icons/eye.svg" alt='views' width={16} height={16} />
                        <span>
                            {views}
                        </span>
                    </aside>
                </div>
                <h2>{title} - {createdAt.toLocaleDateString("en-US", {year : "numeric", month : "short", day : "numeric"})}</h2>
            </article>
        </Link>
    )
}

export default VideoCard