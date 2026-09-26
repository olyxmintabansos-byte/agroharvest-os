"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useAgro } from "@/context/AgroContext";
import {
  Sprout,
  Droplets,
  Sun,
  Activity,
  Wind,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function GreenhouseMeshPage() {
  const { zones, selectedZoneId, setSelectedZoneId, toggleIrrigation, adjustDripFlow } = useAgro();

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D4B32] font-sans pb-20 selection:bg-[#8BA888] selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Soft Organic Blob Hero */}
        <section className="p-8 rounded-[2.5rem] bg-[#EAF1E9] border border-[#D5E2D2] shadow-sm relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#4A6E46] text-xs font-mono font-bold uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A588]" />
              SMART SENSOR MESH & PRECISION HYDROPONIC
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D4B32] tracking-tight">
              TELEMETRI GREENHOUSE & OTOMASI FERTIGASI TETES
            </h2>
            <p className="text-xs text-[#5D7A5A] leading-relaxed">
              Monitoring parameter mikro-klimat tanaman organik: kelembapan media tanam, intensitas radiasi matahari lux, nilai konduktivitas elektrik EC nutrisi, dan laju aliran katup irigasi presisi.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="px-4 py-2 rounded-2xl bg-white text-xs font-mono text-[#4A6E46] shadow-sm flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#8BA888] animate-pulse" />
              <span>4/4 ZONA IRIGASI ONLINE</span>
            </div>
          </div>
        </section>

        {/* GREENHOUSE ZONES GRID (Organic Curves) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {zones.map((zone) => {
            const isSelected = zone.id === selectedZoneId;
            const isDripOn = zone.irrigationStatus === "DRIP_ACTIVE";

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`p-6 rounded-[2rem] transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? "bg-[#EAF1E9] border-2 border-[#8BA888] shadow-md"
                    : "bg-white border border-[#E2EBE0] hover:border-[#8BA888] shadow-sm"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#789376] uppercase">{zone.id}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        isDripOn ? "bg-[#DCE7DA] text-[#2D4B32]" : "bg-[#FDF4F0] text-[#E8A588]"
                      }`}
                    >
                      {zone.irrigationStatus.replace(/_/g, " ")}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#2D4B32] leading-tight">{zone.name}</h3>
                  <p className="text-[10px] italic text-[#789376]">{zone.cropType}</p>

                  {/* Organic Circular Health Gauge */}
                  <div className="py-2 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-[#F0F5EF] border border-[#D5E2D2] flex flex-col items-center justify-center relative">
                      <span className="text-2xl font-black font-mono text-[#2D4B32]">{zone.healthScorePct}%</span>
                      <span className="text-[8px] text-[#789376] uppercase">VIGOR INDEX</span>
                    </div>
                  </div>

                  {/* Micro-climate Metrics */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#5D7A5A]">
                      <span>KELEMBAPAN MEDIA:</span>
                      <span className="font-bold text-[#2D4B32]">{zone.soilMoisturePct}%</span>
                    </div>
                    <div className="flex justify-between text-[#5D7A5A]">
                      <span>SUHU AMBIENT:</span>
                      <span className="font-bold text-[#2D4B32]">{zone.ambientTempC}°C</span>
                    </div>
                    <div className="flex justify-between text-[#5D7A5A]">
                      <span>NUTRISI EC / pH:</span>
                      <span className="font-bold text-[#8BA888]">{zone.ecConductivityMs} mS / {zone.phLevel}</span>
                    </div>
                    <div className="flex justify-between text-[#5D7A5A]">
                      <span>LAJU KATUP TETES:</span>
                      <span className="font-bold text-[#2D4B32]">{zone.valveFlowRateLpm} L/menit</span>
                    </div>
                  </div>
                </div>

                {/* Tactile Drip Valve Controls */}
                <div className="pt-2 border-t border-[#E2EBE0] flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      adjustDripFlow(zone.id, -2);
                    }}
                    title="Kurangi Debit (-2 L/min)"
                    className="p-1.5 rounded-full bg-[#F0F5EF] hover:bg-[#E2EBE0] text-[#2D4B32]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleIrrigation(zone.id);
                    }}
                    className={`flex-1 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                      isDripOn
                        ? "bg-[#8BA888] text-white"
                        : "bg-[#FDF4F0] text-[#C77A57] hover:bg-[#FBECE5]"
                    }`}
                  >
                    {isDripOn ? "IRIGASI AKTIF" : "AKTIFKAN KATUP"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      adjustDripFlow(zone.id, 2);
                    }}
                    title="Tambah Debit (+2 L/min)"
                    className="p-1.5 rounded-full bg-[#F0F5EF] hover:bg-[#E2EBE0] text-[#2D4B32]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* DETAILED SENSOR READOUT FOR SELECTED GREENHOUSE */}
        <section className="p-8 rounded-[2.5rem] bg-white border border-[#E2EBE0] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EBE0] pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#789376] uppercase tracking-wider block">PARAMETER MIKRO-KLIMAT DETAIL</span>
              <h3 className="text-lg font-bold text-[#2D4B32] uppercase">{selectedZone.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#F0F5EF] text-[#4A6E46]">
                SPEKTRUM CAHAYA: {selectedZone.solarRadiationLux.toLocaleString("id-ID")} LUX
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-3xl bg-[#F0F5EF] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#4A6E46] font-bold">
                <Droplets className="w-4 h-4 text-[#8BA888]" />
                MEDIA TANAM & FERTIGASI
              </div>
              <div className="text-2xl font-bold font-mono text-[#2D4B32]">{selectedZone.soilMoisturePct}%</div>
              <p className="text-[11px] text-[#5D7A5A]">Substrat cocopeat-perlite terjaga pada titik kapasitas lapang optimal.</p>
            </div>

            <div className="p-5 rounded-3xl bg-[#FDF4F0] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#C77A57] font-bold">
                <Sun className="w-4 h-4 text-[#E8A588]" />
                SUHU & RADIASI SURYA
              </div>
              <div className="text-2xl font-bold font-mono text-[#2D4B32]">{selectedZone.ambientTempC}°C</div>
              <p className="text-[11px] text-[#7A5A4D]">Tirai peneduh (shading screen) otomatis terbuka 60% menyerap sinar pagi.</p>
            </div>

            <div className="p-5 rounded-3xl bg-[#FEF9E7] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#9E812D] font-bold">
                <Activity className="w-4 h-4 text-[#F3D687]" />
                KESEIMBANGAN HARA (EC/pH)
              </div>
              <div className="text-2xl font-bold font-mono text-[#2D4B32]">{selectedZone.ecConductivityMs} mS</div>
              <p className="text-[11px] text-[#736336]">pH larutan hara 6.2 sempurna untuk serapan nitrogen & kalium tanaman buah.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
