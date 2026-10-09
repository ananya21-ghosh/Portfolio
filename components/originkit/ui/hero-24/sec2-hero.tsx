"use client";

"use client";

import type { ReactNode } from "react";
import { MediaGlobe } from "@/components/originkit/ui/hero-24/media-globe";
import { ScaleFrame } from "@/components/originkit/ui/hero-24/scale-frame";

const A = "/originkit/hero-24";

const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const PHONE_QUERY = "(max-width: 639px)";
const TABLET_QUERY = "(min-width: 640px) and (max-width: 1279px)";
const DESKTOP_QUERY = "(min-width: 1280px)";

const NAV_LINKS = ["Home", "Pricing", "About", "Tools"];

const REVEAL = "animate-hero-reveal";
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

const Backdrop = ({ src, className }: { src: string; className: string }) => (
  <img
    alt=""
    aria-hidden
    className={`pointer-events-none absolute left-0 top-0 h-full min-h-screen w-full max-w-none object-cover ${className}`}
    src={`${A}/${src}`}
  />
);

const GetStartedButton = ({ className }: { className: string }) => (
  <a
    href="#start"
    className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] transition-opacity duration-200 hover:opacity-80 drop-shadow-[0px_53px_7.5px_rgba(0,0,0,0),0px_34px_7px_rgba(0,0,0,0.01),0px_19px_6px_rgba(0,0,0,0.05),0px_9px_4.5px_rgba(0,0,0,0.09),0px_2px_2.5px_rgba(0,0,0,0.1)] ${className}`}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[999px]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.33) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(240, 240, 240) 0%, rgb(240, 240, 240) 100%)",
      }}
    />
    <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-[1.15] tracking-[-0.32px] text-[#060e08]">
      Get started
    </p>
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_1px_0px_white,inset_0px_-1.5px_0px_0px_rgba(0,0,0,0.1)]" />
  </a>
);

const EDGE_FADE = {
  left: "linear-gradient(to right, transparent 0%, #000 18%, #000 100%)",
  right: "linear-gradient(to left, transparent 0%, #000 18%, #000 100%)",
} as const;

const HAND_SLIDE = {
  left: "animate-hand-slide-in-left",
  right: "animate-hand-slide-in-right",
} as const;

const HandCutout = ({
  box,
  mask,
  maskSize,
  image,
  from,
  step,
}: {
  box: string;
  mask: string;
  maskSize: string;
  image: string;
  from: "left" | "right";
  step: number;
}) => (
  <div
    className={`absolute ${HAND_SLIDE[from]} ${box}`}
    style={{
      ...delay(step),
      maskImage: `url("${A}/${mask}"), ${EDGE_FADE[from]}`,
      WebkitMaskImage: `url("${A}/${mask}"), ${EDGE_FADE[from]}`,
      maskMode: "alpha",
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskSize: `${maskSize}, 100% 100%`,
      WebkitMaskSize: `${maskSize}, 100% 100%`,
    }}
  >
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img alt="" className={`absolute max-w-none ${image}`} src={`${A}/hands.png`} />
    </div>
  </div>
);

const GlassCard = ({
  className,
  plate,
  step,
  children,
}: {
  className: string;
  plate: string;
  step: number;
  children: ReactNode;
}) => (
  <div
    className={`absolute flex flex-col items-start overflow-clip border-solid border-[rgba(255,255,255,0.1)] backdrop-blur-sm ${className}`}
  >
    <div
      className={`absolute h-[166px] w-[301px] -translate-x-1/2 -translate-y-1/2 blur-[20px] ${plate}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[2px]"
      />
    </div>
    {children}
  </div>
);

