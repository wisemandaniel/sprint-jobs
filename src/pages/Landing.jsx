import React, { useEffect, useState } from 'react';
import logo from '../data/logo.jpg'
import hero from '../data/images/hero.png'
import about from '../data/images/about.png'
import { useTranslation, initReactI18next } from "react-i18next";
import { Link } from 'react-router-dom';
import i18next from 'i18next';

function Landing() {

    useEffect(() => {
        const string = document.cookie;
        const regex = /i18next=(\w+)/;
        const match = string.match(regex);

        if (match && match[1]) {
        const languageCode = match[1];
        setSelectedValue(languageCode)
        i18next.changeLanguage(selectedValue)
        console.log('Language: ', languageCode);
        } else {
        console.log('Language code not found');
        }
    }, [])

    const languages = [
        {
            code: 'EN',
            name: 'EN'
        },
        {
            code: 'FR',
            name: 'FR'
        }
    ]

    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        i18next.changeLanguage(event.target.value)
    };


  return (
    <div>
      <div x-data="{navbarOpen: false}" className="absolute sticky left-0 top-0 z-50 bg-white/90 w-full backdrop-blur">
    <div className="mx-auto h-[90px] max-w-7xl px-8 md:px-6">
        <div className="relative flex h-full items-center justify-between border-b border-slate-500/10">
            <div className="w-[25rem] max-w-full items-center justify-center">
                <a href="#">
                    <img src={logo} alt="logo" className="w-full h-full" ></img>
                </a>
            </div>
            
            <div className="flex w-full items-center justify-between">

            </div>
            <div className="flex justify-between items-center">
            <div className="relative inline-block">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
        onChange={handleSelectChange}
        value={selectedValue}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>{language.name}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" />
        </svg>
        {selectedValue && <span className="">{selectedValue}</span>}
      </div>
    </div>
                <Link to={'Registration'} className="ml-10 mr-10 hidden rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 duration-200 hover:bg-blue-600 sm:block lg:mr-0">{t('Register_text')}</Link>
            </div>
        </div>
    </div>
</div>


<div className="relative bg-white py-5 lg:pt-[100px]">
    <div className="mx-auto max-w-7xl px-8 md:px-6">
        <div className="flex flex-wrap">
            <div className="w-full lg:w-5/12">
                <h1 className="text-slate-800 mb-3 text-4xl font-bold leading-snug sm:text-[42px] lg:text-[40px] xl:text-[42px]">{t('welcome_text_1')} <span className="text-blue-600">{t('in_seconds')}</span></h1>
                <p className="text-slate-500 mb-8 max-w-[480px] text-base">{t('base_text')}
                </p>
                
                <Link to={'Registration'} className="w-full rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 duration-200 sm:w-auto">{t('get_started')}</Link>

                <Link to={'Registration'} className="mt-4 box-border w-full rounded-md border border-blue-500/20 px-8 py-2.5 font-semibold text-blue-500 shadow-md shadow-blue-500/10 duration-200 sm:ml-4 sm:mt-0 sm:w-auto ">{t('reg_now')}</Link>

            </div>

            <div className="hidden px-4 lg:block lg:w-1/12"></div>

            <div className="w-full px-4 lg:w-6/12">
                <div className="lg:ml-auto lg:text-right">
                    <div className="relative z-10 inline-block pt-11 lg:pt-0">
                        <img src={hero} alt="hero section img" className="max-w-full lg:ml-auto"></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<section className="py-5">
    <div className="mx-auto max-w-7xl px-8 md:px-6">
        <div className="md:flex md:justify-between md:gap-6">
            <div className="md:w-6/12">
                <div className="mb-5 sm:mb-10">
                    <h1 className="text-2xl font-bold text-slate-700 sm:text-3xl">SprintJobs</h1>
                </div>
                <p className="text-slate-500 mb-6">{t('brief_text')}</p>
                <ul>
                    <li className="mb-6 flex items-center">
                        <div className="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="briefcase-outline"></ion-icon>
                        </div>
                        <p className="ml-4 max-w-md font-medium text-slate-600">{t('first_point')}</p>
                    </li>
                    <li className="mb-6 flex items-center">
                        <div className="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <ion-icon name="mail-unread-outline"></ion-icon>
                        </div>
                        <p className="ml-4 max-w-md font-medium text-slate-600">{t('second_point')}</p>
                    </li>
                </ul>
                 <Link to={'Registration'} className="w-full rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 duration-200 md:w-max">{t('get_started')}</Link>
            </div>

            <div className="mt-8 flex justify-center md:mt-0 md:w-5/12">
                <img src={about} alt="about img" className="max-h-[500px] md:max-h-max"></img>
            </div>

        </div>
    </div>
</section>

<section className="relative overflow-hidden py-16">
    <img src="images/effect.png" alt="effect" className="absolute bottom-[-400px] -z-10 w-full opacity-[0.2]"></img>
    <div className="mx-auto max-w-7xl px-8 md:px-6">
        <div className="-mx-4 flex flex-wrap lg:justify-between">

            <div className="w-full px-4 md:w-1/2 xl:w-6/12">
                <div className="mb-12 max-w-[570px] lg:mb-0">
                    <h1 className="mb-3 text-2xl font-bold text-slate-700 sm:text-3xl">{t('get_in_touch')}</h1>
                    <p className="text-slate-500 mb-8">{t('have_worry')}</p>
                    
                    <div className="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="location-outline" className="text-3xl"></ion-icon>
                        </div>
                        <div className="w-full">
                            <h4 className="mb-1 text-xl font-bold text-slate-700">{t('location')}</h4>
                            <p className="text-base text-slate-400
                            ">Molyko. Buea</p>
                        </div>
                    </div>

                    <div className="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="call-outline" className="text-3xl"></ion-icon>
                        </div>
                        <div className="w-full">
                            <h4 className="mb-1 text-xl font-bold text-slate-700">{t
                            ('phone')}</h4>
                            <p className="text-base text-slate-400
                            ">(+237) 678 313 613</p>
                        </div>
                    </div>
                    <div className="mb-8 flex w-full max-w-[420px] items-center rounded-lg bg-white p-4 shadow-md shadow-blue-500/10">
                        <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-500 bg-opacity-5 text-blue-500 sm:h-[70px] sm:max-w-[70px]">
                            <ion-icon name="mail-outline" className="text-3xl"></ion-icon>
                        </div>
                        <div className="w-full">
                            <h4 className="mb-1 text-xl font-bold text-slate-700">{t('email')}</h4>
                            <p className="text-base text-slate-400
                            ">company@gmail.com</p>
                        </div>
                    </div>


                </div>
            </div>

            <div className="w-full px-4 md:w-1/2 xl:w-5/12">
                <div className="relative rounded-lg bg-white p-8 shadow-lg shadow-blue-500/10 sm:p-12">
                    <form action="">
                        <div className="mb-6">
                            <input type="text" placeholder={t('your_name')} className="w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></input>
                        </div>
                        <div className="mb-6">
                            <input type="email" placeholder={t('your_email')} className="w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></input>
                        </div>
                        <div className="mb-6">
                            <input type="password" placeholder={t('your_password')} className="w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></input>
                        </div>
                        <div className="mb-6">
                            <textarea name="message" rows="6" className="resize-none w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></textarea>
                        </div>
                        <div className="">
                            <button type="submit" className="w-full rounded border border-blue-300 bg-blue-500 p-3 text-white transition-all hover:bg-opacity-90">{t('send_message')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<footer className="bg-slate-50/80 pt-16">
    <div className="mx-auto max-w-7xl px-8 md:px-6">
        <div className="flex flex-col justify-between border-t py-8 sm:flex-row">
            <p className="text-sm text-slate-500">© Copyright 2023 <a href="#" className="text-slate-700 hover:text-blue-500"> SprintJobs</a> All rights reserved.</p>
            <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                <a href="#">
                    <ion-icon name="logo-facebook" className="text-2xl text-slate-500 hover:text-blue-500 duration-300"></ion-icon>
                </a>
                <a href="#">
                    <ion-icon name="logo-twitter" className="text-2xl text-slate-500 hover:text-blue-500 duration-300"></ion-icon>
                </a>
                <a href="#">
                    <ion-icon name="logo-youtube" className="text-2xl text-slate-500 hover:text-blue-500 duration-300"></ion-icon>
                </a>
            </div>
        </div>
    </div>
</footer>
</div>
  );
}

export default Landing;