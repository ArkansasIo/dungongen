export interface NavigationItem{id:string;label:string;description:string;children?:NavigationItem[]}
export const STUDIO_NAVIGATION:NavigationItem[]=[
 {id:'studio',label:'Studio',description:'Create and edit maps',children:[
  {id:'dungeon',label:'Dungeon Floor',description:'Rooms, corridors, doors and encounters'},
  {id:'settlement',label:'Medieval Settlement',description:'Roads, districts, buildings and landmarks'},
  {id:'world',label:'Region / World',description:'Terrain, biomes, borders and trade routes'}]},
 {id:'content',label:'RPG Content',description:'Populate generated maps',children:[
  {id:'encounters',label:'Encounters',description:'Monsters, traps, puzzles and bosses'},
  {id:'loot',label:'Loot & Items',description:'Rarity, rewards and treasure tables'},
  {id:'quests',label:'Quests & Factions',description:'Objectives, dialogue and reputation'},
  {id:'npcs',label:'NPC Library',description:'Names, roles, schedules and relationships'}]},
 {id:'campaign',label:'Campaign',description:'Persistent play',children:[
  {id:'characters',label:'Characters',description:'Classes, attributes, abilities and progression'},
  {id:'inventory',label:'Inventory & Crafting',description:'Equipment, resources and recipes'},
  {id:'party',label:'Party & Guilds',description:'Groups, roles and shared objectives'}]},
 {id:'library',label:'Library',description:'Saved maps, templates and assets'},
 {id:'settings',label:'Settings',description:'Generation, appearance, accessibility and exports'},
 {id:'multiplayer',label:'Multiplayer',description:'Sessions, instances and server diagnostics'}
];
