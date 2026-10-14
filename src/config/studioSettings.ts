export type MapKind='dungeon'|'settlement'|'world';
export type MapStyle='blueprint'|'parchment'|'high-contrast';
export interface StudioSettings {
  defaultMapKind:MapKind; defaultStyle:MapStyle; autosave:boolean; showGrid:boolean;
  showRoomLabels:boolean; showEncounterLayer:boolean; showTrapLayer:boolean; showTreasureLayer:boolean;
  defaultDungeonWidth:number; defaultDungeonHeight:number; defaultRoomCount:number; defaultLevel:number;
  defaultTheme:string; exportFormat:'json'|'svg'|'png'|'pdf'; soundEffects:boolean; reducedMotion:boolean;
}
export const DEFAULT_STUDIO_SETTINGS:StudioSettings={
  defaultMapKind:'dungeon',defaultStyle:'parchment',autosave:false,showGrid:true,showRoomLabels:true,
  showEncounterLayer:true,showTrapLayer:true,showTreasureLayer:true,defaultDungeonWidth:51,
  defaultDungeonHeight:35,defaultRoomCount:12,defaultLevel:3,defaultTheme:'Forgotten Crypt',
  exportFormat:'json',soundEffects:false,reducedMotion:false
};
export function validateSettings(input:StudioSettings):string[]{
 const errors:string[]=[];
 if(input.defaultDungeonWidth<21||input.defaultDungeonWidth>81||input.defaultDungeonWidth%2===0)errors.push('Dungeon width must be an odd number from 21 to 81.');
 if(input.defaultDungeonHeight<21||input.defaultDungeonHeight>61||input.defaultDungeonHeight%2===0)errors.push('Dungeon height must be an odd number from 21 to 61.');
 if(input.defaultRoomCount<4||input.defaultRoomCount>28)errors.push('Room count must be between 4 and 28.');
 if(input.defaultLevel<1||input.defaultLevel>20)errors.push('Dungeon level must be between 1 and 20.');
 return errors;
}
