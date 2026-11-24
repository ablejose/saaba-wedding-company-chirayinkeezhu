"use client";
import { useEffect, useRef } from "react";

export default function LoopingFilm({src,poster,alt}:{src:string;poster:string;alt:string}) {
  const ref=useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    const video=ref.current;
    if(!video) return;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let loaded=false;
    const sync=()=>{ if(motion.matches) video.pause(); else if(loaded) video.play().catch(()=>{}); };
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting || loaded) return;
      loaded=true; video.src=src; video.load(); sync(); observer.disconnect();
    },{rootMargin:'300px'});
    observer.observe(video);motion.addEventListener('change',sync);
    return ()=>{observer.disconnect();motion.removeEventListener('change',sync);};
  },[src]);
  return <video ref={ref} poster={poster} aria-label={alt} muted loop playsInline controls={false} disablePictureInPicture preload="none" className="story-film"/>;
}
