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
		let menuItems = document.querySelectorAll('.menu__link');
		for (let i = 0, len = menuItems.length; i < len; i++) {
			if (menuItems[i].getAttribute("href").split('-')[0].indexOf(current) !== -1) {
				menuItems[i].className += " active";
				return
			}
		}
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
				winTop >= 90 ?
				stickyHeader.classList.add("subheader--sticky") :
				stickyHeader.classList.remove("subheader--sticky");

				mainNavLinks?.forEach(link => {
					let sec = document.querySelector(link.hash);
						if (sec.offsetTop <= winTop + 5 && sec.offsetTop + sec.offsetHeight > winTop + 5) {
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
				autoplay: {
					delay: 6000,
					disableOnInteraction: true,
				},
				pagination: {
					el: ".swiper-pagination",
					renderBullet: function (index, className) {
						return `<span class="${className} testimon__avatar"><img src="${arrImgs[index]}" alt="avatar" width="87" height="87"></span>`;
					},
					clickable: true,
				}
			});
		};

		const introSlider = document.querySelector(".intro__slider");
		if (introSlider) {
			new Swiper(introSlider, {
				draggable:true,
				grabCursor: true,
				centeredSlides: true,
				spaceBetween: 30,
				autoHeight: true,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				}
			});
		};


		// copyright - year
		const year = document.getElementById("year");
		if (year) {
			year.innerHTML = new Date().getFullYear();
		};


});