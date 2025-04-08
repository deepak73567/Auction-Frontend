import Card from '@/custom component/card'
import Spinner from '@/custom component/Spinner'

import React from 'react'
import { useSelector } from 'react-redux'

const Auction = () => {
    const { allAuctions, loading } = useSelector(state => state.auction);
   

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <article className='w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col justify-center bg-[#f9f7f7]'>
                    <section className='my-8'>
                        <h1 className={`text-[#D8125B] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}>Auctions</h1>
                        <div className='flex flex-wrap gap-6'>
                            {allAuctions.map(element => (
                                <Card 
                                    key={element._id} 
                                    title={element.title} 
                                    startTime={element.startTime} 
                                    endTime={element.endTime} 
                                    imgSrc={element.image?.url} 
                                    startingBid={element.startingBid} 
                                    id={element._id} 
                                />
                            ))}
                        </div>
                    </section>
                </article>
            )}
        </>
    );
}

export default Auction;
