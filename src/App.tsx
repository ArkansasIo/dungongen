import { useMemo, useState } from 'react';
import RtsSkirmish from './game/RtsSkirmish';
import { generateDungeon } from './api';
import type { Dungeon, GenerateOptions } from './types';
import { generateWorld, type Era, type WorldState } from './world/eraModel';

type Page = { id:string; label:string; icon:string; children?:Page[] };
const NAV:Page[]=[
 {id:'dashboard',label:'Dashboard',icon:'⌂'},
 {id:'skirmish',label:'RTS Skirmish',icon:'⚔'},
 {id:'campaign',label:'Campaign',icon:'◆',children:[{id:'campaign-overview',label:'Overview',icon:'◈'},{id:'campaign-acts',label:'Acts & Chapters',icon:'▤'},{id:'campaign-quests',label:'Quests',icon:'◇'}]},
 {id:'world',label:'World',icon:'◎',children:[{id:'world-map',label:'World Map',icon:'⌖'},{id:'world-regions',label:'Regions',icon:'▦'},{id:'world-factions',label:'Factions',icon:'♜'},{id:'world-settlements',label:'Settlements',icon:'⌂'}]},
 {id:'dungeons',label:'Dungeons',icon:'⬡',children:[{id:'dungeon-generator',label:'Generator',icon:'✦'},{id:'dungeon-library',label:'Dungeon Library',icon:'▥'},{id:'dungeon-encounters',label:'Encounters',icon:'⚔'}]},
 {id:'characters',label:'Characters',icon:'♙',children:[{id:'characters-roster',label:'Roster',icon:'♙'},{id:'characters-classes',label:'Classes',icon:'✧'},{id:'characters-stats',label:'Stats & Progression',icon:'⌁'}]},
 {id:'inventory',label:'Inventory',icon:'▣',children:[{id:'inventory-items',label:'Items',icon:'◆'},{id:'inventory-equipment',label:'Equipment',icon:'◈'},{id:'inventory-crafting',label:'Crafting',icon:'⚒'}]},
 {id:'quests',label:'Quests',icon:'◇',children:[{id:'quests-active',label:'Active Quests',icon:'●'},{id:'quests-journal',label:'Journal',icon:'▤'},{id:'quests-rewards',label:'Rewards',icon:'✦'}]},
 {id:'map',label:'Map',icon:'⌖',children:[{id:'map-world',label:'World View',icon:'◎'},{id:'map-regions',label:'Region View',icon:'▦'},{id:'map-dungeon',label:'Dungeon View',icon:'⬡'}]},
 {id:'shop',label:'Shop',icon:'◈',children:[{id:'shop-market',label:'Marketplace',icon:'▣'},{id:'shop-blacksmith',label:'Blacksmith',icon:'⚒'}]},
 {id:'codex',label:'Codex',icon:'▤',children:[{id:'codex-creatures',label:'Creatures',icon:'♞'},{id:'codex-items',label:'Items',icon:'◆'},{id:'codex-lore',label:'Lore',icon:'✧'}]},
 {id:'multiplayer',label:'Multiplayer',icon:'◉',children:[{id:'multiplayer-party',label:'Party',icon:'♟'},{id:'multiplayer-sessions',label:'Sessions',icon:'◉'},{id:'multiplayer-leaderboards',label:'Leaderboards',icon:'≡'}]},
 {id:'settings',label:'Settings',icon:'⚙',children:[{id:'settings-game',label:'Game Settings',icon:'⚙'},{id:'settings-controls',label:'Controls',icon:'⌨'},{id:'settings-account',label:'Account',icon:'♙'}]}
];

