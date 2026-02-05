import React, { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Heart, ChevronDown } from "lucide-react";

export default function WeddingInvitation() {
  const [stage, setStage] = useState("intro");
  const [started, setStarted] = useState(false);
  const [fadeToDetails, setFadeToDetails] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const introRef = useRef(null);
  const sectionsRef = useRef([]);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const weddingDate = new Date(2026, 3, 25, 17, 0, 0);

  // Countdown logic
  useEffect(() => {
    if (stage !== "details") return;

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, weddingDate]);

  // Hide scroll hint after first scroll
  useEffect(() => {
    if (stage !== "details") return;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stage]);

  // Scroll reveal
  useEffect(() => {
    if (stage !== "details") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -90px 0px" }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [stage]);

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.735336091545!2d21.756726276208845!3d42.45464702912047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354e4a024c270cd%3A0xc1b8fa0bac747aca!2sHotel%20Restaurant%20Rozafa!5e0!3m2!1sen!2smk!4v1768006090070!5m2!1sen!2smk",
      "_blank"
    );
  };

  const handleIntroClick = async () => {
    const v = introRef.current;
    if (!v) return;

    setStarted(true);

    try {
      if (v.currentTime > 0 && v.paused) v.currentTime = 0;
      await v.play();
    } catch (e) {
      console.log(e);
    }
  };

  const handleIntroEnded = () => {
    setFadeToDetails(true);
    setTimeout(() => setStage("details"), 450);
  };

  // Floating hearts component
  const FloatingHearts = () => (
    <div className="floating-hearts">
      {[...Array(6)].map((_, i) => (
        <Heart
          key={i}
          className="floating-heart"
          style={{
            left: `${15 + i * 15}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
          size={20}
          fill="#b89a5a"
          color="#b89a5a"
          opacity={0.3}
        />
      ))}
    </div>
  );

  // Sparkles component
  const Sparkles = () => (
    <div className="sparkles-container">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );

  if (stage === "intro") {
    return (
      <div className="fixed inset-0 bg-black">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');

          .font-caps { font-family: "Cinzel", serif; letter-spacing: .18em; }
          .font-script { font-family: "Great Vibes", cursive; }

          .tapBox {
            background: rgba(0,0,0,0.55);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.25);
          }

          .pulse {
            animation: pulse 1.8s ease-in-out infinite;
          }
          @keyframes pulse {
            0%,100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.05); opacity: 1; }
          }

          .fadeOut {
            opacity: 0;
            transform: translateY(12px);
            transition: all 500ms ease;
          }
        `}</style>

        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handleIntroClick}
        >
          <video
            ref={introRef}
            src="/intro.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            preload="auto"
            onEnded={handleIntroEnded}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "black",
              opacity: fadeToDetails ? 1 : 0,
              transition: "opacity 450ms ease",
            }}
          />

          <div
            className={`absolute inset-x-0 bottom-16 flex justify-center px-6 ${
              started ? "fadeOut" : ""
            }`}
          >
            <div className="tapBox rounded-full px-8 py-5 text-center pulse max-w-lg w-full">
              <div className="font-caps text-white text-[12px]">
                PREK KUDO PËR TË HAPUR
              </div>
              <div className="font-script text-white text-[42px] leading-none mt-2">
                Ftesa jonë e dasmës
              </div>
              <div className="font-caps text-white/80 text-[11px] mt-2">
                Suhejb & Aurora
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="snap-container" style={{ scrollPaddingTop: '0px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');

        :root{
          --ink:#2b2a28;
          --muted:#6f6a62;
          --gold:#b89a5a;
        }

        .font-caps{ font-family:"Cinzel", serif; letter-spacing:.18em; }
        .font-script{ font-family:"Great Vibes", cursive; }
        .font-serif{ font-family:"Cormorant Garamond", serif; }
        
        * {
          -webkit-overflow-scrolling: touch;
        }

        /* SMOOTH SCROLL SNAPPING */
        .snap-container {
          height: 100vh;
          overflow-y: scroll;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          background: #f6f1e9;
          width: 100%;
          max-width: 100vw;
          scroll-padding: 0;
        }

        .snap-section {
          min-height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        /* Prevent horizontal overflow */
        body, html {
          overflow-x: hidden;
          max-width: 100vw;
          margin: 0;
          padding: 0;
        }

        .divider{
          height:1px;
          background:linear-gradient(to right, transparent, rgba(184,154,90,.6), transparent);
        }

        .scroll-section{
          opacity:0;
          transform:translateY(60px);
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }
        .scroll-section.visible{
          opacity:1;
          transform:translateY(0);
        }

        .bg1{ background:linear-gradient(180deg,#f6f1e9,#f2e8dc); }
        .bg2{ background:linear-gradient(180deg,#f6f1e9,#f1e6d7); }
        .bg3{ background:linear-gradient(180deg,#f6f1e9,#efe3d2); }
        .bg4{ background:linear-gradient(180deg,#f2e8dc,#efe3d2); }
        .bg5{ background:linear-gradient(180deg,#efe3d2,#f6f1e9); }

        .countBox{
          background:rgba(255,255,255,.6);
          border:1px solid rgba(184,154,90,.25);
          border-radius:18px;
          transition: transform 0.3s ease;
        }

        .countBox:hover {
          transform: translateY(-5px);
        }

        /* SCROLL DOWN HINT */
        .scroll-hint {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          animation: bounceUpDown 2s ease-in-out infinite;
          transition: opacity 0.5s ease;
        }

        .scroll-hint.hidden {
          opacity: 0;
          pointer-events: none;
        }

        @keyframes bounceUpDown {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-15px);
          }
        }

        /* FLOATING HEARTS ANIMATION */
        .floating-hearts {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-heart {
          position: absolute;
          bottom: -50px;
          animation: floatUp 6s ease-in infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* SPARKLES ANIMATION */
        .sparkles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--gold);
          border-radius: 50%;
          animation: sparkle 3s ease-in-out infinite;
          box-shadow: 0 0 10px var(--gold);
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* DANCING TEXT ANIMATION */
        .dancing-text {
          display: inline-block;
          animation: dance 2s ease-in-out infinite;
        }

        @keyframes dance {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          75% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        /* NAMES ANIMATION */
        .name-animate {
          display: inline-block;
          animation: nameFloat 4s ease-in-out infinite;
        }

        .name-animate:nth-child(1) {
          animation-delay: 0s;
        }

        .name-animate:nth-child(2) {
          animation-delay: 0.2s;
        }

        @keyframes nameFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* DECORATIVE FLOURISH */
        .flourish {
          position: relative;
          padding: 0 50px;
        }

        .flourish::before,
        .flourish::after {
          content: '❦';
          position: absolute;
          color: var(--gold);
          font-size: 24px;
          opacity: 0.4;
          animation: flourishPulse 2s ease-in-out infinite;
        }

        .flourish::before {
          left: 10px;
          animation-delay: 0s;
        }

        .flourish::after {
          right: 10px;
          animation-delay: 1s;
        }
        
        /* Hide flourishes on small screens */
        @media (max-width: 640px) {
          .flourish {
            padding: 0;
          }
          .flourish::before,
          .flourish::after {
            display: none;
          }
        }

        @keyframes flourishPulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        /* ROMANTIC GLOW */
        .romantic-glow {
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(184,154,90,0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(184,154,90,0.6), 0 0 30px rgba(184,154,90,0.4);
          }
        }

        /* FADE IN STAGGER */
        .fade-in-stagger > * {
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards;
        }

        .fade-in-stagger > *:nth-child(1) { animation-delay: 0.2s; }
        .fade-in-stagger > *:nth-child(2) { animation-delay: 0.4s; }
        .fade-in-stagger > *:nth-child(3) { animation-delay: 0.6s; }
        .fade-in-stagger > *:nth-child(4) { animation-delay: 0.8s; }
        .fade-in-stagger > *:nth-child(5) { animation-delay: 1s; }
        .fade-in-stagger > *:nth-child(6) { animation-delay: 1.2s; }
        .fade-in-stagger > *:nth-child(7) { animation-delay: 1.4s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* IMAGE FRAME */
        .image-frame {
          position: relative;
          border: 8px solid rgba(255,255,255,0.9);
          box-shadow: 
            0 10px 40px rgba(0,0,0,0.15),
            inset 0 0 0 1px rgba(184,154,90,0.3);
          border-radius: 4px;
        }

        .image-frame::before {
          content: '';
          position: absolute;
          inset: -16px;
          border: 1px solid rgba(184,154,90,0.2);
          border-radius: 4px;
          pointer-events: none;
        }

        /* QUOTE STYLING */
        .quote-mark {
          font-family: Georgia, serif;
          font-size: 80px;
          line-height: 0;
          color: var(--gold);
          opacity: 0.3;
        }
      `}</style>

      {/* SCROLL DOWN HINT */}
      <div className={`scroll-hint ${showScrollHint ? '' : 'hidden'}`}>
        <div className="flex flex-col items-center gap-2">
          <div className="font-caps text-[10px] text-[color:var(--gold)]">
            RRËSHQIT POSHTË
          </div>
          <ChevronDown size={32} color="#b89a5a" strokeWidth={1.5} />
        </div>
      </div>

      {/* SECTION 1 - MAIN TITLE */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="snap-section flex items-center justify-center px-6 scroll-section visible bg1"
      >
        <FloatingHearts />
        <Sparkles />
        
        <div className="text-center max-w-3xl fade-in-stagger relative z-10">
          <div className="font-caps text-[12px] text-[color:var(--muted)]">
            SAVE THE DATE
          </div>

          <h1 className="font-script text-[76px] sm:text-[76px] text-[56px] mt-6 text-[color:var(--ink)] dancing-text romantic-glow">
            Dita e Dasmës
          </h1>

          <div className="font-serif text-[32px] sm:text-[46px] mt-4 text-[color:var(--ink)] font-semibold flourish">
            <span className="name-animate">Suhejb</span>{" "}
            <span style={{ color: "var(--gold)" }} className="dancing-text">&</span>{" "}
            <span className="name-animate">Aurora</span>
          </div>

          <div className="mt-10 divider"></div>

          <div className="font-caps text-[12px] mt-8 text-[color:var(--muted)] leading-relaxed">
            E SHTUNË, 25 PRILL 2026
            <br />
            ORA 19:00
          </div>

          <div className="mt-10 divider"></div>

          <p className="font-serif text-[20px] mt-10 text-[color:var(--muted)] dancing-text">
            Me dashuri fillon gjithçka ✨
          </p>
        </div>
      </section>

      {/* SECTION 2 - COUNTDOWN */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="snap-section flex items-center justify-center px-6 scroll-section bg2"
      >
        <FloatingHearts />
        
        <div className="text-center max-w-4xl w-full relative z-10">
          <Calendar className="mx-auto mb-6 dancing-text" size={56} color="#b89a5a" />

          <div className="font-caps text-[12px] text-[color:var(--muted)]">
            NUMËRIMI MBRAPSHT
          </div>

          <h2 className="font-serif text-[36px] sm:text-[52px] mt-4 text-[color:var(--ink)] font-semibold romantic-glow">
            Po i afrohemi ditës sonë
          </h2>

          <div className="mt-10 divider"></div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-xl mx-auto">
            {[
              ["DITË", countdown.days],
              ["ORË", countdown.hours],
              ["MIN", countdown.minutes],
              ["SEK", countdown.seconds],
            ].map(([label, value]) => (
              <div key={label} className="countBox py-6">
                <div className="font-serif text-[40px] text-[color:var(--ink)] font-semibold">
                  {value}
                </div>
                <div className="font-caps text-[11px] text-[color:var(--muted)] mt-2">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="font-script text-[44px] mt-12 dancing-text"
            style={{ color: "var(--gold)" }}
          >
            Shihemi së shpejti 💫
          </div>
        </div>
      </section>

      {/* SECTION 3 - PHOTO */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="snap-section flex items-center justify-center px-6 scroll-section bg3"
      >
        <Sparkles />
        
        <div className="text-center max-w-4xl w-full relative z-10">
          <div className="font-caps text-[12px] text-[color:var(--muted)] mb-8">
            ÇIFTI I LUMTUR
          </div>

          <div className="image-frame max-w-2xl mx-auto overflow-hidden">
            <img
              src="/photo1.jpg"
              alt="Suhejb & Aurora"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '3/4', maxHeight: '70vh' }}
            />
          </div>

          <div className="font-script text-[32px] sm:text-[38px] mt-10 text-[color:var(--gold)] dancing-text">
            Suhejb & Aurora
          </div>
          
          <p className="font-serif text-[18px] mt-4 text-[color:var(--muted)] italic">
            Bashkë përgjithmonë
          </p>
        </div>
      </section>

      {/* SECTION 4 - QUOTE */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="snap-section flex items-center justify-center px-6 scroll-section bg4"
      >
        <FloatingHearts />
        
        <div className="text-center max-w-3xl w-full relative z-10">
          <div className="quote-mark mb-4">"</div>
          
          <p className="font-serif text-[24px] sm:text-[32px] leading-relaxed text-[color:var(--ink)] italic px-4">
            Dashuria është mrekullia jonë,
            <br />
            besnikëria është forca jonë,
            <br />
            dhe bashkë jemi të plotë
          </p>

          <div className="quote-mark mt-4 rotate-180 inline-block">"</div>

          <div className="mt-12 divider"></div>

          <p className="font-caps text-[11px] mt-8 text-[color:var(--muted)] tracking-widest">
            NJË FESTË E DASHURISË DHE BASHKIMIT
          </p>
        </div>
      </section>

      {/* SECTION 5 - LOCATION */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="snap-section flex items-center justify-center px-6 scroll-section bg5"
      >
        <FloatingHearts />
        
        <div className="text-center max-w-5xl w-full relative z-10">
          <div className="font-caps text-[12px] text-[color:var(--muted)]">
            VENDNDODHJA
          </div>

          <h2 className="font-serif text-[36px] sm:text-[52px] mt-4 text-[color:var(--ink)] font-semibold romantic-glow">
            Restaurant Rozafa
          </h2>

          <p className="font-serif text-[20px] mt-2 text-[color:var(--muted)]">
            Bujanoc • Ora 19:00
          </p>

          <div className="mt-10 divider"></div>

          <div
            className="mt-10 rounded-2xl overflow-hidden max-w-4xl mx-auto"
            style={{ border: "1px solid rgba(184,154,90,.25)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.735336091545!2d21.756726276208845!3d42.45464702912047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354e4a024c270cd%3A0xc1b8fa0bac747aca!2sHotel%20Restaurant%20Rozafa!5e0!3m2!1sen!2smk!4v1768006090070!5m2!1sen!2smk" 
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Lokacioni i dasmës"
            />
          </div>

          <button
            onClick={openMap}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full transition-transform hover:scale-105"
            style={{
              background: "var(--gold)",
              color: "white",
              fontFamily: "Cinzel, serif",
              letterSpacing: ".14em",
              fontSize: "12px",
            }}
          >
            <MapPin size={16} />
            HAP NË GOOGLE MAPS
          </button>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-2 text-[color:var(--muted)] px-4">
            <Heart size={18} color="#b89a5a" className="dancing-text flex-shrink-0" fill="#b89a5a" />
            <span className="font-serif text-[16px] sm:text-[20px] text-center">
              Me padurim presim të festojmë së bashku me ju
            </span>
            <Heart size={18} color="#b89a5a" className="dancing-text flex-shrink-0" fill="#b89a5a" />
          </div>
        </div>
      </section>
    </div>
  );
}