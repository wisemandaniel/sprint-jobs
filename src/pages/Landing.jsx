import React from 'react';
import logo from '../data/logo.jpg'
import brand_1 from '../data/images/brand/brand_1.png'
import brand_2 from '../data/images/brand/brand_2.png'
import brand_3 from '../data/images/brand/brand_3.png'
import brand_4 from '../data/images/brand/brand_4.png'
import hero from '../data/images/hero.png'
import icon_1 from '../data/images/features/icon_1.png'
import icon_2 from '../data/images/features/icon_2.png'
import icon_3 from '../data/images/features/icon_3.png'
import features from '../data/images/features/features.png'
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


<div className="relative bg-white py-16 lg:pt-[100px]">
    <div class="mx-auto max-w-7xl px-8 md:px-6">
        <div class="flex flex-wrap">
            <div class="w-full lg:w-5/12">
                <h1 class="text-slate-800 mb-3 text-4xl font-bold leading-snug sm:text-[42px] lg:text-[40px] xl:text-[42px]">Everything you need to run your online <span class="text-blue-600">business</span></h1>
                <p class="text-slate-500 mb-8 max-w-[480px] text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere alias voluptate esse blanditiis molestiae repudiandae fugiat eius sapiente expedita ut.
                </p>
                
                <button class="w-full rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 duration-200 sm:w-auto">Get Started</button>

                <button class="mt-4 box-border w-full rounded-md border border-blue-500/20 px-8 py-2.5 font-semibold text-blue-500 shadow-md shadow-blue-500/10 duration-200 sm:ml-4 sm:mt-0 sm:w-auto ">Register Now</button>

                <div class="mt-6 flex flex-wrap gap-4">
                    <img src={brand_1} alt="brand" class="w-32 cursor-pointer rounded-lg border border-blue-300/20 bg-white px-5 py-3 shadow-md shadow-blue-500/5 duration-200 hover:scale-95 sm:w-36"></img>
                    <img src={brand_2} alt="brand" class="w-32 cursor-pointer rounded-lg border border-blue-300/20 bg-white px-5 py-3 shadow-md shadow-blue-500/5 duration-200 hover:scale-95 sm:w-36"></img>
                    <img src={brand_3} alt="brand" class="w-32 cursor-pointer rounded-lg border border-blue-300/20 bg-white px-5 py-3 shadow-md shadow-blue-500/5 duration-200 hover:scale-95 sm:w-36"></img>
                    <img src={brand_4} alt="brand" class="w-32 cursor-pointer rounded-lg border border-blue-300/20 bg-white px-5 py-3 shadow-md shadow-blue-500/5 duration-200 hover:scale-95 sm:w-36"></img>
                </div>
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


