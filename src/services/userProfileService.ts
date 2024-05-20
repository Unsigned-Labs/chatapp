import type { UserProfileInterface } from '../interfaces/userProfileInterface';
import { fetchUserProfile } from '../utils/helpers/helper';
import { profileUser } from '../stores/stores';
import { profileImageUrl } from '../utils/constant';

export class UserProfileService implements UserProfileInterface {
	async fetchUserProfile(userNPub: string): Promise<void> {
		let userProfile = await fetchUserProfile(userNPub);
		if (!userProfile || Object.entries(userProfile).length === 0) {
			userProfile = { image: profileImageUrl + userNPub, npub: userNPub };
		}
		if (!userProfile.npub) {
			userProfile = { ...userProfile, npub: userNPub, image: profileImageUrl + userNPub };
		}
		profileUser.set(userProfile);
	}
}
