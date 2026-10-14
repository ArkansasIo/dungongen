export interface EconomyState{gold:number;food:number;wood:number;stone:number;iron:number;tradeRoutes:number}
export const ECONOMY_RULES={foodPerPopulation:1,woodBuildCost:50,stoneBuildCost:75,ironMilitaryCost:100,tradeMultiplier:1.25};
export function resolveIncome(population:number,farms:number,tradeRoutes:number):EconomyState{return{gold:Math.floor(tradeRoutes*100*ECONOMY_RULES.tradeMultiplier),food:farms*100-population*ECONOMY_RULES.foodPerPopulation,wood:farms*20,stone:farms*10,iron:tradeRoutes*10,tradeRoutes}}
