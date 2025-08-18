'use client';

import { ArrowDown, Rocket } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { submitToCareersGoogle } from '@/services/submit-to-careers';

const CareersPageClient = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        cv: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await submitToCareersGoogle(formData);
            e.currentTarget.reset();
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                cv: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='bg-gray-400 min-h-screen flex flex-col items-center justify-center bg-[url("/images/careers-back.jpeg")] bg-cover font-manrope relative md:p-10 p-5 pt-28'>
            <div className='bg-black/30 h-full absolute w-full z-1 top-0 left-0'></div>
            <div className='bg-black/40 container lg:w-[75%] xl:w-[60%] rounded-xl backdrop-blur-md py-10 md:px-14 px-8 text-white mb-5 relative z-10'>
                <div className='flex items-center justify- gap-5'>
                    <h1 className='text-h3 md:text-h1-2'>Become Part of Our Team</h1>
                    <ArrowDown size={50} className='hidden xl:block' />
                </div>
                <p className='font-light leading-none'>
                    This isn't an instant reply kind of thing—it's our talent directory.
                    But if you're someone we can't miss, we'll make sure we don't.
                </p>

                <form
                    className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'
                    onSubmit={handleSubmit}
                >
                    <input
                        type='text'
                        name='firstName'
                        pattern="^[A-Za-z\s]+$"
                        placeholder='First Name'
                        className='careers-input'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                        pattern="^[A-Za-z\s]+$"
                        className='careers-input'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email Address'
                        className='careers-input lg:col-span-2'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='position'
                        placeholder='Position'
                        className='careers-input'
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='cv'
                        placeholder='Add Your CV Link'
                        className='careers-input'
                        value={formData.cv}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name='message'
                        placeholder={
                            'Brief Message Here (maximum 500 characters)\nNote: You can add URLs to your portfolio'
                        }
                        className='careers-input lg:col-span-2 placeholder:text-[1.25rem]'
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type='submit'
                        className='bg-cultark-green hover:bg-cultark-blue hover:text-white text-black/90 py-3 rounded-md lg:col-span-2 flex items-center justify-center gap-2 px-3'
                    >
                        <Rocket />
                        <span>
                            Take the Step,
                            <br className='md:hidden' /> Join the Cult(ark)
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CareersPageClient;