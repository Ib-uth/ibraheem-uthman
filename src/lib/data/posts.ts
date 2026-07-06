import { workImg } from '$lib/constants/cdn';

const CARD_SIZES = '(max-width: 767px) 100vw, (max-width: 991px) 727.4140625px, 939.9375px';
const GALLERY_SIZES = CARD_SIZES;

export type BlogCategory = 'software' | 'security' | 'devops' | 'career';

export type ArticleBlock = {
	heading: string;
	paragraphs: string[];
};

export type Post = {
	slug: string;
	title: string;
	description: string;
	image: string;
	srcset: string;
	sizes: string;
	category: BlogCategory;
	author: string;
	year: string;
	bodyTop: ArticleBlock[];
	bodyBottom: ArticleBlock[];
	gallery: { image: string; srcset: string; sizes: string }[];
	relatedSlugs: string[];
};

export const blogTabs = [
	{ id: 'all', label: 'ALL' },
	{ id: 'software', label: 'SOFTWARE' },
	{ id: 'security', label: 'SECURITY' },
	{ id: 'devops', label: 'DEVOPS' },
	{ id: 'career', label: 'CAREER' }
] as const;

export type BlogTabId = (typeof blogTabs)[number]['id'];

const sharedGallery = [
	{
		image: workImg('686130cc7a13930d3530a84f_Blog%20Gallery.png'),
		srcset: `${workImg('686130cc7a13930d3530a84f_Blog%20Gallery-p-500.png')} 500w, ${workImg('686130cc7a13930d3530a84f_Blog%20Gallery-p-800.png')} 800w, ${workImg('686130cc7a13930d3530a84f_Blog%20Gallery-p-1080.png')} 1080w, ${workImg('686130cc7a13930d3530a84f_Blog%20Gallery-p-1600.png')} 1600w, ${workImg('686130cc7a13930d3530a84f_Blog%20Gallery-p-2000.png')} 2000w, ${workImg('686130cc7a13930d3530a84f_Blog%20Gallery.png')} 2040w`,
		sizes: GALLERY_SIZES
	},
	{
		image: workImg('686130cfae2e345d2166209a_Blog%20Gallery-1.png'),
		srcset: `${workImg('686130cfae2e345d2166209a_Blog%20Gallery-1-p-500.png')} 500w, ${workImg('686130cfae2e345d2166209a_Blog%20Gallery-1-p-800.png')} 800w, ${workImg('686130cfae2e345d2166209a_Blog%20Gallery-1-p-1080.png')} 1080w, ${workImg('686130cfae2e345d2166209a_Blog%20Gallery-1-p-1600.png')} 1600w, ${workImg('686130cfae2e345d2166209a_Blog%20Gallery-1-p-2000.png')} 2000w, ${workImg('686130cfae2e345d2166209a_Blog%20Gallery-1.png')} 2040w`,
		sizes: GALLERY_SIZES
	}
];

