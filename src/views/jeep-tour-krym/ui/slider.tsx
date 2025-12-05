'use server';

import { FC, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServerSlider } from '@/shared/ui/server-slider';

export type Tour = {
  title: string;
  img: string;
  duration: string;
  price: string;
  href: string;
};

const tours: Tour[] = [
  {
    title: 'Индивидуальная экскурсия — Тур «Безлимитный»',
    img: 'https://energy-tur.ru/wp-content/uploads/2021/04/individualnie-ekskursii-po-krymu.jpg',
    duration: '10 часов',
    price: 'от 20 000 руб/машина',
    href: 'individualnaya-ekskursiya-po-krymu-tur-bezlimitnyj'
  },
  {
    title: 'Экскурсия к Марсианскому Озеру, Сфинксам и Крепости',
    img: 'https://energy-tur.ru/wp-content/uploads/2018/07/bahchisaray-sfinksi-ava.jpg',
    duration: '5 часов',
    price: 'от 9500 руб/машина',
    href: 'individualnaya-ekskursiya-po-krymu-tur-bezlimitnyj'
  },
  {
    title: 'Легенды Мангуп-Кале (расширенная экскурсия)',
    img: 'https://energy-tur.ru/wp-content/uploads/2018/06/Legendy_Mangup_Kale_not_active.png',
    duration: '4–5 часов',
    price: 'от 8500 руб/машина',
    href: 'individualnaya-ekskursiya-po-krymu-tur-bezlimitnyj'
  },
  {
    title: 'Экскурсия в пещерные города Крыма на внедорожнике',
    img: 'https://energy-tur.ru/wp-content/uploads/2018/06/mangup-ava.jpg',
    duration: '6-7 часов',
    price: 'от 12 500 руб/машина',
    href: 'individualnaya-ekskursiya-po-krymu-tur-bezlimitnyj'
  },
  {
    title: 'Путешествие по качинской долине',
    img: 'https://energy-tur.ru/wp-content/uploads/2018/06/mangup-ava.jpg',
    duration: '5 часов',
    price: 'от 10 500 руб/машина',
    href: 'individualnaya-ekskursiya-po-krymu-tur-bezlimitnyj'
  },
  {
    title:
      'Обзорная экскурсия по Бахчисараю в Крыму с хорошей ценой и отзывами',
    img: 'https://energy-tur.ru/wp-content/uploads/2018/07/bahchisaraiskie-sfinksi_ava.jpg',
    duration: '4 часа',
    price: 'от 9000 руб/машина',
    href: 'individualnaya-ekskursiya-po-krymu-tur-bezlimitnyj'
  },
  {
    title: 'Экскурсия и тур по горам Крыма. Это выше Ай-Петри и Демерджи',
    img: 'https://energy-tur.ru/wp-content/uploads/2018/06/card3.png',
    duration: '5 часов',
    price: 'от 10 500 руб/машина',
    href: 'individualnaya-ekskursiya-po-krymu-tur-bezlimitnyj'
  }
];

type Props = { tours: Tour[]; title: ReactNode };

export const Slider: FC<Props> = async ({ tours, title }) => {
  const slides = tours.map((tour, idx) => (
    <Link
      className='bg-white shadow-md rounded-md grow h-full min-h-[70vh]'
      key={idx}
      href={tour.href}
    >
      <div className='relative h-3\5 w-full'>
        <Image
          width={500}
          height={500}
          src={tour.img}
          alt={tour.title}
          className='object-cover h-[50vh] w-full grow'
        />
        <div className='absolute bottom-0 left-0 w-full bg-black/30 text-white px-2 py-2 text-lg text-center'>
          {tour.title}
        </div>
      </div>
      <div className='p-3 text-center bg-orange-400 text-white mt-[-1px] h-2\5'>
        <p className='text-lg'>
          Продолжительность: <b>{tour.duration}</b>
        </p>
        <p className='text-md'>
          Стоимость: <b>{tour.price}</b>
        </p>
        <span className='mt-4 border border-white px-4 py-1 text-lg font-bold rounded block w-3/4 mx-auto'>
          ПОДРОБНЕЕ
        </span>
      </div>
    </Link>
  ));

  return <ServerSlider title={title} slides={slides} />;
};
