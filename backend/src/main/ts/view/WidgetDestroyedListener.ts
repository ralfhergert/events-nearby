export interface WidgetDestroyedListener<WidgetTpye> {
	destroyed(widget: WidgetTpye): void;
}
