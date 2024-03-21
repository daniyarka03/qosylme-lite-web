import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qosylme.app',
  appName: 'qosylme',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