<section className="pb-16">
    <div className="mx-auto max-w-7xl px-8 md:px-6">
        <div className="mb-5 sm:mb-10">
            <span className="font-medium text-blue-500">Our Features</span>
            <h1 className="text-2xl font-bold text-slate-700 sm:text-3xl">Provide Our Features</h1>
        </div>
        <div className="md:flex md:justify-between md:gap-6 xl:gap-10">
            <div className="mb-5 max-h-[600px] overflow-hidden rounded-lg md:mb-0 md:w-5/12">
                <img src={features} alt="features img" className="h-full scale-125 sm:w-full sm:object-cover"></img>
            </div>
            <div className="md:w-7/12">
                <div className="mb-16 flex flex-col">
                    <p className="mb-3 text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint explicabo perferendis voluptatibus sunt enim officiis.</p>

                    <p className="mb-10 text-slate-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint laudantium, cum, quaerat nulla possimus magni odio ullam ratione vitae id fuga aliquam sed molestiae? Voluptas.</p>

                    <button className="w-full rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 duration-200 md:w-max">Get Started</button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-8 shadow-lg">
                        <img className="mb-3 w-16" src={icon_1} alt=""></img>
                        <h3 className="text-lg font-bold text-slate-600">Web Design</h3>
                        <a href="#" className="text-sm text-blue-500">Learn more</a>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-8 shadow-lg">
                        <img className="mb-3 w-16" src={icon_2} alt=""></img>
                        <h3 className="text-lg font-bold text-slate-600">Automation</h3>
                        <a href="#" className="text-sm text-blue-500">Learn more</a>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-8 shadow-lg">
                        <img className="mb-3 w-16" src={icon_3} alt=""></img>
                        <h3 className="text-lg font-bold text-slate-600">Infographics</h3>
                        <a href="#" className="text-sm text-blue-500">Learn more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="mx-auto max-w-7xl px-8 md:px-6">
        <div class="md:flex md:justify-between md:gap-6">
            <div class="md:w-6/12">
                <div class="mb-5 sm:mb-10">
                    <span class="font-medium text-blue-500">About Us</span>
                    <h1 class="text-2xl font-bold text-slate-700 sm:text-3xl">Creative Marketing agency</h1>
                </div>
                <p class="text-slate-500 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere corporis delectus commodi suscipit dolores? Laudantium natus consectetur maiores architecto iste?</p>
                <ul>
                    <li class="mb-6 flex items-center">
                        <div class="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="briefcase-outline"></ion-icon>
                        </div>
                        <p class="ml-4 max-w-md font-medium text-slate-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </li>
                    <li class="mb-6 flex items-center">
                        <div class="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="cube-outline"></ion-icon>
                        </div>
                        <p class="ml-4 max-w-md font-medium text-slate-600">Omnis unde nam quia harum voluptatum itaque iste nostrum amet vero.</p>
                    </li>
                    <li class="mb-6 flex items-center">
                        <div class="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="mail-unread-outline"></ion-icon>
                        </div>
                        <p class="ml-4 max-w-md font-medium text-slate-600">Id quos et quidem perspiciatis similique! Rerum, natus temporibus.</p>
                    </li>
                </ul>
                 <button class="w-full rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 duration-200 md:w-max">Get Started</button>
            </div>

            <div class="mt-8 flex justify-center md:mt-0 md:w-5/12">
                <img src={about} alt="about img" class="max-h-[500px] md:max-h-max"></img>
            </div>

        </div>
    </div>
</section>

