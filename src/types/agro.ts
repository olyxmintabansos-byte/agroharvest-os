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

export interface NutrisiTank {
  id: string;
  name: string;
  stockType: "STOCK_A_CALCIUM" | "STOCK_B_PHOSPHATE" | "PH_CORRECTOR" | "BIO_STIMULANT";
  currentVolumeLiters: number;
  maxCapacityLiters: number;
  dosingRateMlPerM3: number;
  targetPpm: number;
  status: "DOSING_ACTIVE" | "RECIRCULATING" | "REFILL_WARNING";
  keyNutrients: string;
}

export interface OrganicAuditLog {
  id: string;
  auditDate: string;
  inspectorName: string;
  batchCode: string;
  commodity: string;
  soilOrganicMatterPct: number;
  pesticideResiduePpm: number;
  heavyMetalLeadPpm: number;
  certificationStatus: "TERSERTIFIKASI_PENUH" | "DALAM_PENGAWASAN" | "MASA_TRANSISI";
  accreditedBody: string;
  inspectionNotes: string;
}

export interface AgroKpi {
  totalFarmAreaHectares: number;
  activeGreenhouses: number;
  dailyWaterUsageLiters: number;
  meanCropHealthPct: number;
  monthlyYieldProjectionTons: number;
  solarEnergySelfSufficiencyPct: number;
}
