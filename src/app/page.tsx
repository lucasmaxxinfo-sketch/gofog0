"use client";

import { useEffect, useState } from 'react';
import { MOCK_PROJECT_DATA } from '@/lib/mock-data';
import StatusGrid from '@/components/dashboard/StatusGrid';
import FileTreeViewer from '@/components/dashboard/FileTreeViewer';
import AIHealthTool from '@/components/dashboard/AIHealthTool';
import ConfigPanel from '@/components/dashboard/ConfigPanel';
import ModificationAuditor from '@/components/dashboard/ModificationAuditor';
import CommandCenter from '@/components/dashboard/CommandCenter';
import { Smartphone, ShieldCheck, Activity, Search, RefreshCw, Box, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function CapacitorInsightDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen blueprint-grid text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary shadow-[0_0_20px_rgba(77,123,255,0.3)]">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold tracking-tight text-foreground">CAPACITOR<span className="text-primary">INSIGHT</span></h1>
              <p className="text-[10px] font-headline tracking-widest text-muted-foreground uppercase">Precision Build Diagnostics v1.0.4</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-headline font-medium text-primary uppercase tracking-wider">Sync: Active</span>
            </div>
            <Button size="sm" variant="outline" className="h-9 font-headline border-primary/20 hover:bg-primary/10">
              <RefreshCw className="mr-2 h-4 w-4" />
              RERUN REPORT
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Top Level Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-primary pl-6 bg-primary/5 py-6 rounded-r-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-headline font-bold text-foreground uppercase tracking-tight">
                Capacitor Completion Report
              </h2>
            </div>
            <p className="text-sm text-muted-foreground font-body max-w-2xl">
              Comprehensive audit of project synchronization, manifest validity, and Android build environment readiness for APK generation.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-headline text-muted-foreground uppercase tracking-widest">Global Build Health</span>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-1 font-headline">
                  <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                  STABLE ENVIRONMENT
                </Badge>
             </div>
          </div>
        </div>

        {/* Report Metrics Grid */}
        <StatusGrid data={MOCK_PROJECT_DATA} />

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Hierarchy & Logic */}
          <div className="space-y-8 col-span-1">
            <FileTreeViewer />
            <CommandCenter data={MOCK_PROJECT_DATA} />
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 space-y-3">
              <h3 className="text-xs font-headline font-bold text-destructive uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5" />
                IDENTIFIED BUILD BLOCKERS
              </h3>
              <ul className="space-y-2">
                {MOCK_PROJECT_DATA.blockers.map((b, i) => (
                  <li key={i} className="text-[10px] font-code text-destructive/90 flex gap-2">
                    <span className="text-destructive font-bold">!</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right/Middle Column - Analysis & Manifests */}
          <div className="space-y-8 col-span-1 lg:col-span-2">
            <AIHealthTool data={MOCK_PROJECT_DATA} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ConfigPanel data={MOCK_PROJECT_DATA} />
              <ModificationAuditor data={MOCK_PROJECT_DATA} />
            </div>

            {/* Plugin Dependency Tracker */}
            <Card className="bg-card/40 border-primary/20">
               <div className="p-4 border-b border-primary/10 flex items-center justify-between">
                  <h3 className="text-sm font-headline font-bold text-primary flex items-center gap-2">
                    <Box className="h-4 w-4" />
                    CAPACITOR PLUGIN AUDIT
                  </h3>
                  <Badge variant="outline" className="text-[10px] font-code border-primary/20 text-primary">
                    {MOCK_PROJECT_DATA.plugins.length} MODULES DETECTED
                  </Badge>
               </div>
               <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_PROJECT_DATA.plugins.map((plugin) => (
                      <div key={plugin} className="flex flex-col gap-1 p-3 rounded bg-background/40 border border-border group hover:border-primary/40 transition-colors">
                        <span className="text-[9px] font-headline text-muted-foreground uppercase">Module ID</span>
                        <span className="text-xs font-code font-bold truncate text-foreground/90">{plugin}</span>
                        <div className="mt-2 flex items-center justify-between">
                           <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] h-4">v5.0.0</Badge>
                           <span className="text-[8px] font-code text-green-500 font-bold uppercase">Linked</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </Card>
          </div>

        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-background/95 border-t border-primary/10 backdrop-blur-sm h-12 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
           <div className="flex gap-6">
              <span className="text-[9px] font-headline text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                <Search className="h-3 w-3 text-primary/60" />
                MANIFEST SCAN: COMPLETED
              </span>
              <span className="text-[9px] font-headline text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                <Smartphone className="h-3 w-3 text-primary/60" />
                ANDROID SCRUTINIZER: OK
              </span>
           </div>
           <div className="text-[9px] font-code text-primary/40">
             CAPACITOR COMPLETION REPORT // REF: 882-INSIGHT-4 // 2024-05-20
           </div>
        </div>
      </footer>
    </div>
  );
}