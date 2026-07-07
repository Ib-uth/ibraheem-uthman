<script lang="ts">
	import { onMount } from 'svelte';
	import { animateCharsLoad } from '$lib/actions/animateText';
	import { tagParallax } from '$lib/actions/interactions';

	type FormState = 'idle' | 'success' | 'error';

	const requiredMark = '*';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let company = $state('');
	let formLoadedAt = $state(0);
	let formState = $state<FormState>('idle');
	let errorMessage = $state('Oops! Something went wrong while submitting the form.');
	let submitting = $state(false);

	onMount(() => {
		formLoadedAt = Date.now();
	});

	function validate(): string | null {
		if (!name.trim()) return 'Name is required.';
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return 'Please enter a valid email address.';
		}
		if (!phone.trim()) return 'Phone number is required.';
		if (!message.trim()) return 'Message is required.';
		if (message.trim().length < 10) return 'Message must be at least 10 characters.';
		return null;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const error = validate();
		if (error) {
			errorMessage = error;
			formState = 'error';
			return;
		}

		submitting = true;
		formState = 'idle';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					phone,
					message,
					company,
					formLoadedAt
				})
			});

			const payload = (await response.json().catch(() => null)) as { error?: string } | null;

			if (!response.ok) {
				errorMessage = payload?.error ?? 'Oops! Something went wrong while submitting the form.';
				formState = 'error';
				return;
			}

			formState = 'success';
			name = '';
			email = '';
			phone = '';
			message = '';
			company = '';
			formLoadedAt = Date.now();
		} catch {
			errorMessage = 'Unable to reach the server. Please try again in a moment.';
			formState = 'error';
		} finally {
			submitting = false;
		}
	}
</script>

<section class="section hero-contact" use:tagParallax>
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="contact-wrap">
			<div class="title-contact">
				<h2 class="no-margins" animate-chars-load use:animateCharsLoad>CONTACT ME</h2>
			</div>
			<div class="form-block-contact w-form">
				<form
					id="email-form"
					name="email-form"
					class:hide={formState === 'success'}
					onsubmit={handleSubmit}
				>
					<div class="form-contact-inner">
						<div class="contact-field">
							<label class="contact-label" for="name">
								NAME <span class="contact-required" aria-hidden="true">{requiredMark}</span>
							</label>
							<input
								class="text-field w-input"
								maxlength="100"
								name="name"
								placeholder="YOUR NAME"
								type="text"
								id="name"
								required
								aria-required="true"
								autocomplete="name"
								bind:value={name}
							/>
						</div>
						<div class="contact-field">
							<label class="contact-label" for="email">
								EMAIL <span class="contact-required" aria-hidden="true">{requiredMark}</span>
							</label>
							<input
								class="text-field w-input"
								maxlength="254"
								name="email"
								placeholder="YOU@EXAMPLE.COM"
								type="email"
								id="email"
								required
								aria-required="true"
								autocomplete="email"
								inputmode="email"
								bind:value={email}
							/>
						</div>
						<div class="contact-field">
							<label class="contact-label" for="phone">
								PHONE NUMBER <span class="contact-required" aria-hidden="true">{requiredMark}</span>
							</label>
							<input
								class="text-field w-input"
								maxlength="30"
								name="phone"
								placeholder="+234 801 234 5678"
								type="tel"
								id="phone"
								required
								aria-required="true"
								autocomplete="tel"
								inputmode="tel"
								minlength="7"
								bind:value={phone}
							/>
						</div>
						<div class="contact-field">
							<label class="contact-label" for="message">
								MESSAGE <span class="contact-required" aria-hidden="true">{requiredMark}</span>
							</label>
							<textarea
								required
								aria-required="true"
								minlength="10"
								placeholder="DROP ME A MESSAGE"
								maxlength="5000"
								id="message"
								name="message"
								class="text-field textarea w-input"
								bind:value={message}
							></textarea>
						</div>
						<div class="contact-honeypot" aria-hidden="true">
							<label for="company">Company</label>
							<input
								id="company"
								name="company"
								type="text"
								tabindex="-1"
								autocomplete="off"
								bind:value={company}
							/>
						</div>
						<p class="contact-required-note">
							<span class="contact-required" aria-hidden="true">{requiredMark}</span>
							<span>All fields are required</span>
						</p>
						<input
							type="submit"
							class="cta-main w-button"
							value={submitting ? 'Please wait...' : 'SUBMIT'}
							disabled={submitting}
						/>
					</div>
				</form>
				<div class="success-message w-form-done" class:w-form-done-visible={formState === 'success'}>
					<div>Thank you! I received your message and will respond shortly.</div>
				</div>
				<div class="error-message w-form-fail" class:w-form-fail-visible={formState === 'error'}>
					<div>{errorMessage}</div>
				</div>
			</div>
			<div class="tag-wrap-contact">
				<div class="first-tag">
					<div class="tag cta-first">
						<div class="tag-text">hello@ibraheemuthman.com</div>
					</div>
				</div>
				<div class="second-tag">
					<div class="tag cta-second">
						<div class="tag-text">ABUJA, NIGERIA</div>
					</div>
				</div>
				<div class="third-tag">
					<div class="tag cta-third">
						<div class="tag-text">DROP A MSG</div>
					</div>
				</div>
				<div class="fourth-tag">
					<div class="tag cta-fourth">
						<div class="tag-text">HI THERE</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	form.hide {
		display: none;
	}

	.contact-honeypot {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
		opacity: 0;
		pointer-events: none;
	}

	.w-form-done-visible,
	.w-form-fail-visible {
		display: block;
	}
</style>
