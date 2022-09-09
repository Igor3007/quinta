document.addEventListener("DOMContentLoaded", function (event) {




    /* ==============================================
    mobile menu
    ============================================== */

    function Status() {

        this.containerElem = '#status'
        this.headerElem = '#status_header'
        this.msgElem = '#status_msg'
        this.btnElem = '#status_btn'
        this.timeOut = 10000,
            this.autoHide = true

        this.init = function () {
            let elem = document.createElement('div')
            elem.setAttribute('id', 'status')
            elem.innerHTML = '<div id="status_header"></div> <div id="status_msg"></div><div id="status_btn"></div>'
            document.body.append(elem)

            document.querySelector(this.btnElem).addEventListener('click', function () {
                this.parentNode.setAttribute('class', '')
                console.log(this.parentNode)
            })
        }

        this.msg = function (_msg, _header) {
            _header = (_header ? _header : 'Успешно')
            this.onShow('complete', _header, _msg)
            if (this.autoHide) {
                this.onHide();
            }
        }
        this.err = function (_msg, _header) {
            _header = (_header ? _header : 'Ошибка')
            this.onShow('error', _header, _msg)
            if (this.autoHide) {
                this.onHide();
            }
        }
        this.wrn = function (_msg, _header) {
            _header = (_header ? _header : 'Внимание')
            this.onShow('warning', _header, _msg)
            if (this.autoHide) {
                this.onHide();
            }
        }

        this.onShow = function (_type, _header, _msg) {
            document.querySelector(this.headerElem).innerText = _header
            document.querySelector(this.msgElem).innerText = _msg
            document.querySelector(this.containerElem).classList.add(_type)
        }

        this.onHide = function () {
            setTimeout(() => {
                document.querySelector(this.containerElem).setAttribute('class', '')
            }, this.timeOut);
        }

    }

    window.STATUS = new Status();
    const STATUS = window.STATUS;
    STATUS.init();



    /******************************************** 
     * ajax request
     ********************************************/

    window.ajax = function (params, response) {

        //params Object
        //dom element
        //collback function

        let xhr = new XMLHttpRequest();
        xhr.open((params.type ? params.type : 'POST'), params.url)

        if (params.responseType == 'json') {
            xhr.responseType = 'json';
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        }

        xhr.send(JSON.stringify(params.data))

        xhr.onload = function () {
            response(xhr.status, xhr.response)
        };

        xhr.onerror = function () {
            window.STATUS.err('Error: ajax request failed')
        };

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 3 && params.btn) {
                params.btn.classList.add('btn-loading')
            }

            if (xhr.readyState == 4 && params.btn) {
                setTimeout(function () {
                    params.btn.classList.remove('btn-loading')
                }, 300)
            }

        };
    }




    /* ==============================================
    mobile menu
    ============================================== */

    const elContainer = document.querySelector('[data-menu="container"]')
    const elButton = document.querySelector('[data-menu="btn"]')

    function mobileMenu(params) {
        this.el = params.elContainer;
        this.button = params.elButton;
        this.state = 'close';

        this.open = function () {

            if (window.userMenuInstance) {
                window.userMenuInstance.close()
            }

            this.el.classList.add('open')
            this.button.classList.add('open')
            document.body.classList.add('hidden')
            this.state = 'open';

        }

        this.close = function () {

            this.el.classList.add('close-animate')
            this.button.classList.remove('open')

            setTimeout(() => {
                this.el.classList.remove('open')
                this.el.classList.remove('close-animate')
                document.body.classList.remove('hidden')
                this.state = 'close'
            }, 200)


        }

        this.toggle = function () {
            if (this.state == 'close') this.open()
            else this.close()
        }
    }

    window.menuInstanse = new mobileMenu({
        elButton,
        elContainer
    })

    elButton.addEventListener('click', function () {
        window.menuInstanse.toggle()
    })

    /* ==============================================
    select
    ============================================== */

    // public methods
    // select.afSelect.open()
    // select.afSelect.close()
    // select.afSelect.update()

    const selectCustom = new customSelect({
        selector: 'select'
    })

    selectCustom.init()

    /* ================================================
    open params search
    ================================================*/

    function paramsSearch() {
        this.openElements = document.querySelectorAll('[data-find-params="open"]');
        this.containerElement = document.querySelector('[data-find-params="container"]');

        this.init = function () {
            if (this.containerElement) {
                this.addEvent()
            }
        }

        this.open = function () {
            this.containerElement.classList.add('open')
        }

        this.close = function () {
            this.containerElement.classList.remove('open')
        }

        this.addEvent = function () {
            this.openElements.forEach(btn => {
                btn.addEventListener('click', (e) => {


                    if (this.containerElement.classList.contains('open')) {
                        this.close()
                    } else {
                        this.open()
                    }

                })
            })
        }
    }

    const paramsSearchInstanse = new paramsSearch();
    paramsSearchInstanse.init()


    /* ============================================
    suggest for find
    ============================================ */

    if (document.querySelector('[data-suggest="input"]')) {




        function getSuggestList(query) {

            this.container = document.querySelector('[data-suggest="container"]');
            this.result = document.querySelector('[data-suggest="result"]');


            this.hide = function () {
                this.container.style.display = 'none'
            }

            this.show = function () {

                if (this.result.querySelectorAll('li').length) {
                    this.container.style.display = 'block'
                }


            }

            this.getResult = function (q) {

                let _this = this

                window.ajax({
                        type: "GET", //POST на рабочем
                        url: "/js/suggest.json",
                        responseType: 'json',
                        data: {
                            q
                        },
                    },
                    function (status, response) {
                        console.log(status)
                        _this.renderTemplate(response, q)
                    })


            };

            this.renderTemplate = function (response, q) {
                let template = '';

                if (!response) {
                    console.log('Пустой ответ')
                    return false
                }



                response.forEach(function (item) {

                    let textRepl = item.link.replace(new RegExp(q, 'gi'), "<span>" + q + "</span>")

                    template += `<li><a href="${item.href}" >${textRepl}</a></li>`
                })

                this.show()
                this.result.innerHTML = template
            }

        }

        function debounce(func, wait, immediate) {
            var timeout;

            return function () {
                console.log('A::');
                var context = this,
                    args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) {
                        func.apply(context, args);
                    }
                }

                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args);
                }
            }
        }



        let deBouncer = debounce((e) => {
            if (e.target.value.length >= 2) {
                SUGGEST_LIST.getResult(e.target.value)
            } else {
                SUGGEST_LIST.hide()
            }
        }, 300);

        const SUGGEST_LIST = new getSuggestList();

        document.querySelector('[data-suggest="input"]').addEventListener('focus', function () {
            SUGGEST_LIST.show()
        })



        document.querySelector('[data-suggest="input"]').addEventListener('keyup', deBouncer)



        document.addEventListener('click', function (e) {
            if (!e.target.closest('.header-search-field')) {
                SUGGEST_LIST.hide()
            }
        })




    }

    /* ============================================
    data-splide="new-products"
    ============================================ */


    if (document.querySelector('[data-slider="new-products"]')) {
        var splide = new Splide('[data-slider="new-products"]', {

            arrows: false,
            pagination: false,
            gap: 30,
            autoWidth: true,
            start: 0,

            breakpoints: {
                760: {
                    fixedWidth: 75,
                    gap: 15,
                },
            },

        });

        splide.mount();
    }


    /* ==================================
    wishlist
    ================================== */


    /* init wishList  */

    const WL = new WishList();
    WL.init()

    const wishlist = document.querySelectorAll('[data-wishlist]');
    const arrayWishList = WL.getArray()

    wishlist.forEach(function (item, index) {

        const product_id = item.dataset.wishlist;

        if (arrayWishList.lastIndexOf(product_id) !== -1) {
            item.classList.add('active')
        }

        item.addEventListener('click', function (event) {
            if (this.classList.contains('active')) {
                WL.remove(product_id)
                this.classList.remove('active')
            } else {
                WL.add(product_id)
                this.classList.add('active')
            }
        })
    })

    // select list


    if (document.querySelector('.ul-select-list') && document.body.clientWidth < 1200) {

        document.querySelectorAll('.ul-select-list').forEach(item => {

            //init

            let textActive = item.querySelector('li.active a').innerHTML
            item.querySelector('.ul-select-list__title').innerText = textActive


            item.querySelectorAll('li').forEach(li => {
                li.addEventListener('click', e => {
                    let textActive = li.querySelector('a').innerHTML
                    item.querySelector('.ul-select-list__title').innerText = textActive

                    e.target.closest('.ul-select-list__dropdown').style.display = 'none'

                    if (document.querySelector('.ul-select-list li.active').classList.contains('active')) {
                        document.querySelector('.ul-select-list li.active').classList.remove('active')
                    }

                    li.classList.add('active')

                    setTimeout(() => {
                        e.target.closest('.ul-select-list__dropdown').style.display = 'block'
                    }, 300)

                })
            })




        })

    }

    //filter slideup

    if (document.querySelectorAll('.catalog-filter__title').length) {
        document.querySelectorAll('.catalog-filter__title').forEach(item => {
            item.addEventListener('click', e => {
                e.target.closest('.catalog-filter__item').classList.toggle('open')
            })
        })
    }

    //data-filter="open"

    if (document.querySelectorAll('[data-filter="open"]').length) {
        document.querySelectorAll('[data-filter="open"]').forEach(item => {

            item.addEventListener('click', e => {
                item.classList.toggle('open')
                document.querySelector('.page__aside').classList.toggle('open')


                if (document.querySelector('.page__aside').classList.contains('open')) {

                    let closeElement = document.createElement('div')
                    closeElement.classList.add('filter-close')

                    closeElement.addEventListener('click', function () {
                        document.querySelector('.page__aside').classList.remove('open')
                        closeElement.remove()
                    })

                    document.querySelector('.catalog-filter__total').append(closeElement)
                }
            })

        })
    }

    /* ==============================================
    count selected filter
    ==============================================*/

    if (document.querySelectorAll('.catalog-filter').length) {

        function changeCounter() {
            let count = document.querySelectorAll('.catalog-filter input:checked')

            if (document.querySelector('.catalog-list__filter small')) {
                if (count.length) {
                    document.querySelector('.catalog-list__filter small').style.display = 'block'
                    document.querySelector('.catalog-list__filter small').innerHTML = count.length
                } else {
                    document.querySelector('.catalog-list__filter small').style.display = 'none'
                }
            }
        }

        changeCounter()

        document.querySelectorAll('.catalog-filter input').forEach(item => {
            item.addEventListener('change', e => {
                changeCounter()
            })
        })


    }

    /* ===========================================
    input material
    =========================================== */

    function materialInput() {
        this.init = function () {

            let _this = this

            document.querySelectorAll('.input-material input').forEach(function (input) {

                if (input.value.length) {
                    input.setAttribute('area-valid', '')
                }

                _this.addEvent(input)
            })
        }

        this.reset = function () {

            let _this = this

            document.querySelectorAll('.input-material input').forEach(function (input) {

                if (!input.value.length) {
                    input.removeAttribute('area-valid')
                } else {
                    input.setAttribute('area-valid', '')
                }


            })
        }

        this.addEvent = function (input) {
            input.addEventListener('keyup', function (event) {
                if (event.target.value.length) {
                    event.target.setAttribute('area-valid', 'true')
                } else {
                    event.target.removeAttribute('area-valid')
                }
            })

        }


    }

    const MATERIAL_INPUT = new materialInput()
    MATERIAL_INPUT.init()


    /* ===============================================
    form-open
    ===============================================*/

    if (document.querySelector('[data-form-open]')) {

        const formContainerElement = document.querySelector('[data-form-container]')
        const formSuccessElement = document.querySelector('[data-form-success]')
        let cooperation = new customModal()

        function submitForm(form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                event.target.querySelector('[type="submit"]').classList.add('btn-loading')


                //ajax send data

                setTimeout(() => {

                    cooperation.close()
                    cooperation.open(formSuccessElement.outerHTML, function (instanse) {
                        instanse.querySelector('.btn').addEventListener('click', function () {
                            cooperation.close()
                        })
                    })

                }, 1000)

            })
        }

        submitForm(formContainerElement.querySelector('form'))

        document.querySelector('[data-form-open]').addEventListener('click', function () {



            if (document.body.clientWidth < 992) {
                formContainerElement.classList.toggle('open')
            } else {



                cooperation.open(formContainerElement.outerHTML, function (instanse) {


                    //init material input
                    cooperation.modal.querySelectorAll('input[type=text], input[type=tel], input[type=email]').forEach(function (input) {
                        if (MATERIAL_INPUT) MATERIAL_INPUT.addEvent(input)
                        if (input.value) input.setAttribute('area-valid', true)
                    })

                    //init select


                    console.log(document.querySelector('.af-popup select'))


                    selectCustom.reinit(instanse.querySelector('.af-popup select'))

                    //init submit form

                    let form = document.querySelector('.af-popup form')

                    submitForm(form)

                })

            }


        })
    }

    /* ================================================
    form question
    ================================================*/

    if (document.querySelector('[data-form="question"]')) {
        document.querySelector('[data-form="question"]').addEventListener('submit', function (event) {

            const successPopup = new customModal()
            const formSuccessElement = document.querySelector('[data-form-success]')

            event.preventDefault()
            event.target.querySelector('[type="submit"]').classList.add('btn-loading')


            //ajax send data

            setTimeout(() => {

                event.target.querySelector('[type="submit"]').classList.remove('btn-loading')
                event.target.reset()
                MATERIAL_INPUT.reset()



                successPopup.open(formSuccessElement.outerHTML, function (instanse) {
                    instanse.querySelector('.btn').addEventListener('click', function () {
                        successPopup.close()

                    })
                })

            }, 1000)

        })
    }

    /* =========================================
    data-tagbox="container"
    =========================================*/

    if (document.querySelector('[data-tagbox="open"]')) {

        //если больше 10
        if (document.querySelectorAll('[data-tagbox="container"] li').length >= 10) {

            //add more button
            document.querySelector('[data-tagbox="open"]').classList.toggle('open')

            // hide > 10 elems
            document.querySelectorAll('[data-tagbox="container"] li').forEach((li, index) => {
                if (index >= 10) {
                    li.style.display = 'none';
                }
            })
        }

        //add click event
        document.querySelectorAll('[data-tagbox="open"]').forEach(item => {
            item.addEventListener('click', function () {
                document.querySelector('[data-tagbox="container"]').classList.toggle('open')


                document.querySelectorAll('[data-tagbox="container"] li').forEach((li, index) => {

                    if (!document.querySelector('[data-tagbox="container"]').classList.contains('open')) {

                        item.innerText = item.dataset.langShow

                        if (index >= 10) {
                            li.style.display = 'none';
                        }
                    } else {
                        li.style.display = 'block'

                        item.innerText = item.dataset.langHide

                    }

                })
            })
        })
    }

    /* ==============================================
    blog gallery, blog gallery
    ==============================================*/

    if (document.querySelector('[data-slider="gallery-main"]')) {
        var main = new Splide('[data-slider="gallery-main"]', {
            //type: 'fade',
            //heightRatio: 0.64,
            pagination: true,
            arrows: false,
            cover: true,
        });

        var thumbnails = new Splide('[data-slider="gallery-thumb"]', {
            //rewind: true,
            fixedWidth: 104,
            // fixedHeight: 58,
            isNavigation: true,
            gap: 10,
            //focus: 'center',
            pagination: false,
            //cover: true,
            arrowPath: 'M10.3088 21.0138H27.8752L24.5842 24.3048C23.6389 25.2501 25.0568 26.668 26.0022 25.7227L28.9994 22.7208L31.0002 20.7169C31.388 20.3268 31.388 19.6968 31.0002 19.3067L26.0022 14.3028C25.812 14.1074 25.5503 13.9978 25.2775 14C24.3773 14.0001 23.9356 15.0966 24.5842 15.7208L27.883 19.0119H10.2571C8.87066 19.0807 8.97418 21.0828 10.3088 21.0138Z',
            // dragMinThreshold: {
            //     mouse: 4,
            //     touch: 10,
            // },
            breakpoints: {
                760: {
                    fixedWidth: 75,
                    gap: 5,
                },
            },
        });

        main.sync(thumbnails);
        main.mount();
        thumbnails.mount();
    }

    /* ====================================================
    popup mode on gallery
    ====================================================*/

    if (document.querySelector('.card-gallery__main')) {
        document.querySelector('.card-gallery__main').addEventListener('click', function (e) {
            e.target.closest('.card-gallery').classList.toggle('popup-mode')
            document.body.classList.toggle('hidden')

            main.refresh();

        })

        document.querySelector('.card-gallery__close').addEventListener('click', function (e) {
            e.target.closest('.card-gallery').classList.toggle('popup-mode')
            document.body.classList.remove('hidden')
        })
    }



    /* ===================================================
    Плавный скролл
    ===================================================*/

    function smoothScroll() {
        document.querySelectorAll('a[href^="#"').forEach(link => {

            link.addEventListener('click', function (e) {
                e.preventDefault();

                let href = this.getAttribute('href').substring(1);

                const scrollTarget = document.getElementById(href);

                //const topOffset = document.querySelector('.scrollto').offsetHeight;
                const topOffset = 20; // если не нужен отступ сверху 
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ===================================================
    Содержание новости
    ===================================================*/

    if (document.querySelector('.blog-content')) {

        const headers = document.querySelectorAll('.blog-content h1, .blog-content h2')

        if (headers.length) {
            document.querySelector('.blog-lineup').style.display = 'block'
        }

        headers.forEach((item, index) => {

            // add anchor

            item.setAttribute('id', 'anchor_' + index)


            //create li

            let li = document.createElement('li')
            li.innerHTML = '<a href="#anchor_' + index + '" >' + item.innerText + '</a>'

            document.querySelector('.blog-lineup__list ul').append(li)

        })

        smoothScroll()


    }

    /* ============================================
    card product
    ============================================*/

    if (document.querySelector('[data-buy="mobile"]')) {
        document.querySelector('[data-buy="mobile"]').addEventListener('click', function () {
            this.remove()
            document.querySelector('[data-buy="desktop"]').classList.add('open')
        })
    }

    function productCounter() {

        this.buttonInc = document.querySelector('[data-counter="inc"]')
        this.buttonDec = document.querySelector('[data-counter="dec"]')
        this.buttonInput = document.querySelector('[data-counter="input"]')
        this.productPrice = document.querySelector('[data-counter-cost]')
        this.resultElem = document.querySelectorAll('[data-counter="total-price"]')

        this.total = 1
        this.cost = 0

        this.init = function () {
            this.addEvent()
            this.cost = this.getTotalPrice()
        }

        this.inc = function () {
            this.total = this.total + 1;
            this.render()
        }

        this.dec = function () {
            if (this.total > 1) {
                this.total = this.total - 1;
            }
            this.render()
        }

        this.getTotalPrice = function () {

            console.log(this.productPrice.dataset.counterCost)
            console.log(this.total)

            return (Number(this.productPrice.dataset.counterCost) * Number(this.total)).toFixed(0)



        }

        this.render = function () {
            this.buttonInput.value = this.total

            this.resultElem.forEach(item => {
                item.innerText = this.getTotalPrice()
            })

        }

        this.addEvent = function () {
            this.buttonInc.addEventListener('click', e => {
                this.inc()
            })
            this.buttonDec.addEventListener('click', e => {
                this.dec()
            })
        }

    }

    const instanseProductCounter = new productCounter();
    instanseProductCounter.init()




}); //ready