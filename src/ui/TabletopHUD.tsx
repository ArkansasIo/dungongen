export default function TabletopHUD(){
 return <section className="tabletop-hud" aria-label="Tabletop command interface">
  <div className="hud-card character-card"><span className="hud-label">ACTIVE HERO</span><strong>Arden Vale</strong><small>Level 1 · Warden</small><div className="bars"><i className="hp"/><i className="mana"/></div><div className="hud-stats"><span>HP <b>24/24</b></span><span>SP <b>10/10</b></span></div></div>
  <div className="hud-card turn-card"><span className="hud-label">ENCOUNTER</span><strong>Exploration</strong><small>Round 0 · Initiative idle</small><div className="turn-pips"><i/><i/><i/><i/><i/></div></div>
  <div className="hud-card api-card"><span className="hud-label">D20QL LINK</span><strong>CLIENT ONLINE</strong><small>Static runtime · API contract ready</small><span className="api-dot">●</span></div>
 </section>
}
