"use strict";
	/**
	 active menu point
	**/
	function setActiveMenuItem() {
		let current = location.pathname.split('/').reverse()[0];
		if (current === "") current = 'index.html';
		else {
			current = current.split('-')[0];
		}
		// console.log(current);
		let menuItems = document.querySelectorAll('.menu__link');
		for (let i = 0, len = menuItems.length; i < len; i++) {
			if (menuItems[i].getAttribute("href").split('-')[0].indexOf(current) !== -1 && current.length > 3) {
				menuItems[i].className += " active";
				return
			}
		};
	};

	const menuTrigger = document.querySelector(".btn--menu");
	const subMenus = document.querySelectorAll(".sub-menu");
	const header = menuTrigger.closest(".header");

	document.addEventListener('DOMContentLoaded', function(){
		setActiveMenuItem();
		//user menu

		menuTrigger?.addEventListener("click", function() {
			header.classList.toggle("header--open");
			header.querySelector(".menu").classList.toggle("menu--open");
			[...subMenus].forEach(function(el){
				el.classList.remove("open");
			});
		});

		if (subMenus){
			[...subMenus].forEach(function(el){
				el.addEventListener("click",function(){
					this.classList.toggle("open");
				})
			})
		};

		//close dialogs
		window.addEventListener('click', function(e) {
			if (!e.target.closest(".header")) {
				header.classList.remove("header--open");
				header.querySelector(".menu").classList.remove("menu--open");
			}
		});

		const stickyHeader = document.getElementById("subheader");
		if (stickyHeader) {
			const mainNavLinks = [...stickyHeader.querySelectorAll("a")].filter(item => !item.classList.contains("subheader__link"));
			window.addEventListener('scroll', function() {
				let winTop = window.scrollY;
				winTop >= 220 ?
				stickyHeader.classList.add("subheader--sticky") :
				stickyHeader.classList.remove("subheader--sticky");

				mainNavLinks?.forEach(link => {
					let sec = document.querySelector(link.hash);
						if (sec.offsetTop <= winTop + 10 && sec.offsetTop + sec.offsetHeight > winTop + 10) {
							link.classList.add("current");
						} else {
							link.classList.remove("current");
						}
					});

			});
		};

		// anhor
		const btnScrollDown = document.getElementById("btn-scroll-down");
		btnScrollDown?.addEventListener('click', function(e) {
			e.preventDefault();
			const parent = btnScrollDown.closest(".intro");
			const target = parent.nextElementSibling;
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		});

		//slider-testimonials
		const swiperTest = document.querySelector(".testimon__slider");
		if (swiperTest) {
			const arrImgs = swiperTest.getAttribute("data-images").split(',');
			new Swiper(swiperTest, {
				draggable:true,
				grabCursor: true,
				centeredSlides: true,
				spaceBetween: 30,
				autoHeight: true,
				effect: "fade",
				// autoplay: {
				// 	delay: 6000,
				// 	disableOnInteraction: true,
				// },
				pagination: {
					el: ".swiper-pagination",
					renderBullet: function (index, className) {
						return `<span class="${className} testimon__avatar"><img src="${arrImgs[index]}" alt="avatar" width="87" height="87"></span>`;
					},
					clickable: true,
				}
			});
		};

		// const introSlider = document.querySelector(".intro__slider");
		// if (introSlider) {
		// 	new Swiper(introSlider, {
		// 		draggable:true,
		// 		grabCursor: true,
		// 		centeredSlides: true,
		// 		spaceBetween: 30,
		// 		autoHeight: true,
		// 		pagination: {
		// 			el: ".swiper-pagination",
		// 			clickable: true,
		// 		}
		// 	});
		// };

		const darkSlider = document.querySelector(".dark__slider");
		if (darkSlider) {
			new Swiper(darkSlider, {
				draggable:true,
				grabCursor: true,
				centeredSlides: true,
				spaceBetween: 30,
				autoHeight: true,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
					centeredSlides:true,
				},
				720: {
					slidesPerView: 2,
					spaceBetween: 34,
					centeredSlides:false,

				}}
			});
		};

		/**
			accordions
		**/
		const accordionOpen = function () {
			[].forEach.call(
				document.querySelectorAll("[data-collapse]"),
				function (el) {
					el.addEventListener("click", function (e) {
						e.preventDefault();
						let currentItem = this.closest(".accordion__item");
						currentItem.classList.toggle("expanded");
					});
				}
			);
		};
		accordionOpen();

		/**
			tabs ordinary
		**/
		const tabSwitcher = function () {
			[].forEach.call(
				document.querySelectorAll("[data-trigger-tab]"),
				function (el) {
					el.addEventListener("click", function (e) {
						let id = this.getAttribute("data-trigger-tab"),
							comingTab = document.getElementById(id),
							parent = comingTab.closest('.tabs-content'),
							currentTab = parent.querySelector('[data-tab="active"]');

						currentTab?.setAttribute("data-tab", "hidden");
						comingTab.setAttribute("data-tab", "active");

						let tabsBlock = this.closest('.tabs');
						if (tabsBlock) {
							let allTabs = tabsBlock.querySelectorAll('[data-trigger-tab]');
							[...allTabs].forEach(item => {
								item.classList.remove('active');
							});
							this.classList.add('active');
						};
					});
				}
			);
		};
		tabSwitcher();


		// copyright - year
		const year = document.getElementById("year");
		if (year) {
			year.innerHTML = new Date().getFullYear();
		};


});