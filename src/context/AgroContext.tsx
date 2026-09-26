"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GreenhouseZone, HarvestPlot, NutrisiTank, OrganicAuditLog, AgroKpi } from "@/types/agro";

interface AgroContextType {
  zones: GreenhouseZone[];
  plots: HarvestPlot[];
  tanks: NutrisiTank[];
  auditLogs: OrganicAuditLog[];
  selectedZoneId: string;
  setSelectedZoneId: (id: string) => void;
  kpis: AgroKpi;
  toggleIrrigation: (zoneId: string) => void;
  adjustDripFlow: (zoneId: string, delta: number) => void;
  adjustDosingRate: (tankId: string, delta: number) => void;
  toggleTankStatus: (tankId: string) => void;
  addHarvestPlot: (p: Omit<HarvestPlot, "id">) => void;
  updateHarvestStatus: (plotId: string, status: HarvestPlot["status"]) => void;
  harvestAndDispatch: (plotId: string) => void;
  resetAgroData: () => void;
}

const INITIAL_ZONES: GreenhouseZone[] = [
  {
    id: "GH-01",
    name: "GREENHOUSE ALPHA // HEIRLOOM TOMATOES",
    cropType: "Solanum lycopersicum (Beefsteak Red Heirloom)",
    soilMoisturePct: 68,
    ambientTempC: 24.5,
    humidityPct: 72,
    solarRadiationLux: 48500,
    ecConductivityMs: 2.4,
    phLevel: 6.2,
    irrigationStatus: "DRIP_ACTIVE",
    valveFlowRateLpm: 18.5,
    healthScorePct: 97,
  },
  {
    id: "GH-02",
    name: "GREENHOUSE BRAVO // JAPANESE BELL PEPPERS",
    cropType: "Capsicum annuum (Sweet Rainbow Paprika)",
    soilMoisturePct: 62,
    ambientTempC: 25.8,
    humidityPct: 68,
    solarRadiationLux: 52000,
    ecConductivityMs: 2.2,
    phLevel: 6.0,
    irrigationStatus: "STANDBY",
    valveFlowRateLpm: 0.0,
    healthScorePct: 94,
  },
  {
    id: "GH-03",
    name: "GREENHOUSE CHARLIE // SEEDLESS CUCUMBERS",
    cropType: "Cucumis sativus (Japanese Long Crisp)",
    soilMoisturePct: 74,
    ambientTempC: 23.9,
    humidityPct: 78,
    solarRadiationLux: 41000,
    ecConductivityMs: 2.6,
    phLevel: 6.4,
    irrigationStatus: "MISTING_PAUSED",
    valveFlowRateLpm: 12.0,
    healthScorePct: 96,
  },
  {
    id: "GH-04",
    name: "GREENHOUSE DELTA // ALBINO STRAWBERRIES",
    cropType: "Fragaria ananassa (Pearl White Tochiotome)",
    soilMoisturePct: 70,
    ambientTempC: 21.4,
    humidityPct: 65,
    solarRadiationLux: 38000,
    ecConductivityMs: 1.8,
    phLevel: 5.8,
    irrigationStatus: "DRIP_ACTIVE",
    valveFlowRateLpm: 8.4,
    healthScorePct: 98,
  },
];

const INITIAL_PLOTS: HarvestPlot[] = [
  {
    id: "PLT-01",
    plotName: "Blok A-1 // NFT Hydroponic Salad Valley",
    commodity: "Baby Romaine & Lollo Bionda Lettuce",
    variety: "Salad Bowl Hydroponic Deep-Flow",
    plantingDate: "15 Agu 2026",
    targetHarvestDate: "02 Okt 2026",
    projectedYieldKg: 1850,
    harvestReadinessPct: 92,
    sniOrganicCertified: true,
    status: "READY_TO_HARVEST",
    destinationColdStore: "ColdStore WMS Chamber CH-03 (+2°C)",
  },
  {
    id: "PLT-02",
    plotName: "Blok B-4 // Trellis Hydroponic Melon House",
    commodity: "Japanese Honeydew Melon Arus",
    variety: "Crown Melon Sugar-Brix 16°",
    plantingDate: "10 Jul 2026",
    targetHarvestDate: "14 Okt 2026",
    projectedYieldKg: 3200,
    harvestReadinessPct: 78,
    sniOrganicCertified: true,
    status: "MATURATION",
    destinationColdStore: "ColdStore WMS Chamber CH-03 (+2°C)",
  },
  {
    id: "PLT-03",
    plotName: "Blok C-2 // Aeroponic Herb Terrace",
    commodity: "Genovese Sweet Basil & Purple Thyme",
    variety: "Essential Culinary Microgreens",
    plantingDate: "01 Sep 2026",
    targetHarvestDate: "20 Okt 2026",
    projectedYieldKg: 640,
    harvestReadinessPct: 45,
    sniOrganicCertified: true,
    status: "GROWTH_VEGETATIVE",
    destinationColdStore: "ColdStore WMS Chamber CH-03 (+2°C)",
  },
  {
    id: "PLT-04",
    plotName: "Blok D-1 // Substrate Chili Pavilion",
    commodity: "Sweet Habanero Organic Peppers",
    variety: "Citron Yellow Gourmet Capsicum",
    plantingDate: "28 Jun 2026",
    targetHarvestDate: "28 Sep 2026",
    projectedYieldKg: 890,
    harvestReadinessPct: 98,
    sniOrganicCertified: true,
    status: "READY_TO_HARVEST",
    destinationColdStore: "ColdStore WMS Chamber CH-03 (+2°C)",
  },
];

