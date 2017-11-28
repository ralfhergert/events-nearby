import {ErrorListener} from '../view/ErrorListener';
import {I18n} from '../i18n/I18n';

/**
 * This is the super class of all request controllers
 */
export class RequestController<Entity,RequestInfo> {
	protected entityListener: Array<EntityListener<Entity>> = [];
	protected errorListener: Array<ErrorListener> = [];
	private timeoutHandle: number;
	readonly urlPath: string;
	readonly i18n: I18n;
	readonly errorMessageKey: string;

	constructor(urlPath: string, i18n: I18n, errorMessage = 'general_connectionProblem') {
		this.urlPath = urlPath;
		this.i18n = i18n;
		this.errorMessageKey = errorMessage;
	}

	public request(info: RequestInfo): void {
		let thisObj = this;
		// clear the current window handle, if there is any.
		window.clearTimeout(this.timeoutHandle);
		jQuery.ajax(this.urlPath + this.getRequestQuery(info), {
			success: function(data: Entity, textStatus: string, jqXHR: any) {
				// inform all error listeners that everything is ok.
				thisObj.errorListener.forEach(listener => { listener.resumeToNormal(); });
				// info all listeners
				thisObj.entityListener.forEach(listener => { listener.updateEntity(data); });
			},
			error: function() {
				// inform all error listener that we currently have errors.
				thisObj.errorListener.forEach(listener => { listener.showError(thisObj.i18n.get(thisObj.errorMessageKey)); });
				// schedule a retry
				thisObj.timeoutHandle = window.setTimeout(function() { thisObj.request(info); }, 30000); // 30s
			}
		});
	}

	protected getRequestQuery(info: RequestInfo): string {
		return '';
	}

	public addLocalEventListener(listener: EntityListener<Entity>): void {
		this.entityListener.push(listener);
	}

	public addErrorListener(listener: ErrorListener): void {
		this.errorListener.push(listener);
	}
}

export interface EntityListener<Entity> {
	updateEntity(entity: Entity);
}
