import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <div>
                <Image src={'/assets/SVG.png'} width={15} height={15} alt='Footer Logo'></Image>
                <h4>FITLOG</h4>
            </div>
            <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </div>
    );
};

export default Footer;