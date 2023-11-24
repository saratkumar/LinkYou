import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.linkyou.notification',
  appName: 'CapApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
