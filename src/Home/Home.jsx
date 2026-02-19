import React from 'react';
import Banner from '../HomeComponents/Banner';
import LatestAdditions from '../HomeComponents/LatestAdditions';
import ServiceCovrage from '../HomeComponents/ServiceCovrage';
import WhyChoose from '../HomeComponents/WhyChoose';
import Statestics from '../HomeComponents/Statestics';

const Home = () => {
    return (
        <>
        <Banner></Banner>
        <LatestAdditions></LatestAdditions>
        <ServiceCovrage></ServiceCovrage>
        <WhyChoose></WhyChoose>
        <Statestics></Statestics>
        </>
    );
};

export default Home;