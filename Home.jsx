const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import HeroSection from '../components/home/HeroSection';
import HeroSearchBar from '../components/home/HeroSearchBar';
import ShopByBodyStyle from '../components/home/ShopByBodyStyle';
import StatsBar from '../components/home/StatsBar';
import FeaturedInventory from '../components/home/FeaturedInventory';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';

const HERO_IMAGE = 'https://media.db.com/images/public/69e94e22c4b00238d47c4152/781806ae2_generated_image.png';
const DETAIL_IMAGE = 'https://media.db.com/images/public/69e94e22c4b00238d47c4152/e2c16394f_generated_image.png';

export default function Home() {
  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles-featured'],
    queryFn: () => db.entities.Vehicle.filter({ status: 'available' }, '-created_date', 6),
  });

  return (
    <div className="pb-16 md:pb-0">
      <HeroSection heroImage={HERO_IMAGE} />
      <HeroSearchBar />
      <ShopByBodyStyle />
      <StatsBar />
      <FeaturedInventory vehicles={vehicles} isLoading={isLoading} />
      <WhyChooseUs detailImage={DETAIL_IMAGE} />
      <Testimonials />
    </div>
  );
}