const pageText:Record<string,{title:string;subtitle:string;metric:string;description:string}>={
 skirmish:{title:'RTS Skirmish',subtitle:'Playable D20 RTS',metric:'SKIRMISH',description:'Play the D20 real-time strategy demo.'},
 dashboard:{title:'Command Center',subtitle:'D20 Dungeon Studio',metric:'LIVE CAMPAIGN',description:'Your campaign, world, character, quest and dungeon systems are ready from one command-center workspace.'},
 'campaign-overview':{title:'Campaign Overview',subtitle:'Campaign',metric:'ACT I',description:'Track the active campaign, acts, chapters, milestones and narrative state.'},
 'campaign-acts':{title:'Acts & Chapters',subtitle:'Campaign',metric:'12 ACTS',description:'Organize campaign acts, chapters, scenes and progression gates.'},
 'campaign-quests':{title:'Campaign Quests',subtitle:'Campaign',metric:'240 QUESTS',description:'Manage main and side quests, objectives, rewards and completion state.'},
 'world-regions':{title:'World Regions',subtitle:'World',metric:'48 × 32',description:'Inspect procedural regions, terrain, resources and regional ownership.'},
 'world-factions':{title:'Factions',subtitle:'World',metric:'FACTIONS',description:'Manage faction territories, diplomacy, military strength and treasury.'},
 'world-settlements':{title:'Settlements',subtitle:'World',metric:'SETTLEMENTS',description:'Review cities, towns, villages, capitals and their local economies.'},
 'dungeon-library':{title:'Dungeon Library',subtitle:'Dungeons',metric:'LIBRARY',description:'Browse saved dungeon layouts, seeds, themes and generation metadata.'},
 'dungeon-encounters':{title:'Encounters',subtitle:'Dungeons',metric:'COMBAT',description:'Design combat encounters, traps, treasure, affixes and boss phases.'},
 'characters-roster':{title:'Character Roster',subtitle:'Characters',metric:'ROSTER',description:'Manage heroes, parties, classes, equipment and progression.'},
 'characters-classes':{title:'Classes',subtitle:'Characters',metric:'ARCHETYPES',description:'Configure classes, subclasses, abilities and progression paths.'},
 'characters-stats':{title:'Stats & Progression',subtitle:'Characters',metric:'D20 RULES',description:'Inspect core attributes, derived combat stats, XP and level progression.'},
 'inventory-items':{title:'Items',subtitle:'Inventory',metric:'ITEMS',description:'Browse weapons, armor, consumables, materials and rarity tiers.'},
 'inventory-equipment':{title:'Equipment',subtitle:'Inventory',metric:'LOADOUT',description:'Manage character equipment slots, bonuses and item comparisons.'},
 'inventory-crafting':{title:'Crafting',subtitle:'Inventory',metric:'CRAFT',description:'Combine materials into weapons, armor and utility items.'},
 'quests-active':{title:'Active Quests',subtitle:'Quests',metric:'ACTIVE',description:'Review objectives currently assigned to the party.'},
 'quests-journal':{title:'Journal',subtitle:'Quests',metric:'CHRONICLE',description:'Read discoveries, completed objectives, clues and campaign history.'},
 'quests-rewards':{title:'Rewards',subtitle:'Quests',metric:'LOOT',description:'Review earned XP, currency, loot tables and quest rewards.'},
 'map-world':{title:'World View',subtitle:'Map',metric:'WORLD',description:'Navigate the full seeded world and inspect its terrain.'},
 'map-regions':{title:'Region View',subtitle:'Map',metric:'REGIONS',description:'Zoom into regional boundaries, settlements and faction influence.'},
 'map-dungeon':{title:'Dungeon View',subtitle:'Map',metric:'DUNGEON',description:'Inspect dungeon rooms, corridors, doors, entrances and exits.'},
 'shop-market':{title:'Marketplace',subtitle:'Shop',metric:'MARKET',description:'Trade equipment, materials and campaign resources.'},
 'shop-blacksmith':{title:'Blacksmith',subtitle:'Shop',metric:'FORGE',description:'Upgrade, repair and craft equipment.'},
 'codex-creatures':{title:'Creatures',subtitle:'Codex',metric:'BESTIARY',description:'Review creature families, behaviors, stats and encounter roles.'},
 'codex-items':{title:'Items',subtitle:'Codex',metric:'ITEM CODEX',description:'Read item lore, rarity, effects and acquisition sources.'},
 'codex-lore':{title:'Lore',subtitle:'Codex',metric:'ARCHIVE',description:'Explore the setting, factions, places and historical timeline.'},
 'multiplayer-party':{title:'Party',subtitle:'Multiplayer',metric:'CO-OP',description:'Form parties, assign roles and coordinate shared adventures.'},
 'multiplayer-sessions':{title:'Sessions',subtitle:'Multiplayer',metric:'SESSIONS',description:'Create or join campaign sessions and manage session state.'},
 'multiplayer-leaderboards':{title:'Leaderboards',subtitle:'Multiplayer',metric:'RANKINGS',description:'Compare dungeon clears, campaign progress and competitive records.'},
 'settings-game':{title:'Game Settings',subtitle:'Settings',metric:'CONFIG',description:'Configure rules, difficulty, accessibility and runtime behavior.'},
 'settings-controls':{title:'Controls',subtitle:'Settings',metric:'INPUT',description:'Configure keyboard, mouse, controller and shortcut bindings.'},
 'settings-account':{title:'Account',subtitle:'Settings',metric:'PROFILE',description:'Manage account identity, permissions and session preferences.'}
};

