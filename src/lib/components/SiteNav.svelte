<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { gsap } from '$lib/gsap/register';

	let menuOpen = $state(false);
	let navWrap: HTMLElement | undefined = $state();

	const menuLinks = [
		{ href: '/about', label: 'About', num: '01', class: '_1', eyebrow: 'first' },
		{ href: '/services', label: 'SERVICES', num: '02', class: '_2', eyebrow: 'second' },
		{ href: '/project', label: 'PROJECTS', num: '03', class: '_3', eyebrow: 'third' },
		{ href: '/blog', label: 'Blog', num: '04', class: '_4', eyebrow: 'fourth' },
		{ href: '/contact', label: 'CONTACT', num: '05', class: '_5', eyebrow: 'fifth' }
	];

	function isActive(href: string) {
		return $page.url.pathname === href;
	}

	function openMenu() {
		if (menuOpen || !navWrap) return;
		menuOpen = true;
		document.body.style.overflow = 'hidden';

		const menu = navWrap.querySelector('.menu');
		const overlay = navWrap.querySelector('.bg-overlay-menu');
		const content = navWrap.querySelector('.content-menu');
		const panels = navWrap.querySelectorAll('.menu-bg-panel');
		const links = navWrap.querySelectorAll('.menu-link');
		const bottom = navWrap.querySelector('.menu-bottom');
		const lineFirst = navWrap.querySelector('.line-first');
		const lineSecond = navWrap.querySelector('.line-second');

		if (menu) gsap.set(menu, { display: 'flex' });
		gsap.set(panels, { width: '0%' });
		if (content) gsap.set(content, { x: '100%' });

		const tl = gsap.timeline();
		if (lineFirst) tl.to(lineFirst, { width: '65%', duration: 0.1 }, 0);
		if (overlay) tl.to(overlay, { opacity: 1, duration: 0.2 }, 0);
		if (lineSecond) {
			tl.to(lineSecond, { y: -7, duration: 0.3 }, 0);
			tl.to(lineSecond, { rotation: -45, duration: 0.3 }, 0);
		}
		if (lineFirst) tl.to(lineFirst, { rotation: 45, duration: 0.3 }, 0);
		if (panels[0]) tl.to(panels[0], { width: '100%', duration: 0.5, ease: 'circ.out' }, 0);
		if (panels[1]) tl.to(panels[1], { width: '100%', duration: 0.5, ease: 'circ.out' }, 0.1);
		if (panels[2]) tl.to(panels[2], { width: '100%', duration: 0.5, ease: 'circ.out' }, 0.2);
		if (content) tl.to(content, { x: '0%', duration: 0.5, ease: 'power2.out' }, 0.15);
		links.forEach((link, i) => {
			tl.to(link, { y: '0%', duration: 0.5, ease: 'power2.out' }, 0.2 + i * 0.05);
		});
		if (bottom) tl.to(bottom, { opacity: 1, duration: 0.3 }, 0.4);
	}

	function closeMenu() {
		if (!menuOpen || !navWrap) return;
		menuOpen = false;
		document.body.style.overflow = '';

		const menu = navWrap.querySelector('.menu');
		const overlay = navWrap.querySelector('.bg-overlay-menu');
		const content = navWrap.querySelector('.content-menu');
		const panels = navWrap.querySelectorAll('.menu-bg-panel');
		const links = navWrap.querySelectorAll('.menu-link');
		const bottom = navWrap.querySelector('.menu-bottom');
		const lineFirst = navWrap.querySelector('.line-first');
		const lineSecond = navWrap.querySelector('.line-second');

		const tl = gsap.timeline({
			onComplete: () => {
				if (menu) gsap.set(menu, { display: 'none' });
				if (content) gsap.set(content, { x: '100%' });
				gsap.set(panels, { width: '0%' });
			}
		});

		if (lineFirst) tl.to(lineFirst, { width: '100%', duration: 0.1 }, 0);
		if (overlay) tl.to(overlay, { opacity: 0, duration: 0.2 }, 0);
		if (lineSecond) {
			tl.to(lineSecond, { y: 0, duration: 0.3 }, 0);
			tl.to(lineSecond, { rotation: 0, duration: 0.3 }, 0);
		}
		if (lineFirst) tl.to(lineFirst, { rotation: 0, duration: 0.3 }, 0);
		links.forEach((link) => {
			tl.to(link, { y: '100%', duration: 0.3, ease: 'power2.in' }, 0);
		});
		if (bottom) tl.to(bottom, { opacity: 0, duration: 0.2 }, 0);
		if (content) tl.to(content, { x: '100%', duration: 0.35, ease: 'power2.in' }, 0);
		if (panels[2]) tl.to(panels[2], { width: '0%', duration: 0.35, ease: 'circ.out' }, 0.2);
		if (panels[1]) tl.to(panels[1], { width: '0%', duration: 0.35, ease: 'circ.out' }, 0.3);
		if (panels[0]) tl.to(panels[0], { width: '0%', duration: 0.35, ease: 'circ.out' }, 0.4);
	}

	function toggleMenu() {
		if (menuOpen) closeMenu();
		else openMenu();
	}

	function onMenuLinkEnter(e: MouseEvent) {
		const bg = (e.currentTarget as HTMLElement).querySelector('.menu-link-bg');
		if (bg) gsap.to(bg, { scale: 1, duration: 0.15, ease: 'power2.out' });
	}

	function onMenuLinkLeave(e: MouseEvent) {
		const bg = (e.currentTarget as HTMLElement).querySelector('.menu-link-bg');
		if (bg) gsap.to(bg, { scale: 0, duration: 0.2, ease: 'power2.in' });
	}

	onMount(() => {
		if (!navWrap) return;
		gsap.set(navWrap.querySelector('.menu'), { display: 'none' });
		gsap.set(navWrap.querySelectorAll('.menu-link'), { y: '100%' });
		gsap.set(navWrap.querySelector('.menu-bottom'), { opacity: 0 });
		gsap.set(navWrap.querySelector('.content-menu'), { x: '100%' });
		gsap.set(navWrap.querySelectorAll('.menu-bg-panel'), { width: '0%' });
		gsap.set(navWrap.querySelectorAll('.menu-link-bg'), { scale: 0 });
	});
