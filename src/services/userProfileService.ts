import type { UserProfileInterface } from '../interfaces/userProfileInterface';
import { fetchUserProfile } from '../utils/helper';
import { profileUser } from '../stores/stores';
import { profileImageUrl } from '../utils/constant';

export class UserProfileService implements UserProfileInterface {
	async fetchUserProfile(userPubKey: string): Promise<void> {
		let userProfile = await fetchUserProfile(userPubKey);
		if (!userProfile || Object.entries(userProfile).length === 0) {
			userProfile = { image: profileImageUrl + userPubKey, pubkey: userPubKey };
		}
		if (!userProfile.pubkey) {
			userProfile = { ...userProfile, pubkey: userPubKey, image: profileImageUrl + userPubKey };
		}
		const profileValue = { content: userProfile };
		profileUser.update((u) => [...u, profileValue]);
	}
}
