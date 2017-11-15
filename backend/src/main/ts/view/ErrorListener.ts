export interface ErrorListener {
	showError(message: string): void;
	resumeToNormal(): void;
}
