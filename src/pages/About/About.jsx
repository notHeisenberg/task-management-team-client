
import Container from '@/components/shared/Container'
import React from 'react'
import img01 from "../../assets/about/gallary.png"
import img02 from "../../assets/about/voice.png"
import img03 from "../../assets/about/mike.png"
import photo01 from "../../assets/about/photo01.jpg"
import photo02 from "../../assets/about/photo02.jpg"
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <>
            <section className='text-white pt-common-padding-top'>
                <div className="relative ">
                    <div className="absolute inset-0 bg-black opacity-75"></div>
                    <img className="w-full lg:h-[450px] object-cover" src={photo01} alt="" />
                <div className='absolute flex gap-2 text-white text-4xl font-semibold top-1/2 lg:bottom-[230px] right-10'>
                    <p className='hover:text-pink-400'><Link to={'/'}>Home</Link></p> /
                    <p>About Us</p>
                </div>
                </div>
                <Container>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-16 py-20'>
                        <div className='w-full lg:w-[50%]'>
                            <img className='w-full lg:h-[300px] object-cover rounded-xl' src={photo02} alt="" />
                        </div>
                        <div className='w-full lg:w-[50%] p-4 rounded-md  space-y-6'>
                            <p>By organizing tasks, you can identify which ones are most important and which can be delegated or postponed, leading to better time management and increased outpu</p>
                            <p>With a clear list of what needs to be done and by when, it’s easier to focus on the task at hand without feeling overwhelmed by a long.</p>
                            <p>Completing tasks gives a sense of accomplishment. When tasks are broken down into smaller.</p>
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
                                <h3 className='text-3xl'>Monitoring the progress of tasks</h3>
                                <p className='opacity-60 '>Check out some of our favourite articles over the years!</p>
                            </div>
                        </div>
                        <div className='text-xl font-bold border border-yellow-600 rounded-md p-4'>
                            <div className='bg-gray-800 rounded-md'>
                                <img src={img02} alt="" />
                            </div>
                            <div className='space-y-2 my-4'>
                                <p className='text-lg text-pink-400'>Voice</p>
                                <h3 className='text-3xl'>Encouraging communication</h3>
                                <p className='opacity-60 '>Check out some of our favourite articles over the years!</p>
                            </div>
                        </div>
                        <div className='text-xl font-bold border border-gray-600 rounded-md p-4'>
                            <div className='bg-gray-800 rounded-md'>
                                <img src={img03} alt="" />
                            </div>

                            <div className='space-y-2 my-4'>
                                <p className='text-lg text-pink-400'>Read</p>
                                <h3 className='text-3xl'>Ensuring tasks are fully</h3>
                                <p className='opacity-60 '>Check out some of our favourite articles over the years!</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default About