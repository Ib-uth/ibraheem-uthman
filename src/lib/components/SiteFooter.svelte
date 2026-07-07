<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { initFooterLinkBlur, initFooterMarquee } from '$lib/actions/animateText';
	import { SOCIAL_LINKS } from '$lib/constants/site';

	let cleanupBlur: (() => void) | undefined;
	let cleanupMarquee: (() => void) | undefined;

	onMount(() => {
		cleanupBlur = initFooterLinkBlur();
		cleanupMarquee = initFooterMarquee();
		return () => {
			cleanupBlur?.();
			cleanupMarquee?.();
		};
	});

	const path = $derived($page.url.pathname);
</script>

<section class="footer">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="w-layout-grid content-footer">
			<div class="left-footer">
				<div class="column-footer">
					<div class="text-bold">TALK TO ME</div>
					<div class="link-list-footer">
						<a href="mailto:hello@ibraheemuthman.com" class="link-footer">hello@ibraheemuthman.com</a>
					</div>
				</div>
			</div>
			<div id="w-node-c5e6d357-5aab-743c-aaf1-a3f81ff8cf36-1ff8cf28" class="right-footer">
				<div class="footer-thirds">
					<div class="column-footer">
						<div class="text-bold">COMPANY</div>
						<div class="link-list-footer">
							<a href="/" class="link-footer" class:w--current={path === '/'}>Home</a>
							<a href="/about" class="link-footer" class:w--current={path === '/about'}>About</a>
							<a href="/project" class="link-footer" class:w--current={path.startsWith('/project')}>Projects</a>
							<a href="/contact" class="link-footer" class:w--current={path === '/contact'}>Contact</a>
						</div>
					</div>
					<div class="column-footer">
						<div class="text-bold">SOCIALS</div>
						<div class="link-list-footer">
							{#each SOCIAL_LINKS as link}
								<a href={link.href} class="link-footer" rel="me noopener noreferrer" target="_blank">{link.label}</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="master-marquee-footer">
		<div class="marquee-footer">
			<div class="marquee-footer-item">
				{#each Array(6) as _}
					<div class="text-h1">IBRAHEEM UTHMAN</div>
				{/each}
			</div>
			<div class="marquee-footer-item">
				{#each Array(6) as _}
					<div class="text-h1">IBRAHEEM UTHMAN</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="bottom-tile-footer">
			<div class="footer-copyright">© 2026 Ibraheem Uthman. All rights reserved.</div>
			<div class="footer-credits">
				Software &amp; security engineering · Abuja, Nigeria ·
				<a href="mailto:hello@ibraheemuthman.com" class="text-light text-underline"
					>hello@ibraheemuthman.com</a
				>
			</div>
		</div>
	</div>
</section>