export const posts: Post[] = [
	{
		slug: 'model-failure-before-happy-path',
		title: 'MODEL FAILURE BEFORE HAPPY PATH',
		description:
			'Why I sketch outage scenarios and permission leaks before writing the first endpoint in a new system.',
		image: workImg('6861755ce3046d83de4456d5_Blog%20Image.png'),
		srcset: `${workImg('6861755ce3046d83de4456d5_Blog%20Image-p-500.png')} 500w, ${workImg('6861755ce3046d83de4456d5_Blog%20Image-p-800.png')} 800w, ${workImg('6861755ce3046d83de4456d5_Blog%20Image.png')} 1005w`,
		sizes: CARD_SIZES,
		category: 'software',
		author: 'IBRAHEEM UTHMAN',
		year: '2025',
		bodyTop: [
			{
				heading: 'START WITH THE BREAK',
				paragraphs: [
					'Most specs describe what happens when everything works. I write the failure story first: what if the queue backs up, what if the token expires mid-request, what if two users claim the same resource. Those edge cases shape the schema more than the happy path ever does.',
					'This is not pessimism. It is how you avoid shipping a system that only works in demos. The next engineer who touches your code will hit these paths. Build for them upfront.'
				]
			},
			{
				heading: 'STRUCTURE BEFORE SPEED',
				paragraphs: [
					'Fast code that hides bad boundaries becomes slow code with incidents attached. I spend early cycles on module boundaries, error contracts, and audit trails. Velocity comes after the shape is right.',
					'Teams that skip this step pay later in hotfixes and silent data corruption. The refactor always costs more than the upfront hour spent drawing the failure diagram.'
				]
			}
		],
		bodyBottom: [
			{
				heading: 'DOCUMENT THE ASSUMPTIONS',
				paragraphs: [
					'Every design carries assumptions about load, trust, and recovery time. Write them down next to the architecture sketch. When an assumption breaks, you know which part of the system to revisit instead of guessing.',
					'Assumptions age. Review them when traffic doubles or when a new integration joins the stack. The diagram is a living artifact, not a slide for kickoff.'
				]
			},
			{
				heading: 'BUILD FOR THE NEXT ENGINEER',
				paragraphs: [
					'Clear module names, explicit error types, and runbooks beside the repo matter as much as test coverage. The person on call at 2 a.m. is usually not you.',
					'Code that explains its failure modes in logs and docs survives handoffs. Code that only works when you are in the room does not.'
				]
			}
		],
		gallery: sharedGallery,
		relatedSlugs: ['why-idempotency-matters-in-payments', 'building-detection-engineering-practice']
	},
	{
		slug: 'why-idempotency-matters-in-payments',
		title: 'WHY IDEMPOTENCY MATTERS IN PAYMENTS',
		description:
			'Duplicate webhooks and retry storms are normal in fintech. Here is how idempotency keys keep money from moving twice.',
		image: workImg('6861753b7d6fcfa7ded87b2e_Blog%20Image-1.png'),
		srcset: `${workImg('6861753b7d6fcfa7ded87b2e_Blog%20Image-1-p-500.png')} 500w, ${workImg('6861753b7d6fcfa7ded87b2e_Blog%20Image-1-p-800.png')} 800w, ${workImg('6861753b7d6fcfa7ded87b2e_Blog%20Image-1.png')} 1005w`,
		sizes: CARD_SIZES,
		category: 'software',
		author: 'IBRAHEEM UTHMAN',
		year: '2025',
		bodyTop: [
			{
				heading: 'RETRIES ARE NOT EDGE CASES',
				paragraphs: [
					'Payment providers retry webhooks. Mobile clients retry on timeout. Load balancers replay requests. In production, the same charge intent arrives two or three times before you notice. Without idempotency, each arrival is a new transaction.',
					'Idempotency keys turn retries into no-ops. The first request creates the record. Every duplicate with the same key returns the original result without touching the ledger.'
				]
			},
			{
				heading: 'STATE MACHINES NEED GUARDS',
				paragraphs: [
					'A payment moves through pending, authorized, captured, failed, refunded. Each transition checks the current state before applying the next. You cannot refund a charge that never captured. Guards live in the database transaction, not in controller conditionals.',
					'Explicit states make reconciliation possible. Finance teams can compare provider statements to internal records because every row has a clear lifecycle.'
				]
			}
		],
		bodyBottom: [
			{
				heading: 'KEY DESIGN CHOICES',
				paragraphs: [
					'Keys should come from the client for user-initiated actions and from the provider for webhooks. Store them with a unique index. Expire stale pending records on a schedule so the table does not grow forever.',
					'Return the same HTTP status and body on replay. Clients should not be able to tell whether their request created the charge or hit a cache.'
				]
			},
			{
				heading: 'TEST WITH CHAOS',
				paragraphs: [
					'Replay webhooks in staging. Kill the app mid-transaction and resend. Run concurrent requests with identical keys. If money moves twice in any scenario, the design is wrong.',
					'These tests belong in CI, not in a manual checklist before launch. Payment bugs are expensive to unwind.'
				]
			}
		],
		gallery: sharedGallery,
		relatedSlugs: ['model-failure-before-happy-path', 'secure-cicd-without-slowing-teams']
	},
	{
		slug: 'building-detection-engineering-practice',
		title: 'BUILDING A DETECTION PRACTICE',
		description:
			'How I structure detection engineering mentorship so practitioners ship their first rule within a week.',
		image: workImg('686175247d6fcfa7ded874ae_Blog%20Image-2.png'),
		srcset: `${workImg('686175247d6fcfa7ded874ae_Blog%20Image-2-p-500.png')} 500w, ${workImg('686175247d6fcfa7ded874ae_Blog%20Image-2-p-800.png')} 800w, ${workImg('686175247d6fcfa7ded874ae_Blog%20Image-2.png')} 1005w`,
		sizes: CARD_SIZES,
		category: 'security',
		author: 'IBRAHEEM UTHMAN',
		year: '2024',
		bodyTop: [
			{
				heading: 'FIND WHAT STRUCTURE HIDES',
				paragraphs: [
					'Attackers exploit gaps between tools, not missing features in one tool. Detection engineering starts by mapping what your logs actually capture versus what you assume they capture. Blind spots hide in DNS, identity providers, and CI pipelines more often than in the firewall.',
					'I teach practitioners to inventory sources before writing rules. A detection on data you do not have is theatre.'
				]
			},
			{
				heading: 'RULES WITH CONTEXT',
				paragraphs: [
					'An alert without linked events forces analysts to search from scratch. Every rule should attach the raw logs that triggered it, the asset owner, and the last known good state. Context cuts triage time from hours to minutes.',
					'Noise is a design failure, not an operator failure. Tune before you add another rule to the queue.'
				]
			}
		],
		bodyBottom: [
			{
				heading: 'LAB FIRST, PROD SECOND',
				paragraphs: [
					'Replay attack traffic in an isolated lab before promoting rules to production. Practitioners learn faster when they can break things safely. Over 100 engineers have gone through this loop, most shipping a tuned detection within seven days.',
					'The lab uses the same stack as production: Wazuh, Elastic, Suricata. Skills transfer directly.'
				]
			},
			{
				heading: 'MEASURE OUTCOMES',
				paragraphs: [
					'Track mean time to detect and mean time to triage, not rule count. A team with ten high-fidelity detections outperforms one with two hundred noisy ones.',
					'Review false positives weekly. Each one is a lesson about what normal looks like in your environment.'
				]
			}
		],
		gallery: sharedGallery,
		relatedSlugs: ['model-failure-before-happy-path', 'secure-cicd-without-slowing-teams']
	},
	{
		slug: 'secure-cicd-without-slowing-teams',
		title: 'SECURE CI/CD WITHOUT DRAG',
		description:
			'How to run Semgrep, Trivy, and Gitleaks on every merge while keeping deploy cycles under fifteen minutes.',
		image: workImg('68612fc1e83ee2ab795ee2d7_Blog%20Image-3.png'),
		srcset: `${workImg('68612fc1e83ee2ab795ee2d7_Blog%20Image-3-p-500.png')} 500w, ${workImg('68612fc1e83ee2ab795ee2d7_Blog%20Image-3-p-800.png')} 800w, ${workImg('68612fc1e83ee2ab795ee2d7_Blog%20Image-3.png')} 1005w`,
		sizes: CARD_SIZES,
		category: 'devops',
		author: 'IBRAHEEM UTHMAN',
		year: '2025',
		bodyTop: [
			{
				heading: 'SCAN IN PARALLEL',
				paragraphs: [
					'SAST, container scans, and secret detection should run concurrently, not in sequence. Cache dependency layers between builds. Most pipeline slowdowns come from poor caching, not from the scanners themselves.',
					'Set time budgets per stage. If Trivy exceeds three minutes, fix the image size before disabling the scan.'
				]
			},
			{
				heading: 'SEVERITY GATES',
				paragraphs: [
					'Block merges on critical findings only. Warnings become tickets with SLA tags. Developers ignore pipelines that fail on informational noise. Tune rules to your stack so findings are actionable.',
					'Semgrep custom rules beat generic OWASP packs for teams with known frameworks. Write rules when you fix a bug so it does not return.'
				]
			}
		],
		bodyBottom: [
			{
				heading: 'FEEDBACK IN THE PR',
				paragraphs: [
					'Post scan results as PR comments with file and line references. A developer should fix the issue without opening a separate dashboard. Gitleaks findings include the commit that introduced the secret.',
					'Security tooling that lives outside the developer workflow gets disabled. Meet people where they already work.'
				]
			},
			{
				heading: 'SUPPLY CHAIN AS DEFAULT',
				paragraphs: [
					'Pin base images and verify signatures where possible. Scan lockfiles, not just Dockerfiles. A vulnerable dependency in production is a pipeline miss, not a runtime surprise.',
					'DevSecOps is not a phase. It is the pipeline your team runs every day.'
				]
			}
		],
		gallery: sharedGallery,
		relatedSlugs: ['building-detection-engineering-practice', 'why-idempotency-matters-in-payments']
	}
];

export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export function getPostsByTab(tabId: BlogTabId): Post[] {
	if (tabId === 'all') return posts;
	return posts.filter((post) => post.category === tabId);
}

export function getRelatedPosts(slugs: string[]): Post[] {
	return slugs
		.map((slug) => getPostBySlug(slug))
		.filter((post): post is Post => post !== undefined);
}
