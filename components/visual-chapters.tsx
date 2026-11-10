"use client";

import { motion, useReducedMotion } from "framer-motion";

const chapters = [
  { id: "pixels", no: "01", label: "PIXELS / THE DETAILS", title: <>It starts with<br /><em>one pixel.</em></>, copy: "Small decisions create the feeling of a product. Spacing, rhythm, hierarchy and the moments between clicks all add up to an experience people can understand.", theme: "paper" },
  { id: "brain", no: "02", label: "BRAIN / THE BLUEPRINT", title: <>First, a thought.<br /><em>Then a system.</em></>, copy: "Every build begins by making the problem visible: mapping the moving parts, finding the friction and deciding what should happen next.", theme: "dark" },
  { id: "dna", no: "03", label: "DNA / THE BUILDING BLOCKS", title: <>Logic gives ideas<br /><em>a structure.</em></>, copy: "A useful product is a set of connected decisions: interfaces, data, APIs, automation and the people who rely on them.", theme: "sand" },
  { id: "emotion", no: "04", label: "EMOTION / THE HUMAN SIDE", title: <>Technology should<br /><em>feel intuitive.</em></>, copy: "The best workflow is not the one with the most features. It is the one that makes the next action feel obvious.", theme: "dark" },
  { id: "hands", no: "05", label: "HANDS / MAKING IT REAL", title: <>From rough idea<br /><em>to real output.</em></>, copy: "I work across prototypes, product interfaces, integrations and operational tools—testing the details as the system takes shape.", theme: "paper" },
  { id: "windows", no: "06", label: "WINDOWS / SELECTED WORK", title: <>Different problems.<br /><em>Purposeful builds.</em></>, copy: "A growing collection of product work, client projects and experiments. Each one starts with a specific problem to make easier.", theme: "sand" },
  { id: "world", no: "07", label: "WORLD / WHAT CONNECTS", title: <>Built for people,<br /><em>not just screens.</em></>, copy: "From a solo operator to a growing team, good systems connect the work happening across tools, places and people.", theme: "dark" },
];

