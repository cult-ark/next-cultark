'use client';

const ShareToInstagram = () => {
    const handleShare = async () => {
        const imageResponse = await fetch('/images/portfolio_hero.jpg');
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
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleShare()
            }}
            className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 '
        >
            Share to Instagram
        </button>
    );
};

export default ShareToInstagram;