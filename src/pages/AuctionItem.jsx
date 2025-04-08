import Spinner from '@/custom component/Spinner';
import { getAuctionDetail } from '@/store/slices/auctionSlice';
import { placeBid } from '@/store/slices/bidSlice';
import React, { useEffect, useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { RiAuctionFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuctionItem = () => {
    const { id } = useParams();
    const { loading, auctionDetail, auctionBidders } = useSelector(state => state.auction);
    console.log("Auction Bidders:", auctionBidders);
    const { isAuthenticated } = useSelector(state => state.user);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('');

    const handleBid = () => {
        const formData=new FormData();
        formData.append("amount",amount);
        dispatch(placeBid(id,formData));
        dispatch(getAuctionDetail(id));
    };
    

    useEffect(() => {
        if (!isAuthenticated) {
            
            navigateTo("/");
        }
        if (id) {
            dispatch(getAuctionDetail(id));
        }
    }, [isAuthenticated, navigateTo, id]); // Added `id` dependency

    return (
        <>
            <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
                {/* Breadcrumb Navigation */}
                <div className="text-[16px] flex flex-wrap items-center gap-2">
                    <Link to="/" className='font-semibold transition-all duration-300 hover:text-[#D64828]'>Home</Link>
                    <FaGreaterThan className='text-stone-400' />
                    <Link to="/auctions" className='font-semibold transition-all duration-300 hover:text-[#D64828]'>Auctions</Link>
                    <FaGreaterThan className='text-stone-400' />
                    <p className='text-stone-600'>{auctionDetail?.title || "Auction Details"}</p>
                </div>

                {/* Auction Content */}
                {loading ? (
                    <Spinner />
                ) : (
                    <div className='flex gap-4 flex-col lg:flex-row'>
                        <div className='flex-1 flex flex-col gap-3'>
                            <div className='flex gap-4 flex-col lg:flex-row'>
                                <div className='bg-white w-[100%] lg:w-40 flex justify-center items-center p-5'>
                                    <img src={auctionDetail?.image?.url} alt={auctionDetail?.title || "Auction Image"} />
                                </div>
                                <div className='flex flex-col justify-around pb-4'>
                                    <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                                        {auctionDetail?.title || "Auction Title"}
                                    </h3>
                                    <p className='text-xl font-semibold'>
                                        Minimum Bid: <span className="text-[#D64826]">Rs. {auctionDetail?.startingBid || "N/A"}</span>
                                    </p>
                                    <p className='text-xl font-semibold'>
                                        Condition: <span className="text-[#D64826]">{auctionDetail?.condition || "N/A"}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Auction Description */}
                            <p className='text-xl w-fit font-bold'>Auction Item Description</p>
                            <hr className='my-2 border-t-[1px] border-t-stone-700' />
                            <ul>
                                {auctionDetail?.description
                                    ? auctionDetail.description.split(". ").map((element, index) => (
                                        <li key={index} className='text-[18] my-2'>{element}</li>
                                    ))
                                    : <li className="text-gray-500">No description available.</li>
                                }
                            </ul>
                        </div>

                        {/* Bidders Section */}
                        <div className='flex-1'>
                            <header className='bg-stone-200 py-4 text-[24px] font-semibold px-4'>BIDS</header>
                            <div className='bg-white px-4 min-h-fit lg:min-h-[650px]'>
                                {auctionBidders && auctionBidders.length > 0 &&
                                    new Date(auctionDetail?.startTime) < Date.now() &&
                                    new Date(auctionDetail?.endTime) > Date.now() ? (
                                    auctionBidders.map((element, index) => (
                                        <div key={index} className='py-2 flex items-center justify-between'>
                                            <div className='flex items-center gap-4'>
                                                <img src={element?.profileImage || "/defaultProfile.png"} alt={element?.userName || "Bidder"} className='w-12 h-12 rounded-full object-cover my-2 md:block' />
                                                <p className='text-[18px] font-semibold'>{element?.userName || "Anonymous"}</p>
                                            </div>
                                            {
                                                index === 0 ? (
                                                    <p className='text-[20px] font-semibold text-green-600'>1st with {auctionDetail?.currentBid} rs</p>
                                                ) : index === 1 ? (
                                                    <p className='text-[20px] font-semibold text-blue-600'>2nd</p>
                                                ) : index === 2 ? (
                                                    <p className='text-[20px] font-semibold text-yellow-600'>3rd</p>
                                                ) : (
                                                    <p className='text-[20px] font-semibold text-gray-600'>{index + 1}th</p>
                                                )
                                            }
                                        </div>
                                    ))
                                ) : Date.now() < new Date(auctionDetail?.startTime) ? (
                                    <img src="/notStarted.png" alt="not-started" className='w-full max-h-[650px]' />
                                ) : (
                                    <img src="/auctionEnded.png" alt="ended" className='w-full max-h-[650px]' />
                                )}
                            </div>

                            {/* Place Bid Section */}
                            <div className='bg-[#D6482B] py-4 text-[16px] md:text-[24px] font-semibold px-4 flex items-center justify-between'>
                                {Date.now() >= new Date(auctionDetail?.startTime) && Date.now() <= new Date(auctionDetail?.endTime) ? (
                                    <>
                                        <div className='flex gap-3 flex-col sm:flex-row sm:items-center'>
                                            <p className='text-white'>Place Bid</p>
                                            <input type="number" className='w-32 focus:outline-none md:text-[20px] p-1' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                        </div>
                                        <button className='p-4 text-white bg-black rounded-full transition-all duration-300 hover:bg-[#222]' onClick={handleBid}>
                                            <RiAuctionFill />
                                        </button>
                                    </>
                                ) : (
                                    <p className='text-white font-semibold text-xl'>
                                        {new Date(auctionDetail?.startTime) > Date.now() ? "Auction Not Started Yet." : "Auction Ended."}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default AuctionItem;