const INITIAL_TANKS: NutrisiTank[] = [
  {
    id: "TNK-01",
    name: "TANGKI INDUK A // KALSIUM & NITROGEN",
    stockType: "STOCK_A_CALCIUM",
    currentVolumeLiters: 1850,
    maxCapacityLiters: 2500,
    dosingRateMlPerM3: 450,
    targetPpm: 220,
    status: "DOSING_ACTIVE",
    keyNutrients: "Kalsium Nitrat Ca(NO3)2, Kalium Nitrat KNO3, Fe-EDDHA 6%",
  },
  {
    id: "TNK-02",
    name: "TANGKI INDUK B // FOSFAT & SULFUR",
    stockType: "STOCK_B_PHOSPHATE",
    currentVolumeLiters: 1920,
    maxCapacityLiters: 2500,
    dosingRateMlPerM3: 450,
    targetPpm: 180,
    status: "DOSING_ACTIVE",
    keyNutrients: "Monokalium Fosfat KH2PO4, Magnesium Sulfat MgSO4, Mikro EDTA",
  },
  {
    id: "TNK-03",
    name: "TANGKI KOREKSI pH // ASAM ORGANIK SITRAT",
    stockType: "PH_CORRECTOR",
    currentVolumeLiters: 640,
    maxCapacityLiters: 1000,
    dosingRateMlPerM3: 85,
    targetPpm: 60,
    status: "RECIRCULATING",
    keyNutrients: "Bio-Citric Acid Food Grade Organik (Stabilisator pH 6.0)",
  },
  {
    id: "TNK-04",
    name: "TANGKI BIO-STIMULAN // ASAM HUMAT & RUMPUT LAUT",
    stockType: "BIO_STIMULANT",
    currentVolumeLiters: 780,
    maxCapacityLiters: 1000,
    dosingRateMlPerM3: 120,
    targetPpm: 95,
    status: "DOSING_ACTIVE",
    keyNutrients: "Ekstrak Ascophyllum nodosum, Asam Fulvat, Mikroba Endofit",
  },
];

const INITIAL_AUDIT_LOGS: OrganicAuditLog[] = [
  {
    id: "AUD-01",
    auditDate: "24 September 2026",
    inspectorName: "Ir. Dian Kusuma Wardani, M.Sc",
    batchCode: "BATCH-AGRO-2026-09A",
    commodity: "Baby Romaine & Lollo Bionda (Blok A-1)",
    soilOrganicMatterPct: 6.4,
    pesticideResiduePpm: 0.0,
    heavyMetalLeadPpm: 0.002,
    certificationStatus: "TERSERTIFIKASI_PENUH",
    accreditedBody: "Lembaga Sertifikasi Organik (LSO) Seloliman No. 042-LSO-IDN",
    inspectionNotes: "Bebas bahan kimia sintetis 100%. Air irigasi memenuhi baku mutu air minum kelas 1.",
  },
  {
    id: "AUD-02",
    auditDate: "18 September 2026",
    inspectorName: "Rahmat Hidayat, S.P., M.Env",
    batchCode: "BATCH-AGRO-2026-09B",
    commodity: "Japanese Honeydew Melon Arus (Blok B-4)",
    soilOrganicMatterPct: 5.8,
    pesticideResiduePpm: 0.0,
    heavyMetalLeadPpm: 0.001,
    certificationStatus: "TERSERTIFIKASI_PENUH",
    accreditedBody: "Lembaga Sertifikasi Organik (LSO) Seloliman No. 042-LSO-IDN",
    inspectionNotes: "Pengendalian hama memakai Trichoderma & Bacillus thuringiensis. Kualitas premium.",
  },
];

const AgroContext = createContext<AgroContextType | undefined>(undefined);

