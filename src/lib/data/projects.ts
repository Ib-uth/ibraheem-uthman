import { workImg } from '$lib/constants/cdn';

const IMAGE_SIZES = '(max-width: 767px) 100vw, 1028px';

export type WorkCategory = 'software' | 'security' | 'devops' | 'infrastructure';

export type ProjectSection = {
	title: string;
	body: string;
};

export type ProjectImage = {
	image: string;
	srcset: string;
	sizes: string;
	width: number;
	height: number;
};

function projectImage(path: string, width: number, height: number): ProjectImage {
	return {
		image: path,
		srcset: `${path} ${width}w`,
		sizes: IMAGE_SIZES,
		width,
		height
	};
}

function cdnWorkImage(
	filename: string,
	srcsetParts: string,
	width: number,
	height: number
): ProjectImage {
	const image = workImg(filename);
	return {
		image,
		srcset: srcsetParts,
		sizes: IMAGE_SIZES,
		width,
		height
	};
}

export type Project = {
	slug: string;
	title: string;
	description: string;
	image?: ProjectImage;
	secondaryImage?: ProjectImage;
	category: WorkCategory;
	service: string;
	client: string;
	year: string;
	heroDescription: string;
	sections: ProjectSection[];
	/** Public URL for the live project — omit until available (e.g. GitHub repos). */
	liveUrl?: string;
	/** Button label override; defaults to VISIT {hostname}. */
	liveUrlLabel?: string;
};

const submiranImage = projectImage('/images/submiran.png', 1028, 661);
const argonImage = projectImage('/images/argon.png', 1028, 613);
const maarHeroImage = projectImage('/images/maar-01.png', 1028, 685);
const maarSecondaryImage = projectImage('/images/maar-02.png', 1028, 717);

export const workTabs = [
	{ id: 'all', label: 'ALL' },
	{ id: 'software', label: 'SOFTWARE' },
	{ id: 'security', label: 'SECURITY' },
	{ id: 'devops', label: 'DEVOPS' },
	{ id: 'infrastructure', label: 'INFRASTRUCTURE' }
] as const;

export type WorkTabId = (typeof workTabs)[number]['id'];

