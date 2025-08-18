import React from 'react';
import {
    FaInstagram,
    FaLinkedin,
    FaSquarePhone,
    FaSquareFacebook,
    FaTwitter as FaXTwitter,
    FaSquareEnvelope,
} from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';

type SocialLinkType = {
    icon: React.ReactNode;
    url: string;
};

export const SocialLinks: SocialLinkType[] = [
    {
        icon: FaSquareFacebook({ size: 30 }),
        url: 'https://www.facebook.com/Cultark/',
    },
    {
        icon: FaInstagram({ size: 30 }),
        url: 'https://www.instagram.com/yourcultark/',
    },
    {
        icon: FaLinkedin({ size: 30 }),
        url: 'https://www.linkedin.com/company/cultark/',
    },
    {
        icon: FaXTwitter({ size: 30 }),
        url: 'https://twitter.com/cultark',
    },
    {
        icon: FaSquareEnvelope({ size: 30 }),
        url: 'mailto:letstalk@cultark.com',
    },
    {
        icon: FaSquarePhone({ size: 30 }),
        url: 'tel:+201008737333',
    },
    {
        icon: FaMapMarkerAlt({ size: 25 }),
        url: 'https://goo.gl/maps/WaXJ9DPAq5pAXdzU8',
    },
];