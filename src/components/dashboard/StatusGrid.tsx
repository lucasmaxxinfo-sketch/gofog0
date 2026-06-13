import { CapacitorProjectData } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Smartphone, FolderCode, FileJson, MapPin, ShieldCheck } from 'lucide-react';

export default function StatusGrid({ data }: { data: CapacitorProjectData }) {
  const metrics = [
    {
      label: 'Core Version',
      value: data.capacitorVersion,
      icon: <Cpu className="h-4 w-4 text-primary" />,
      sub: 'Capacitor CLI/Core'
    },
    {
      label: 'Application ID',
      value: data.appId,
      icon: <Smartphone className="h-4 w-4 text-primary" />,
      sub: data.packageName
    },
    {
      label: 'Android Target',
      value: `API ${data.targetSdkVersion}`,
      icon: <Smartphone className="h-4 w-4 text-primary" />,
      sub: `Min SDK: ${data.minSdkVersion}`
    },
    {
      label: 'Config Location',
      value: data.configLocation,
      icon: <FileJson className="h-4 w-4 text-primary" />,
      sub: 'Root manifest'
    },
    {
      label: 'Android Project',
      value: data.androidPath,
      icon: <FolderCode className="h-4 w-4 text-primary" />,
      sub: data.androidExists ? 'Path Verified' : 'Missing'
    },
    {
      label: 'APK Readiness',
      value: data.canGenerateApk ? 'READY' : 'BLOCKED',
      icon: <ShieldCheck className="h-4 w-4 text-green-500" />,
      sub: 'Diagnostic Scan: OK'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((m) => (
        <Card key={m.label} className="bg-card/50 border-primary/20 hover:border-primary/40 transition-colors shadow-none overflow-hidden">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-muted-foreground font-headline uppercase tracking-widest">{m.label}</span>
              <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                {m.icon}
              </div>
            </div>
            <div className="text-sm font-bold font-code truncate text-foreground">{m.value}</div>
            <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-tight">{m.sub}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}