import Container from "@/components/shared/Container";
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from "../Home/HomeComponents/Navbar/NavBar";


const Contact = () => {
    const [message, setMessage] = useState('');
    const form = useRef();
    const serviceId = '';
    const templateId = '';
    const publicKey = '';

    const handleFormSubmit = (event) => {
        event.preventDefault();
        emailjs
            .sendForm(serviceId, templateId, form.current, {
                publicKey: publicKey,
            })
            .then(
                () => {
                    event.target.reset();
                    setMessage(<div className="text-sm text-[#00844e]">Message Send Successfully !</div>);
                },
                // eslint-disable-next-line no-unused-vars
                (error) => {
                    setMessage(<div className="text-sm text-red-500">Message Not Send ! </div>);
                },
            );
    }

    return (
        <div className="bg-primary">
            <NavBar />
            <Container>
                <div className="pt-20">
                    <div className='max-w-[1440px] mx-auto pb-10 mt-10'>
                        <div className='w-full'>
                            <h2 className='text-3xl font-bold text-gray-100 text-center pb-8 underline underline-offset-8 '>Contact Us</h2>
                            <div className='w-full py-5'>
                                <form ref={form} onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                                    {message && message}
                                    <div className='flex flex-col lg:flex-row gap-5'>
                                        <input name='name' className='w-full p-2 bg-[#161616] outline-none border-b-2 border-[#1d1d1d] focus:border-purple-600 placeholder:text-[#929292] text-gray-300' type="text" placeholder="Name" required />
                                        <input name='email' className='w-full p-2 bg-[#161616] outline-none border-b-2 border-[#1d1d1d] focus:border-purple-600 placeholder:text-[#929292] text-gray-300' type="email" placeholder="Email" required />
                                    </div>
                                    <div className='flex-1'>
                                        <input name='subject' className='w-full p-2 bg-[#161616] outline-none border-b-2 border-[#1d1d1d] focus:border-purple-600 placeholder:text-[#929292] text-gray-300' type="text" placeholder="Subject" required />
                                    </div>
                                    <div className='flex-1'>
                                        <textarea name='message' className='w-full p-2 bg-[#161616] outline-none border-b-2 border-[#1d1d1d] focus:border-purple-600 placeholder:text-[#929292] text-gray-300' placeholder='Message' rows="10" required></textarea>
                                    </div>
                                    <div>
                                        <input className='elementor-button bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-md shadow-lg hover:from-purple-500 hover:to-blue-500 transition duration-300' type="submit" value="Send Message" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Contact;