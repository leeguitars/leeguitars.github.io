/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';



   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');



   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1.15,
            spaceBetween: 16,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                900: {
                    slidesPerView: 3,
                    spaceBetween: 24
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 28
                }
            }
         });

        return mySwiper;

    }; // end ssSwiper


   /* Youtube Carousel
    * ------------------------------------------------------ */
    const ssEscapeHtml = function(value) {
        const div = document.createElement('div');
        div.textContent = value;
        return div.innerHTML;
    }; // end ssEscapeHtml

    const ssParseIsoDuration = function(iso) {
        const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || '') || [];
        const hours = parseInt(match[1] || '0', 10);
        const minutes = parseInt(match[2] || '0', 10);
        const seconds = parseInt(match[3] || '0', 10);
        const pad = function(value) { return String(value).padStart(2, '0'); };

        if (hours > 0) {
            return hours + ':' + pad(minutes) + ':' + pad(seconds);
        }
        return minutes + ':' + pad(seconds);
    }; // end ssParseIsoDuration

    const ssBuildYoutubeCardHtml = function(video) {
        return '<div class="swiper-slide youtube-card">'
            + '<a class="youtube-card__link" href="https://www.youtube.com/watch?v=' + video.id + '"'
            + ' target="_blank" rel="noopener" data-video-id="' + video.id + '">'
            + '<span class="youtube-card__thumb-wrap">'
            + '<img class="youtube-card__thumb"'
            + ' src="https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg" alt="" loading="lazy">'
            + '<span class="youtube-card__play" aria-hidden="true"></span>'
            + '<span class="youtube-card__duration">' + ssEscapeHtml(video.duration) + '</span>'
            + '</span>'
            + '<span class="youtube-card__title">' + ssEscapeHtml(video.title) + '</span>'
            + '</a>'
            + '</div>';
    }; // end ssBuildYoutubeCardHtml

    const ssYoutubeCarousel = function(mySwiper) {

        const YOUTUBE_CHANNEL_ID = 'UCaY7glP16mvh509i_o_WU4Q';
        const YOUTUBE_API_KEY = 'AIzaSyDCPOBwNPVBI7H32fQ91_prDFtfg_H0goY'; // Google Cloud Console에서 발급한 HTTP 리퍼러 제한 키
        const MAX_RESULTS = 7;

        const wrapper = document.querySelector('[data-youtube-carousel]');
        if (!wrapper || !mySwiper) {
            return;
        }

        wrapper.addEventListener('click', function(event) {
            const link = event.target.closest('[data-video-id]');
            if (!link) {
                return;
            }
            event.preventDefault();
            ssOpenVideoLightbox(link.getAttribute('data-video-id'));
        });

        if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
            return;
        }

        const searchEndpoint = 'https://www.googleapis.com/youtube/v3/search'
            + '?key=' + YOUTUBE_API_KEY
            + '&channelId=' + YOUTUBE_CHANNEL_ID
            + '&part=snippet'
            + '&order=date'
            + '&type=video'
            + '&maxResults=' + MAX_RESULTS;

        fetch(searchEndpoint)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('YouTube search request failed: ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                const videoIds = (data.items || [])
                    .filter(function(item) { return item.id && item.id.videoId; })
                    .map(function(item) { return item.id.videoId; });

                if (!videoIds.length) {
                    return;
                }

                const detailsEndpoint = 'https://www.googleapis.com/youtube/v3/videos'
                    + '?key=' + YOUTUBE_API_KEY
                    + '&id=' + videoIds.join(',')
                    + '&part=snippet,contentDetails';

                return fetch(detailsEndpoint)
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('YouTube videos request failed: ' + response.status);
                        }
                        return response.json();
                    })
                    .then(function(detailsData) {
                        const detailsById = {};
                        (detailsData.items || []).forEach(function(item) {
                            detailsById[item.id] = item;
                        });

                        const videos = videoIds
                            .map(function(id) { return detailsById[id]; })
                            .filter(Boolean)
                            .map(function(item) {
                                return {
                                    id: item.id,
                                    title: item.snippet.title,
                                    duration: ssParseIsoDuration(item.contentDetails.duration)
                                };
                            });

                        if (!videos.length) {
                            return;
                        }

                        mySwiper.removeAllSlides();
                        mySwiper.appendSlide(videos.map(ssBuildYoutubeCardHtml));
                    });
            })
            .catch(function(error) {
                console.error('YouTube feed load failed, keeping fallback videos.', error);
            });

    }; // end ssYoutubeCarousel


   /* Video Lightbox
    * ------------------------------------------------------ */
    const ssOpenVideoLightbox = function(videoId) {

        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
        iframe.title = 'YouTube video player';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

        const wrapper = document.createElement('div');
        wrapper.appendChild(iframe);

        const onEscape = function(event) {
            event = event || window.event;
            if (event.keyCode === 27) {
                instance.close();
            }
        };

        const instance = basicLightbox.create(wrapper, {
            className: 'youtube-lightbox',
            onShow: function() {
                document.addEventListener('keydown', onEscape);
            },
            onClose: function() {
                document.removeEventListener('keydown', onEscape);
            }
        });

        instance.show();

    }; // end ssOpenVideoLightbox


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        const youtubeSwiper = ssSwiper();
        ssYoutubeCarousel(youtubeSwiper);
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);