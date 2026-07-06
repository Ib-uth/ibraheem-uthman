import { img } from '$lib/constants/cdn';

export type HomeServiceMarquee = {
	className: string;
	label: string;
	direction: 'left' | 'right';
	image: string;
	srcset: string;
	sizes: string;
};

export const homeServices: HomeServiceMarquee[] = [
	{
		className: 'service-1',
		label: 'FULL-STACK ENGINEERING',
		direction: 'left',
		image: img('686408fd023891dae4c4a111_Abstract%203D%20Illustration.jpeg'),
		srcset: `${img('686408fd023891dae4c4a111_Abstract%203D%20Illustration-p-500.jpeg')} 500w, ${img('686408fd023891dae4c4a111_Abstract%203D%20Illustration-p-800.jpeg')} 800w, ${img('686408fd023891dae4c4a111_Abstract%203D%20Illustration.jpeg')} 904w`,
		sizes: '(max-width: 904px) 100vw, 904px'
	},
	{
		className: 'service-2',
		label: 'SECURITY ENGINEERING',
		direction: 'right',
		image: img('686405f43e7b2082bad490cf_Story%20Image-1.webp'),
		srcset: `${img('686405f43e7b2082bad490cf_Story%20Image-1-p-500.webp')} 500w, ${img('686405f43e7b2082bad490cf_Story%20Image-1.webp')} 661w`,
		sizes: '(max-width: 661px) 100vw, 661px'
	},
	{
		className: 'service-3',
		label: 'DEVSECOPS',
		direction: 'left',
		image: img('686405f488560f744d9cbd10_Story%20Image.webp'),
		srcset: `${img('686405f488560f744d9cbd10_Story%20Image-p-500.webp')} 500w, ${img('686405f488560f744d9cbd10_Story%20Image.webp')} 661w`,
		sizes: '(max-width: 661px) 100vw, 661px'
	}
];
