export type decryptedMessage = {
	id: string;
	created_at: number;
	content: string;
	author: string;
};

export type decryptedGroupedMessage = {
	author: string;
	messages: decryptedMessage[];
};
