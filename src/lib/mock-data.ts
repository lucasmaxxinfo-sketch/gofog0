export interface CapacitorProjectData {
  configLocation: string;
  configContent: string;
  packageJsonContent: string;
  androidExists: boolean;
  androidPath: string;
  packageName: string;
  appId: string;
  capacitorVersion: string;
  minSdkVersion: string;
  targetSdkVersion: string;
  scripts: {
    build: string;
    apk: string;
  };
  modifiedFiles: string[];
  blockers: string[];
  canGenerateApk: boolean;
  buildLogs: string;
  plugins: string[];
}

export const MOCK_PROJECT_DATA: CapacitorProjectData = {
  configLocation: '/capacitor.config.ts',
  configContent: `import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.precision.insight',
  appName: 'Capacitor Insight',
  webDir: 'out',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  }
};

export default config;`,
  packageJsonContent: `{
  "name": "nextn",
  "version": "0.1.0",
  "dependencies": {
    "@capacitor/android": "^7.0.0",
    "@capacitor/cli": "^7.0.0",
    "@capacitor/core": "^7.0.0",
    ...
  },
  "scripts": {
    "build": "next build",
    "cap:sync": "npx cap sync",
    "generate-apk": "cd android && ./gradlew assembleDebug"
  }
}`,
  androidExists: true,
  androidPath: './android',
  packageName: 'com.precision.insight',
  appId: 'com.precision.insight',
  capacitorVersion: '7.0.0',
  minSdkVersion: '22',
  targetSdkVersion: '34',
  scripts: {
    build: 'next build',
    apk: './gradlew assembleDebug'
  },
  modifiedFiles: [
    'capacitor.config.ts',
    'package.json',
    'android/app/src/main/res/values/strings.xml',
    'android/app/src/main/AndroidManifest.xml',
    'android/app/build.gradle',
    'android/app/src/main/java/com/precision/insight/MainActivity.java'
  ],
  blockers: [
    'Release keystore not yet configured'
  ],
  canGenerateApk: true,
  buildLogs: `[INFO] Initializing android project...
[SUCCESS] Capacitor sync successful
[INFO] Executing gradlew assembleDebug...
...
BUILD SUCCESSFUL in 52s`,
  plugins: ['@capacitor/android', '@capacitor/core']
};