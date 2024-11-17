
import Container from '@/components/shared/Container'
import React from 'react'
import img01 from "../../assets/about/gallary.png"
import img02 from "../../assets/about/voice.png"
import img03 from "../../assets/about/mike.png"
import photo01 from "../../assets/about/photo01.jpg"
import photo02 from "../../assets/about/photo02.jpg"

const About = () => {
    return (
        <>
            <section className='text-white pt-common-padding-top'>
                <div className="relative ">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <img className="w-full lg:h-[450px] object-cover" src={photo01} alt="" />
                </div>
                <Container>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-16 py-20'>
                        <div className='w-full lg:w-[50%]'>
                            <img className='w-full lg:h-[300px] object-cover rounded-xl' src={photo02} alt="" />
                        </div>
                        <div className='w-full lg:w-[50%] p-4 rounded-md  space-y-6'>
                            <p>June 10th, 2021 marked the start of a new era for monday.com—we rang the opening bell and officially became a publicly traded company on Nasdaq.</p>
                            <p>These days, we continue to fuel our growth by evolving into a multi-product company, providing people, teams, and companies powerful products to help turn their work visions into a reality. We’re only just getting started.</p>
                            <p>These days, we continue to fuel our growth by evolving into a multi-product company, providing people, teams, and companies powerful products to help turn their work visions into a reality. We’re only just getting started.</p>
                        </div>
                    </div>

                    
                    <div className=''>
                        <h2 className='text-white text-center text-4xl pb-8'>Get to know us better</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-4 text-white '>
                        <div className='text-xl font-bold border border-gray-600 rounded-md p-4'>
                            <div className='bg-gray-800 rounded-md'>
                                <img src={img01} alt="" />
                            </div>
                            <div className='space-y-2 my-4'>
                                <p className='text-lg text-pink-400'>Explore</p>
                                <h3 className='text-3xl'>Monday.com in the news</h3>
                                <p className='text-lg text-gray-500'>Check out some of our favourite articles over the years!</p>
                            </div>
                        </div>
                        <div className='text-xl font-bold border border-yellow-600 rounded-md p-4'>
                            <div className='bg-gray-800 rounded-md'>
                                <img src={img02} alt="" />
                            </div>
                            <div className='space-y-2 my-4'>
                                <p className='text-lg text-pink-400'>Voice</p>
                                <h3 className='text-3xl'>Monday.com in the news</h3>
                                <p className='text-lg text-gray-500'>Check out some of our favourite articles over the years!</p>
                            </div>
                        </div>
                        <div className='text-xl font-bold border border-gray-600 rounded-md p-4'>
                            <div className='bg-gray-800 rounded-md'>
                                <img src={img03} alt="" />
                            </div>

                            <div className='space-y-2 my-4'>
                                <p className='text-lg text-pink-400'>Read</p>
                                <h3 className='text-3xl'>Monday.com in the news</h3>
                                <p className='text-lg text-gray-500'>Check out some of our favourite articles over the years!</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default About