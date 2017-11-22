import {ErrorListener} from "../view/ErrorListener";

/**
 * This is the super class of all request controllers
 */
export class RequestController<Entity,RequestInfo> {
	protected entityListener: Array<EntityListener<Entity>> = [];
	protected errorListener: Array<ErrorListener> = [];
	private timeoutHandle: number;
	readonly urlPath: string;
	readonly errorMessage: string;

	constructor(urlPath: string, errorMessage = 'Connection issue. Waiting for server to be reachable...') {
		this.urlPath = urlPath;
		this.errorMessage = errorMessage;
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
				thisObj.errorListener.forEach(listener => { listener.showError(thisObj.errorMessage); });
			},
			complete: function() {
				// create a new timeout
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
