import React from 'react';
import logo from '../data/logo.jpg'
import hero from '../data/images/hero.png'
import about from '../data/images/about.png'
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <div x-data="{navbarOpen: false}" className="absolute sticky left-0 top-0 z-50 bg-white/90 w-full backdrop-blur">
    <div class="mx-auto h-[90px] max-w-7xl px-8 md:px-6">
        <div class="relative flex h-full items-center justify-between border-b border-slate-500/10">
            <div class="w-[25rem] max-w-full items-center justify-center">
                <a href="#">
                    <img src={logo} alt="logo" className="w-full h-full" ></img>
                </a>
            </div>
            
            <div className="flex w-full items-center justify-between">

            </div>
            <div class="flex">
                <Link to={'Registration'} class="mr-10 hidden rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 duration-200 hover:bg-blue-600 sm:block lg:mr-0">Register</Link>
            </div>
        </div>
    </div>
</div>


<div className="relative bg-white py-5 lg:pt-[100px]">
    <div class="mx-auto max-w-7xl px-8 md:px-6">
        <div class="flex flex-wrap">
            <div class="w-full lg:w-5/12">
                <h1 class="text-slate-800 mb-3 text-4xl font-bold leading-snug sm:text-[42px] lg:text-[40px] xl:text-[42px]">Get your documents typed <span class="text-blue-600">in seconds</span></h1>
                <p class="text-slate-500 mb-8 max-w-[480px] text-base">Upload your document either as an image to be typed into word or pdf from the comfort of your home.
                </p>
                
                <Link to={'Registration'} class="w-full rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 duration-200 sm:w-auto">Get Started</Link>

                <Link to={'Registration'} class="mt-4 box-border w-full rounded-md border border-blue-500/20 px-8 py-2.5 font-semibold text-blue-500 shadow-md shadow-blue-500/10 duration-200 sm:ml-4 sm:mt-0 sm:w-auto ">Register Now</Link>

            </div>

            <div class="hidden px-4 lg:block lg:w-1/12"></div>

            <div class="w-full px-4 lg:w-6/12">
                <div class="lg:ml-auto lg:text-right">
                    <div class="relative z-10 inline-block pt-11 lg:pt-0">
                        <img src={hero} alt="hero section img" className="max-w-full lg:ml-auto"></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<section class="py-5">
    <div class="mx-auto max-w-7xl px-8 md:px-6">
        <div class="md:flex md:justify-between md:gap-6">
            <div class="md:w-6/12">
                <div class="mb-5 sm:mb-10">
                    <h1 class="text-2xl font-bold text-slate-700 sm:text-3xl">SprintJobs</h1>
                </div>
                <p class="text-slate-500 mb-6">We provide a platform for users to upload their document and get them typed by other users who get paid.</p>
                <ul>
                    <li class="mb-6 flex items-center">
                        <div class="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="briefcase-outline"></ion-icon>
                        </div>
                        <p class="ml-4 max-w-md font-medium text-slate-600">Upload document in image format</p>
                    </li>
                    <li class="mb-6 flex items-center">
                        <div class="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="cube-outline"></ion-icon>
                        </div>
                        <p class="ml-4 max-w-md font-medium text-slate-600">Search for availbale documents</p>
                    </li>
                    <li class="mb-6 flex items-center">
                        <div class="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="mail-unread-outline"></ion-icon>
                        </div>
                        <p class="ml-4 max-w-md font-medium text-slate-600">Type document and upload in word or pdf and get paid</p>
                    </li>
                </ul>
                 <Link to={'Registration'} class="w-full rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 duration-200 md:w-max">Get Started</Link>
            </div>

            <div class="mt-8 flex justify-center md:mt-0 md:w-5/12">
                <img src={about} alt="about img" class="max-h-[500px] md:max-h-max"></img>
            </div>

        </div>
    </div>
</section>

<section class="relative overflow-hidden py-16">
    <img src="images/effect.png" alt="effect" class="absolute bottom-[-400px] -z-10 w-full opacity-[0.2]"></img>
    <div class="mx-auto max-w-7xl px-8 md:px-6">
        <div class="-mx-4 flex flex-wrap lg:justify-between">

            <div class="w-full px-4 md:w-1/2 xl:w-6/12">
                <div class="mb-12 max-w-[570px] lg:mb-0">
                    <h1 class="mb-3 text-2xl font-bold text-slate-700 sm:text-3xl">GET IN TOUCH WITH US</h1>
                    <p class="text-slate-500 mb-8">Do you have any worry or any issues? then get to us now</p>
                    
                    <div class="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div class="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="location-outline" class="text-3xl"></ion-icon>
                        </div>
                        <div class="w-full">
                            <h4 class="mb-1 text-xl font-bold text-slate-700">Our Location</h4>
                            <p class="text-base text-slate-400
                            ">Molyko. Buea</p>
                        </div>
                    </div>

                    <div class="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div class="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="call-outline" class="text-3xl"></ion-icon>
                        </div>
                        <div class="w-full">
                            <h4 class="mb-1 text-xl font-bold text-slate-700">Phone Number</h4>
                            <p class="text-base text-slate-400
                            ">(+237) 678 313 613</p>
                        </div>
                    </div>
                    <div class="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div class="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="mail-outline" class="text-3xl"></ion-icon>
                        </div>
                        <div class="w-full">
                            <h4 class="mb-1 text-xl font-bold text-slate-700">Email Address</h4>
                            <p class="text-base text-slate-400
                            ">company@gmail.com</p>
                        </div>
                    </div>


                </div>
            </div>

            <div class="w-full px-4 md:w-1/2 xl:w-5/12">
                <div class="relative rounded-lg bg-white p-8 shadow-lg shadow-blue-500/10 sm:p-12">
                    <form action="">
                        <div class="mb-6">
                            <input type="text" placeholder="Your Name" class="w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></input>
                        </div>
                        <div class="mb-6">
                            <input type="email" placeholder="Your Email" class="w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></input>
                        </div>
                        <div class="mb-6">
                            <input type="password" placeholder="Your Passsword" class="w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></input>
                        </div>
                        <div class="mb-6">
                            <textarea name="message" rows="6" class="resize-none w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></textarea>
                        </div>
                        <div class="">
                            <button type="submit" class="w-full rounded border border-blue-300 bg-blue-500 p-3 text-white transition-all hover:bg-opacity-90">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<footer class="bg-slate-50/80 pt-16">
    <div class="mx-auto max-w-7xl px-8 md:px-6">
        <div class="flex flex-col justify-between border-t py-8 sm:flex-row">
            <p class="text-sm text-slate-500">© Copyright 2023 <a href="#" class="text-slate-700 hover:text-blue-500"> SprintJobs</a> All rights reserved.</p>
            <div class="mt-4 flex items-center space-x-4 sm:mt-0">
                <a href="#">
                    <ion-icon name="logo-facebook" class="text-2xl text-slate-500 hover:text-blue-500 duration-300"></ion-icon>
                </a>
                <a href="#">
                    <ion-icon name="logo-twitter" class="text-2xl text-slate-500 hover:text-blue-500 duration-300"></ion-icon>
                </a>
                <a href="#">
                    <ion-icon name="logo-youtube" class="text-2xl text-slate-500 hover:text-blue-500 duration-300"></ion-icon>
                </a>
            </div>
        </div>
    </div>
</footer>
</div>
  );
}

export default Landing;