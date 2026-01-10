import React, { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Heart } from "lucide-react";

export default function WeddingInvitation() {
  // stages: "intro" -> "details"
  const [stage, setStage] = useState("intro");
  const [started, setStarted] = useState(false);

  // ✅ smooth transition overlay (fade to black before showing details)
  const [fadeToDetails, setFadeToDetails] = useState(false);

  const introRef = useRef(null);
  const sectionsRef = useRef([]);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 📅 Wedding date: 25 April 2026 – 17:00
  const weddingDate = new Date(2026, 3, 25, 17, 0, 0); // April = 3

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
      "https://maps.google.com/?q=Masia+Can+Cortada+Barcelona",
      "_blank"
    );
  };

  // ▶️ Play intro video on tap
  const handleIntroClick = async () => {
    const v = introRef.current;
    if (!v) return;

    setStarted(true);

    try {
      // if user clicks again, restart
      if (v.currentTime > 0 && v.paused) v.currentTime = 0;
      await v.play();
    } catch (e) {
      console.log(e);
    }
  };

  // ✅ smooth entry: fade to black, then show details
  const handleIntroEnded = () => {
    setFadeToDetails(true);
    setTimeout(() => setStage("details"), 450);
  };

  // =========================
  // 🎥 INTRO – FULLSCREEN VIDEO
  // =========================
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
          {/* Fullscreen video */}
          <video
            ref={introRef}
            src="/intro.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            preload="auto"
            onEnded={handleIntroEnded}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

          {/* ✅ Fade to black before showing details */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "black",
              opacity: fadeToDetails ? 1 : 0,
              transition: "opacity 450ms ease",
            }}
          />

          {/* TAP TEXT */}
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

  // =========================
  // 💍 DETAILS – FULLSCREEN SECTIONS
  // =========================
  return (
    <div className="min-h-screen bg-[#f6f1e9] overflow-x-hidden">
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

        .divider{
          height:1px;
          background:linear-gradient(to right, transparent, rgba(184,154,90,.6), transparent);
        }

        .scroll-section{
          opacity:0;
          transform:translateY(40px);
          transition:opacity .9s ease, transform .9s ease;
        }
        .scroll-section.visible{
          opacity:1;
          transform:translateY(0);
        }

        .bg1{ background:linear-gradient(180deg,#f6f1e9,#f2e8dc); }
        .bg2{ background:linear-gradient(180deg,#f6f1e9,#f1e6d7); }
        .bg3{ background:linear-gradient(180deg,#f6f1e9,#efe3d2); }

        .countBox{
          background:rgba(255,255,255,.6);
          border:1px solid rgba(184,154,90,.25);
          border-radius:18px;
        }
      `}</style>

      {/* SECTION 1 */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex items-center justify-center px-6 scroll-section visible bg1"
      >
        <div className="text-center max-w-3xl">
          <div className="font-caps text-[12px] text-[color:var(--muted)]">
            SAVE THE DATE
          </div>

          <h1 className="font-script text-[76px] mt-6 text-[color:var(--ink)]">
            Dita e Dasmës
          </h1>

          <div className="font-serif text-[46px] mt-4 text-[color:var(--ink)] font-semibold">
            Suhejb <span style={{ color: "var(--gold)" }}>&</span> Aurora
          </div>

          <div className="mt-10 divider"></div>

          <div className="font-caps text-[12px] mt-8 text-[color:var(--muted)] leading-relaxed">
            E SHTUNË, 25 PRILL 2026
            <br />
            ORA 19:00
          </div>

          <div className="mt-10 divider"></div>

          <p className="font-serif text-[20px] mt-10 text-[color:var(--muted)]">
            Me dashuri fillon gjithçka
          </p>
        </div>
      </section>

      {/* SECTION 2 – COUNTDOWN */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex items-center justify-center px-6 scroll-section bg2"
      >
        <div className="text-center max-w-4xl w-full">
          <Calendar className="mx-auto mb-6" size={56} color="#b89a5a" />

          <div className="font-caps text-[12px] text-[color:var(--muted)]">
            NUMËRIMI MBRAPSHT
          </div>

          <h2 className="font-serif text-[52px] mt-4 text-[color:var(--ink)] font-semibold">
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
            className="font-script text-[44px] mt-12"
            style={{ color: "var(--gold)" }}
          >
            Shihemi së shpejti
          </div>
        </div>
      </section>

      {/* SECTION 3 – LOCATION */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex items-center justify-center px-6 scroll-section bg3"
      >
        <div className="text-center max-w-5xl w-full">
          <div className="font-caps text-[12px] text-[color:var(--muted)]">
            VENDNDODHJA
          </div>

          <h2 className="font-serif text-[52px] mt-4 text-[color:var(--ink)] font-semibold">
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
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full"
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

          <div className="mt-12 flex justify-center items-center gap-2 text-[color:var(--muted)]">
            <Heart size={18} color="#b89a5a" />
            <span className="font-serif text-[20px]">
              Me padurim presim të festojmë së bashku me ju
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
