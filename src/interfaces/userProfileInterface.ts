export interface UserProfileInterface {
	fetchUserProfile(userPubKey: string): Promise<void>;
}
