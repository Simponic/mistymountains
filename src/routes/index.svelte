<script>
	import { setImageUrl } from '$lib/utils';
	import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import 'swiper/css/scrollbar';
	import 'swiper/css/autoplay';

	const images = [
		{ image: 'mountains.png', alt: 'Cloudy mountains in a light sky' },
		{ image: 'office-1-1.jpeg', alt: 'Office room one' },
		{ image: 'office-1-2.jpeg', alt: 'Office room one angle two' }
	].map(setImageUrl);
</script>

<div class="row align-items-center py-2">
	<div class="col-md-7">
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
			class="rounded shadow"
			spaceBetween={50}
			slidesPerView={1}
			autoHeight={true}
			loop={true}
			navigation
			pagination={{ clickable: true }}
			autoplay={true}
			speed={1000}
			on:slideChange={() => console.log('slide change')}
			on:swiper={(e) => console.log(e.detail[0])}
		>
			{#each images as { image, alt } (image)}
				<SwiperSlide>
					<img class="image-fluid" style="width:100%" src={image} {alt} />
				</SwiperSlide>
			{/each}
		</Swiper>
	</div>
	<div class="col-md-5 my-2">
		<h2>Helping you conquer Mount Doom</h2>
		<p><a href="/contact" class="btn btn-success shadow">FREE 15 Minute Consultation</a></p>
	</div>
</div>

<div class="bg-light rounded p-3 shadow">
	<div class="d-flex justify-content-center">
		<div class="col-md-8 mt-2 border-bottom">
			<h3>
				"Darkness must pass, a new day will come, and when the sun shines, it will shine out the
				clearer."
			</h3>
			<div class="d-flex justify-content-end">- Samwise Gamgee</div>
			<br />
			<p>
				Misty Mountains Therapy is a privately owned, high quality, specialty therapy clinic,
				founded in January 2020 by Jefferson Hunt. We are dedicated to providing comprehensive
				therapy evaluation and treatment services to children and adults for a wide variety of
				disorders in the most efficient and effective manner possible in the Rexburg area. We
				believe that therapy should be fun, engaging, and most importantly, useful to our clients.
			</p>
			<p>
				We are currently accepting new clients and offer a variety of services to help you live the
				life you desire. To find the right fit for you, schedule a <a href="/contact"
					>free 15-minute consultation</a
				>.
			</p>
		</div>
	</div>

	<div class="d-flex justify-content-center">
		<div class="col-md-8 mt-2">
			<div>
				We do not have a crisis line. If you or someone you know is in danger please call 911, visit
				your nearest emergency room, call the National Suicide Prevention Lifeline for free crisis
				counseling at <a href="tel:18002738255">(800)273-TALK</a> (8255), or text HELLO to 741-741.
			</div>
		</div>
	</div>
	<br />
</div>
