import Header from '@/components/header';
import React from 'react'

const Page = async ({ params }: ParamsWithSearch) => {
    const { id } = await params;
    return (
        <div className='wrapper page'>
            <Header subHeader='fitiavana@gmail.com' title='Profile' userImg='/assets/images/dummy.jpg' />
            <h1 className="text-2xl font-karla"></h1>
        </div>
    )
}

export default Page