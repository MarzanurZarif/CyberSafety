function debounce(func) {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
}

window.addEventListener('DOMContentLoaded', () => {

    const pw = document.getElementById('pw');
    const strength = document.getElementById('strength');
    const strengthLabel = document.getElementById('strength-label');
    pw.addEventListener('input', () => {
        const value = pw.value;
        let score = 0;
        if (value.length >= 8) score += 1;
        if (/[A-Z]/.test(value)) score += 1;
        if (/[0-9]/.test(value)) score += 1;
        if (/[^A-Za-z0-9]/.test(value)) score += 1;

        const pct = (score / 4) * 100;
        strength.style.width = pct + '%';
        if (score <= 1) {
            strength.style.background = 'linear-gradient(90deg,#fb7185,#fb7185)';
            strengthLabel.textContent = 'Strength: Weak';
        } else if (score === 2) {
            strength.style.background = 'linear-gradient(90deg,#f59e0b,#f59e0b)';
            strengthLabel.textContent = 'Strength: Fair';
        } else if (score === 3) {
            strength.style.background = 'linear-gradient(90deg,#60a5fa,#60a5fa)';
            strengthLabel.textContent = 'Strength: Good';
        } else {
            strength.style.background = 'linear-gradient(90deg,#34d399,#34d399)';
            strengthLabel.textContent = 'Strength: Strong';
        }
    });

    function evaluatePassword() {
        const pw_auto = document.getElementById('pw_auto');
        const strength_auto = document.getElementById('strength_auto');
        const strengthLabel_auto = document.getElementById('strength-label_auto');
        const value = pw_auto.value;
        let score = 0;
        if (value.length >= 8) score += 1;
        if (/[A-Z]/.test(value)) score += 1;
        if (/[0-9]/.test(value)) score += 1;
        if (/[^A-Za-z0-9]/.test(value)) score += 1;

        const pct = (score / 4) * 100;
        strength_auto.style.width = pct + '%';
        if (score <= 1) {
            strength_auto.style.background = 'linear-gradient(90deg,#fb7185,#fb7185)';
            strengthLabel_auto.textContent = 'Strength: Weak';
        } else if (score === 2) {
            strength_auto.style.background = 'linear-gradient(90deg,#f59e0b,#f59e0b)';
            strengthLabel_auto.textContent = 'Strength: Fair';
        } else if (score === 3) {
            strength_auto.style.background = 'linear-gradient(90deg,#60a5fa,#60a5fa)';
            strengthLabel_auto.textContent = 'Strength: Good';
        } else {
            strength_auto.style.background = 'linear-gradient(90deg,#34d399,#34d399)';
            strengthLabel_auto.textContent = 'Strength: Strong';
        }
    }

    var Passwords = [
        "0123456789",
        "fIrAZ@21_5",
        "Zarif12345"
    ]
    const AnimatedText = document.getElementById("pw_auto");
    if (AnimatedText) {

        let index = 0;
        let charIndex = 0;
        let isDeleting = false;

        const longest = Passwords.reduce((a, b) => a.length > b.length ? a : b);
        AnimatedText.value = longest
        let highlightedText = AnimatedText.value;
        document.getElementById("pw_auto").value = highlightedText;

        function typeEffect() {
            const currentText = Passwords[index];
            if (!isDeleting) {
                AnimatedText.value = currentText.substring(0, charIndex + 1);
                evaluatePassword();
                let highlightedText = AnimatedText.value;
                document.getElementById("pw_auto").value = highlightedText;
                charIndex++;
                if (charIndex === currentText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeEffect();
                    }, 2000);
                    return;
                }
            } else {
                AnimatedText.value = currentText.substring(0, charIndex - 1);
                let highlightedText = AnimatedText.value;
                document.getElementById("pw_auto").value = highlightedText;
                evaluatePassword();
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    index = (index + 1) % Passwords.length;
                }
            }
            const speed = 100;
            setTimeout(typeEffect, speed);
        }
        typeEffect();
    }

    const menu_btn = document.getElementById("menu-btn");
    const nav_bar = document.getElementById("nav-bar");
    const nav_Intro_Items = document.getElementById("intro-items");
    const nav_Shop_Items = document.getElementById("shop-items");
    const nav_tbtns = document.getElementsByClassName("nav-item-tbtn");

    const search_sec = document.getElementById("search-section");
    const search_btn = document.getElementById("search-btn");

    const overlay_bg = document.getElementById("overlay-bg");

    const dropdown_divs = document.getElementsByClassName("dropdown-main");

    function nav_items_align() {
        var TotalHeight = nav_bar.offsetHeight;
        var NewWidth = 0;
        if (window.innerWidth <= 790) {
            if (nav_Intro_Items.offsetWidth > nav_Shop_Items.offsetWidth) {
                NewWidth = (nav_Intro_Items.offsetWidth).toString() + "px";
            } else {
                NewWidth = (nav_Shop_Items.offsetWidth).toString() + "px";
            }
            nav_Intro_Items.style.width = NewWidth;
            TotalHeight += nav_Intro_Items.offsetHeight;

            nav_Shop_Items.style.width = NewWidth;
            nav_Shop_Items.style.top = TotalHeight.toString() + "px";
            TotalHeight += nav_Shop_Items.offsetHeight;
            nav_Shop_Items.style.height = "100vh"

            Array.prototype.forEach.call(dropdown_divs, function (btn) {
                if (!btn.classList.contains("dropend")) {
                    btn.classList.add("dropend")
                }
            });
        } else if (window.innerWidth > 790) {
            var loopthrough = [nav_Intro_Items, nav_Shop_Items];
            loopthrough.forEach(function (item) {
                if (item.style.width) {
                    item.style.removeProperty('width');
                }
                if (item.style.top) {
                    item.style.removeProperty('top');
                }
                if (item.style.height) {
                    item.style.removeProperty('height');
                }
            });
            Array.prototype.forEach.call(dropdown_divs, function (btn) {
                if (btn.classList.contains("dropend")) {
                    btn.classList.remove("dropend")
                }
            });
        }
        if (window.innerWidth <= 490) {
            if (nav_tbtns) {
                // if (nav_Shop_Items.style.height) {
                //     nav_Shop_Items.style.removeProperty('height');
                // }
                Array.prototype.forEach.call(nav_tbtns, function (tbtn) {
                    tbtn.style.width = NewWidth;
                    tbtn.style.top = TotalHeight.toString() + "px";
                    TotalHeight += tbtn.offsetHeight;
                    if (tbtn == nav_tbtns[nav_tbtns.length - 1]) {
                        tbtn.style.height = "100vh"
                    }
                });
            }
        } else if (window.innerWidth > 490) {
            if (nav_tbtns) {
                Array.prototype.forEach.call(nav_tbtns, function (tbtn) {
                    if (tbtn.style.width) {
                        tbtn.style.removeProperty('width');
                    }
                    if (tbtn.style.top) {
                        tbtn.style.removeProperty('top');
                    }
                    if (tbtn.style.height) {
                        item.style.removeProperty('height');
                    }
                });
            }
        }
    }

    function debounce(func) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 100, event);
        };
    }

    function overlay_Toggle(Tog) {
        if (Tog) {
            if (!overlay_bg.classList.contains("active")) {
                overlay_bg.classList.add('active');
            }
        } else {
            if (overlay_bg.classList.contains("active")) {
                overlay_bg.classList.remove('active');
            }
        }
    }

    var menu_State = false;
    var search_State = false;

    function menu_Toggle(Tog) {
        if (Tog) {
            if (!nav_Intro_Items.classList.contains("active")) {
                nav_Intro_Items.classList.add('active');
            }
            if (!nav_Shop_Items.classList.contains("active")) {
                nav_Shop_Items.classList.add('active');
            }
            Array.prototype.forEach.call(nav_tbtns, function (tbtn) {
                if (!tbtn.classList.contains("active")) {
                    tbtn.classList.add('active');
                }
            });
            menu_State = true;
        } else {
            if (nav_Intro_Items.classList.contains("active")) {
                nav_Intro_Items.classList.remove('active');
            }
            if (nav_Shop_Items.classList.contains("active")) {
                nav_Shop_Items.classList.remove('active');
            }
            Array.prototype.forEach.call(nav_tbtns, function (tbtn) {
                if (tbtn.classList.contains("active")) {
                    tbtn.classList.remove('active');
                }
            });
            menu_State = false;
        }
        nav_items_align();
    }

    function search_Toggle(Tog) {
        if (Tog) {
            if (!search_sec.classList.contains("active")) {
                search_sec.classList.add('active');
            }
            search_State = true;
        } else {
            if (search_sec.classList.contains("active")) {
                search_sec.classList.remove('active');
            }
            search_State = false;
        }
        nav_items_align();
    }

    if (nav_Intro_Items && nav_Shop_Items && nav_bar) {
        nav_items_align();
    }

    let reload = true;
    let lwidth = window.innerWidth;

    document.addEventListener("fullscreenchange", function () {
        reload = false;
    });

    window.addEventListener("resize", debounce(function (e) {
        e.preventDefault();
        if (lwidth !== window.innerWidth) {
            if (nav_Intro_Items && nav_Shop_Items && nav_bar) {
                search_Toggle(false);
                menu_Toggle(false);
                overlay_Toggle(false);
                nav_items_align();
            }
            if (document.fullscreenElement === null && reload) {
                location.reload();
            } else if (document.fullscreenElement === null) {
                reload = true;
            }
            lwidth = window.innerWidth;
        }
    }));

    if (search_btn && search_sec) {
        search_btn.addEventListener("click", function (event) {
            if (search_State) {
                search_Toggle(false);
                overlay_Toggle(false);
                menu_Toggle(false);
            } else {
                search_Toggle(true);
                overlay_Toggle(true);
                menu_Toggle(false);
            }
        });
    }

    if (menu_btn && nav_Intro_Items && nav_Shop_Items) {
        menu_btn.addEventListener("click", function (event) {
            if (menu_State) {
                menu_Toggle(false);
                overlay_Toggle(false);
                search_Toggle(false);
            } else {
                menu_Toggle(true);
                overlay_Toggle(true);
                search_Toggle(false);
            }
        });
    }

    if (overlay_bg) {
        overlay_bg.addEventListener("click", function (event) {
            search_Toggle(false);
            menu_Toggle(false);
            overlay_Toggle(false);
        });
    }

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('form-search-btn');
    const overlayBg = document.getElementById("overlay-bg");
    function removeHighlights() {
        const highlighted = document.querySelectorAll('.highlight');
        highlighted.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
    }
    function highlightText(keyword) {
        if (!keyword.trim()) return;
        const regex = new RegExp(`(${keyword})`, 'gi');
        const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li, a, div');

        elements.forEach(el => {
            if (el.children.length === 0 && el.textContent.match(regex)) {
                el.innerHTML = el.textContent.replace(regex, '<span class="highlight">$1</span>');
            }
        });
    }
    const style = document.createElement('style');
    style.innerHTML = `
        .highlight {
            background-color: yellow;
            color: black;
            font-weight: bold;
            padding: 0 2px;
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);
    function performSearch() {
        const query = searchInput.value.trim();
        removeHighlights();
        if (query) {
            highlightText(query);
        }
        if (overlayBg) overlayBg.click();
    }
    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            performSearch();
        });
    }

    document.getElementById('year').textContent = new Date().getFullYear();

    (function ($bs) {
        const CLASS_NAME = 'has-child-dropdown-show';
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        $bs.Dropdown.prototype.toggle = function (_orginal) {
            return function () {
                document.querySelectorAll('.' + CLASS_NAME).forEach(function (e) {
                    e.classList.remove(CLASS_NAME);
                });
                let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
                for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                    dd.classList.add(CLASS_NAME);
                }
                return _orginal.call(this);
            }
        }($bs.Dropdown.prototype.toggle);

        document.querySelectorAll('.dropdown').forEach(function (dd) {
            dd.addEventListener('hide.bs.dropdown', function (e) {
                if (this.classList.contains(CLASS_NAME)) {
                    this.classList.remove(CLASS_NAME);
                    e.preventDefault();
                }
                e.stopPropagation();
            });
        });

        document.querySelectorAll('.dropdown-toggle').forEach(function (dd) {
            dd.addEventListener('click', function (e) {
                if (dd.getAttribute('href') === '#' || e.target.getAttribute('href') === '#' || dd.classList.contains("show")) {
                    e.preventDefault();
                } else {
                    const menu = dd.nextElementSibling;
                    if (menu && dd.classList.contains("show")) {
                        menu.style.pointerEvents = 'none';
                        setTimeout(() => { menu.style.pointerEvents = ''; }, 350);
                    } else {
                        window.location.href = e.target.href;
                    }
                }
            });
        });

        if (!isTouch) {
            document.querySelectorAll('.dropdown-hover, .dropdown-hover-all .dropdown').forEach(function (dd) {
                dd.addEventListener('mouseenter', function (e) {
                    let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                    if (!toggle.classList.contains('show')) {
                        $bs.Dropdown.getOrCreateInstance(toggle).toggle();
                        dd.classList.add(CLASS_NAME);
                        $bs.Dropdown.clearMenus();
                    }
                });
                dd.addEventListener('mouseleave', function (e) {
                    let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                    if (toggle.classList.contains('show')) {
                        $bs.Dropdown.getOrCreateInstance(toggle).toggle();
                    }
                });
            });
        }

    })(bootstrap);

});