function findPage(id:string):Page|undefined{return NAV.flatMap(x=>[x,...(x.children??[])]).find(x=>x.id===id)}
function VisualAsset({kind}:{kind:string}){return <div className={'asset asset-'+kind}><div className="asset-grid"/><img src={`${import.meta.env.BASE_URL}d20-studio-sigil.svg`} alt="" /></div>}

export default function App(){
 const [page,setPage]=useState('dashboard');
 const [open,setOpen]=useState<Record<string,boolean>>(()=>Object.fromEntries(NAV.filter(x=>x.children).map(x=>[x.id,true])));
 const [world,setWorld]=useState<WorldState>(()=>generateWorld('oak-and-iron',48,32,'medieval'));
 const [era,setEra]=useState<Era>('medieval'); const [seed,setSeed]=useState('oak-and-iron');
 const [dungeon,setDungeon]=useState<Dungeon|null>(null); const [busy,setBusy]=useState(false);
 const defaults:GenerateOptions={width:51,height:35,roomCount:12,level:3,theme:'Forgotten Crypt',seed:'ember-104',name:'The Forgotten Crypt'};
 const [dungeonOptions,setDungeonOptions]=useState(defaults);
 const current=findPage(page); const parent=NAV.find(x=>x.id===page)?.label??NAV.find(x=>x.children?.some(c=>c.id===page))?.label??current?.label??'Dashboard';
 const info=pageText[page]??pageText.dashboard;
 const worldCells=useMemo(()=>world.cells.slice(0,768),[world]);
 const openDungeon=async()=>{setBusy(true);try{setDungeon(await generateDungeon(dungeonOptions))}finally{setBusy(false)}};
 function navigate(id:string){setPage(id);const p=NAV.find(x=>x.id===id);if(p?.children)setOpen(o=>({...o,[id]:!o[id]}))}
 return <div className="studio">
  <aside className="sidebar">
   <div className="brand"><img src={`${import.meta.env.BASE_URL}d20-studio-sigil.svg`} alt="D20 Dungeon Studio"/><div><strong>D20</strong><span>DUNGEON STUDIO</span></div></div>
   <div className="sidebar-caption">COMMAND MENU</div>
   <nav>{NAV.map(item=><div className="nav-group" key={item.id}>
    <button className={'nav-item '+(page===item.id?'active':'')} onClick={()=>navigate(item.id)}><b>{item.icon}</b><span>{item.label}</span>{item.children&&<em>{open[item.id]?'−':'+'}</em>}</button>
    {item.children&&open[item.id]&&<div className="submenu">{item.children.map(child=><button key={child.id} className={'sub-item '+(page===child.id?'active':'')} onClick={()=>setPage(child.id)}><b>{child.icon}</b>{child.label}</button>)}</div>}
   </div>)}</nav>
   <div className="sidebar-footer"><span className="online-dot"/> STATIC RUNTIME <small>v1.0.0-alpha.1</small></div>
  </aside>
  <main className="studio-main">
   <header className="studio-header"><div><div className="breadcrumb">D20 DUNGEON STUDIO <span>/</span> {parent} <span>/</span> {current?.label}</div><h1>{info.title}</h1><p>{info.subtitle} · {info.description}</p></div><div className="header-status"><span>● ONLINE</span><strong>{info.metric}</strong></div></header>
   <section className="studio-hero"><div><span className="eyebrow">THE SHATTERED REALMS · ACT I</span><h2>Explore. Quest. Battle. Build Your Legend.</h2><p>Dark command-center presentation with persistent navigation, page-level layouts and reusable D20 studio assets.</p></div><VisualAsset kind={page.includes('dungeon')?'dungeon':page.includes('character')?'character':page.includes('world')||page==='map'?'world':'sigil'}/></section>
   {page==='dashboard'&&<Dashboard world={world} setPage={setPage}/>}
   {page==='skirmish'&&<RtsPage/>}
   {(page==='world'||page==='world-map'||page==='map'||page==='map-world'||page==='map-regions'||page==='world-regions'||page==='world-factions'||page==='world-settlements')&&<WorldPage world={world} era={era} setEra={setEra} seed={seed} setSeed={setSeed} regenerate={()=>setWorld(generateWorld(seed,48,32,era))}/>}
   {(page==='dungeons'||page==='dungeon-generator')&&<DungeonPage options={dungeonOptions} setOptions={setDungeonOptions} dungeon={dungeon} busy={busy} generate={openDungeon}/>}
   <GenericPage page={page} onNavigate={setPage}/>
  </main>
 </div>
}

