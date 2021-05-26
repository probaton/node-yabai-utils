export interface IYabaiSpace {
	id: number;
	label: string;
	index: number;
	display: number;
	windows: number[];
	type: 'bsp';
	visible: Bit;
	focused: Bit;
	'native-fullscreen': Bit;
	'first-window': number;
	'last-window': number;
}

export interface IYabaiWindow {
	id: number;
	pid: number;
	app: string;
	title: string;
	frame: {
		x: number;
		y: number;
		w: number;
		h: number;
	};
	level: number;
	role: string;
	subrole: string;
	movable: Bit;
	resizable: Bit;
	display: number;
	space: number;
	visible: Bit;
	focused: Bit;
	split: string;
	floating: Bit;
	sticky: Bit;
	minimized: Bit;
	topmost: Bit;
	opacity: number;
	shadow: number;
	border: number;
	'stack-index': number;
	'zoom-parent': Bit;
	'zoom-fullscreen': Bit;
	'native-fullscreen': Bit;
}

type Bit = 0 | 1;