</script>

<div class="nav-wrap" bind:this={navWrap}>
	<div
		data-animation="default"
		data-collapse="all"
		data-duration="400"
		data-easing="ease"
		data-easing2="ease"
		data-no-scroll="1"
		role="banner"
		class="navbar w-nav"
	>
		<div class="main-container w-container">
			<div class="nav-container">
				<a href="/" class="brand w-nav-brand" class:w--current={$page.url.pathname === '/'}>
					<img src="/images/685fee507bb7fc3a2d66f07b_Logo (1).svg" loading="lazy" alt="" />
				</a>
				<div
					class="nav-button"
					role="button"
					tabindex="0"
					aria-label="menu"
					aria-expanded={menuOpen}
					onclick={toggleMenu}
					onkeydown={(e) => e.key === 'Enter' && toggleMenu()}
				>
					<div class="line-first"></div>
					<div class="line-second"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="menu">
		<div class="menu-inner">
			<div class="bg-menu">
				<div class="menu-bg-panel first"></div>
				<div class="menu-bg-panel second"></div>
				<div class="menu-bg-panel third"></div>
			</div>
			<div class="content-menu">
				<div class="menu-list">
					{#each menuLinks as item}
						<div class="menu-list-item">
							<a
								href={item.href}
								class="menu-link {item.class} w-inline-block"
								class:w--current={isActive(item.href)}
								aria-current={isActive(item.href) ? 'page' : undefined}
								onclick={() => closeMenu()}
								onmouseenter={onMenuLinkEnter}
								onmouseleave={onMenuLinkLeave}
							>
								{#if item.class === '_2'}
									<div class="menu-link-bg _2"></div>
								{/if}
								<div class="menu-link-inner">
									<p class="menu-link-title">{item.label}</p>
									<p class="menu-link-eyebrow {item.eyebrow}">{item.num}</p>
								</div>
								{#if item.class === '_1'}
									<div class="menu-link-bg"></div>
								{:else if item.class === '_3'}
									<div class="menu-link-bg _3"></div>
								{:else if item.class === '_4'}
									<div class="menu-link-bg _4"></div>
								{:else if item.class === '_5'}
									<div class="menu-link-bg _5"></div>
								{/if}
							</a>
						</div>
					{/each}
				</div>
				<div class="menu-details">
					<div class="menu-bottom">
						<div>
							Software &amp; security engineering · Abuja, Nigeria ·
							<a href="mailto:hello@ibraheemuthman.com" class="text-dark text-underline"
								>hello@ibraheemuthman.com</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-overlay-menu"></div>
	</div>
</div>
