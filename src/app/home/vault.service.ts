import { Injectable } from '@angular/core';
import {
  AuthMode,
  DefaultSession,
  IonicIdentityVaultUser,
} from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ValutService extends IonicIdentityVaultUser<DefaultSession> {

  constructor(platform: Platform) {
    super(platform, {
      authMode: AuthMode.BiometricOnly,
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: false,
      lockAfter: 0,
      hideScreenOnBackground: false
    });
  }

  public async setSecret(key: string, value: string): Promise<void> {
    try {
      await this.unlock();
      const vault = await this.getVault();
      await vault.storeValue(key, value);
      await vault.lock();
    } catch (error) {
      console.log(`ValutService => Failed with: ${JSON.stringify(error)}`);
    }
  }

  public async getSecret(key: string) {
    try {
      await this.unlock();
      const vault = await this.getVault();
      const value = await vault.getValue(key);
      await vault.lock();

      return value;
    } catch (error) {
      console.log(`ValutService => Failed with: ${JSON.stringify(error)}`);
    }
  }
}
