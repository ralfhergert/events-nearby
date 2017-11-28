import {I18n} from '../i18n/I18n';

export class ImageUploadWidget {
	readonly i18n: I18n;
	readonly $target: any;
	readonly $input: any;
	readonly $view: any;
	private imageId: string;

	constructor($target: any, i18n: I18n) {
		let thisObj = this;
		this.$target = $target.addClass('imageUploadWidget');
		this.i18n = i18n;
		this.$input = jQuery('<input type="file" class="showOnlyValidationErrors" accept="image/*"/>')
			.attr('id', $target.attr('data-input-id'))
			.attr('name', $target.attr('data-input-name'))
			.appendTo($target);
		this.$view = jQuery('<div class="image-preview">').appendTo($target);

		this.$input.change(function() {
			thisObj.uploadFiles(thisObj.$input.get(0).files);
		});

		if (ImageUploadWidget.isDragAndDropSupported()) {
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
		}
	}

	private uploadFiles(fileList: FileList): void {
		if (fileList == null || fileList.length == 0) {
			return;
		}
		let thisObj = this;
		this.$target.addClass('is-uploading');
		jQuery.ajax({
			url: '/api/image',
			method: 'POST',
			contentType: 'text/plain',
			data: fileList[0],
			processData: false,
			success: function(data) {
				thisObj.imageId = data;
				// update the background image.
				thisObj.$view.css({'background': 'url("/api/image/' + data + '") no-repeat center/contain'});
				// show with an animation if not yet visible.
				if (!thisObj.$view.hasClass('loaded')) {
					thisObj.$view.hide().addClass('loaded').slideDown();
				}
			},
			complete: function() {
				thisObj.$target.removeClass('is-uploading');
			}
		});
	}

	public static isDragAndDropSupported(): boolean {
		var div = document.createElement('div');
		return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
	}
}
