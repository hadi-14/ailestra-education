export default function Footer() {
    return (
      <div className="Footer w-full relative">
        {/* Gradient Top Bar */}
        <div className="Rectangle71 w-full h-8 bg-gradient-to-r from-red-900 to-indigo-950" />
  
        {/* Background Rectangle */}
        <div className="Rectangle72 w-full h-96 bg-neutral-200 mt-4 md:mt-0 px-4 md:px-12">
          <br />
          {/* Logo */}
          <div className="flex items-center py-2.5">
            <img src="/logo.png" alt="Top Grey Logo" className="h-16" />
            <img src="/logo - text.png" alt="Text Logo" className="h-14 ml-2" />
          </div>
  
          {/* Text Content */}
          <div className="Group18 py-8 md:pb-16">
            <div className="LoremIpsumDolorSitAmetConsecteturAdipiscingElitNuncSitAmetConsecteturNisl text-neutral-800 text-lg md:text-2xl font-normal font-['Inter']">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quaerat maiores dignissimos et reiciendis exercitationem, odio praesentium? Omnis accusantium accusamus perferendis ad, eligendi aliquid! Cupiditate dicta nihil totam cumque vero.
            </div>
  
            {/* Social Media Icons (Facebook, Instagram, YouTube) */}
            <div className="Frame3 mt-8 flex justify-start items-center gap-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/icon-circle-facebook.svg" alt="Facebook" className="w-12 h-12 cursor-pointer" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/icon-circle-instagram.svg" alt="Instagram" className="w-12 h-12 cursor-pointer" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/icon-circle-youtube.svg" alt="YouTube" className="w-12 h-12 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
  
        {/* Gradient Bottom Bar */}
        <div className="Rectangle41 w-full bg-gradient-to-r from-red-900 to-indigo-950">
          {/* Powered By Text */}
          <div className="PoweredByGraphode text-white text-sm md:text-lg font-black font-['Inter'] text-center md:text-left py-4 px-8">
            POWERED BY GRAPHODE
          </div>
        </div>
      </div>
    );
  };
  