export function AgroProvider({ children }: { children: React.ReactNode }) {
  const [zones, setZones] = useState<GreenhouseZone[]>(INITIAL_ZONES);
  const [plots, setPlots] = useState<HarvestPlot[]>(INITIAL_PLOTS);
  const [tanks, setTanks] = useState<NutrisiTank[]>(INITIAL_TANKS);
  const [auditLogs, setAuditLogs] = useState<OrganicAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [selectedZoneId, setSelectedZoneId] = useState<string>("GH-01");

  useEffect(() => {
    try {
      const savedZones = localStorage.getItem("agroharvest_zones");
      const savedPlots = localStorage.getItem("agroharvest_plots");
      const savedTanks = localStorage.getItem("agroharvest_tanks");
      const savedAudit = localStorage.getItem("agroharvest_audit");
      if (savedZones) setZones(JSON.parse(savedZones));
      if (savedPlots) setPlots(JSON.parse(savedPlots));
      if (savedTanks) setTanks(JSON.parse(savedTanks));
      if (savedAudit) setAuditLogs(JSON.parse(savedAudit));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("agroharvest_zones", JSON.stringify(zones));
      localStorage.setItem("agroharvest_plots", JSON.stringify(plots));
      localStorage.setItem("agroharvest_tanks", JSON.stringify(tanks));
      localStorage.setItem("agroharvest_audit", JSON.stringify(auditLogs));
    } catch {}
  }, [zones, plots, tanks, auditLogs]);

  const toggleIrrigation = (zoneId: string) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id !== zoneId) return z;
        const nextStatus =
          z.irrigationStatus === "DRIP_ACTIVE"
            ? "MISTING_PAUSED"
            : z.irrigationStatus === "MISTING_PAUSED"
            ? "STANDBY"
            : "DRIP_ACTIVE";
        const nextFlow = nextStatus === "DRIP_ACTIVE" ? 18.5 : nextStatus === "MISTING_PAUSED" ? 10.0 : 0.0;
        return { ...z, irrigationStatus: nextStatus, valveFlowRateLpm: nextFlow };
      })
    );
  };

  const adjustDripFlow = (zoneId: string, delta: number) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? { ...z, valveFlowRateLpm: Math.max(0, Math.round((z.valveFlowRateLpm + delta) * 10) / 10) }
          : z
      )
    );
  };

  const adjustDosingRate = (tankId: string, delta: number) => {
    setTanks((prev) =>
      prev.map((t) =>
        t.id === tankId
          ? { ...t, dosingRateMlPerM3: Math.max(10, Math.round(t.dosingRateMlPerM3 + delta)) }
          : t
      )
    );
  };

  const toggleTankStatus = (tankId: string) => {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== tankId) return t;
        const next =
          t.status === "DOSING_ACTIVE"
            ? "RECIRCULATING"
            : t.status === "RECIRCULATING"
            ? "REFILL_WARNING"
            : "DOSING_ACTIVE";
        return { ...t, status: next };
      })
    );
  };

  const addHarvestPlot = (p: Omit<HarvestPlot, "id">) => {
    const newId = `PLT-${String(plots.length + 5).padStart(2, "0")}`;
    setPlots((prev) => [{ ...p, id: newId }, ...prev]);
  };

  const updateHarvestStatus = (plotId: string, status: HarvestPlot["status"]) => {
    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, status } : p))
    );
  };

  const harvestAndDispatch = (plotId: string) => {
    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, status: "HARVESTED", harvestReadinessPct: 100 } : p))
    );
  };

  const resetAgroData = () => {
    setZones(INITIAL_ZONES);
    setPlots(INITIAL_PLOTS);
    setTanks(INITIAL_TANKS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSelectedZoneId("GH-01");
    localStorage.removeItem("agroharvest_zones");
    localStorage.removeItem("agroharvest_plots");
    localStorage.removeItem("agroharvest_tanks");
    localStorage.removeItem("agroharvest_audit");
  };

  const totalYieldKg = plots.reduce((sum, p) => sum + p.projectedYieldKg, 0);
  const avgHealth =
    Math.round((zones.reduce((sum, z) => sum + z.healthScorePct, 0) / zones.length) * 10) / 10;

  const kpis: AgroKpi = {
    totalFarmAreaHectares: 14.8,
    activeGreenhouses: zones.length,
    dailyWaterUsageLiters: 16840,
    meanCropHealthPct: avgHealth,
    monthlyYieldProjectionTons: Math.round((totalYieldKg / 1000) * 10) / 10,
    solarEnergySelfSufficiencyPct: 88.5,
  };

  return (
    <AgroContext.Provider
      value={{
        zones,
        plots,
        tanks,
        auditLogs,
        selectedZoneId,
        setSelectedZoneId,
        kpis,
        toggleIrrigation,
        adjustDripFlow,
        adjustDosingRate,
        toggleTankStatus,
        addHarvestPlot,
        updateHarvestStatus,
        harvestAndDispatch,
        resetAgroData,
      }}
    >
      {children}
    </AgroContext.Provider>
  );
}

export function useAgro() {
  const context = useContext(AgroContext);
  if (!context) throw new Error("useAgro must be used within AgroProvider");
  return context;
}