function PixelArtwork() {
  return <div className="art-pixels" aria-hidden="true"><div className="pixel-grid">{Array.from({ length: 64 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div><span className="art-coordinate">X 014 / Y 028</span><b>U<span>.</span></b></div>;
}
function BrainArtwork() {
  return <svg className="art-brain" viewBox="0 0 520 420" role="img" aria-label="Abstract neural network diagram"><circle cx="260" cy="210" r="165" fill="none" stroke="#b9a28b" strokeOpacity=".14"/>{Array.from({length:22},(_,i)=>{const a=i*2.399,r=42+(i%5)*25,x=260+Math.cos(a)*r,y=210+Math.sin(a)*r;return <g key={i}><line x1="260" y1="210" x2={x} y2={y} stroke="#b9a28b" strokeOpacity=".5"/><circle cx={x} cy={y} r={i%4===0?7:4} fill={i%4===0?"#e7c9a8":"#8f9690"}/></g>})}<circle cx="260" cy="210" r="22" fill="#e7c9a8"/><circle cx="260" cy="210" r="36" fill="none" stroke="#e7c9a8" strokeOpacity=".5"/></svg>;
}
function DnaArtwork() {
  return <svg className="art-dna" viewBox="0 0 520 440" role="img" aria-label="Abstract double helix illustration">{Array.from({length:19},(_,i)=>{const y=24+i*21,x1=260+Math.sin(i*.48)*125,x2=260-Math.sin(i*.48)*125;return <g key={i}><line x1={x1} y1={y} x2={x2} y2={y} stroke="#a46e4b" strokeWidth="2" opacity=".55"/><circle cx={x1} cy={y} r="6" fill="#a46e4b"/><circle cx={x2} cy={y} r="6" fill="#69766c"/></g>})}<path d={Array.from({length:100},(_,i)=>(i?"L":"M")+" "+(260+Math.sin(i*.18)*125)+" "+(18+i*4)).join(" ")} fill="none" stroke="#a46e4b" strokeWidth="4"/><path d={Array.from({length:100},(_,i)=>(i?"L":"M")+" "+(260-Math.sin(i*.18)*125)+" "+(18+i*4)).join(" ")} fill="none" stroke="#69766c" strokeWidth="4"/></svg>;
}
function EmotionArtwork() {
  return <div className="art-wave" aria-hidden="true"><div className="wave-orbit wave-one"/><div className="wave-orbit wave-two"/><div className="wave-bars">{Array.from({length:40},(_,i)=><i key={i} style={{height:(12+Math.abs(Math.sin(i*.52)*76))+"%",animationDelay:(i*18)+"ms"}}/>)}</div><span>HUMAN INPUT / CLEAR OUTPUT</span></div>;
}
function HandsArtwork() {
  return <div className="art-hands" aria-hidden="true"><div className="hand-card"><span>01 / DISCOVER</span><b>Understand<br/>the problem.</b><i>↗</i></div><div className="hand-card hand-card-back"><span>02 / BUILD</span><b>Shape the<br/>solution.</b><i>↗</i></div><div className="hand-stamp">MAKE<br/>IT<br/>USEFUL</div></div>;
}
function WindowsArtwork() {
  return <div className="art-windows" aria-hidden="true"><div className="window-frame"><div className="window-bar"><i/><i/><i/><span>PRODUCT / 01</span></div><div className="window-layout"><div/><div/><div/><div/></div></div><div className="window-frame window-frame-small"><div className="window-bar"><i/><i/><i/><span>SYSTEM / 02</span></div><div className="window-lines"><i/><i/><i/></div></div></div>;
}
function WorldArtwork() {
  return <svg className="art-world" viewBox="0 0 520 420" role="img" aria-label="Abstract connected network globe"><circle cx="260" cy="210" r="154" fill="none" stroke="#d4d0c4" strokeOpacity=".45"/><ellipse cx="260" cy="210" rx="72" ry="154" fill="none" stroke="#d4d0c4" strokeOpacity=".4"/><ellipse cx="260" cy="210" rx="132" ry="154" fill="none" stroke="#d4d0c4" strokeOpacity=".25"/><path d="M108 210H412M135 145H385M135 275H385" stroke="#d4d0c4" strokeOpacity=".4" fill="none"/>{[[180,130],[318,105],[355,230],[220,300],[130,210],[280,185]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="7" fill="#d7b18b"/><circle cx={x} cy={y} r="16" fill="none" stroke="#d7b18b" strokeOpacity=".45"/></g>)}</svg>;
}
function ChapterArtwork({id}:{id:string}) {
  if(id==="pixels") return <PixelArtwork/>;
  if(id==="brain") return <BrainArtwork/>;
  if(id==="dna") return <DnaArtwork/>;
  if(id==="emotion") return <EmotionArtwork/>;
  if(id==="hands") return <HandsArtwork/>;
  if(id==="windows") return <WindowsArtwork/>;
  return <WorldArtwork/>;
}
export function VisualChapters() {
  const reduceMotion = useReducedMotion();
  return <div className="visual-chapters" aria-label="A visual story of how I build">
    <div className="chapter-progress" aria-hidden="true"><span>THE PROCESS</span><i/><span>SCROLL TO EXPLORE</span></div>
    {chapters.map((chapter,index)=><section className={"visual-chapter chapter-"+chapter.theme} id={chapter.id} key={chapter.id} aria-labelledby={"chapter-title-"+chapter.id}>
      <div className="chapter-top"><span>CHAPTER {chapter.no}</span><span>{chapter.label}</span></div>
      <div className="chapter-layout">
        <motion.div className="chapter-copy" initial={reduceMotion?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{duration:.7,ease:[.22,1,.36,1]}}>
          <span className="chapter-overline">UMANG SHARMA / FIELD NOTES</span>
          <h2 id={"chapter-title-"+chapter.id}>{chapter.title}</h2>
          <p>{chapter.copy}</p>
          <span className="chapter-count">{String(index+1).padStart(2,"0")} <i/> 07</span>
        </motion.div>
        <motion.div className={"chapter-art chapter-art-"+chapter.id} initial={reduceMotion?false:{opacity:0,scale:.92}} whileInView={{opacity:1,scale:1}} viewport={{once:true,amount:.25}} transition={{duration:.85,delay:.08,ease:[.22,1,.36,1]}}>
          <ChapterArtwork id={chapter.id}/>
        </motion.div>
      </div>
      <div className="chapter-bottom"><span>IDEA → STRUCTURE → EXPERIENCE</span><a href={index===chapters.length-1?"#work":"#"+chapters[index+1].id}>{index===chapters.length-1?"Explore the work":"Next chapter"} <b>↘</b></a></div>
    </section>)}
  </div>;
}