const PhoneFrame = () => (
  <div className="relative h-[836px] w-[402px] overflow-clip">

    {}
    <div
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex w-[402px] items-center justify-center border border-solid border-[rgba(255,255,255,0.1)] p-[16px]`}
    >
      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-between">
        <a href="#home" className="relative shrink-0 whitespace-nowrap text-[22px] leading-[1.15] tracking-[-0.66px] text-white">
          Hirefy
        </a>
        <div className="relative size-[24px] shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70">
          <img alt="Menu" className="absolute inset-0 block size-full max-w-none" src={`${A}/menu.svg`} />
        </div>
      </div>
    </div>

    {}
    <div className="absolute left-1/2 top-[90px] flex w-[370px] -translate-x-1/2 flex-col items-center gap-[24px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[8px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-[320px] shrink-0 text-[35px] leading-[40px] tracking-[-1.4px]`}
        >
          Build Your Global Team. Effortlessly.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.7)]`}
        >
          Hire exceptional talent across 180+ countries, automate compliance, and manage
          international payroll.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex w-full shrink-0 flex-col items-start justify-center gap-[8px]`}
      >
        <GetStartedButton className="w-full px-[24px] py-[14px]" />
        <a
          href="#book"
          className="relative flex w-full shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.1)] bg-[#252525] px-[24px] py-[14px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-[1.15] tracking-[-0.32px] text-white">
            Book a Call
          </p>
        </a>
      </div>
    </div>

    {}
    <div style={delay(320)} className={`${REVEAL} absolute left-[calc(50%+0.5px)] top-[418px] h-[324px] w-[323px] -translate-x-1/2 overflow-clip rounded-[999px]`}>
      <MediaGlobe query={PHONE_QUERY} />
    </div>

    <HandCutout
      box="left-[172px] top-[344.46px] h-[177.31px] w-[230px]"
      mask="hand-mask-top.svg"
      maskSize="230px 177.309px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-[-27px] top-[571.65px] h-[212.8px] w-[224px]"
      mask="hand-mask-bottom.svg"
      maskSize="224px 212.801px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    {}
    <GlassCard
      className="left-[20px] top-[445px] w-[136px] gap-[4px] rounded-[6px] border p-[12px]"
      plate="left-[calc(50%-0.5px)] top-[calc(50%+0.5px)]"
      step={400}
    >
      <p className="relative w-full shrink-0 text-[16px] font-bold italic leading-[1.4] text-white">
        95%
      </p>
      <p className="relative w-full shrink-0 text-[12px] leading-[1.4] text-white opacity-70">
        Faster Global Hiring
      </p>
    </GlassCard>

    {}
    <GlassCard
      className="left-[calc(50%+79px)] top-[667px] w-[212px] -translate-x-1/2 gap-[12px] rounded-[4.729px] border-[0.788px] p-[12px]"
      plate="left-[calc(50%+25.5px)] top-[calc(50%+4.21px)]"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[12px] leading-[1.4] text-white">
        We expanded into 12 new markets in under 60 days without hiring.
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-[6px]">
        <div className="relative size-[28px] shrink-0">
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            height="28"
            width="28"
            src={`${A}/avatar.png`}
          />
        </div>
        <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start text-[11px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold italic">Sarah Kim</p>
          <p className="relative w-full shrink-0 opacity-70">VP People at NovaTech</p>
        </div>
      </div>
    </GlassCard>
  </div>
);

const TabletFrame = () => (
  <div className="relative h-[994px] w-[744px] overflow-clip">

    {}
    <div
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex h-[64px] w-[744px] items-center justify-center border border-solid border-[rgba(255,255,255,0.1)] px-[32px] py-[16px]`}
    >
      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-between">
        <a href="#home" className="relative shrink-0 whitespace-nowrap text-[28px] leading-[1.15] tracking-[-0.84px] text-white">
          Hirefy
        </a>
        <div className="relative size-[24px] shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70">
          <img alt="Menu" className="absolute inset-0 block size-full max-w-none" src={`${A}/menu.svg`} />
        </div>
      </div>
    </div>

    {}
    <div className="absolute left-[149px] top-[120px] flex w-[446px] flex-col items-center gap-[32px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[16px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[48px] leading-[55px] tracking-[-1.92px]`}
        >
          Build Your Global Team. Effortlessly.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[16px] leading-[1.5] text-[rgba(255,255,255,0.7)]`}
        >
          Hire exceptional talent across 180+ countries, automate compliance, and manage
          international payroll.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex shrink-0 items-center gap-[12px]`}
      >
        <GetStartedButton className="px-[24px] py-[16px]" />
        <a
          href="#book"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.1)] bg-[#252525] px-[24px] py-[16px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-[1.15] tracking-[-0.32px] text-white">
            Book a Call
          </p>
        </a>
      </div>
    </div>

    {}
    <div style={delay(320)} className={`${REVEAL} absolute left-[163px] top-[432px] h-[420px] w-[418px] overflow-clip rounded-[999px]`}>
      <MediaGlobe query={TABLET_QUERY} />
    </div>

    <HandCutout
      box="left-[401px] top-[383.289px] h-[264.423px] w-[343px]"
      mask="ipad-mask-top.svg"
      maskSize="343px 264.423px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-0 top-[692.875px] h-[267.9px] w-[282px]"
      mask="ipad-mask-bottom.svg"
      maskSize="282px 267.9px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    {}
    <GlassCard
      className="left-[113px] top-[473px] w-[169px] gap-[4px] rounded-[6px] border p-[16px]"
      plate="left-1/2 top-1/2"
      step={400}
    >
      <p className="relative w-full shrink-0 text-[20px] font-bold italic leading-[1.4] text-white">
        95%
      </p>
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white opacity-70">
        Faster Global Hiring
      </p>
    </GlassCard>

    {}
    <GlassCard
      className="left-[441px] top-[740px] w-[246px] gap-[16px] rounded-[6px] border p-[14px]"
      plate="left-[calc(50%-0.5px)] top-1/2"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white">
        We expanded into 12 new markets in under 60 days without hiring.
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-[6px]">
        <div className="relative size-[32px] shrink-0">
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            height="32"
            width="32"
            src={`${A}/avatar.png`}
          />
        </div>
        <div className="relative flex w-[127px] shrink-0 flex-col items-start text-[12px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold italic">Sarah Kim</p>
          <p className="relative w-full shrink-0 opacity-70">VP People at NovaTech</p>
        </div>
      </div>
    </GlassCard>
  </div>
);

