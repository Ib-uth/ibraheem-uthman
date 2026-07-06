import { img } from '$lib/constants/cdn';

export type Award = {
	title: string;
	subtitle: string;
	image: string;
	srcset: string;
	sizes: string;
};

export const awards: Award[] = [
	{
		title: 'FAILURE FIRST',
		subtitle: 'THREAT MODELS AND EDGE CASES BEFORE THE HAPPY PATH',
		image: img('686408fd023891dae4c4a111_Abstract%203D%20Illustration.jpeg'),
		srcset: `${img('686408fd023891dae4c4a111_Abstract%203D%20Illustration-p-500.jpeg')} 500w, ${img('686408fd023891dae4c4a111_Abstract%203D%20Illustration-p-800.jpeg')} 800w, ${img('686408fd023891dae4c4a111_Abstract%203D%20Illustration.jpeg')} 904w`,
		sizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.9921875px, 904px'
	},
	{
		title: 'EVIDENCE BY DEFAULT',
		subtitle: 'TESTS, LOGS, AND AUDIT TRAILS ON EVERY RELEASE',
		image: img(
			'686408fd4cc0307df4bc3cc2_Modern%20Minimalist%20Still%20Life%20Composition.jpeg'
		),
		srcset: `${img('686408fd4cc0307df4bc3cc2_Modern%20Minimalist%20Still%20Life%20Composition-p-500.jpeg')} 500w, ${img('686408fd4cc0307df4bc3cc2_Modern%20Minimalist%20Still%20Life%20Composition-p-800.jpeg')} 800w, ${img('686408fd4cc0307df4bc3cc2_Modern%20Minimalist%20Still%20Life%20Composition-p-1080.jpeg')} 1080w, ${img('686408fd4cc0307df4bc3cc2_Modern%20Minimalist%20Still%20Life%20Composition.jpeg')} 1200w`,
		sizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.9921875px, 939.9921875px'
	},
	{
		title: 'EXPLICIT BOUNDARIES',
		subtitle: 'TYPED CONTRACTS THAT MAKE WRONG CALLS HARD',
		image: img(
			'686408fde209d5d399cb8a60_Colorful%20High-Heeled%20Shoes%20on%20Geometric%20Background.jpeg'
		),
		srcset: `${img('686408fde209d5d399cb8a60_Colorful%20High-Heeled%20Shoes%20on%20Geometric%20Background-p-500.jpeg')} 500w, ${img('686408fde209d5d399cb8a60_Colorful%20High-Heeled%20Shoes%20on%20Geometric%20Background-p-800.jpeg')} 800w, ${img('686408fde209d5d399cb8a60_Colorful%20High-Heeled%20Shoes%20on%20Geometric%20Background.jpeg')} 960w`,
		sizes: '(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px'
	},
	{
		title: 'LEAVE A TRAIL',
		subtitle: 'RUNBOOKS, DOCS, AND MENTORSHIP THAT OUTLIVE THE SPRINT',
		image: img('686408fd526d43c96f77f1e8_Vibrant%20Artistic%20Cake.jpeg'),
		srcset: `${img('686408fd526d43c96f77f1e8_Vibrant%20Artistic%20Cake-p-500.jpeg')} 500w, ${img('686408fd526d43c96f77f1e8_Vibrant%20Artistic%20Cake-p-800.jpeg')} 800w, ${img('686408fd526d43c96f77f1e8_Vibrant%20Artistic%20Cake.jpeg')} 960w`,
		sizes: '(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px'
	}
];
