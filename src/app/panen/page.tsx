"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAgro } from "@/context/AgroContext";
import { HarvestPlot } from "@/types/agro";
import {
  Calendar,
  Sprout,
  PlusCircle,
  Truck,
  CheckCircle2,
  Award,
  Search,
  Filter,
} from "lucide-react";

export default function HarvestCalendarPage() {
  const { plots, addHarvestPlot, updateHarvestStatus, harvestAndDispatch } = useAgro();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal new plot state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlotName, setNewPlotName] = useState("Blok E-1 // Greenhouse Melon Barat");
  const [newCommodity, setNewCommodity] = useState("");
  const [newVariety, setNewVariety] = useState("");
  const [newPlanting, setNewPlanting] = useState("20 Agu 2026");
  const [newTarget, setNewTarget] = useState("10 Nov 2026");
  const [newYield, setNewYield] = useState(1500);

  const filteredPlots = plots.filter((p) => {
    const matchSearch =
      p.commodity.toLowerCase().includes(search.toLowerCase()) ||
      p.plotName.toLowerCase().includes(search.toLowerCase()) ||
      p.variety.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreatePlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommodity.trim()) return;

    addHarvestPlot({
      plotName: newPlotName,
      commodity: newCommodity,
      variety: newVariety || "Varietas Unggul F1 Organik",
      plantingDate: newPlanting,
      targetHarvestDate: newTarget,
      projectedYieldKg: Number(newYield) || 1000,
      harvestReadinessPct: 15,
      sniOrganicCertified: true,
      status: "GROWTH_VEGETATIVE",
      destinationColdStore: "ColdStore WMS Chamber CH-03 (+2°C)",
    });

    setNewCommodity("");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D4B32] font-sans pb-20 selection:bg-[#8BA888] selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Soft Organic Header */}
        <section className="p-8 rounded-[2.5rem] bg-[#EAF1E9] border border-[#D5E2D2] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#4A6E46] text-xs font-mono font-bold uppercase shadow-sm mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#8BA888]" />
              HARVEST CYCLE & BATCH PROJECTION CALENDAR
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D4B32] tracking-tight uppercase">
              JADWAL ROTASI PANEN & SERTIFIKASI ORGANIK
            </h2>
            <p className="text-xs text-[#5D7A5A] max-w-3xl leading-relaxed">
              Manajemen estimasi tonase hasil panen per-blok, verifikasi tanggal kematangan brix buah, sertifikasi SNI Organik, dan serah terima logistik ke fasilitas Cold Storage berpendingin.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="px-5 py-3 rounded-full bg-[#8BA888] text-white hover:bg-[#789675] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm self-start lg:self-auto transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            {showAddModal ? "TUTUP ENTRY FORM" : "+ DAFTARKAN BLOK TANAM"}
          </button>
        </section>

        {/* Modal Form */}
        {showAddModal && (
          <section className="p-6 rounded-[2rem] bg-white border-2 border-[#8BA888] shadow-md space-y-4">
            <h3 className="text-sm font-bold text-[#2D4B32] uppercase font-mono">
              FORM REGISTRASI BLOK PENANAMAN ORGANIK BARU
            </h3>

            <form onSubmit={handleCreatePlot} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#789376] uppercase font-bold mb-1">NAMA BLOK / GREENHOUSE:</label>
                  <input
                    type="text"
                    value={newPlotName}
                    onChange={(e) => setNewPlotName(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-[#F0F5EF] border border-[#D5E2D2] outline-none text-[#2D4B32]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#789376] uppercase font-bold mb-1">KOMODITAS TANAMAN:</label>
                  <input
                    type="text"
                    value={newCommodity}
                    onChange={(e) => setNewCommodity(e.target.value)}
                    placeholder="Contoh: Japanese Crown Melon Arus"
                    className="w-full p-2.5 rounded-2xl bg-[#F0F5EF] border border-[#D5E2D2] outline-none text-[#2D4B32]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#789376] uppercase font-bold mb-1">VARIETAS / METODE TANAM:</label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    placeholder="Contoh: Drip Cocopeat Substrate"
                    className="w-full p-2.5 rounded-2xl bg-[#F0F5EF] border border-[#D5E2D2] outline-none text-[#2D4B32]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#789376] uppercase font-bold mb-1">TANGGAL SEMAI / TANAM:</label>
                  <input
                    type="text"
                    value={newPlanting}
                    onChange={(e) => setNewPlanting(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-[#F0F5EF] border border-[#D5E2D2] outline-none text-[#2D4B32]"
                  />
                </div>
                <div>
                  <label className="block text-[#789376] uppercase font-bold mb-1">TARGET TANGGAL PANEN:</label>
                  <input
                    type="text"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-[#F0F5EF] border border-[#D5E2D2] outline-none text-[#2D4B32]"
                  />
                </div>
                <div>
                  <label className="block text-[#789376] uppercase font-bold mb-1">ESTIMASI TONASE PANEN (KG):</label>
                  <input
                    type="number"
                    value={newYield}
                    onChange={(e) => setNewYield(Number(e.target.value))}
                    className="w-full p-2.5 rounded-2xl bg-[#F0F5EF] border border-[#D5E2D2] outline-none text-[#2D4B32]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-[#789376] hover:text-[#2D4B32]"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#8BA888] text-white font-bold hover:bg-[#789675]"
                >
                  SIMPAN JADWAL PANEN
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Filter Strip */}
        <section className="p-4 rounded-[2rem] bg-white border border-[#E2EBE0] shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-[#789376] uppercase">STATUS:</span>
            {["ALL", "GROWTH_VEGETATIVE", "MATURATION", "READY_TO_HARVEST", "HARVESTED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                  statusFilter === st
                    ? "bg-[#8BA888] text-white shadow-sm"
                    : "bg-[#F0F5EF] text-[#5D7A5A] hover:bg-[#E2EBE0]"
                }`}
              >
                {st.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#789376] absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Komoditas atau Blok..."
              className="pl-9 pr-4 py-2 rounded-full bg-[#F0F5EF] outline-none text-xs font-mono text-[#2D4B32] w-56 sm:w-64"
            />
          </div>
        </section>

        {/* Harvest Plots List */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlots.map((plot) => {
            const isReady = plot.status === "READY_TO_HARVEST";
            const isDone = plot.status === "HARVESTED";

            return (
              <div
                key={plot.id}
                className="p-6 rounded-[2rem] bg-white border border-[#E2EBE0] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#789376] uppercase">{plot.id}</span>
                      <h4 className="text-base font-bold text-[#2D4B32]">{plot.commodity}</h4>
                      <p className="text-[11px] text-[#789376] italic">{plot.variety}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-full ${
                          isReady
                            ? "bg-[#DCE7DA] text-[#2D4B32]"
                            : isDone
                            ? "bg-[#F0F5EF] text-[#789376]"
                            : "bg-[#FEF9E7] text-[#9E812D]"
                        }`}
                      >
                        {plot.status.replace(/_/g, " ")}
                      </span>
                      {plot.sniOrganicCertified && (
                        <div className="text-[9px] text-[#4A6E46] flex items-center justify-end gap-1 mt-1 font-mono font-bold">
                          <Award className="w-3 h-3 text-[#8BA888]" />
                          SNI ORGANIK 6729:2016
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#F0F5EF] text-xs font-mono space-y-1">
                    <div className="text-[#5D7A5A]">Lokasi: <strong>{plot.plotName}</strong></div>
                    <div className="text-[#5D7A5A]">Target Panen: <strong>{plot.targetHarvestDate}</strong> (Tanam: {plot.plantingDate})</div>
                    <div className="text-[#5D7A5A]">Tujuan Cold Storage: <strong className="text-[#4A6E46]">{plot.destinationColdStore}</strong></div>
                  </div>

                  {/* Readiness Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-[#789376]">
                      <span>KEMATANGAN BUAH: {plot.harvestReadinessPct}%</span>
                      <span className="font-bold text-[#2D4B32]">EST. {plot.projectedYieldKg.toLocaleString("id-ID")} KG</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#E2EBE0] overflow-hidden">
                      <div
                        className="h-full bg-[#8BA888] rounded-full transition-all duration-500"
                        style={{ width: `${plot.harvestReadinessPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Dispatch Button */}
                <div className="pt-2 border-t border-[#E2EBE0] flex justify-end gap-2">
                  {!isDone ? (
                    <button
                      onClick={() => harvestAndDispatch(plot.id)}
                      className={`px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                        isReady
                          ? "bg-[#8BA888] hover:bg-[#789675] text-white shadow-sm"
                          : "bg-[#F0F5EF] hover:bg-[#E2EBE0] text-[#4A6E46]"
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      {isReady ? "PANEN & DISPATCH KE COLDSTORE" : "PANEN DINI"}
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-[#789376] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8BA888]" />
                      SUDAH DIPANEN KE COLD CHAIN
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
