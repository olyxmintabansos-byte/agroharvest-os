"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useAgro } from "@/context/AgroContext";
import {
  Beaker,
  Droplets,
  Plus,
  Minus,
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function NutrisiPage() {
  const { tanks, adjustDosingRate, toggleTankStatus } = useAgro();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D4B32] font-sans pb-20 selection:bg-[#8BA888] selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Organic Soft Header */}
        <section className="p-8 rounded-[2.5rem] bg-[#EAF1E9] border border-[#D5E2D2] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#4A6E46] text-xs font-mono font-bold uppercase shadow-sm mb-2">
              <Beaker className="w-3.5 h-3.5 text-[#E8A588]" />
              NPK DUAL-STAGE FERTIGATION & pH DOSING BLENDER
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D4B32] tracking-tight uppercase">
              STASIUN PENCAMPURAN NUTRISI HIDROPONIK
            </h2>
            <p className="text-xs text-[#5D7A5A] max-w-3xl leading-relaxed">
              Injeksi otomatis larutan hara Makro Stock A (Kalsium & Besi), Stock B (Fosfat & Magnesium), Asam Sitrat Organik penyeimbang pH, dan Bio-Stimulan rumput laut cair ke dalam saluran pipa irigasi tertutup.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#5D7A5A]">TOTAL DOSING:</span>
            <span className="px-4 py-2 rounded-full bg-white text-[#2D4B32] text-xs font-mono font-bold shadow-sm">
              {tanks.reduce((sum, t) => sum + t.dosingRateMlPerM3, 0)} mL / m³ AIR
            </span>
          </div>
        </section>

        {/* NUTRITION TANKS GRID (Organic Containers) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tanks.map((tank) => {
            const fillPct = Math.round((tank.currentVolumeLiters / tank.maxCapacityLiters) * 100);
            const isDosing = tank.status === "DOSING_ACTIVE";

            return (
              <div
                key={tank.id}
                className="p-6 rounded-[2.5rem] bg-white border border-[#E2EBE0] shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#789376] uppercase">{tank.id}</span>
                    <button
                      onClick={() => toggleTankStatus(tank.id)}
                      className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full transition-all ${
                        isDosing
                          ? "bg-[#DCE7DA] text-[#2D4B32]"
                          : tank.status === "RECIRCULATING"
                          ? "bg-[#FEF9E7] text-[#9E812D]"
                          : "bg-[#FDF4F0] text-[#E8A588]"
                      }`}
                    >
                      {tank.status.replace(/_/g, " ")}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-[#2D4B32] leading-tight">{tank.name}</h3>

                  {/* Organic Fluid Tank Level Visualizer */}
                  <div className="py-2 flex justify-center">
                    <div className="w-28 h-36 rounded-[2rem] bg-[#F0F5EF] border-2 border-[#D5E2D2] relative overflow-hidden flex flex-col justify-end p-2 items-center">
                      <div
                        className="w-full bg-[#8BA888]/80 rounded-[1.5rem] transition-all duration-700 flex items-center justify-center text-white font-mono text-xs font-bold"
                        style={{ height: `${fillPct}%` }}
                      >
                        {fillPct}%
                      </div>
                      <span className="absolute top-2 text-[9px] font-mono text-[#789376]">
                        {tank.currentVolumeLiters} L
                      </span>
                    </div>
                  </div>

                  {/* Chemical Composition Summary */}
                  <div className="p-3 rounded-2xl bg-[#F0F5EF] text-[11px] font-mono space-y-1">
                    <div className="text-[9px] text-[#789376] uppercase font-bold">KOMPOSISI HARA:</div>
                    <div className="text-[#2D4B32] leading-tight text-[10px]">{tank.keyNutrients}</div>
                  </div>

                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-[#5D7A5A]">
                      <span>LAJU INJEKSI DOSIS:</span>
                      <span className="font-bold text-[#2D4B32]">{tank.dosingRateMlPerM3} mL / m³</span>
                    </div>
                    <div className="flex justify-between text-[#5D7A5A]">
                      <span>TARGET KONSENTRASI:</span>
                      <span className="font-bold text-[#8BA888]">{tank.targetPpm} PPM</span>
                    </div>
                  </div>
                </div>

                {/* Tactile Dosing Adjusters */}
                <div className="pt-3 border-t border-[#E2EBE0] flex items-center gap-2">
                  <button
                    onClick={() => adjustDosingRate(tank.id, -25)}
                    className="p-1.5 rounded-full bg-[#F0F5EF] hover:bg-[#E2EBE0] text-[#2D4B32]"
                    title="Kurangi Dosis (-25 mL)"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-1 text-center font-mono text-xs font-bold text-[#2D4B32]">
                    {tank.dosingRateMlPerM3} mL
                  </div>

                  <button
                    onClick={() => adjustDosingRate(tank.id, 25)}
                    className="p-1.5 rounded-full bg-[#F0F5EF] hover:bg-[#E2EBE0] text-[#2D4B32]"
                    title="Tambah Dosis (+25 mL)"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
