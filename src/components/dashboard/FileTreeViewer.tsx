import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Folder, File, FileCode, ChevronRight, Package, Smartphone, ShieldCheck } from 'lucide-react';

export default function FileTreeViewer() {
  const tree = [
    { 
      name: 'android/', 
      type: 'folder', 
      highlight: true,
      children: [
        { name: 'app/', type: 'folder', children: [
          { name: 'src/main/AndroidManifest.xml', type: 'file' },
          { name: 'src/main/java/com/precision/insight/MainActivity.java', type: 'file-code' },
          { name: 'src/main/res/values/strings.xml', type: 'file' },
          { name: 'build.gradle', type: 'file-code' },
        ]},
        { name: 'build.gradle', type: 'file-code' },
        { name: 'settings.gradle', type: 'file-code' },
        { name: 'gradlew', type: 'file-code' },
      ]
    },
    { name: 'capacitor.config.ts', type: 'file-code', highlight: true },
    { name: 'package.json', type: 'file-json', highlight: true },
    { name: 'public/', type: 'folder', children: [
      { name: 'index.html', type: 'file' },
    ]},
    { name: 'src/', type: 'folder' },
  ];

  const renderItem = (item: any, depth = 0) => (
    <div key={item.name} className="flex flex-col">
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded-md hover:bg-primary/5 cursor-default transition-colors group ${item.highlight ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {item.type === 'folder' ? <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary" /> : <div className="w-3" />}
        {item.type === 'folder' && <Folder className="h-4 w-4 text-primary/70" />}
        {item.type === 'file' && <File className="h-4 w-4 text-muted-foreground" />}
        {item.type === 'file-code' && <FileCode className="h-4 w-4 text-accent" />}
        {item.type === 'file-json' && <Package className="h-4 w-4 text-primary" />}
        <span className={`text-xs font-code ${item.highlight ? 'font-semibold' : 'text-foreground/80'}`}>{item.name}</span>
      </div>
      {item.children?.map((child: any) => renderItem(child, depth + 1))}
    </div>
  );

  return (
    <Card className="bg-card/30 border-primary/10 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-3 border-b border-primary/10 bg-primary/5">
        <CardTitle className="text-sm font-headline flex items-center gap-2">
          <Folder className="h-4 w-4 text-primary" />
          REPORT PROJECT TREE
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-background/50">
        <div className="space-y-0.5">
          {tree.map(item => renderItem(item))}
        </div>
      </CardContent>
    </Card>
  );
}