const DesktopNav = () => (
  <div
    style={delay(0)}
    className={`${REVEAL} absolute left-0 top-0 z-10 hidden h-[90px] w-full items-center justify-center border-b border-solid border-[rgba(255,255,255,0.18)] px-[32px] desktop-sm:flex`}
  >
    <div className="relative flex w-full max-w-300 items-center justify-between">
      <a href="#home" className="relative shrink-0 whitespace-nowrap text-[32px] leading-[1.15] tracking-[-0.96px] text-white">
        Hirefy
      </a>
      <GetStartedButton className="px-[20px] py-[14px]" />
      <div className="absolute left-1/2 top-[calc(50%-0.5px)] flex -translate-x-1/2 -translate-y-1/2 items-center gap-[28px] whitespace-nowrap text-[17px] leading-[1.15] text-white">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="relative shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-70"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const DesktopFrame = () => (
  <div className="relative h-[913px] w-[1280px] overflow-clip">

    {}
    <div className="absolute left-[417px] top-[144px] flex w-[446px] flex-col items-center gap-[32px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[16px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[48px] leading-[55px] tracking-[-1.92px]`}
        >
          Build Your Global Team. Effortlessly.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[16px] leading-[1.5] text-[rgba(255,255,255,0.7)]`}
        >
          Hire exceptional talent across 180+ countries, automate compliance, and manage
          international payroll.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex shrink-0 items-center gap-[12px]`}
      >
        <GetStartedButton className="px-[24px] py-[16px]" />
        <a
          href="#book"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.1)] bg-[#252525] px-[24px] py-[16px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-[1.15] tracking-[-0.32px] text-white">
            Book a Call
          </p>
        </a>
      </div>
    </div>

    {}
    <div style={delay(320)} className={`${REVEAL} absolute left-[431px] top-[448px] h-[420px] w-[418px] overflow-clip rounded-[999px]`}>
      <MediaGlobe query={DESKTOP_QUERY} />
    </div>

    <HandCutout
      box="left-[794px] top-[269.169px] h-[374.664px] w-[486px]"
      mask="desk-mask-top.svg"
      maskSize="486px 374.664px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-0 top-[592.398px] h-[420.85px] w-[443px]"
      mask="desk-mask-bottom.svg"
      maskSize="443px 420.85px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    {}
    <GlassCard
      className="left-[339px] top-[504px] w-[169px] gap-[4px] rounded-[6px] border p-[16px]"
      plate="left-1/2 top-1/2"
      step={400}
    >
      <p className="relative w-full shrink-0 text-[20px] font-bold italic leading-[1.4] text-white">
        95%
      </p>
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white opacity-70">
        Faster Global Hiring
      </p>
    </GlassCard>

    {}
    <GlassCard
      className="left-[803px] top-[685px] w-[246px] gap-[16px] rounded-[6px] border p-[14px]"
      plate="left-[calc(50%-0.5px)] top-1/2"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[14px] leading-[1.4] text-white">
        We expanded into 12 new markets in under 60 days without hiring.
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-[6px]">
        <div className="relative size-[32px] shrink-0">
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            height="32"
            width="32"
            src={`${A}/avatar.png`}
          />
        </div>
        <div className="relative flex w-[127px] shrink-0 flex-col items-start text-[12px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold italic">Sarah Kim</p>
          <p className="relative w-full shrink-0 opacity-70">VP People at NovaTech</p>
        </div>
      </div>
    </GlassCard>
  </div>
);

export const Sec2Hero = () => (
  <main
    className="relative w-full overflow-hidden bg-[#101216]"
    style={{ fontFamily: HELVETICA }}
  >
    <Backdrop src="bg.png" className="min-[640px]:hidden" />
    <Backdrop src="bg-ipad.png" className="hidden min-[640px]:block desktop-sm:hidden" />
    <Backdrop src="bg-desktop.png" className="hidden desktop-sm:block" />

    {}
    <ScaleFrame frameWidth={402} className="relative w-full overflow-hidden min-[640px]:hidden">
      <PhoneFrame />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={744}
      className="relative hidden w-full overflow-hidden min-[640px]:block desktop-sm:hidden"
    >
      <TabletFrame />
    </ScaleFrame>
    <DesktopNav />
    <ScaleFrame
      frameWidth={1280}
      className="relative hidden w-full overflow-hidden desktop-sm:block"
    >
      <DesktopFrame />
    </ScaleFrame>
  </main>
);