import { event } from "@/event.config";
import { asset } from "@/lib/copy";
import LoopingFilm from "@/components/LoopingFilm";
import Reveal from "@/components/Reveal";

export default function VideoStories(){
  const stories=event.media.stories ?? [];
  return <div className="video-stories">{stories.map((story,index)=><section key={story.id} id={story.id} aria-labelledby={story.id+'-heading'} className={'story-section '+(index%2 ? 'story-reverse':'')}>
    <div className="story-layout">
      <Reveal className="story-copy"><span className="story-number">{String(index+1).padStart(2,'0')}</span><p className="eyebrow">{story.eyebrow}</p><h2 id={story.id+'-heading'} className="display">{story.title}<br/><em>{story.accent}</em></h2><p className="body-copy">{story.body}</p><p className="story-note">{story.note}</p><a className="link-underline story-link" href={story.id==='celebrations' ? '#gallery':'#menu'}>{story.id==='celebrations' ? 'Explore our work':'Plan your menu'} <span aria-hidden="true">↗</span></a></Reveal>
      <Reveal className="story-media"><div className="story-film-wrap"><LoopingFilm src={asset(story.src)} poster={asset(story.poster)} alt={story.alt}/></div></Reveal>
    </div>
  </section>)}</div>;
}
