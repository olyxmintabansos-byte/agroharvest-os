"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAgro } from "@/context/AgroContext";
import { Sprout, Calendar, Beaker, Award, RotateCcw, Droplets } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { kpis, resetAgroData } = useAgro();

  const links = [
    { href: "/", label: "GREENHOUSE", icon: Sprout },
    { href: "/panen/", label: "PANEN & YIELD", icon: Calendar },
    { href: "/nutrisi/", label: "DOSING NPK", icon: Beaker },
    { href: "/sertifikasi/", label: "SNI ORGANIK A4", icon: Award },
  ];

  return (
    <header className="bg-[#FAFDF9] text-[#2D4B32] sticky top-0 z-50 select-none shadow-[0_2px_12px_rgba(139,168,136,0.15)] font-sans border-b border-[#E2EBE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EAF1E9] flex items-center justify-center text-[#557B52] shadow-inner">
            <Sprout className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-[#2D4B32] uppercase">
                AGROHARVEST <span className="text-[#8BA888]">OS</span>
              </h1>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#EAF1E9] text-[#4A6E46] font-bold uppercase tracking-wider hidden sm:inline-block">
                TITAN #31 // ORGANIC PASTEL
              </span>
            </div>
            <p className="text-[10px] text-[#789376] font-mono tracking-tight uppercase">
              SMART PRECISION AGRICULTURE // FERTIGATION & SNI ORGANIC
            </p>
          </div>
        </div>

        {/* Telemetry Ribbons */}
        <div className="hidden xl:flex items-center gap-6 text-xs font-mono border-l border-[#D5E2D2] pl-6">
          <div>
            <span className="text-[9px] text-[#789376] uppercase font-bold block">PROYEKSI BULANAN:</span>
            <span className="font-bold text-[#2D4B32]">{kpis.monthlyYieldProjectionTons} Ton Panen</span>
          </div>

          <div>
            <span className="text-[9px] text-[#789376] uppercase font-bold block">AIR FERTIGASI:</span>
            <span className="font-bold text-[#557B52] flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5" />
              {kpis.dailyWaterUsageLiters.toLocaleString("id-ID")} L/hari
            </span>
          </div>

          <div>
            <span className="text-[9px] text-[#789376] uppercase font-bold block">KESEHATAN VIGOR:</span>
            <span className="font-bold text-[#4A6E46]">{kpis.meanCropHealthPct}% SEHAT</span>
          </div>
        </div>

        {/* Navigation Tabs (Organic Rounded Pills) */}
        <div className="flex items-center gap-2 flex-wrap">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/"
                ? pathname === "/" || pathname === ""
                : pathname?.startsWith(link.href.replace(/\/$/, ""));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full transition-all ${
                  isActive
                    ? "bg-[#8BA888] text-white shadow-sm"
                    : "bg-[#F0F5EF] text-[#4A6E46] hover:bg-[#E2EBE0]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              if (confirm("Reset seluruh data sensor greenhouse dan plot panen ke awal?")) {
                resetAgroData();
              }
            }}
            title="Reset Data Pertanian"
            className="p-2 rounded-full bg-[#F0F5EF] text-[#789376] hover:text-[#2D4B32] hover:bg-[#E2EBE0] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
