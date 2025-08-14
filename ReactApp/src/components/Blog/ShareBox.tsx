import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';

import copy from 'copy-to-clipboard';
import { Link, Instagram } from 'lucide-react';

const ShareBox = ({
  img,
  post_title,
  post_url,
  size = 'h-12 w-12',
  rounded = 'rounded-none',
  className = '',
}: {
  post_title: string;
  post_url: string;
  img: string;
  size?: string;
  rounded?: string;
  className?: string;
}) => {
  const handleShare = async () => {
    const imageResponse = await fetch(img);
    const blob = await imageResponse.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'Check this out!',
          text: 'Cool image to share',
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing not supported on this device');
    }
  };
  return (
    <div
      className={`${className} flex ${rounded} items-center`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={`${size} p-2 aspect-square flex items-center justify-center bg-gray-300 active:bg-gray-400`}
        onClick={() => copy(post_url)}
      >
        <Link />
      </button>
      <FacebookShareButton title={post_title} url={post_url}>
        <FacebookIcon className={`${size}`} />
      </FacebookShareButton>
      <button
        className={`${size} p-1 aspect-square flex items-center justify-center bg-gradient-to-br from-[#dd2a7b] to-[#833AB4] text-white active:bg-pink-400 md:hidden`}
        onClick={() => handleShare()}
      >
        <Instagram />
      </button>
      <WhatsappShareButton title={post_title} url={post_url}>
        <WhatsappIcon className={`${size}`} />
      </WhatsappShareButton>
      <TwitterShareButton title={post_title} url={post_url}>
        <XIcon className={`${size}`} />
      </TwitterShareButton>
      <LinkedinShareButton title={post_title} url={post_url}>
        <LinkedinIcon className={`${size}`} />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareBox;
