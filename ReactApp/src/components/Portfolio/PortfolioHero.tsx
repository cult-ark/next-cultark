const PortfolioHero = () => {
  return (
    <div className='bg-gray-400 h-screen flex flex-col items-center text-center justify-center bg-[url("/portfolio/portfolio_hero1.jpg")] bg-cover bg-top font-manrope relative'>
      <div className='bg-black/60 h-screen absolute w-full z-1'></div>
      <div className='relative z-10 flex flex-col items-center text-center justify-center gap-2'>
        <img src='/portfolio/paytab_logo.png' alt='' />
        <h1
          className='text-cultark-white/80 text-width-max text-0 !font-normal'
          // md:scale-x-[125%]
          // style={{ fontVariationSettings: "'wdth' 125;" }}
        >
          We Think You Should See This
        </h1>
        <button className='text-btn text-cultark-white border border-cultark-white px-8 py-3 rounded-full mt-5 font-archivo flex items-center gap-4 hover:bg-cultark-blue hover:border-cultark-blue hover:text-white'>
          <span>Check This Project Out!</span>{' '}
        </button>
      </div>
    </div>
  );
};

export default PortfolioHero;
