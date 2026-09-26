export interface GreenhouseZone {
  id: string;
  name: string;
  cropType: string;
  soilMoisturePct: number;
  ambientTempC: number;
  humidityPct: number;
  solarRadiationLux: number;
  ecConductivityMs: number;
  phLevel: number;
  irrigationStatus: "DRIP_ACTIVE" | "MISTING_PAUSED" | "STANDBY";
  valveFlowRateLpm: number;
  healthScorePct: number;
}

export interface HarvestPlot {
  id: string;
  plotName: string;
  commodity: string;
  variety: string;
  plantingDate: string;
  targetHarvestDate: string;
  projectedYieldKg: number;
  harvestReadinessPct: number;
  sniOrganicCertified: boolean;
  status: "GROWTH_VEGETATIVE" | "MATURATION" | "READY_TO_HARVEST" | "HARVESTED";
  destinationColdStore: string;
}

export interface AgroKpi {
  totalFarmAreaHectares: number;
  activeGreenhouses: number;
  dailyWaterUsageLiters: number;
  meanCropHealthPct: number;
  monthlyYieldProjectionTons: number;
  solarEnergySelfSufficiencyPct: number;
}