<section class="py-16">
    <div class="mx-auto max-w-7xl px-8 md:px-6">
        <div class="mb-10 text-center">
            <span class="font-medium text-blue-500">Our Services</span>
            <h1 class="text-2xl font-bold text-slate-700 sm:text-3xl">Provide Awesome Services</h1>
            <p class="mx-auto max-w-2 mt-2 text-slate-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur deleniti sit dolor numquam non. Et.</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:gap-8">
            <div class="group flex cursor-pointer flex-col items-center rounded-xl border border-blue-500/10 bg-white px-5 py-8 shadow-lg shadow-blue-300/10 duration-200 hover:bg-blue-500">
                <ion-icon name="bar-chart-outline" class="text-[55px] text-blue-500 duration-200 group-hover:text-white"></ion-icon>
                <h4 class="mt-3 mb-1 text-[17px] font-semibold text-slate-600 duration-200 group-hover:text-white">Crafted for Startups</h4>
                <p class="text-center text-sm text-slate-500 duration-200 group-hover:text-blue-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus nihil veritatis ad. Odit, veritatis!</p>
            </div>

            <div class="group flex cursor-pointer flex-col items-center rounded-xl border border-blue-500/10 bg-white px-5 py-8 shadow-lg shadow-blue-300/10 duration-200 bg-blue-500">
                <ion-icon name="extension-puzzle-outline" class="text-[55px] duration-200 text-white"></ion-icon>
                <h4 class="mt-3 mb-1 text-[17px] font-semibold duration-200 text-white">Fully Customizable</h4>
                <p class="text-center text-sm duration-200 text-blue-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus nihil veritatis ad. Odit, veritatis!</p>
            </div>

            <div class="group flex cursor-pointer flex-col items-center rounded-xl border border-blue-500/10 bg-white px-5 py-8 shadow-lg shadow-blue-300/10 duration-200 hover:bg-blue-500">
                <ion-icon name="speedometer-outline" class="text-[55px] text-blue-500 duration-200 group-hover:text-white"></ion-icon>
                <h4 class="mt-3 mb-1 text-[17px] font-semibold text-slate-600 duration-200 group-hover:text-white">Speed Optimized</h4>
                <p class="text-center text-sm text-slate-500 duration-200 group-hover:text-blue-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus nihil veritatis ad. Odit, veritatis!</p>
            </div>

            <div class="group flex cursor-pointer flex-col items-center rounded-xl border border-blue-500/10 bg-white px-5 py-8 shadow-lg shadow-blue-300/10 duration-200 hover:bg-blue-500">
                <ion-icon name="diamond-outline" class="text-[55px] text-blue-500 duration-200 group-hover:text-white"></ion-icon>
                <h4 class="mt-3 mb-1 text-[17px] font-semibold text-slate-600 duration-200 group-hover:text-white">High-quality Design</h4>
                <p class="text-center text-sm text-slate-500 duration-200 group-hover:text-blue-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus nihil veritatis ad. Odit, veritatis!</p>
            </div>

            <div class="group flex cursor-pointer flex-col items-center rounded-xl border border-blue-500/10 bg-white px-5 py-8 shadow-lg shadow-blue-300/10 duration-200 hover:bg-blue-500">
                <ion-icon name="file-tray-full-outline" class="text-[55px] text-blue-500 duration-200 group-hover:text-white"></ion-icon>
                <h4 class="mt-3 mb-1 text-[17px] font-semibold text-slate-600 duration-200 group-hover:text-white">All Essential Sections</h4>
                <p class="text-center text-sm text-slate-500 duration-200 group-hover:text-blue-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus nihil veritatis ad. Odit, veritatis!</p>
            </div>

            <div class="group flex cursor-pointer flex-col items-center rounded-xl border border-blue-500/10 bg-white px-5 py-8 shadow-lg shadow-blue-300/10 duration-200 hover:bg-blue-500">
                <ion-icon name="cloud-download-outline" class="text-[55px] text-blue-500 duration-200 group-hover:text-white"></ion-icon>
                <h4 class="mt-3 mb-1 text-[17px] font-semibold text-slate-600 duration-200 group-hover:text-white">Regular Updates</h4>
                <p class="text-center text-sm text-slate-500 duration-200 group-hover:text-blue-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus nihil veritatis ad. Odit, veritatis!</p>
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
                    <span class="font-medium text-blue-500">Contact Us</span>
                    <h1 class="mb-3 text-2xl font-bold text-slate-700 sm:text-3xl">GET IN TOUCH WITH US</h1>
                    <p class="text-slate-500 mb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere inventore illo porro molestiae maxime magni natus illum commodi! Modi, quisquam?</p>
                    
                    
                    <div class="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div class="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="location-outline" class="text-3xl"></ion-icon>
                        </div>
                        <div class="w-full">
                            <h4 class="mb-1 text-xl font-bold text-slate-700">Our Location</h4>
                            <p class="text-base text-slate-400
                            ">4236 Woodland Terrace. Sacramento. California</p>
                        </div>
                    </div>

                    <div class="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div class="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="call-outline" class="text-3xl"></ion-icon>
                        </div>
                        <div class="w-full">
                            <h4 class="mb-1 text-xl font-bold text-slate-700">Phone Number</h4>
                            <p class="text-base text-slate-400
                            ">(+62)01 234 567 8912</p>
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
      
        <div class="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
            <div class="md:max-w-md lg:col-span-2">
                <img src={logo} alt="footer logo" className="w-56 h-16"></img>
                <div class="mt-4 lg:max-w-sm">
                    <p class="text-sm text-slate-500">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                    <p class="text-sm text-slate-500 mt-2">Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
            </div>

            <div class="grid row-gap-8 grid-cols-2 gap-5 md:grid-cols-4 lg:col-span-4">
                <div class="">
                    <p class="font-semibold text-slate-700">Category</p>
                    <ul class="mt-2 space-y-2">
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">News</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">World</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Games</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">References</a></li>
                    </ul>
                </div>

                <div class="">
                    <p class="font-semibold text-slate-700">Business</p>
                    <ul class="mt-2 space-y-2">
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Web</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">eCommerce</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Business</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Entertainment</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Portfolio</a></li>
                    </ul>
                </div>

                <div class="">
                    <p class="font-semibold text-slate-700">Apples</p>
                    <ul class="mt-2 space-y-2">
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Media</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Brochure</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Nonprofit</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Educational</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Projects</a></li>
                    </ul>
                </div>

                <div class="">
                    <p class="font-semibold text-slate-700">Cherry</p>
                    <ul class="mt-2 space-y-2">
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Infopreneur</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Personal</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Wiki</a></li>
                        <li><a href="#" class="text-slate-500 transition-colors duration-300 hover:text-slate-700">Forum</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col justify-between border-t py-8 sm:flex-row">
            <p class="text-sm text-slate-500">© Copyright 2022 <a href="#" class="text-slate-700 hover:text-blue-500"> ZED.zahidul</a> All rights reserved.</p>
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