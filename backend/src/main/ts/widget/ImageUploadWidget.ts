import {I18n} from '../i18n/I18n';
import {UniqueId} from "../util/UniqueId";

export class ImageUploadWidget {
	readonly i18n: I18n;
	readonly $target: any;
	readonly $input: any;
	readonly $view: any;
	readonly $delete: any;
	private _imageId: string;

	constructor($target: any, i18n: I18n) {
		let thisObj = this;
		this.i18n = i18n;
		this.$target = $target.addClass('imageUploadWidget');
		let inputId = $target.attr('data-input-id');
		if (!inputId) { // in order to work properly the input needs to have an id.
			inputId = UniqueId.getNext();
		}
		this.$input = jQuery('<input type="file" class="showOnlyValidationErrors" accept="image/*"/>')
			.attr('id', inputId)
			.attr('name', $target.attr('data-input-name'))
			.appendTo($target);
		this.$delete = jQuery('<div class="image-delete clickable">')
			.append(jQuery('<span data-i18n-text="imageUploadWidget_delete">'))
			.click(function() {
				thisObj.deleteFile(thisObj._imageId);
			})
			.hide()
			.appendTo($target);
		this.$view = jQuery('<label class="image-preview">')
			.attr('for', inputId)
			.appendTo($target);

		this.$input.change(function() {
			thisObj.uploadFiles(thisObj.$input.get(0).files);
		});

		if (ImageUploadWidget.isDragAndDropSupported()) {
			this.$view.append(jQuery('<span class="text" data-i18n-text="createEventForm_image_instruction">'));
			$target.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
				e.preventDefault();
				e.stopPropagation();
			})
			.on('dragover dragenter', function() {
				$target.addClass('is-dragover');
			})
			.on('dragleave dragend drop', function() {
				$target.removeClass('is-dragover');
			})
			.on('drop', function(e) {
				thisObj.uploadFiles(e.originalEvent.dataTransfer.files);
			});
		} else {
			this.$view.append(jQuery('<span class="text" data-i18n-text="createEventForm_image_instruction_onlyClick">'));
		}

		i18n.apply($target);
	}

	private uploadFiles(fileList: FileList): void {
		if (fileList == null || fileList.length == 0) {
			return;
		}
		if (this.$target.hasClass('is-uploading')) {
			return;
		}
		this.$target.addClass('is-uploading');
		let thisObj = this;
		jQuery.ajax({
			url: '/api/image',
			method: 'POST',
			contentType: 'text/plain',
			data: fileList[0],
			processData: false,
			success: function(data) {
				// if there was another image uploaded before, then delete the older image.
				if (thisObj._imageId != null && thisObj._imageId != data) {
					thisObj.deleteFile(thisObj._imageId);
				}
				thisObj._imageId = data;
				// update the background image.
				thisObj.$view.css({'background': 'url("/api/image/' + data + '") no-repeat center/contain'});
				// show with an animation if not yet visible.
				if (!thisObj.$view.hasClass('loaded')) {
					thisObj.$view.hide().addClass('loaded').slideDown();
				}
				// show the delete-button
				thisObj.$delete.slideDown();
			},
			complete: function() {
				thisObj.$target.removeClass('is-uploading');
			}
		});
	}

	private deleteFile(id: string): void {
		if (id == null || id.length == 0) {
			return;
		}
		let thisObj = this;
		jQuery.ajax({
			url: '/api/image/' + id,
			method: 'DELETE',
			success: function() {
				if (thisObj._imageId == id) { // if this was the current image then get back to the original state.
					thisObj._imageId = null;
					// reset the styling with the background image.
					thisObj.$view.attr('style', null);
					// show with an animation if not yet visible.
					thisObj.$view.slideUp(function() { thisObj.$view.removeClass('loaded').show(); });
					// hide the delete-button
					thisObj.$delete.slideUp();
				}
			}
		});
	}

	public static isDragAndDropSupported(): boolean {
		var div = document.createElement('div');
		return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
	}

	get imageId(): string {
		return this._imageId;
	}
}
