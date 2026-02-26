import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import Messageform from '../components/Messageform';

const Home = () => {
  return <>

  <Hero title={"Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider "
    
  }
   imageUrl={"/hero.png"}/>
  <Biography imageUrl={"/about.png"}/>
  <Departments/>
  <Messageform/>
  
  </>
}

export default Home