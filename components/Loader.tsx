"use client";
import { useEffect, useState } from "react";
import { logoMark, site } from "@/config/site";

export default function Loader(){
  const [phase,setPhase]=useState<'visible'|'fading'|'done'>('visible');
  useEffect(()=>{
    const root=document.documentElement;
    const previous=root.style.overflow;
    root.style.overflow='hidden';
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal=window.setTimeout(()=>{setPhase('fading');root.style.overflow=previous;},reduced ? 200 : 1400);
    const finish=window.setTimeout(()=>setPhase('done'),reduced ? 350 : 1800);
    return ()=>{clearTimeout(reveal);clearTimeout(finish);root.style.overflow=previous;};
  },[]);
  if(phase==='done') return null;
  return <div role="status" aria-label={`${site.fullName} loading`} className={'saaba-loader '+(phase==='fading'?'saaba-loader-fading':'')}>
    {logoMark && <img src={logoMark} alt="" aria-hidden width="240" height="240" fetchPriority="high"/>}
  </div>;
}