export const projects: Project[] = [
	{
		slug: 'submiran',
		title: 'SUBMIRAN',
		description:
			'A literary submission platform for magazines, presses, and writers. Reading periods, blind review, and clear responses in one place.',
		image: submiranImage,
		category: 'software',
		service: 'FULL-STACK SAAS',
		client: 'SUBMIRAN',
		year: '2026',
		liveUrl: 'https://submiran.com',
		heroDescription:
			'Poetry magazines, indie presses, and writers sending work into open calls. One desk to run a reading period, track every manuscript, and send a clear answer when the decision is made.',
		sections: [
			{
				title: 'THE PROBLEM',
				body: 'Most literary journals still run submissions through email threads, shared folders, and spreadsheets that were never meant to hold a reading period. Writers submit and wait for months without knowing whether their file arrived, let alone where it sits in the queue. Editors assign readers by forwarding attachments. Blind review depends on someone remembering to strip the author name before the next person opens the file. The tools that exist were built for grant applications or corporate HR, and they charge per submission on top of a monthly fee. The literary world needed something built for how editorial work actually happens.'
			},
			{
				title: 'MY APPROACH',
				body: 'I started from the submission lifecycle itself: open a window, receive work, triage it, assign readers, record decisions, send responses. Each step had to have a single owner in the system. Blind review could not be a checkbox. It had to be enforced at the data layer so no reader could reach author identity through any screen or export. Writers needed their own portal with history, status, and withdrawal before a decision landed. Journals running more than one publication had to share one account without paying again for each title.'
			},
			{
				title: 'THE SOLUTION',
				body: 'Submiran gives each journal a submission desk with configurable windows, genres, and reading periods. Editors work from a filtered queue with reader assignments and decision templates. Responses go out through the platform instead of a personal inbox. Writers track every piece from one portal. Blind review applies per window across every interface. The product handles intake, triage, peer review, and the final email when the decision is made.'
			},
			{
				title: 'WHAT CHANGED',
				body: 'Editors stopped losing reader notes in forwarded threads. Writers could see expected timelines instead of guessing. The platform is free for writers and priced for publishers, which matches how the literary economy actually works. Submiran is live at submiran.com for journals, presses, and writers who want a reading period run like a reading period.'
			}
		]
	},
	{
		slug: 'argon-intelligence',
		title: 'ARGON',
		description:
			'A multi-platform intelligence stack for Argon Analytics: public presence, institutional client portal, and internal operations admin.',
		image: argonImage,
		category: 'software',
		service: 'FULL-STACK',
		client: 'ARGON ANALYTICS',
		year: '2025',
		liveUrl: 'https://argon.africa',
		heroDescription:
			'Research and data analytics across African markets, delivered through a public site, an institutional intelligence platform, and an admin console for editorial and access workflows.',
		sections: [
			{
				title: 'THE PROBLEM',
				body: 'Argon Analytics operates across advisory, consulting, and intelligence work in African markets. The public needed a clear entry point to understand what the organisation does. Institutional clients needed a governed way to access political, security, and market coverage without receiving raw dumps of unverified material. Internal teams needed one place to manage publishing, analyst access, and incoming institutional requests. Three audiences, three trust boundaries, and no single template could serve all of them without leaking the wrong thing to the wrong room.'
			},
			{
				title: 'MY APPROACH',
				body: 'I treated each surface as its own product with its own auth boundary. The marketing site carries services, insights, and contact paths for a general audience. Argon Pro serves institutional clients who need structured intelligence streams, role-based access, and outputs they can act on. Admin stays behind a separate login for editorial publishing, analyst provisioning, and request handling. Shared identity where it made sense, hard separation where it did not. I stayed within what each audience is meant to see publicly and kept implementation detail out of client-facing copy.'
			},
			{
				title: 'THE SOLUTION',
				body: 'argon.africa presents Argon’s work across advisory, consulting, intelligence, and security services with published insights and clear contact paths. pro.argon.africa gives institutional users continuous coverage across political, security, and market domains with analyst-verified outputs and licensing tiers for enterprise teams. admin.argon.africa keeps operations in one console: publishing, access control, and institutional requests without splitting work across inboxes and spreadsheets.'
			},
			{
				title: 'WHAT CHANGED',
				body: 'Argon now has a public face that matches the depth of the work, a client platform built for institutions operating in volatile environments, and an internal surface that lets the team run publishing and access without friction. Each URL serves one audience. The stack ships as a product family rather than a single dashboard bolted onto a brochure site.'
			}
		]
	},
	{
		slug: 'the-maar-review',
		title: 'THE MAAR REVIEW',
		description:
			'A digital literary journal for poetry, fiction, visual art, and non-fiction. Spotlight features, issue archives, and open submissions in one reading experience.',
		image: maarHeroImage,
		secondaryImage: maarSecondaryImage,
		category: 'software',
		service: 'WEB PLATFORM',
		client: 'THE MAAR REVIEW',
		year: '2026',
		liveUrl: 'https://themaarreview.com.ng',
		heroDescription:
			'Vanguard of Artistry. A value-driven creative house publishing poetry, visual art, fiction, and non-fiction through a journal built for readers and contributors alike.',
		sections: [
			{
				title: 'THE PROBLEM',
				body: 'The MAAR Review needed a digital home that treated the work as the point, not the platform. Generic literary templates bury poems and essays inside blog chrome built for marketing posts. A journal with four categories (poetry, fiction, visual art, non-fiction) needs readers to move between them without losing place. Editors needed to publish spotlight features, archive issues, and surface contributor pages without fighting a CMS that assumes every post is the same shape. Writers needed a submit path that sat next to the journal, not on a separate subdomain that felt like an afterthought.'
			},
			{
				title: 'MY APPROACH',
				body: 'I designed the reading experience first. The homepage opens with a spotlight piece and branches into popular and recent publications in a grid where category, date, and title travel with every card. Typography does the editorial work: serif for the journal name, monospace for navigation labels and metadata, pastel chips for category tags. The CMS maps to how the editors actually publish: issues, contributors, team pages, and a submit flow wired into the same navigation shell as the reading pages.'
			},
			{
				title: 'THE SOLUTION',
				body: 'themaarreview.com.ng runs as a full journal site with spotlight features, category browsing, issue archives, and contributor profiles. Poetry, fiction, visual art, and non-fiction each carry distinct tagging without splitting into separate sites. The about, team, and submit pages live inside the same typographic world as the published work. Editors publish through structured content types rather than free-form posts that break on the next redesign.'
			},
			{
				title: 'WHAT CHANGED',
				body: 'The MAAR Review has a site that reads like a journal on the page, not a portfolio theme with articles poured in. Readers can follow spotlight work into the archive. Contributors reach submission through the same front door as everyone else. The platform is live and carrying current publications across all four categories.'
			}
		]
	},
	{
		slug: 'secure-cicd-pipeline',
		title: 'SECURE CI/CD',
		description:
			'A pipeline that runs SAST, container scans, and secret detection on every merge without blocking velocity.',
		image: cdnWorkImage(
			'68613242239c7a3f0437bea0_Work%20Image-3.png',
			`${workImg('68613242239c7a3f0437bea0_Work%20Image-3-p-500.png')} 500w, ${workImg('68613242239c7a3f0437bea0_Work%20Image-3-p-800.png')} 800w, ${workImg('68613242239c7a3f0437bea0_Work%20Image-3.png')} 1005w`,
			1005,
			1005
		),
		category: 'devops',
		service: 'DEVSECOPS',
		client: 'QODEL TECHNOLOGIES',
		year: '2025',
		heroDescription:
			'A pipeline that runs SAST, container scans, and secret detection on every merge without blocking velocity.',
		sections: [
			{
				title: 'THE PROBLEM',
				body: 'Security scanning on the team ran late or not at all. SAST fired generic rules that developers learned to ignore. Container images reached production without a vulnerability pass. Secrets had appeared in git history more than once. The choice seemed to be slow every merge with noisy findings, or skip checks and hope review caught problems. Neither option scaled.'
			},
			{
				title: 'MY APPROACH',
				body: 'I wired checks into pull requests where developers already work. Semgrep rules were tuned to our stack so findings came with fix context instead of boilerplate severity. Critical issues block merge. Warnings open tickets automatically. Trivy scans images and lockfiles before deploy. Gitleaks searches history, not just the latest diff. Failed scans post results in the PR thread with reproduction steps so the author does not hunt through CI logs.'
			},
			{
				title: 'THE SOLUTION',
				body: 'Every merge request runs SAST, container scanning, and secret detection as standard pipeline stages. Developers see security feedback beside code review. Supply chain checks gate deploy artifacts. The pipeline distinguishes between stop-ship findings and work that can ship with a tracked follow-up.'
			},
			{
				title: 'WHAT CHANGED',
				body: 'Security moved left without turning every PR into a half-day wait. Developers started fixing Semgrep findings because the rules spoke their language. Container vulnerabilities surfaced before production. Secret leaks got caught in history scans. The team shipped at the same pace with fewer surprises after deploy.'
			}
		]
	},
	{
		slug: 'security-monitoring-lab',
		title: 'MINI SOC LAB',
		description:
			'An enterprise security monitoring lab with Wazuh, Elastic, and Suricata for detection engineering practice.',
		image: cdnWorkImage(
			'68617507a4cd58cd0ea3828b_Work%20Image.png',
			`${workImg('68617507a4cd58cd0ea3828b_Work%20Image-p-500.png')} 500w, ${workImg('68617507a4cd58cd0ea3828b_Work%20Image-p-800.png')} 800w, ${workImg('68617507a4cd58cd0ea3828b_Work%20Image.png')} 1005w`,
			1005,
			1005
		),
		category: 'security',
		service: 'DETECTION ENG',
		client: 'INTERNAL LAB',
		year: '2024',
		heroDescription:
			'An enterprise security monitoring lab with Wazuh, Elastic, and Suricata for detection engineering practice.',
		sections: [
			{
				title: 'THE PROBLEM',
				body: 'Detection engineering is hard to learn from slides. Analysts need correlated host and network telemetry, rules that fire on sequences rather than single log lines, and attack traffic they can replay without touching production. Most training environments are either toy setups that teach nothing about noise, or production access that interns should not have on day one. The gap was a lab that felt like a real SOC without the blast radius.'
			},
			{
				title: 'MY APPROACH',
				body: 'I built a self-contained monitoring stack. Suricata feeds network events. Wazuh collects host telemetry. Elastic correlates both so rules can reason across signal types. Each alert links back to the raw events that triggered it. Attack scenarios run from replayed traffic so practitioners tune detections against known behaviour instead of waiting for a live incident.'
			},
			{
				title: 'THE SOLUTION',
				body: 'The Mini SOC Lab gives practitioners a full detection pipeline: ingest, correlation, rule authoring, and alert triage. Exercises walk through writing a first detection, tuning false positives, and tracing an alert to source events. The environment mirrors what they would see in enterprise monitoring without requiring production credentials.'
			},
			{
				title: 'WHAT CHANGED',
				body: 'Over a hundred practitioners have run exercises in the lab and shipped their first detection within a week of starting. The lab became the default training ground for detection engineering on the team. Analysts arrive at production work already knowing how correlated rules behave under replayed attack traffic.'
			}
		]
	},
	{
		slug: 'aws-cloud-assessment',
		title: 'AWS ASSESSMENT',
		description:
			'A cloud security assessment covering GuardDuty, CloudTrail, and IAM hardening across production accounts.',
		image: cdnWorkImage(
			'686174bbc48367e20393c237_Work%20Image-2.png',
			`${workImg('686174bbc48367e20393c237_Work%20Image-2-p-500.png')} 500w, ${workImg('686174bbc48367e20393c237_Work%20Image-2-p-800.png')} 800w, ${workImg('686174bbc48367e20393c237_Work%20Image-2.png')} 1005w`,
			1005,
			1005
		),
		category: 'security',
		service: 'CLOUD SECURITY',
		client: 'ENTERPRISE CLIENT',
		year: '2024',
		heroDescription:
			'A cloud security assessment covering GuardDuty, CloudTrail, and IAM hardening across production accounts.',
		sections: [
			{
				title: 'THE PROBLEM',
				body: 'Production AWS accounts had grown faster than their permission model. Roles accumulated policies that nobody mapped to actual API usage. Cross-account trust relationships lacked external ID requirements. GuardDuty fired on expected CI activity often enough that teams muted findings. CloudTrail coverage had gaps the client did not know about until the assessment started. Scanner output ranked everything by generic severity instead of what could actually hurt them.'
			},
			{
				title: 'MY APPROACH',
				body: 'I mapped every role and policy to real API calls through CloudTrail rather than trusting what IAM said on paper. Unused permissions were removed. Trust relationships got explicit external ID requirements where cross-account access was required. GuardDuty findings were tuned against known CI patterns. Findings were ranked by blast radius so remediation order reflected business risk, not scanner defaults.'
			},
			{
				title: 'THE SOLUTION',
				body: 'The assessment delivered an IAM map tied to observed usage, a tuned GuardDuty baseline, and validated CloudTrail integrity across production accounts. Remediation shipped as Terraform modules so fixes persisted after the engagement ended instead of living in a PDF someone filed away.'
			},
			{
				title: 'WHAT CHANGED',
				body: 'The client reduced permission sprawl across production accounts, cut GuardDuty noise to actionable signal, and closed audit trail gaps. Infrastructure-as-code modules meant hardening outlasted the consultant. The report ranked what to fix first by what could actually be exploited, not by what a scanner yelled loudest about.'
			}
		]
	}
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

export function getProjectsByTab(tabId: WorkTabId): Project[] {
	if (tabId === 'all') return projects;
	return projects.filter((project) => project.category === tabId);
}
