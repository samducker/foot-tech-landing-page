import { TimelineMax } from 'gsap';
import imagesLoaded from 'imagesloaded';
import inView from 'in-view';

const DATA_ATTR = 'featured-animation';

class FeaturedAnimations {
	constructor() {
		const $containers = $('[data-featured-animation]');
		$containers.each((index, el) => {
			new FeaturedAnimation($(el), index);
		});
	}
}

class FeaturedAnimation {
	constructor($container, id) {
		this._id = id;
		this.$container = $container;
		this.$innerContainer = this.$container.children().first();
		this.$container[0].setAttribute('data-featured-animation-id', id);
		this.$imageContainer = this.$container.find(`[data-${DATA_ATTR}-image-container]`);
		this.$boy = this.$container.find(`[data-${DATA_ATTR}-boy]`);
		this.$leg = this.$container.find(`[data-${DATA_ATTR}-leg]`);
		this.$wheel = this.$container.find(`[data-${DATA_ATTR}-wheel]`);

		this.init();
	}

	init() {
		inView(`[data-${DATA_ATTR}-id="${this._id}"]`).once('enter', () => {
			imagesLoaded(this.$container[0], () => this.runAnimation());
		});
	}

	runAnimation() {
		const DURATION = 0.65;
		TweenMax.to(this.$innerContainer, 0.15, { alpha: 1, ease: Power1.easeIn });
		TweenMax.fromTo(
			this.$leg,
			0.55,
			{ x: -100, rotation: 10 },
			{ x: 0, rotation: 0, ease: Power1.easeOut }
		);
		TweenMax.fromTo(this.$boy, 0.55, { x: -100, y: 10 }, { x: 0, y: 0, ease: Power1.easeOut });
		TweenMax.fromTo(this.$wheel, DURATION, { scale: 0 }, { scale: 1, ease: Power1.easeOut });
		TweenMax.fromTo(
			this.$wheel,
			DURATION,
			{ x: -60, y: 20, rotation: -720 },
			{
				x: 0,
				y: 0,
				rotation: 0,
				ease: Power1.easeInOut,
				onComplete: () => this.initInteractions(),
			}
		);
	}

	initInteractions() {
		this.$boy.on('mouseenter', () => {
			this.handleMouseEnter();
		});

		this.$boy.on('mouseleave', () => {
			this.handleMouseLeave();
		});

		this.$boy.on('click', () => {
			this.handleClick();
		});
	}

	handleMouseEnter() {
		TweenMax.to(this.$boy, 1.5, {
			scale: 1.01,
			skewX: 0.5,
			skewY: 0.5,
			ease: Power1.easeOut,
			repeat: -1,
			yoyo: true,
		});
		TweenMax.to(this.$leg, 1.75, {
			rotation: 0.5,
			scale: 1.01,
			skewY: -1,
			ease: Linear.easeNone,
			repeat: -1,
			yoyo: true,
		});
		TweenMax.to(this.$wheel, 0.55, { rotation: '+=180', ease: Linear.easeNone, repeat: -1 });
	}

	handleMouseLeave() {
		TweenMax.to(this.$boy, 0.35, { scale: 1, ease: Power1.easeOut });
		TweenMax.to(this.$leg, 0.35, { rotation: 0, scale: 1, ease: Power1.easeOut });
		TweenMax.killTweensOf(this.$wheel);
	}

	handleClick() {
		TweenMax.to(this.$wheel, 0.35, { rotation: '+=180', ease: Linear.easeNone, overwrite: false });
	}
}

export default new FeaturedAnimations();
