import Image from 'next/image'

export default function Footer() {
  return (
    <div className="Footer w-full relative">
      {/* Gradient Top Bar */}
      <div className="Rectangle71 w-full h-4 bg-gradient-to-r from-red-900 to-indigo-950" />

      {/* Background Rectangle */}
      <div className="Rectangle72 w-full h-auto bg-neutral-200 px-4 md:px-8 flex justify-center">
        <div className="w-full max-w-[1300px] px-4">
          {/* Logo */}
          <div className="flex items-center py-2 pt-4">
            <Image
              src="/Ailestra/logo.png"
              alt="Top Grey Logo"
              width={150}
              height={40}
              priority
            />
            <Image
              src="/Ailestra/logo - text.png"
              alt="Text Logo"
              width={0}
              height={32}
              className="ml-2"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="Group18 py-4 md:pb-8">
            <div className="text-neutral-800 text-sm md:text-base font-normal">
              Ailestra Education was envisioned by Sir Abdul Samad Jamal, the founder of ASJ-ERDC. As technological advancements continue to reshape the educational landscape, the demand for innovative skills and modern teaching methods has never been greater.
            </div>

            {/* Social Media Icons (Facebook, Instagram, YouTube) */}
            <div className="Frame3 mt-4 flex justify-start items-center gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="icons/icon-circle-facebook.svg"
                  alt="Facebook"
                  width={0}
                  height={0}
                  className="w-8 h-8 cursor-pointer"
                  priority
                />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icons/icon-circle-instagram.svg"
                  alt="Instagram"
                  width={0}
                  height={0}
                  className="w-8 h-8 cursor-pointer"
                  priority
                />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icons/icon-circle-youtube.svg"
                  alt="YouTube"
                  width={0}
                  height={0}
                  className="w-8 h-8 cursor-pointer"
                  priority
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Bottom Bar */}
      <div className="Rectangle41 w-full bg-gradient-to-r from-red-900 to-indigo-950 flex justify-center">
        <div className="w-full max-w-[1300px] px-4">
          {/* Powered By Text */}
          <div className="PoweredByGraphode text-white text-xs md:text-sm font-black text-center md:text-left py-2">
            POWERED BY GRAPHODE
          </div>
        </div>
      </div>
    </div>
  );
};