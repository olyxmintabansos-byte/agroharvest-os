"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useAgro } from "@/context/AgroContext";
import {
  Award,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Calendar,
  Sparkles,
  QrCode,
} from "lucide-react";

export default function SertifikasiPage() {
  const { auditLogs, kpis } = useAgro();

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D4B32] font-sans pb-20 selection:bg-[#8BA888] selection:text-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Header Toolbar (Hidden on Print) */}
        <section className="print:hidden p-8 rounded-[2.5rem] bg-[#EAF1E9] border border-[#D5E2D2] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#789376] block">
              DOKUMEN RESMI SERTIFIKASI SISTEM PERTANIAN ORGANIK
            </span>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#2D4B32]">
              PASPOR KETERTELUSURAN & STANDAR SNI ORGANIK 6729:2016
            </h2>
            <p className="text-xs text-[#5D7A5A]">
              Sertifikat jaminan integritas organik tanpa pestisida kimia sintetis, terverifikasi laboratorium terakreditasi KAN.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-[#8BA888] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm hover:bg-[#789675] self-start sm:self-auto transition-all"
          >
            <Printer className="w-4 h-4" />
            CETAK / EKSPOR PDF A4
          </button>
        </section>

        {/* PRINTABLE A4 ORGANIC PASSPORT CONTAINER */}
        <section className="p-8 sm:p-14 rounded-[2.5rem] bg-white border border-[#D5E2D2] shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none print:rounded-none">
          {/* Certificate Header */}
          <div className="border-b-2 border-[#D5E2D2] pb-6 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EAF1E9] flex items-center justify-center text-[#557B52]">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D4B32] tracking-tight uppercase">
                    NUSANTARA AGRO ORGANIC HORTICULTURE
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#5D7A5A]">
                  Lembaga Sertifikasi Organik (LSO) Seloliman // Akreditasi KAN LSO-042-IDN
                </p>
                <p className="text-[10px] font-mono text-[#789376]">
                  Kebun Percobaan Dago Pakar Organic Valley, Blok A s/d D, Bandung Jawa Barat
                </p>
              </div>

              <div className="text-right">
                <span className="text-[9px] font-mono font-bold px-3 py-1 rounded-full bg-[#EAF1E9] text-[#2D4B32] uppercase">
                  STATUS: SNI 6729:2016 COMPLIANT
                </span>
                <p className="text-xs font-mono font-bold mt-1 text-[#2D4B32]">REG: SNI-ORG-2026-0418</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E2EBE0] text-xs font-mono">
              <div>
                <span className="text-[9px] text-[#789376] block uppercase">TOTAL AREA ORGANIK:</span>
                <span className="font-bold text-[#2D4B32]">{kpis.totalFarmAreaHectares} Hektare</span>
              </div>
              <div>
                <span className="text-[9px] text-[#789376] block uppercase">RESIDU PESTISIDA:</span>
                <span className="font-bold text-[#4A6E46]">0.000 PPM (UNDETECTED)</span>
              </div>
              <div>
                <span className="text-[9px] text-[#789376] block uppercase">ORGANIC CARBON SOIL:</span>
                <span className="font-bold text-[#2D4B32]">6.4% (EXCELLENT)</span>
              </div>
              <div>
                <span className="text-[9px] text-[#789376] block uppercase">MASA BERLAKU SERTIFIKAT:</span>
                <span className="font-bold text-[#2D4B32]">Hingga 31 Des 2028</span>
              </div>
            </div>
          </div>

          {/* AUDIT LOG TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold uppercase text-[#2D4B32]">LOG UJI LABORATORIUM RESIDU KIMIA & LOGAM BERAT</span>
              <span className="text-[10px] text-[#789376]">AKREDITASI ISO/IEC 17025</span>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-[#FAFDF9] border border-[#E2EBE0] p-2">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-[10px] text-[#789376] border-b border-[#E2EBE0] uppercase">
                  <tr>
                    <th className="p-2.5">KODE BATCH</th>
                    <th className="p-2.5">KOMODITAS & BLOK</th>
                    <th className="p-2.5">RESIDU PESTISIDA</th>
                    <th className="p-2.5">TIMBAL (Pb)</th>
                    <th className="p-2.5">STATUS</th>
                    <th className="p-2.5">CATATAN INSPEKTUR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2EBE0] text-[11px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="p-2.5 font-bold text-[#2D4B32]">{log.batchCode}</td>
                      <td className="p-2.5 text-[#5D7A5A]">
                        <div>{log.commodity}</div>
                        <div className="text-[9px] text-[#789376]">{log.auditDate}</div>
                      </td>
                      <td className="p-2.5 font-bold text-[#4A6E46]">{log.pesticideResiduePpm} PPM</td>
                      <td className="p-2.5 text-[#2D4B32]">{log.heavyMetalLeadPpm} PPM</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#DCE7DA] text-[#2D4B32]">
                          LULUS PENUH
                        </span>
                      </td>
                      <td className="p-2.5 text-[10px] text-[#5D7A5A] max-w-xs">{log.inspectionNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DUAL SIGNATURE BLOCK */}
          <div className="pt-8 border-t-2 border-[#D5E2D2] grid grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-14">
              <div>
                <span className="text-[9px] text-[#789376] uppercase block">INSPEKTUR PERTANIAN ORGANIK:</span>
                <p className="font-bold text-[#2D4B32]">LEAD ORGANIC AUDITOR</p>
              </div>
              <div className="border-t border-[#8BA888] pt-1">
                <p className="font-bold text-[#2D4B32] underline">Ir. Dian Kusuma Wardani, M.Sc.</p>
                <p className="text-[9px] text-[#789376]">Auditor Kepala Sertifikasi SNI 6729:2016</p>
              </div>
            </div>

            <div className="space-y-14 text-right">
              <div>
                <span className="text-[9px] text-[#789376] uppercase block">PENGELOLA KEBUN PRODUKSI:</span>
                <p className="font-bold text-[#2D4B32]">HEAD OF FARM OPERATIONS</p>
              </div>
              <div className="border-t border-[#8BA888] pt-1">
                <p className="font-bold text-[#2D4B32] underline">Dr. Rahmat Hidayat, S.P., M.Env.</p>
                <p className="text-[9px] text-[#789376]">Direktur Operasional Budidaya Presisi</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
