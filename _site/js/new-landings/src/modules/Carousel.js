import Swiper from 'swiper';

class Carousel {
	constructor() {
		this.$container = $('[data-carousel]');
		this.$itemsContainer = this.$container.find('[data-carousel-container]');
		this.$prev = this.$container.find('[data-carousel-prev]');
		this.$next = this.$container.find('[data-carousel-next]');

		this.swiper = new Swiper(this.$itemsContainer[0], {
			loop: true,
			loopedSlides: 10,

			navigation: {
				nextEl: this.$prev[0],
				prevEl: this.$next[0],
			},
		});
	}
}

export default new Carousel();
