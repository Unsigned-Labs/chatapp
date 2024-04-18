import { nip19 } from 'nostr-tools';
import type { LoginStrategyInterface } from '../../interfaces/LoginStrategyInterface';
import { UserProfileService } from '../userProfileService';
import { ndkUser } from '../../stores/stores';
import { privkeyLogin } from '../../utils/helpers/loginHelper';

export class NIP49PrivateKeyLoginService implements LoginStrategyInterface {
	userProfileService: UserProfileService = new UserProfileService();
	async login(privateKey: string): Promise<'success' | 'error'> {
		try {
			if (!privateKey.startsWith('nsec')) {
				alert('Please use your nsec to login');
				return 'error';
			}
			const user = await privkeyLogin(nip19.decode(privateKey).data as string);
			if (user) {
				ndkUser.set(user);
				this.userProfileService.fetchUserProfile(user.npub);
				return 'success';
			} else {
				console.error('PrivateKey login failed.');
				return 'error';
			}
		} catch (error) {
			console.log('Error with Private key login ' + error);
			return 'error';
		}
	}
}