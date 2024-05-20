import type { LoginStrategyInterface } from '../../interfaces/LoginStrategyInterface';
import { ndkUser } from '../../stores/stores';
import { nsecBunkerLogin } from '../../utils/helpers/loginHelper';
import { UserProfileService } from '../userProfileService';

export class BunkerLoginService implements LoginStrategyInterface {
	userProfileService = new UserProfileService();
	async login(nip46ConnectionString: string): Promise<'success' | 'error'> {
		try {
			console.log(nip46ConnectionString)
			const user = await nsecBunkerLogin(nip46ConnectionString);
			if (user) {
				ndkUser.set(user);
				this.userProfileService.fetchUserProfile(user.npub);
				return 'success';
			} else {
				console.error('nsec Bunker login failed.');
				return 'error';
			}
		} catch (error) {
			console.log('Error with nsec bunker login ' + error);
			return 'error';
		}
	}
}
