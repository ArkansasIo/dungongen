import {useEffect,useState} from 'react';

interface Props{children:React.ReactNode}

export default function TabletopBoot({children}:Props){
 const [phase,setPhase]=useState<'boot'|'load'|'ready'>('boot');
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
  const start=performance.now();
  const timer=window.setInterval(()=>{
   const p=Math.min(100,Math.round(((performance.now()-start)/1700)*100));
   setProgress(p);
   if(p>=100){window.clearInterval(timer);setPhase('load');window.setTimeout(()=>setPhase('ready'),650);}
  },40);
  return()=>window.clearInterval(timer);
 },[]);
 if(phase!=='ready') return <div className="boot-screen" role="status" aria-live="polite">
  <div className="boot-frame">
   <div className="boot-seal"><img src="/dungongen/assets/tabletop/command-seal.svg" alt="D20QL command seal"/></div>
   <p className="boot-kicker">D20 DUNGEON STUDIO · TABLETOP SYSTEM</p>
   <h1>{phase==='boot'?'INITIALIZING WORLDWORKS':'LOADING CAMPAIGN'}</h1>
   <p className="boot-line">{phase==='boot'?'Mounting rules engine, map renderer and client services…':'Preparing the dungeon viewport and campaign state…'}</p>
   <div className="boot-progress"><span style={{width:progress+'%'}}/></div>
   <div className="boot-meta"><span>CORE {progress<45?'CHECK':'READY'}</span><span>RULES {progress<65?'LOAD':'READY'}</span><span>MAP {progress<85?'LOAD':'READY'}</span><strong>{progress}%</strong></div>
  </div>
 </div>;
 return <>{children}</>;
}
