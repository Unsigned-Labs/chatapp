export interface LoginStrategyInterface {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	login(credentials?: any): Promise<'success' | 'error'>;
}