function RtsAsset({type}:{type:'town'|'barracks'|'farm'|'knight'|'archer'|'hero'}) {
 const colors={town:'#d6ad6a',barracks:'#8fa8c2',farm:'#8e9f62',knight:'#c6d6e5',archer:'#8fbda7',hero:'#d8b46c'};
 return <div className="rts-asset" data-type={type}><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="25" fill="#0b1118" stroke={colors[type]} strokeWidth="2"/><text x="40" y="49" textAnchor="middle" fontSize="28" fill={colors[type]}>{type==='town'?'⌂':type==='barracks'?'⚒':type==='farm'?'♣':type==='knight'?'♞':type==='archer'?'➶':'✦'}</text></svg></div>
}

function Dashboard({world,setPage}:{world:WorldState;setPage:(p:string)=>void}){const [selected,setSelected]=useState<string>('f0');const faction=world.factions.find(f=>f.id===selected)??world.factions[0];const [selectedTile,setSelectedTile]=useState<number|null>(null);return <div className="rts-shell">
 <section className="rts-hud"><div className="resource"><b>▣</b><span>GOLD<em>{faction.treasury.toLocaleString()}</em></span></div><div className="resource"><b>♟</b><span>POPULATION<em>{faction.population.toLocaleString()} / 25,000</em></span></div><div className="resource"><b>⚒</b><span>WOOD<em>1,240</em></span></div><div className="resource"><b>◆</b><span>STONE<em>860</em></span></div><div className="resource"><b>✧</b><span>RESEARCH<em>{faction.research}</em></span></div><div className="turn-box"><small>TURN</small><strong>{world.turn}</strong><span>YEAR {world.year}</span></div></section>
 <section className="rts-board"><div className="rts-map-panel"><div className="rts-map-toolbar"><span>STRATEGIC MAP · {world.width} × {world.height}</span><div><button>＋</button><button>−</button><button>◈</button></div></div><div className="rts-map"><div className="rts-terrain">{world.cells.map((cell,i)=><button key={i} className={'terrain-'+cell.terrain+(selectedTile===i?' selected':'')} onClick={()=>setSelectedTile(i)} title={`${cell.terrain} · ${cell.resources.join(', ')}`}/>)}</div>{world.factions.map((f,i)=><div key={f.id} className="rts-base" style={{left:`${((f.capital.x+.5)/world.width)*100}%`,top:`${((f.capital.y+.5)/world.height)*100}%`}} onClick={()=>setSelected(f.id)}><RtsAsset type={i===0?'town':i===1?'barracks':i===2?'farm':'town'}/><label>{f.name}</label></div>)}<div className="rts-unit u1"><RtsAsset type="knight"/></div><div className="rts-unit u2"><RtsAsset type="archer"/></div><div className="rts-unit u3"><RtsAsset type="hero"/></div><div className="fog f1"/><div className="fog f2"/></div><div className="rts-map-footer"><span>▣ {selectedTile===null?'Select a tile':world.cells[selectedTile].terrain.toUpperCase()}</span><span>◉ FOG OF WAR</span><span>⌖ CLICK MAP TO SELECT</span></div></div>
 <aside className="rts-side"><div className="rts-side-head"><span>COMMAND</span><strong>{faction.name}</strong></div><div className="commander-card"><RtsAsset type="hero"/><div><b>ARIC STORMBLADE</b><small>Commander · Level 5</small><span>HP 48/48 · ATK 14 · DEF 12</span></div></div><div className="rts-section"><label>BUILD</label><div className="build-grid">{[['town','Town Center'],['barracks','Barracks'],['farm','Farm'],['farm','Lumber Camp']].map(([t,n])=><button key={n}><RtsAsset type={t as any}/><span>{n}<small>100 gold</small></span></button>)}</div></div><div className="rts-section"><label>PRODUCTION</label><button className="queue"><RtsAsset type="knight"/><span>Royal Knight<small>Queued · 24s</small></span><em>1</em></button><button className="queue"><RtsAsset type="archer"/><span>Longbowman<small>Ready</small></span><em>+</em></button></div><div className="rts-section"><label>ORDERS</label><div className="order-grid">{['MOVE','ATTACK','PATROL','GATHER','BUILD','RESEARCH'].map(x=><button key={x}>{x}</button>)}</div></div></aside></section>
 <section className="rts-bottom"><div className="minimap"><div className="mini-map">{world.cells.slice(0,384).map((c,i)=><i key={i} className={c.terrain}/>)}</div></div><div className="selection-panel"><div className="selection-portrait"><RtsAsset type="knight"/></div><div><b>ROYAL KNIGHT</b><small>Heavy cavalry · Selected unit</small><div className="bars-rts"><i/><i/></div><span>HP 120/120 · ARMOR 6 · DAMAGE 18</span></div></div><div className="alerts"><b>EVENTS</b><span>⚔ Enemy scout sighted near Silverwood</span><span>◆ Iron deposit discovered</span><span>◇ Quest objective updated</span></div></section>
 <section className="rts-quick"><button onClick={()=>setPage('campaign-overview')}>CAMPAIGN</button><button onClick={()=>setPage('characters-roster')}>ARMY & HEROES</button><button onClick={()=>setPage('inventory-items')}>ARSENAL</button><button onClick={()=>setPage('dungeon-generator')}>DUNGEON</button><button onClick={()=>setPage('world-map')}>WORLD MAP</button><button onClick={()=>setPage('multiplayer-sessions')}>MULTIPLAYER</button></section>
 </div>}

function WorldPage(p:{world:WorldState;era:Era;setEra:(e:Era)=>void;seed:string;setSeed:(s:string)=>void;regenerate:()=>void}){return <div className="page-layout"><section className="card control-card"><div className="card-title">WORLD GENERATOR</div><label>ERA<select value={p.era} onChange={e=>p.setEra(e.target.value as Era)}><option value="ancient">Ancient</option><option value="classical">Classical</option><option value="medieval">Medieval</option><option value="late-medieval">Late Medieval</option></select></label><label>SEED<input value={p.seed} onChange={e=>p.setSeed(e.target.value)}/></label><button onClick={p.regenerate}>GENERATE WORLD</button><div className="metric-stack"><b>{p.world.factions.length}<small>FACTIONS</small></b><b>{p.world.year}<small>YEAR</small></b><b>{p.world.turn}<small>TURN</small></b></div></section><section className="card big-map"><div className="map-grid">{p.world.cells.map((c,i)=><i key={i} className={c.terrain} title={c.terrain}/>)}</div></section></div>}

function DungeonPage(p:{options:GenerateOptions;setOptions:(v:GenerateOptions)=>void;dungeon:Dungeon|null;busy:boolean;generate:()=>void}){return <div className="page-layout"><section className="card control-card"><div className="card-title">DUNGEON GENERATOR</div>{[['name','NAME'],['seed','SEED'],['theme','THEME']].map(([key,label])=><label key={key}>{label}<input value={String(p.options[key as keyof GenerateOptions])} onChange={e=>p.setOptions({...p.options,[key]:e.target.value})}/></label>)}<div className="two"><label>WIDTH<input type="number" value={p.options.width} onChange={e=>p.setOptions({...p.options,width:Number(e.target.value)})}/></label><label>HEIGHT<input type="number" value={p.options.height} onChange={e=>p.setOptions({...p.options,height:Number(e.target.value)})}/></label></div><button disabled={p.busy} onClick={p.generate}>{p.busy?'GENERATING…':'GENERATE DUNGEON'}</button></section><section className="card dungeon-view"><div className="card-title">DUNGEON VIEWPORT <span>{p.dungeon?.rooms.length??0} ROOMS</span></div><div className="dungeon-art">{p.dungeon?p.dungeon.grid.map((c,i)=><i key={i} className={c}/>):<><VisualAsset kind="dungeon"/><span>Generate a dungeon to populate the viewport.</span></>}</div></section></div>}

function RtsPage(){return <RtsSkirmish/>}

function GenericPage({page,onNavigate}:{page:string;onNavigate:(p:string)=>void}){if(['dashboard','world','world-map','map','map-world','map-regions','world-regions','world-factions','world-settlements','dungeons','dungeon-generator'].includes(page))return null;const info=pageText[page]??pageText.dashboard;return <div className="generic-grid"><section className="card"><div className="card-title">{info.metric}</div><h3>{info.title}</h3><p>{info.description}</p><div className="placeholder-art"><VisualAsset kind={page.split('-')[0]}/></div></section><section className="card"><div className="card-title">PAGE MODULES</div><div className="module-list">{['Overview','Data & Records','Assets','Rules','Activity Log'].map((x,i)=><button key={x} onClick={()=>i===0?onNavigate(page):undefined}><b>0{i+1}</b><span>{x}<small>Dedicated {x.toLowerCase()} view for this page</small></span><em>→</em></button>)}</div></section></div>}
