/*! td-standards-responsive - v0.0.1 - 2021-01-27, 10:01:20 */
function getEMSPlaceholderStart() {
    var a = '<div class="td-container"><div class="td-row">';
    return a += '<div class="td-col-xs-1 td-col-sm-2 td-col-md-1 td-top-message-illustration equal-height">', a += '<span class="td-icon td-icon-colour-primary icon-regular td-icon-warning" aria-hidden="true"></span>', a += '</div><div class="td-col-xs-10 td-col-sm-9 td-col-md-10 td-top-message-copy equal-height" role="banner" aria-label="Read this important message">', a += '<div class="inner_content"><p>'
}

function getEMSPlaceholderEnd() {
    var a = '</p></div></div><div class="td-col-xs-1 td-top-message-close"><a href="#" class="td-top-message-close-anchor" role="button">';
    return a += '<span class="td-forscreenreader">Close</span>', a += '<span class="td-icon icon-regular td-icon-close" aria-hidden="true"></span></a></div></div></div>'
}

function showEMSMessage(a) {
    var b = $(".td_rq_top-message");
    b && b.length > 0 && (b[0].innerHTML = getEMSPlaceholderStart() + a + getEMSPlaceholderEnd() + b[0].innerHTML), $(".td_rq_top-message").topMessage()
}

function setEmsObject(a, b, c, d, e) {
    if (null == b || c > 0) {
        var f = getLocalTime(d),
            g = f.getFullYear() + "-" + appendLeadingZeroes(f.getMonth() + 1) + "-" + appendLeadingZeroes(f.getDate()) + " " + appendLeadingZeroes(f.getHours()) + ":" + appendLeadingZeroes(f.getMinutes()) + ":" + appendLeadingZeroes(f.getSeconds());
        null == b ? (a.msg.id = null, a.msg.fc = null, a.msg.exp = null) : (a.msg.id = b, a.msg.fc = c - 1, a.msg.exp = g);
        var h = JSON.stringify(a);
        showEMSMessage(e), setCookie(h)
    }
}

function returnContextPath() {
    var a = "";
    return "undefined" != typeof emsContextPath && emsContextPath && emsContextPath.length > 0 && "/" == emsContextPath.charAt(emsContextPath.length - 1) && (emsContextPath = emsContextPath.substr(0, emsContextPath.length - 1)), "undefined" != typeof emsContextPath && emsContextPath && (emsContextPath += "/", a = emsContextPath), a
}

function setCookie(a) {
    var b = new Date;
    b.setFullYear(b.getFullYear() + 1), document.cookie = "EMS=" + a + "; expires=" + b.toUTCString() + "; path=" + returnContextPath() + ";"
}

function removeCookie() {
    g.cookies.removeItem("EMS", returnContextPath())
}

function returnEmptyEMSobject() {
    var a = {},
        b = {
            id: null,
            fc: null,
            exp: null
        },
        c = {
            province: null,
            city: null,
            country: null
        };
    return a.msg = b, a.geo = c, a
}

function getProvinceDetail() {
    var a, b, c = "getProvinceData/",
        d = window.location.origin + returnContextPath() + c;
    $.get(d).done(function (c) {
        if (c) {
            try {
                b = JSON.parse(c)
            } catch (a) {
                return void console.log("Invalid Province Response.")
            }
            b.province && "" != b.province ? (a = returnEmptyEMSobject(), a.geo = b, setCookie(JSON.stringify(a)), getEMSMessage(a)) : console.log("Invalid Province.")
        }
    }).fail(function (a, b, c) {
        console.log("Province Service is not available.  " + c)
    })
}

function getDeviceType() {
    var a = navigator.userAgent,
        b = "android",
        c = "mobile",
        d = "Mobile",
        e = "Tablet";
    return a.toLowerCase().indexOf(b) > -1 && !(a.toLowerCase().indexOf(c) > -1) ? e : a.toLowerCase().indexOf("ipad") > -1 ? e : a.toLowerCase().indexOf(c) > -1 || a.toLowerCase().indexOf("phone") > -1 ? a.toLowerCase().indexOf(b) > -1 ? d : a.toLowerCase().indexOf("iphone") > -1 ? d : (a.toLowerCase().indexOf("iemobile"), d) : "Desktop"
}

function getBrowserType() {
    var a = navigator.userAgent,
        b = "Chrome",
        c = "Firefox",
        d = "Opera",
        e = "Trident",
        f = "Edge",
        g = "Safari";
    return a.indexOf(c) > -1 ? c : a.indexOf(d) > -1 ? d : a.indexOf(e) > -1 ? e : a.indexOf(f) > -1 ? f : a.indexOf(b) > -1 ? b : a.indexOf(g) > -1 ? g : "unknown"
}

function getLocalTime(a) {
    var b, c, d, e;
    if ("" == a) {
        var e = new Date;
        e.setFullYear(e.getFullYear() + 1)
    } else b = new Date(a), c = 300, d = b.getTimezoneOffset(), e = new Date(b), getMonthlyWeekday(2, "Sunday", "Mar", b.getFullYear()) < b && getMonthlyWeekday(1, "Sunday", "Nov", b.getFullYear()) > b && (c = 240), e.setMinutes(b.getMinutes() + c - d);
    return e
}

function appendLeadingZeroes(a) {
    return a <= 9 ? "0" + a : a
}

function getMonthlyWeekday(a, b, c, d) {
    var e, f, g = 0,
        h = 1;
    for ("Sunday" == b && (f = 0), "Monday" == b && (f = 1), "Tuesday" == b && (f = 2), "Wednesday" == b && (f = 3), "Thursday" == b && (f = 4), "Friday" == b && (f = 5), "Saturday" == b && (f = 6); g < a && h < 31;) e = new Date(h++ + " " + c + " " + d), e.getDay() == f && g++;
    return g == a && e
}

function getEMSMessage(a) {
    var b, c, d, e, f, g = " ",
        h = !1,
        i = "";
    e = getDeviceType(), f = getBrowserType(), "undefined" != typeof emsEndPoint && emsEndPoint.length > 0 && "/" == emsEndPoint.charAt(emsEndPoint.length - 1) && (emsEndPoint = emsEndPoint.substr(0, emsEndPoint.length - 1)), "undefined" == typeof emsEndPoint && "undefined" == typeof emsLang && "undefined" == typeof emsLoB && "undefined" == typeof emsChannelId || (i = emsEndPoint + "/" + emsLang + "/" + emsLoB + "/" + emsChannelId + "/" + a.geo.country + "/" + a.geo.province + "/" + e + "/" + f), $.get(i).done(function (e) {
        if (e) {
            var f = e.alertMessages;
            f && f.length > 0 && (g = f[0].messageText, h = f[0].frequencyCappingFlag, b = f[0].scheduleEndTime, d = f[0].frequencyCappingNumber, c = f[0].messageID, h ? a.msg.id == c ? a.msg.fc > 0 && setEmsObject(a, c, a.msg.fc, b, g) : setEmsObject(a, c, d, b, g) : setEmsObject(a, null, null, null, g))
        }
    }).fail(function (a, b, c) {
        console.log("EMS Service is not available.  " + c)
    })
}

function processEMSMessage() {
    var a, b = g.cookies.getItem("EMS");
    if (b) {
        try {
            a = JSON.parse(b)
        } catch (a) {
            removeCookie()
        }
        a && a.geo && a.geo.province ? getEMSMessage(a) : (removeCookie(), getProvinceDetail())
    } else getProvinceDetail()
}! function (a, b) {
    "use strict";
    window.modules_ext = b, window.global_ext = a;
    var c, d, e, f, g = a.document,
        h = ["td_rq_common"],
        i = g.querySelectorAll('[class^="td_rq"]');
    for (c = 0; c < i.length; c += 1) e = i[c].className.split(" ")[0], e = e.replace(/-/g, "_"), -1 === h.indexOf(e) && h.push(e);
    for (c = 0; c < h.length; c += 1)
        if (e = h[c], b.hasOwnProperty(e))
            for (a.console && a.console.log(e), f = b[e], d = 0; d < f.length; d += 1) f[d](a)
}(this, {
    td_rq_common: [function (a) {
        "use strict";
        ! function (a) {
            var b, c, d, e, f, g, h, i, j, k, l = [],
                m = 0,
                n = ".tdG",
                o = a.jQuery,
                p = o(a),
                q = a.document,
                r = a.Modernizr,
                s = a.clearTimeout,
                t = a.setTimeout,
                u = r.csstransitions,
                v = a.navigator.userAgent,
                w = !1,
                x = !1;
            /Android/.test(v) ? w = v.substr(v.indexOf("Android") + 8, 3) : /(iPhone|iPod|iPad)/.test(v) && (x = v.substr(v.indexOf("OS ") + 3, 3).replace("_", ".")), (w && w < 3 || x && x < 5) && o("html").addClass("static"), a.android = w, a.iOS = x, Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
                var c;
                for (void 0 === b && (b = 0), b < 0 && (b += this.length), b < 0 && (b = 0), c = this.length; b < c; b += 1)
                    if (this.hasOwnProperty(b) && this[b] === a) return b;
                return -1
            }), String.prototype.trim || function () {
                var a = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function () {
                    return this.replace(a, "")
                }
            }(), u && (k = function () {
                var a, b = q.createElement("div"),
                    c = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (a in c)
                    if (c.hasOwnProperty(a) && void 0 !== b.style[a]) return c[a];
                return !1
            }(), o.event.special.transitionEnd = {
                bindType: k,
                delegateType: k,
                handle: function (a) {
                    if (o(a.target).is(this)) return a.handleObj.handler.apply(this, arguments)
                }
            }, o.fn.emulateTransitionEnd = function (a) {
                var b, c = o(this),
                    d = !1;
                return c.one("transitionEnd", function () {
                    d = !0
                }), b = function () {
                    d || c.trigger(k)
                }, t(function () {
                    b()
                }, a), this
            }), b = {
                xs: 480,
                sm: 768,
                md: 1024,
                lg: 1200,
                smw: 770,
                mdw: 980,
                lgw: 1032,
                ie8w: 960,
                gutter: 30
            }, a.g = c = {
                hasTransitions: u,
                ev: o({}),
                adobeTriggerIntervalABanner: !1,
                events: {
                    afterTabActiveChanged: "tdActiveTabChanged",
                    afterModalShown: "tdModalShown",
                    afterModalHidden: "tdModalHidden",
                    afterImagesPreloaded: "tdImagesPreloaded",
                    afterLazyImagesLoaded: "tdLazyImagesLoaded",
                    afterBackToTop: "tdBackToTop",
                    afterHeaderHeightChanged: "tdHeaderHeightChanged",
                    afterProdInfo: "tdProdInfo",
                    afterCompareTable: "tdCompareTable",
                    afterLargeModalOverlay: "tdLargeModalOverlay",
                    afterExpand: "tdExpand",
                    afterCatalogueIndicator: "tdCatalogueIndicator",
                    afterOperationalMessageDelay: "tdOperationalMessageDelay",
                    afterOperationalMessage: "tdOperationalMessage",
                    afterABanner: "tdABanner",
                    afterAnchorDown: "tdAnchorDown",
                    afterExpandForOthers: "tdExpandForOthers",
                    afterTabActiveChangedForExternal: "tdActiveTabChangedExternal",
                    afterScroll: "tdScroll",
                    afterCompareCbChanged: "tdCompareCbChanged",
                    afterCompareModalHidden: "tdCompareModalHidden"
                },
                classes: {
                    container: "td-container",
                    heroWrapper: "hero-wrapper",
                    heroDarkGreen: "td-hero-dark-green",
                    heroLightGreen: "td-hero-light-green",
                    heroAction: "td-hero-button"
                },
                queryCallout: ".td-callout",
                queryClickable: ".td-makeclickable",
                queryClickableAnchor: "a.td-makeclickable-target",
                queryEqualHeight: ".td-equalcalloutheight",
                queryLazyImages: ".td-lazy [data-src]",
                queryBack: ".td-link-back",
                queryLinks: ".td-link-green, .td-link-dark-green, .td-link-black, .td-link-white, .td-link-gray, .td-link-red, .td-link-standalone, .td-headerlink, .td-list-links li a, .td-rte-link-standalone, .td-rte-link-standalone-14, .td-rte-link-standalone-16, .td-rte-link-standalone-18, .td-rte-link-standalone-22, .td-rte-link-standalone-29",
                queryLinksExceptions: "<sup>,<strong>",
                dot: function (a) {
                    return "." + a
                },
                bpSet: function (a) {
                    return void 0 !== b[a] ? b[a] : b.lg
                },
                getPluginDef: function (a, b) {
                    return function (c) {
                        var d;
                        return this.each(function () {
                            var e = o(this);
                            if ("object" != typeof c && c) {
                                if ((d = e.data(b)) && d[c]) return d[c].apply(d, Array.prototype.slice.call(arguments, 1))
                            } else e.data(b) || e.data(b, a(e, c))
                        })
                    }
                },
                getEqualHeight: function (a) {
                    var b, c = 0;
                    return a.each(function () {
                        b = o(this), b.css({
                            height: "auto"
                        }), c = Math.max(c, b.outerHeight())
                    }), c
                },
                equaliseHeight: function (a, b) {
                    var d = a.find(b),
                        e = c.getEqualHeight(d);
                    return d.animate({
                        height: e
                    }, 50), e
                },
                doEqualiseHeight: function () {
                    var a = o(c.queryEqualHeight);
                    p.innerWidth() >= b.sm ? a.each(function () {
                        var a = o(this);
                        a.is(":visible") && c.equaliseHeight(a, c.queryCallout)
                    }) : a.find(c.queryCallout).css({
                        height: ""
                    })
                },
                makeClickable: function (b, c) {
                    b.on("click", function (b) {
                        var d = o(this),
                            e = d.find(c),
                            f = e.attr("href"),
                            g = e.attr("target"),
                            h = o(b.target);
                        if (!h.is("a") && !h.parent().is("a")) return g ? a.open(f, g) : a.open(f, "_self"), !1
                    })
                },
                isElementVisible: function (a) {
                    var b = 400,
                        c = p.innerWidth(),
                        d = p.innerHeight(),
                        e = a.getBoundingClientRect(),
                        f = d + b,
                        g = e.left >= 0 && e.right <= c + b,
                        h = e.top >= 0 && e.top <= f,
                        i = e.bottom <= f && e.bottom >= -b,
                        j = a.offsetWidth > 0 && a.offsetHeight > 0;
                    return g && (h || i) && j
                },
                loadImage: function (b, d) {
                    var e, f = function (a) {
                        c.checkSrcset(a) ? b.srcset = a : b.src = a, b.className = (b.className + " loaded").trim(), b.onload = function () {
                            d()
                        }
                    };
                    if (e = new a.Image, e.onerror = function () {
                            b.style.height = "100%", f("" == this.srcset || void 0 === this.srcset ? this.src : this.srcset)
                        }, e.onload = function () {
                            f("" == this.srcset || void 0 === this.srcset ? this.src : this.srcset)
                        }, c.checkSrcset(b.getAttribute("data-src")))
                        if (void 0 === e.srcset) {
                            var g = b.getAttribute("id"),
                                h = b.getAttribute("class");
                            b.getAttribute("src"), b.getAttribute("data-src"), b.getAttribute("data-src");
                            g = g ? "id='" + g + "'" : "", h = h ? "class='" + h + " loaded'" : "", o(b).parent().append("<img " + g + " " + h + ' src="' + b.getAttribute("src") + '" srcset="' + b.getAttribute("data-src") + '" style="display:none;"/>'), o(b).parent().find("img").fadeIn(), o(b).remove(), o(".td-lazy img[data-src]").animate({
                                opacity: 1
                            }, 100);
                            try {
                                picturefill()
                            } catch (a) {}
                        } else e.srcset = b.getAttribute("data-src");
                    else e.src = b.getAttribute("data-src")
                },
                checkLazyImages: function () {
                    var a, b, d, e = 0,
                        i = [],
                        j = function () {
                            (e += 1) === d && c.ev.trigger(c.events.afterLazyImagesLoaded)
                        };
                    for (a = 0; a < g; a += 1) b = f[a], c.isElementVisible(b) && (i.push(b), f.splice(a, 1), g -= 1, a -= 1);
                    if ((d = i.length) > 0)
                        for (a = 0; a < i.length; a += 1) c.loadImage(i[a], j);
                    return g || void 0 != h && p.off(h), d
                },
                doEqualiseSize: function (a, d) {
                    var e, f;
                    if (a.is(":visible"))
                        if (f = a.find(d), e = f.length, p.innerWidth() < b.sm) {
                            var g = 0;
                            if (f.each(function (a, b) {
                                    var c = o(this);
                                    g += c.outerWidth(!0) - c.outerWidth()
                                }), g > 0) {
                                var h = a.width() - g;
                                f.css({
                                    width: Math.floor(h / e) + "px"
                                })
                            } else f.css({
                                width: 100 / e + "%"
                            });
                            c.equaliseHeight(a, d)
                        } else f.css({
                            width: "",
                            height: ""
                        })
                },
                equaliseSize: function (a, b) {
                    l.push(function () {
                        c.doEqualiseSize(a, b)
                    }), c.doEqualiseSize(a, b)
                },
                loadLazyImages: function () {
                    h = "scroll" + n, c.ev.on(c.events.afterLazyImagesLoaded, function () {
                        c.doEqualiseHeight()
                    }), c.checkLazyImages(), p.on(h, function () {
                        i && s(i), i = t(function () {
                            c.checkLazyImages()
                        }, 100)
                    })
                },
                preLoadNonLazyImages: function () {
                    c.ev.one(c.events.afterImagesPreloaded, function () {
                        c.doEqualiseHeight()
                    }), d.one("load" + n, function () {
                        (m += 1) === e && c.ev.trigger(c.events.afterImagesPreloaded)
                    }).each(function () {
                        this.complete && o(this).trigger("load")
                    })
                },
                initHero: function (a) {
                    function d() {
                        var a = i ? h : g.offset().left + h;
                        p.innerWidth() < b.md ? f.css({
                            left: a + j
                        }) : f.css({
                            left: ""
                        }), e.css({
                            paddingLeft: a
                        })
                    }
                    var e, f, g, h = 0,
                        i = !1,
                        j = b.gutter / 2;
                    e = a.find(c.dot(c.classes.heroDarkGreen) + ", " + c.dot(c.classes.heroLightGreen)), f = a.find(c.dot(c.classes.heroAction)), (e.length || f.length) && (a.closest('[class|="' + c.classes.container + '"]').length ? (i = !0, h = j) : (g = o(c.dot(c.classes.container)), g.length || (h = j, g = o(c.dot(c.classes.container)), g.length || (o(q.body).append(o("<div/>").addClass(c.classes.container).css({
                        visibility: "hidden"
                    })), g = o(c.dot(c.classes.container))))), d(), l.push(d))
                },
                initLinks: function () {
                    var a, b, d, e, f, g, h, i, j = c.queryLinksExceptions.split(",");
                    o(c.queryLinks).html(function () {
                        a = o(this), b = a.html().trim(), d = b.split(" "), i = d[d.length - 1], d.pop(), e = a.children().last(), f = a.text().trim().split(" "), h = f.pop(), e.length && e.html(e.html().trim());
                        for (var c = 0; c <= j.length - 1; c++) i.indexOf(j[c]) >= 0 && (h = i);
                        return e.text() !== h || void 0 === f[0] && void 0 !== d[0] ? g = b.indexOf("td-icon-rightCaret") < 0 ? d.join(" ") + " <span class='td-link-lastword'>" + h + "<span class='td-icon td-icon-rightCaret' aria-hidden='true'></span></span>" : b : (e.wrap('<span  data-msg="Link Icon Chevron" class="td-link-lastword" />'), g = a.html().trim()), g
                    }), o(c.queryBack).html(function () {
                        a = o(this), o(a).prepend(o("<span class='td-link-firstword'> <span class='td-icon td-icon-leftCaret' aria-hidden='true'>&nbsp;</span></span>"))
                    })
                },
                checkSrcset: function (a) {
                    return /\.(jpe?g|png|gif|bmp|svg)\s\d[x]/i.test(a)
                },
                setFocusAnchorImage: function () {
                    o("a").focus(function (a) {
                        o(this).children("img").get(0) && o(this).css({
                            display: "block",
                            "outline-width": "2px",
                            padding: "1px"
                        })
                    })
                },
                removeProdFromDrawer: function (a, b, d, e) {
                    if (!("function" == typeof a && void 0 !== a || "string" == typeof b && void 0 !== b || void 0 !== d)) return !1;
                    void 0 === e && (e = ""), c.ev.trigger(c.events.afterProdInfo, [{
                        prodinfo: {
                            prod_type: b,
                            prod_id: d,
                            comp_type: e,
                            evt_type: "remove",
                            cb_func: a
                        }
                    }])
                },
                addProdToDrawer: function (a, b, d, e, f, g, h, i, j) {
                    if (!("function" == typeof a && void 0 !== a || "string" == typeof b && void 0 !== b || void 0 !== d)) return !1;
                    void 0 === e && (e = ""), void 0 === f && (f = ""), void 0 === g && (g = ""), void 0 === h && (h = !1), void 0 === i && (i = "#"), void 0 === j && (j = !1), c.ev.trigger(c.events.afterProdInfo, [{
                        prodinfo: {
                            prod_type: b,
                            prod_id: d,
                            prod_name: e,
                            prod_img: f,
                            comp_type: g,
                            evt_type: "add",
                            speical_offer: h,
                            prod_url: i,
                            cb_func: a,
                            drawer_open: j
                        }
                    }])
                },
                cookies: {
                    getItem: function (a) {
                        return a && this.hasItem(a) ? unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")) : null
                    },
                    setItem: function (a, b, c, d, e, f) {
                        if (a && !/^(?:expires|max\-age|path|domain|secure)$/.test(a)) {
                            var g = "";
                            if (c) switch (typeof c) {
                                case "number":
                                    g = "; max-age=" + c;
                                    break;
                                case "string":
                                    g = "; expires=" + c;
                                    break;
                                case "object":
                                    c.hasOwnProperty("toGMTString") && (g = "; expires=" + c.toGMTString())
                            }
                            document.cookie = escape(a) + "=" + escape(b) + g + (e ? "; domain=" + e : "") + (d ? "; path=" + d : "") + (f ? "; secure" : "")
                        }
                    },
                    removeItem: function (a, b) {
                        if (a && this.hasItem(a)) {
                            var b = b || "/",
                                c = new Date;
                            c.setDate(c.getDate() - 1), document.cookie = escape(a) + "=; expires=" + c.toGMTString() + "; path=" + b
                        }
                    },
                    hasItem: function (a) {
                        return new RegExp("(?:^|;\\s*)" + escape(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
                    }
                },
                flyToElement: function (a, c) {
                    var d = o(a).clone();
                    d.height(o(a).height()), d.width(o(a).width()), d.css({
                        position: "absolute",
                        top: o(a).offset().top + "px",
                        left: o(a).offset().left + "px",
                        opacity: 1,
                        "z-index": 10001
                    }), o("body").append(d);
                    var e = o(c).offset().top - 100,
                        f = p.innerWidth() < b.md ? 30 : 100,
                        g = o(c).offset().left + f,
                        h = o(c).find(".content"),
                        i = o(c).find(".slot.added .anchor_emptyslot");
                    if (i.length > 0) {
                        var j = i.parent();
                        g = j.offset().left + j.width() / 2 - o(a).width() / 2 / 2, h.height() > 1 ? e = j.offset().top - 50 : p.innerWidth() < b.sm && (e -= 100)
                    }
                    d.animate({
                        opacity: .4,
                        left: g,
                        top: e,
                        width: o(a).width() / 2,
                        height: o(a).height() / 2
                    }, 500, function () {
                        o(this).animate({
                            top: e + 20,
                            opacity: 0
                        }, function () {
                            o(this).fadeOut("fast", function () {
                                o(this).remove()
                            })
                        })
                    })
                },
                getUrlVars: function () {
                    var b = {};
                    a.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, c, d) {
                        b[c] = d
                    });
                    return b
                },
                chk_param: function () {
                    var a = "";
                    if (void 0 !== c.getUrlVars().tdtarget && "" != c.getUrlVars().tdtarget) {
                        a = c.getUrlVars().tdtarget;
                        var b = o("#" + a);
                        c.slide_down(b)
                    }
                },
                slide_down: function (a) {
                    var b = 0,
                        c = o(".td-header-nav");
                    o(".td_rq_top-message");
                    c.get(0) && (b += c.height()), "object" == typeof a && o("html, body").animate({
                        scrollTop: a.offset().top - b
                    }, 1e3, function () {
                        a.focus().css({
                            "outline-width": "0px"
                        })
                    })
                },
                buttonStates: function () {
                    o("button").on("click", function () {
                        o(this).blur()
                    })
                },
                detectIE: function () {
                    var b = a.navigator.userAgent,
                        c = b.indexOf("MSIE ");
                    if (c > 0) return parseInt(b.substring(c + 5, b.indexOf(".", c)), 10);
                    if (b.indexOf("Trident/") > 0) {
                        var d = b.indexOf("rv:");
                        return parseInt(b.substring(d + 3, b.indexOf(".", d)), 10)
                    }
                    var e = b.indexOf("Edge/");
                    return e > 0 && parseInt(b.substring(e + 5, b.indexOf(".", e)), 10)
                },
                init: function () {
                    var b, h = (void 0 !== a.onorientationchange ? "orientationchange" : "resize") + n,
                        i = 100;
                    c.initLinks(), f = o(c.queryLazyImages).toArray(), g = f.length, d = o(c.queryEqualHeight).find("img[src]"), e = d.length, e || c.doEqualiseHeight(), e && c.preLoadNonLazyImages(), g && c.loadLazyImages(), l.push(function () {
                        g ? c.checkLazyImages() : c.doEqualiseHeight()
                    }), o.fn.initHero = c.getPluginDef(c.initHero, "initHero"), o(c.dot(c.classes.heroWrapper)).initHero(), p.on(h, function () {
                        j && s(j), j = t(function () {
                            var a;
                            for (a = 0; a < l.length; a += 1) l[a].call()
                        }, i)
                    }), c.ev.on(c.events.afterTabActiveChanged + " " + c.events.afterModalShown + " " + c.events.afterExpandForOthers, function (a, b) {
                        a.preventDefault(), c.doEqualiseHeight(), g && c.checkLazyImages()
                    }), c.makeClickable(o(c.queryClickable), c.queryClickableAnchor), b = function () {
                        o(".td-push-top").each(function () {
                            var b = o(this);
                            o(a).innerWidth() > 750 ? b.css("margin-top", "-" + b.metadata().val + "px") : b.css("margin-top", 0)
                        })
                    }, b(), l.push(b), o(document).on("mousedown", function (a) {
                        o("body").addClass("td-no-focus-outline")
                    }), o(document).on("keydown", function (a) {
                        o("body").removeClass("td-no-focus-outline")
                    });
                    var k, m, q = o();
                    c.ev.on(c.events.afterOperationalMessageDelay, function (a, b) {
                        q = b.$obj, k = b.evt, m = b.fn
                    }), p.load(function () {
                        c.chk_param(), q.get(0) && k(m)
                    })
                }
            }, c.init()
        }(a)
    }],
    td_rq_header_nav: [function (a) {
        "use strict";
        ! function (a) {
            function b() {
                c(), o(), y.resize(e), f()
            }

            function c() {
                R.on("mouseenter", function (a) {
                    var b = a.currentTarget;
                    1 != x(b).hasClass(D) && (j(), h(x(a.currentTarget)), void 0 !== b[N] && (clearTimeout(b[N]), b[N] = void 0))
                }), R.on("mouseleave", function (a) {
                    var b = a.currentTarget;
                    1 != x(b).hasClass(D) && (b[N] = setTimeout(function () {
                        i(x(b)), b[N] = void 0
                    }, O))
                }), R.on("click", function (a) {
                    g(x(a.currentTarget))
                }), R.on("keydown", function (a) {
                    32 === a.which && g(x(a.currentTarget)), 27 === a.which && i(x(a.currentTarget))
                }), T.on("click touchstart", function (a) {
                    "touchstart" === a.type && a.preventDefault(), m()
                }), U.on("click touchstart", function (a) {
                    "touchstart" === a.type && a.preventDefault(), n()
                }), x(document).on("click touchstart", function (a) {
                    d(a)
                }), V.on("click", function (a) {
                    var b = x(a.currentTarget).attr("href");
                    if (void 0 != b) {
                        var c = x(document).find(b)[0];
                        void 0 != c && (c.scrollIntoView(), setTimeout(function () {
                            c.setAttribute("tabindex", "-1"), c.focus()
                        }, 0)), a.preventDefault()
                    }
                }), k(), l()
            }

            function d(a) {
                x(a.target).closest("." + A).length || j()
            }

            function e() {
                f(), y.width() >= z.bpSet("md") && void 0 !== W.attr("style") && -1 !== W.attr("style").indexOf("display: block") && s()
            }

            function f() {
                var a = P.outerHeight();
                x(".td-contentarea").css("padding-top", a)
            }

            function g(a) {
                a.hasClass(B) ? i(a) : (j(), h(a))
            }

            function h(a) {
                a.addClass(B), a.children("a").attr("aria-expanded", "true")
            }

            function i(a) {
                a.removeClass(B), a.children("a").attr("aria-expanded", "false")
            }

            function j() {
                i(R)
            }

            function k() {
                R.each(function (a) {
                    var b = x(this),
                        c = b.children("a"),
                        d = b.find("." + C),
                        e = "td-desktop-nav-dropdown-link-" + a;
                    c.attr("aria-haspopup", "true"), c.attr("aria-expanded", "false"), c.attr("id", e), d.attr("aria-labelledby", e), d.find("li").last().on("keydown", function (a) {
                        a.shiftKey || 9 !== a.which || j()
                    }), c.on("keydown", function (a) {
                        a.shiftKey && 9 === a.which && j()
                    })
                });
                var a = S.find("." + H),
                    b = a.attr("placeholder");
                S.find("." + H).attr("aria-label", b);
                var c = ba.find("." + H),
                    d = c.attr("placeholder");
                ba.find("." + H).attr("aria-label", d)
            }

            function l() {
                S.find("." + H).on("keydown", function (a) {
                    a.shiftKey && 9 === a.which && n()
                }), U.on("keydown", function (a) {
                    a.shiftKey || 9 !== a.which || n()
                })
            }

            function m() {
                S.show(), S.find(".td-search-input").focus(), M.forEach(function (a) {
                    x(a).attr("aria-hidden", "true"), x(a).find("a").each(function () {
                        x(this).attr("tabindex", "-1")
                    })
                })
            }

            function n() {
                S.hide(), T.focus(), M.forEach(function (a) {
                    x(a).attr("aria-hidden", "false"), x(a).find("a").each(function () {
                        x(this).removeAttr("tabindex")
                    })
                })
            }

            function o() {
                Y.on("click touchstart", function (a) {
                    "touchstart" === a.type && a.preventDefault(), r(X, a)
                }), Y.attr("aria-haspopup", "true"), Y.attr("aria-expanded", "false"), _.on("click touchstart", function (a) {
                    "touchstart" === a.type && a.preventDefault(), r($, a)
                }), _.attr("aria-haspopup", "true"), _.attr("aria-expanded", "false"), Z.add(aa).on("click touchstart", function (a) {
                    "touchstart" === a.type && a.preventDefault(), s()
                }), W.find("." + E).on("click", function (a) {
                    p(a)
                }), W.find("." + E + " ." + G).on("click", function (a) {
                    a.stopPropagation()
                }), t(X), t($), q(X), q($)
            }

            function p(a) {
                var b = 300,
                    c = x(a.currentTarget),
                    d = c.find("." + G);
                c.hasClass(F) ? (d.slideUp(b, function () {
                    c.removeClass(F)
                }), c.children("a").attr("aria-expanded", "false")) : (c.addClass(F), d.slideDown(b), d.find("li:first-child a").focus(), c.children("a").attr("aria-expanded", "true"))
            }

            function q(a) {
                a.find("." + E).each(function () {
                    var a = x(this);
                    if (a.hasClass(F)) {
                        a.find("." + G).slideDown(0), a.children("a").attr("aria-expanded", "true")
                    }
                })
            }

            function r(a, b) {
                var c = 200,
                    d = {},
                    e = u(a),
                    f = x(b.currentTarget);
                v(), W.show(), a.show(), a.css(e, "-" + a.outerWidth() + "px"), d[e] = 0, a.animate(d, c, function () {
                    a.find("a:visible,button:visible").first().focus()
                }), aa.css("opacity", 0), aa.animate({
                    opacity: 1
                }, c), ca = f, f.attr("aria-expanded", "true"), I.forEach(function (a) {
                    x(a).attr("aria-hidden", "true")
                })
            }

            function s() {
                var a = 200,
                    b = {};
                b[u(X)] = "-" + X.outerWidth() + "px", X.animate(b, a, function () {
                    W.hide(), X.hide()
                }), Y.attr("aria-expanded", "false"), b = {}, b[u($)] = "-" + $.outerWidth() + "px", $.animate(b, a, function () {
                    W.hide(), $.hide()
                }), _.attr("aria-expanded", "false"), aa.animate({
                    opacity: 0
                }, a), ca.focus(), w(), I.forEach(function (a) {
                    x(a).removeAttr("aria-hidden")
                })
            }

            function t(a) {
                var b = x("<span>");
                b.attr("tabindex", "0"), b.on("focus", function (a) {
                    x(a.currentTarget).parents("." + K).find("a:visible,button:visible").first().focus()
                }), a.append(b);
                var c = x("<span>");
                c.attr("tabindex", "0"), c.on("focus", function (a) {
                    x(a.currentTarget).parents("." + K).find("." + L + ":visible").last().find("a:visible").focus()
                }), a.prepend(c), W.find("." + E).children("a").each(function () {
                    x(this).attr("aria-expanded", "false"), x(this).attr("role", "button")
                })
            }

            function u(a) {
                return a.hasClass(J) ? "right" : "left"
            }

            function v() {
                x("html, body").css("overflow-y", "hidden"), x("body").css("height", "100%"), y.trigger("resize")
            }

            function w() {
                x("html, body").css("overflow-y", ""), x("body").css("height", ""), y.trigger("resize")
            }
            var x = a.jQuery,
                y = x(a),
                z = a.g,
                A = "td-dropdown",
                B = "td-dropdown-active",
                C = "td-dropdown-content",
                D = "td-dropdown-no-hover",
                E = "td-accordion",
                F = "td-accordion-active",
                G = "td-accordion-content",
                H = "td-search-input",
                I = [".td-header-mobile", ".td-header-mobile-ms", ".td-contentarea"],
                J = "td-nav-mobile-menu-right",
                K = "td-nav-mobile-menu",
                L = "td-nav-mobile-menu-item",
                M = [".td-nav-primary .td-section-left nav", ".td-nav-primary .td-section-right", ".td-nav-primary-ms .td-section-left nav", ".td-nav-primary-ms .td-section-right"],
                N = "dropdown_delay_timer",
                O = 250,
                P = x(".td-header-nav"),
                Q = x(".td-header-desktop");
            x(".td-header-desktop-ms").length > 0 && (Q = x(".td-header-desktop-ms"));
            var R = Q.find("." + A),
                S = Q.find(".td-nav-desktop-search"),
                T = Q.find(".td-desktop-search-show-btn"),
                U = Q.find(".td-desktop-search-hide-btn"),
                V = Q.find(".td-skip > a"),
                W = x(".td-nav-mobile");
            x(".td-nav-mobile-ms").length > 0 && (W = x(".td-nav-mobile-ms"));
            var X = x("." + K).first(),
                Y = x(".td-mobile-menu-button"),
                Z = x(".td-mobile-menu-close"),
                $ = x(".td-nav-mobile-menu-secondary");
            x(".td-nav-mobile-menu-secondary-ms").length > 0 && ($ = x(".td-nav-mobile-menu-secondary-ms"));
            var _ = x(".td-mobile-menu-secondary-button"),
                aa = x(".td-nav-mobile-overlay");
            x(".td-nav-mobile-overlay-ms").length > 0 && (aa = x(".td-nav-mobile-overlay-ms"));
            var ba = x(".td-nav-mobile-menu-search");
            x(".td-nav-mobile-menu-search-ms").length > 0 && (ba = x(".td-nav-mobile-menu-search-ms"));
            var ca;
            b(), z.ev.on(z.events.afterHeaderHeightChanged, function (a) {
                a.preventDefault(), f()
            })
        }(a)
    }],
    td_rq_top_message: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = a.document,
                f = (b(e), d.bpSet("sm")),
                g = d.detectIE(),
                h = function (h, i) {
                    function j() {
                        k()
                    }

                    function k() {
                        d.ev.trigger(d.events.afterOperationalMessageDelay, {
                            $obj: b(h),
                            evt: l,
                            fn: m
                        }), h.find(".td-top-message-close-anchor").off("click"), h.find(".td-top-message-close-anchor").on("click", function (a) {
                            a.preventDefault(), t = !1, h.not(":animated").slideUp({
                                duration: 400,
                                start: function () {
                                    var a = b(this).outerHeight();
                                    !1 === g ? s.animate({
                                        "margin-top": 0
                                    }) : g >= 11 && s.css({
                                        "margin-top": 0
                                    }), "function" == typeof p ? p.call("", b(this), "close", a) : d.ev.trigger(d.events.afterOperationalMessage, {
                                        obj: b(this),
                                        ems: "close",
                                        position_y: a
                                    })
                                },
                                complete: function () {}
                            }), q = !1, void 0 !== o && (o.css("visibility", "visible"), o.attr("aria-hidden", "false"))
                        })
                    }

                    function l(a) {
                        h.not(":animated").delay(700).slideDown({
                            duration: 400,
                            start: function () {
                                if (!1 === g) {
                                    var a = b(this).outerHeight();
                                    "function" == typeof p ? p.call("", b(this), "open", a) : d.ev.trigger(d.events.afterOperationalMessage, {
                                        obj: b(this),
                                        ems: "open",
                                        position_y: a
                                    })
                                }
                            },
                            complete: function () {
                                if (a.call(), b(this).find(".td-top-message-illustration .td-icon").animate({
                                        opacity: 1
                                    }, 400), b(this).find(".inner_content").fadeIn(400), b(this).css("display", "block"), g >= 11) {
                                    var c = b(this).outerHeight();
                                    "function" == typeof p ? p.call("", b(this), "open", c) : d.ev.trigger(d.events.afterOperationalMessage, {
                                        obj: b(this),
                                        ems: "open",
                                        position_y: c
                                    })
                                }
                                b(this).trigger("resize")
                            }
                        })
                    }

                    function m() {
                        if (a.innerWidth >= f) {
                            var b = d.getEqualHeight(r);
                            r.css("height", b + "px")
                        } else r.css("height", "auto")
                    }

                    function n() {
                        t ? s.css("margin-top", h.outerHeight()) : s.css("margin-top", 0)
                    }
                    var o, p, q = !0,
                        r = h.find(".equal-height"),
                        s = b("body"),
                        t = !0,
                        u = !1;
                    j(), c.resize(function () {
                        m(), u && n()
                    }), c.load(function () {
                        u = !0
                    }), e.addEventListener("initEmergencyMessaging", function (a) {
                        j()
                    })
                };
            b.fn.topMessage = d.getPluginDef(h, "topMessage"), b(".td_rq_top-message").topMessage()
        }(a)
    }],
    td_rq_modal_cookie: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.document,
                e = (b(d), b(d), g.bpSet("sm")),
                f = g.bpSet("md"),
                h = function (d, h) {
                    function i() {
                        j(), m.attr("aria-hidden", "false"), m.attr("tabindex", "0"), g.ev.on(g.events.afterBackToTop, function (a, c) {
                            l = b(c), 0 != o ? (l.css("visibility", "hidden"), l.attr("aria-hidden", "true")) : (l.css("visibility", "visible"), l.attr("aria-hidden", "false"))
                        })
                    }

                    function j() {
                        var b = a.innerWidth;
                        if (a.innerWidth >= f) {
                            var c;
                            n.get(0) ? (c = n.outerWidth(), m.css("right", k(b, c, 103) + "px")) : m.css("right", "0px")
                        } else if (a.innerWidth < f && a.innerWidth >= e) {
                            var d = m.outerWidth();
                            m.css("right", k(b, d) + "px")
                        } else m.css("right", "0px")
                    }

                    function k(a, b, c) {
                        return void 0 === c && (c = 0), (a - b) / 2 + c
                    }
                    var l, m = d,
                        n = b(".td-container"),
                        o = !0;
                    i(), m.find(".close-button").click(function () {
                        m.hide(500), o = !1, void 0 !== l && (l.css("visibility", "visible"), l.attr("aria-hidden", "false")), m.attr("aria-hidden", "true")
                    }), c.resize(function () {
                        j()
                    })
                };
            b.fn.modalCookie = g.getPluginDef(h, "modalCookie"), b(".td_rq_modal-cookie").modalCookie()
        }(a)
    }],
    td_rq_link_to_top: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.document,
                e = (b(d), g.bpSet("md")),
                f = g.bpSet("lg"),
                h = function (h, i) {
                    function j() {
                        if (a.innerWidth >= f) {
                            var b, c, d = a.innerWidth;
                            o.get(0) ? (b = o.outerWidth(), c = (d - b) / 2 + 7, n.css("right", c + "px")) : n.css("right", "0px")
                        } else a.innerWidth < f && a.innerWidth >= e ? n.css("right", "15px") : n.css("right", "0px")
                    }

                    function k() {
                        j(), v.attr("tabindex", -1), w.attr("tabindex", -1)
                    }
                    var l, m, n = h,
                        o = b(".td-container"),
                        p = b("#main"),
                        q = b("footer"),
                        r = b("body"),
                        s = !1,
                        t = (b(".td_rq_header-nav"), !1),
                        u = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
                        v = n.find("> span > span:nth-child(2)"),
                        w = n.find("> span > span:nth-child(3)");
                    k(), n.on("click", function () {
                        var a = p.offset().top - r.css("margin-top").split("px")[0];
                        return b("body,html").animate({
                            scrollTop: a
                        }, "500", "swing"), p.attr("tabindex", 0).focus(), n.removeClass("activate"), t = !0, !1
                    }), n.focus(function (a) {
                        b(this).css("text-decoration", "none")
                    }), m = function () {
                        n.addClass("activate").removeClass("activate_disabled"), n.attr("aria-hidden", "false")
                    }, c.scroll(function () {
                        s = !1, c.scrollTop() > q.offset().top - c.height() && b(d).height() - q.height() > b(a).height() ? (p.attr("tabindex", 0), q.removeAttr("tabindex"), clearTimeout(l), l = setTimeout(m, 150), g.ev.trigger(g.events.afterBackToTop, n), n.removeClass("activate").addClass("activate_disabled").attr("tabindex", 0), n.attr("aria-hidden", "true")) : (0 == c.scrollTop() && (t = !1), t || p.attr("tabindex", -1), q.attr("tabindex", 0), clearTimeout(l), n.removeClass("activate").removeClass("activate_disabled").attr("tabindex", -1), u ? n.attr("aria-hidden", "false") : n.attr("aria-hidden", "true"))
                    }), c.scroll(), c.keyup(function (c) {
                        b(d).height() - q.height() <= b(a).height() && q.removeAttr("tabindex"), 9 == (c.keyCode ? c.keyCode : c.which) && q.focus(function (a) {
                            s || (b(this).attr("aria-hidden", "true"), setTimeout(function () {
                                n.hasClass("activate") && n.focus()
                            }, 200), s = !0, b(this).removeAttr("aria-hidden"))
                        })
                    }), c.resize(function () {
                        j()
                    })
                };
            b.fn.backToTop = g.getPluginDef(h, "backToTop"), b.fn.backToTop.defaults = {}, b(".td_rq_link-to-top").backToTop()
        }(a)
    }],
    td_rq_large_modal_overlay: [function (a) {
        "use strict";
        ! function (a) {
            var b, c, d = a.jQuery,
                e = d(a),
                f = a.document,
                h = (d(f), function (h, i) {
                    function j() {
                        A.data(X, "true"), S.click(function (a) {
                            t()
                        }), T.click(function (a) {
                            t()
                        }), y();
                        var a = _.length;
                        E && a > 0 && p(a), F && n(), C && a > 0 && q(a)
                    }

                    function k() {
                        void 0 !== da.attr("id") || ha >= 11 ? da.get(0) && m() : (ha++, setTimeout(function () {
                            k()
                        }, 100))
                    }

                    function l(a) {
                        1 == a ? Q.css({
                            width: L + "px",
                            height: M + "px"
                        }) : Q.css({
                            width: "auto",
                            height: "100%"
                        })
                    }

                    function m() {
                        var b = da,
                            c = b.attr("id"),
                            e = d("#" + c).find("> div");
                        if (e.css("margin-right", "1px"), a.innerWidth < 768) {
                            1 == K && l(!1);
                            var h = a.innerHeight,
                                i = 0;
                            fa.get(0) && (i = parseInt(fa.outerHeight(!0)));
                            var j = parseInt(ea.css("marginTop").split("px")[0]) + i,
                                k = 0;
                            ga.get(0) && (k = ga.outerHeight(!0));
                            var m = parseInt(e.css("height").split("px")[0]);
                            h = h - j - k, m > h ? g.ev.trigger(g.events.afterLargeModalOverlay, [{
                                scrollbarInfo: {
                                    id: c,
                                    height: h + "px",
                                    status: "yes"
                                }
                            }]) : g.ev.trigger(g.events.afterLargeModalOverlay, [{
                                scrollbarInfo: {
                                    id: c,
                                    height: m,
                                    status: "no"
                                }
                            }])
                        } else {
                            1 == K && l(!0);
                            var n;
                            1 == K ? parseInt(M) > f.documentElement.clientHeight ? (Q.css("height", "100%"), Q.removeClass("overwrite_maxHeight"), n = .85 * f.documentElement.clientHeight) : (Q.css("height", M + "px"), Q.addClass("overwrite_maxHeight"), n = parseInt(M)) : n = .85 * f.documentElement.clientHeight;
                            var i = 0;
                            fa.get(0) && (i = parseInt(fa.outerHeight(!0)));
                            var j = parseInt(ea.css("marginTop").split("px")[0]) + i,
                                k = 0;
                            ga.get(0) && (k = ga.outerHeight(!0));
                            var m = parseInt(e.css("height").split("px")[0]);
                            n = n - (j + 12) - k, m > n ? g.ev.trigger(g.events.afterLargeModalOverlay, [{
                                scrollbarInfo: {
                                    id: c,
                                    height: n + "px",
                                    status: "yes"
                                }
                            }]) : g.ev.trigger(g.events.afterLargeModalOverlay, [{
                                scrollbarInfo: {
                                    id: c,
                                    height: m,
                                    status: "no"
                                }
                            }])
                        }
                    }

                    function n() {
                        var a = S.clone(!0);
                        a.addClass("cloned_button"), A.append(a), z = d(".cloned_button"), z.hide()
                    }

                    function o() {
                        var b = Q.find(R).outerHeight(!0),
                            c = a.innerHeight,
                            e = d(".cloned_button");
                        c <= b ? (S.hide(), e.show(s)) : (S.show(s), e.hide())
                    }

                    function p(a) {
                        if ("number" == typeof a && a > 4) {
                            var b = S.clone(!0);
                            b.css({
                                top: "auto",
                                bottom: "12px"
                            }), b.addClass("visible-xs"), S.parent().append(b)
                        }
                    }

                    function q(a) {
                        if ("number" == typeof a) switch (a) {
                            case 5:
                            case 6:
                            case 3:
                                _.removeClass("td-col-sm-3").addClass("td-col-sm-4");
                                break;
                            case 2:
                                _.eq(0).addClass("td-col-sm-offset-3")
                        }
                    }

                    function r(c) {
                        Q.attr("role", "dialog").attr("tabindex", "0"), A.addClass(V), A.fadeTo(0, 0), A.fadeTo(Y, 1), A.attr("aria-hidden", "false");
                        B.modal_heading && (aa.html(B.modal_heading), B.modal_heading = ""), B.modal_content && (ba.html(B.modal_content), B.modal_content = ""), a.innerWidth < 768 && 1 != K ? A.css("height", "100%") : A.height(e.height()), Q.outerHeight() > e.height() && Q.scrollTop(1), sessionStorage.scrollPos = d(a).scrollTop(), d("html, body").css({
                            overflow: "hidden !important",
                            position: "fixed"
                        }), e.on("resize.tdModal", u), ca ? (d(f).off("click"), d(f).click(function (a) {
                            a.toElement && (b = "A" != a.toElement.tagName && "BUTTON" != a.toElement.tagName ? d(a.toElement).parents("a,button") : d(a.toElement))
                        })) : b = d(f.activeElement);
                        for (var h = 0; h < U.length; h++) {
                            var i = U[h];
                            "true" != i.attr("aria-hidden") && (i.addClass(W), i.attr("aria-hidden", "true"))
                        }
                        Q.find(Z).each(function () {
                            var a = d(this),
                                b = a.attr("id"),
                                c = videojs(b);
                            void 0 != c && (c.play(), setTimeout(function () {
                                a.find(".vjs-play-control").focus()
                            }, 100))
                        }), g.ev.trigger(g.events.afterModalShown, [A]), F && o(), da.get(0) && 1 == G && void 0 !== H ? (setTimeout(function () {
                            Q.focus()
                        }, 10), w(H)) : (da.get(0) && x(), c())
                    }

                    function s() {
                        setTimeout(function () {
                            Q.focus()
                        }, 300)
                    }

                    function t() {
                        A.fadeTo(Y, 0, function () {
                            A.removeClass(V)
                        }), A.attr("aria-hidden", "true").css({
                            display: "none"
                        }), d("html, body").css({
                            overflow: "",
                            position: ""
                        }), e.off("resize.tdModal"), Q.find(Z).each(function () {
                            var a = d(this).attr("id"),
                                b = videojs(a);
                            void 0 != b && (b.currentTime(0), b.pause())
                        });
                        for (var f = 0; f < U.length; f++) {
                            var h = U[f];
                            h.hasClass(W) && (h.removeClass(W), h.attr("aria-hidden", "false"))
                        }
                        Q.scrollTop(1), d(a).scrollTop(sessionStorage.scrollPos || 0), sessionStorage.scrollPos = 0, g.ev.trigger(g.events.afterModalHidden), Q.removeAttr("role tabindex"), void 0 !== c && c.removeAttr("tabindex"), void 0 !== b && b.focus()
                    }

                    function u() {
                        a.innerWidth < 768 && 1 != K ? A.css("height", "100%") : A.height(e.height()), F && o(), da.get(0) && m()
                    }

                    function v(a) {
                        c = a, c.addClass("highlight"), setTimeout(function () {
                            c.removeClass("highlight"), c.attr("tabindex", "-1").focus().css({
                                "outline-width": "0px"
                            })
                        }, 2e3)
                    }

                    function w(a) {
                        x(), c = d("#" + a), "SPAN" == c.prop("tagName") && (c = c.parent());
                        var b = c.offset().top,
                            e = da.offset().top,
                            b = b - e;
                        da.animate({
                            scrollTop: b
                        }, I, function () {
                            v(c), c.attr("tabindex", "-1").focus().css({
                                "outline-width": "0px"
                            })
                        }), B.anchor.status = !1, B.anchor.targetedID = ""
                    }

                    function x() {
                        da.offset().top;
                        da.scrollTop(0)
                    }

                    function y() {
                        Q.attr("role", "dialog").attr("tabindex", "0"), A.attr("aria-hidden", "true"), S.attr("aria-label", O), Q.attr("aria-label", J), d("body").on("keydown", P, function (a) {
                            var b = d(this);
                            if (9 == a.keyCode) {
                                var c = b.find("*"),
                                    e = c.filter("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(":visible"),
                                    g = d(f.activeElement),
                                    h = e.length,
                                    i = e.index(g);
                                a.shiftKey || i != h - 1 || (e.get(0).focus(), a.preventDefault()), a.shiftKey && 0 == i && (e.get(h - 1).focus(), a.preventDefault())
                            }
                        }).on("keyup", ":not(" + P + ")", function (a) {
                            var b = (d(this), d(P)),
                                c = d(f.activeElement),
                                e = !!c.parents(P).length;
                            b.length && 9 == a.keyCode && !1 === e && S.focus()
                        }), A.keydown(function (a) {
                            console.log("td_overlay_close: " + B.overlayClose), 0 != N && 27 === a.which && t()
                        }), A.click(function (a) {
                            0 != N && t()
                        }), A.children().click(function (a) {
                            a.stopPropagation()
                        })
                    }
                    var z, A = d(h),
                        B = d.extend(d.fn.tdModal.defaults, A.metadata(), i),
                        C = B.custom_arrangement,
                        D = B.show,
                        E = B.clone_btn_close,
                        F = B.clone_btn_close_float,
                        G = B.anchor.status,
                        H = B.anchor.targetedID,
                        I = B.anchor.scrolling_speed,
                        J = B.accessibility_modal_description,
                        K = B.size.status,
                        L = B.size.width,
                        M = B.size.height,
                        N = B.overlayClose,
                        O = B.btn_close_aria_label,
                        P = ".td-modal",
                        Q = A.find(P),
                        R = ".td-modal-content",
                        S = Q.find(".close-button"),
                        T = Q.find(".close-button-custom"),
                        U = [d(".td-header-nav"), d("footer"), d(".td-left-menu"), d(".td-right-menu"), d(".td-header"), d(".td-quick-actions-mobile"), d(".td-sticky-nav"), d(".td-contentarea")],
                        V = "td-modal-show",
                        W = "td-modal-hidden-element",
                        X = "initiated",
                        Y = 200,
                        Z = ".td-video-player .video-js",
                        $ = "td-modal-quoter-item",
                        _ = Q.find("." + $),
                        aa = (g.bpSet("sm"), A.find(".td-heading")),
                        ba = A.find(".td-modal-body-content .rte"),
                        ca = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()), /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())),
                        da = A.find(".td_rq_scrollbar"),
                        ea = A.find(".td-modal-header"),
                        fa = ea.children("h2"),
                        ga = A.find(".td-modal-footer"),
                        ha = 1;
                    switch ("true" != A.data(X) && j(), D) {
                        case !0:
                            r(s);
                            break;
                        case !1:
                            t()
                    }
                    k()
                });
            d.tdModalModules || (d.tdModalModules = {
                uid: 0
            }), d.fn.tdModal = g.getPluginDef(h, "tdModal"), d.fn.tdModal.defaults = {
                custom_arrangement: !0,
                modal_status: !1,
                clone_btn_close: !1,
                clone_btn_close_float: !0,
                anchor: {
                    status: !1,
                    targetedID: "",
                    scrolling_speed: 1e3
                },
                accessibility_modal_description: "Modal content",
                size: {
                    status: !1,
                    width: "auto",
                    height: "100%"
                },
                overlayClose: !0,
                btn_close_aria_label: "close"
            }, d(".td-modal-container, td_rq_large-modal-overlay").tdModal()
        }(a)
    }],
    td_rq_a_banner_product: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = a.document,
                f = d.bpSet("md"),
                g = d.bpSet("sm"),
                h = function (h, i) {
                    function j() {
                        b("*").on("keydown", function (a) {
                            (9 === a.which || a.shiftKey && 9 === a.which) && B.css({
                                "outline-width": "1px"
                            })
                        }), A.click(function (a) {
                            a.preventDefault()
                        }), 1 == N ? (B.click(m), z.change(l), p(), ca.init(), q(V, W, X)) : x.hide(), k(), t(), d.ev.on(d.events.afterTabActiveChanged, function (a, b) {
                            a.preventDefault(), 1 == V && q(V, W, X), s(), t()
                        })
                    }

                    function k() {
                        aa && K.each(function (a) {
                            b(this).outerWidth(L.feature_table["col" + (a + 1)])
                        })
                    }

                    function l() {
                        var a = b(this);
                        console.log("checkbox input change"), !1 === a.is(":checked") ? o() : n()
                    }

                    function m(a) {
                        B.on("click", function (a) {
                            1 == a.which && b(this).css({
                                "outline-width": "0px"
                            })
                        }), z.prop("checked") ? ca.checkbox_uncheck_evt(a) : ca.checkbox_check_evt(a)
                    }

                    function n() {
                        z.prop("checked", !0), z.addClass("checked"), A.addClass("label-checked"), B.attr("aria-checked", "true")
                    }

                    function o() {
                        z.prop("checked", !1), z.removeClass("checked"), A.removeClass("label-checked"), B.attr("aria-checked", "false")
                    }

                    function p() {
                        var a = "_title";
                        y.attr("aria-describedby", O + "_" + P + a), v.get(0) ? v.attr("id", O + "_" + P + a) : w.attr("id", O + "_" + P + a), z.attr("aria-hidden", "true"), z.attr("tabindex", -1), B.attr("tabindex", 0), B.attr("role", "checkbox"), B.on("keyup", function (a) {
                            32 !== a.which && 13 !== a.which || m()
                        }), B.on("click", function (a) {
                            1 == a.which && b(this).css({
                                "outline-width": "0px"
                            })
                        }), B.on("keydown", function (a) {
                            32 === a.which && a.preventDefault()
                        })
                    }

                    function q(a, b, d) {
                        1 == a && (2 == d ? E.addClass("show") : ("left" == b && D.addClass("left"), D.show(), r(), c.resize(function () {
                            r()
                        })))
                    }

                    function r() {
                        if (H.get(0))
                            if (a.innerWidth >= f) {
                                var b = -1 * H.outerHeight(!0);
                                D.css("top", b + "px")
                            } else D.css("top", "0px");
                        if (a.innerWidth < g) {
                            var c = D.outerHeight(!0);
                            v.get(0) ? v.css({
                                "padding-left": "0px",
                                "padding-right": "0px",
                                "margin-top": c + "px"
                            }) : w.css({
                                "padding-left": "0px",
                                "padding-right": "0px",
                                "margin-top": c + "px"
                            })
                        } else v.get(0) ? v.css({
                            "padding-left": "10%",
                            "padding-right": "10%",
                            "margin-top": "20px"
                        }) : w.css({
                            "padding-left": "10%",
                            "padding-right": "10%",
                            "margin-top": "20px"
                        })
                    }

                    function s() {
                        fa = F.height(), ga = G.find("> div > div").height(), a.innerWidth < g ? G.find("> div").css("height", "auto") : 2 != X || Y ? fa >= ga ? (G.find("> div").css("height", fa + "px"), G.find("> div > div").removeClass("no_vert_center")) : (G.find("> div").css("height", "auto"), G.find("> div > div").addClass("no_vert_center")) : G.find("> div > div").addClass("no_vert_center")
                    }

                    function t() {
                        var a = d.getEqualHeight(I);
                        c.width() > 750 ? I.css("height", a + "px") : I.css("height", "auto")
                    }
                    var u = b(h),
                        v = u.find("h1"),
                        w = u.find("h2"),
                        x = u.find(".td-product-compare"),
                        y = b(".td-label-content-wrapper"),
                        z = x.find("input"),
                        A = x.find("label"),
                        B = x.find(".td-label-content-wrapper"),
                        C = u.find(".td-product-image"),
                        D = u.find(".td-indicator-offer"),
                        E = u.find(".td-indicator-offer-type2"),
                        F = u.find(".td-product-info-left"),
                        G = u.find(".td-product-info-right"),
                        H = u.prev(".td-back-text-link"),
                        I = u.find(".td-product-feature-subtext"),
                        J = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
                        K = u.find(".td-product-features li"),
                        L = b.extend(b.fn.tdABannerProduct.defaults, u.metadata(), i),
                        M = L.lang,
                        N = L.compare_checkbox.status,
                        O = L.compare_checkbox.prod_type,
                        P = L.compare_checkbox.prod_id,
                        Q = L.compare_checkbox.prod_name,
                        R = L.compare_checkbox.prod_img,
                        S = L.compare_checkbox.classname,
                        T = L.compare_checkbox.comp_type,
                        U = L.compare_checkbox.cookie_ids,
                        V = L.compare_checkbox.prod_special.status,
                        W = L.compare_checkbox.prod_special.position,
                        X = L.compare_checkbox.prod_special.type,
                        Y = !!L.compare_checkbox.prod_special.vert_center && L.compare_checkbox.prod_special.vert_center,
                        Z = L.compare_checkbox.prod_url,
                        $ = L.compare_checkbox.drawer_open,
                        _ = L.compare_checkbox.state_chg,
                        aa = !!L.feature_table,
                        ba = {},
                        ca = {},
                        da = U + "_" + M,
                        ea = ".td-product-compare";
                    ba.cookie_name = da, ba.compare_checkbox = u.find(ea), ba.allCheckboxes = b(S).find(ea), ba.flyToDrawer_compare_drawer = b(".td_rq_compare-sticky-drawer"), ca = {
                        cb_return: !0,
                        max_card_num: 3,
                        cur_card_num: 0,
                        init: function () {
                            z.attr("id", O + "_" + P), A.attr("for", O + "_" + P), J && a.innerWidth < d.bpSet("sm") && (ca.max_card_num = 2), ca.loadCookieIds(), _ && (ca.updateCheckboxStatus(), d.ev.on(d.events.afterCompareCbChanged, function (a, b) {
                                ca.updateCheckboxStatus()
                            }))
                        },
                        checkbox_check_evt: function (a) {
                            null != d.cookies.getItem(ba.cookie_name) && "" != d.cookies.getItem(ba.cookie_name) ? (ca.cookieids_arr = unescape(d.cookies.getItem(ba.cookie_name)).split(","), ca.cur_card_num = ca.cookieids_arr.length) : ca.cur_card_num = 0, d.addProdToDrawer(ca.check_callback, O, P, Q, R, T, V, Z, $)
                        },
                        checkbox_uncheck_evt: function (a) {
                            null != d.cookies.getItem(ba.cookie_name) && "" != d.cookies.getItem(ba.cookie_name) ? (ca.cookieids_arr = unescape(d.cookies.getItem(ba.cookie_name)).split(","), ca.cur_card_num = ca.cookieids_arr.length) : ca.cur_card_num = 0, d.removeProdFromDrawer(ca.uncheck_callback, O, P, T)
                        },
                        check_callback: function () {
                            ca.cb_return = arguments[0], ca.cb_return ? (setTimeout(function () {
                                ca.flyToDrawer(C)
                            }, 0), n()) : o()
                        },
                        uncheck_callback: function () {
                            ca.cb_return = arguments[0], ca.cb_return ? o() : n()
                        },
                        flyToDrawer: function (a) {
                            d.flyToElement(a, ba.flyToDrawer_compare_drawer)
                        },
                        cookieids_arr: [],
                        loadCookieIds: function () {
                            null != d.cookies.getItem(ba.cookie_name) && "" != d.cookies.getItem(ba.cookie_name) && (ca.cookieids_arr = unescape(d.cookies.getItem(ba.cookie_name)).split(","), ca.cur_card_num = ca.cookieids_arr.length, ca.cookieids_arr.indexOf(M + "_" + z.attr("id")) > -1 ? n() : o())
                        },
                        updateCheckboxStatus: function () {
                            ca.cookieids_arr = unescape(d.cookies.getItem(ba.cookie_name)).split(","), ca.cur_card_num = ca.cookieids_arr.length, ca.cookieids_arr.indexOf(M + "_" + z.attr("id")) > -1 ? n() : o(), ca.cur_card_num >= ca.max_card_num && !z.prop("checked") ? (x.addClass("disabled"), B.attr("tabindex", -1)) : x.hasClass("disabled") && (x.removeClass("disabled"), B.attr("tabindex", 0))
                        }
                    }, j(), c.resize(function () {
                        s(), t()
                    }), c.load(function () {
                        s()
                    });
                    var fa, ga;
                    e.body.addEventListener("touchstart", function (b) {
                        a.innerWidth >= g && (fa >= ga ? G.find("> div").css("height", fa + "px") : G.find("> div").css("height", "auto"))
                    }, !1), e.body.addEventListener("touchmove", function (b) {
                        a.innerWidth >= g && (fa >= ga ? G.find("> div").css("height", fa + "px") : G.find("> div").css("height", "auto"))
                    }, !1), e.body.addEventListener("touchend", function (b) {
                        a.innerWidth >= g && (fa >= ga ? G.find("> div").css("height", fa + "px") : G.find("> div").css("height", "auto"))
                    }, !1)
                };
            b.fn.tdABannerProduct = d.getPluginDef(h, "tdABannerProduct"), b.fn.tdABannerProduct.defaults = {
                lang: "en",
                compare_checkbox: {
                    status: !0,
                    prod_type: "cc",
                    prod_id: "",
                    prod_name: "",
                    prod_img: "",
                    classname: ".td_rq_a-banner-product",
                    comp_type: "",
                    cookie_ids: "prod_ids_cc",
                    prod_special: {
                        status: !1,
                        position: "right",
                        type: 1,
                        vert_center: !1
                    },
                    prod_url: "#",
                    drawer_open: !1,
                    state_chg: !1,
                    feature_table: {
                        col1: "",
                        col2: "",
                        col3: "",
                        col4: ""
                    }
                }
            }, b(".td_rq_a-banner-product").tdABannerProduct()
        }(a)
    }],
    td_rq_compare_sticky_drawer: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.document,
                e = (b(d), g.bpSet("lg")),
                f = g.bpSet("sm"),
                h = function (h, i) {
                    var j = {},
                        k = {},
                        l = {},
                        m = {},
                        n = {},
                        o = {},
                        p = {},
                        q = ".td-container",
                        r = ".heading",
                        s = ".content",
                        t = ".td-icon",
                        u = b(h),
                        v = b.extend(b.fn.compareStickyDrawer.defaults, u.metadata(), i),
                        w = v.prod_type,
                        x = v.targetComponent,
                        y = v.checkboxCSS,
                        z = v.targetUrl,
                        A = v.target,
                        B = v.placeholder_image,
                        C = v.disable_remaining_checkboxes,
                        D = v.prod_catalogue_url,
                        E = v.prod_text.special_label,
                        F = v.prod_text.empty_slot,
                        G = v.heading_text.prefix,
                        H = v.heading_text.mobile_prefix,
                        I = v.heading_text.suffix,
                        J = v.heading_text.mobile_suffix,
                        K = void 0 === v.heading_text.print_prodAmount || v.heading_text.print_prodAmount,
                        L = v.prod_text.lang,
                        M = v.accessibility.td_container,
                        N = v.accessibility.icon,
                        O = v.prod_landing,
                        P = v.prod_sessionStorageName_forSpecificUrl,
                        Q = v.context,
                        R = v.analytics_title,
                        S = void 0 !== v.compare_modal.enabled && v.compare_modal.enabled,
                        T = v.compare_modal.id,
                        U = u.find(s),
                        V = u.find(r),
                        W = u.find(".btn_reset"),
                        X = V.children("a"),
                        Y = (U.find(".btn_rm_prod"), U.find(".trigger_panel")),
                        Z = Y.find("button"),
                        $ = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
                    return j.product_type = w, j.prod_catalogue_url = D, j.csd = u, j.td_container = u.find(q), j.td_back_to_checkbox = u.find("#backToCheckbox a"), j.heading = V, j.content = U, j.btn_trigger = X, j.trigger_panel = Y, j.btn_compare = Z, j.td_rq_linkToTop, j.placeholder_image = B, j.prod_special_label = E, j.ab_td_container_text = M, j.ab_icon_text = N, j.lang = L, j.prod_landing = O, j.btn_reset = W, j.compare_modal = S, j.compare_modal_id = T, p = {
                        init_drawer: function () {
                            j.td_container.attr({
                                role: "region",
                                "aria-label": j.ab_td_container_text,
                                tabindex: 0
                            })
                        },
                        show_drawer: function () {
                            j.csd.attr("aria-hidden", "false"), p.expanded_content()
                        },
                        hide_drawer: function () {
                            j.csd.attr("aria-hidden", "true"), p.collapsed_content()
                        },
                        expanded_content: function () {
                            j.heading.children("a").attr("aria-label", j.ab_icon_text), j.heading.children("a").attr("aria-expanded", "true"), j.content.attr("aria-hidden", "false"), j.content.attr("tabindex", "0")
                        },
                        collapsed_content: function () {
                            j.heading.children("a").attr("aria-label", j.ab_icon_text), j.heading.children("a").attr("aria-expanded", "false"), j.content.attr("aria-hidden", "true"), j.content.attr("tabindex", "-1")
                        },
                        backtoprevious: function () {},
                        activate_compare: function () {
                            j.trigger_panel.attr("aria-hidden", "false"), j.btn_compare.removeAttr("tabindex")
                        },
                        deactivate_compare: function () {
                            j.trigger_panel.attr("aria-hidden", "true"), j.btn_compare.attr("tabindex", -1)
                        }
                    }, k = {
                        btt_defaut_bottom: 30,
                        drawer_status: !1,
                        drawer_content_status: !0,
                        init: function () {
                            p.init_drawer(), j.td_back_to_checkbox.click(function () {
                                b(".td-label-content-wrapper").focus()
                            }), $ && a.innerWidth < f && j.load_phone_layout(), j.loadCookieIds(j.product_type), j.ev_afterBackToTop(), j.pos(), j.ev_afterProdInfo(), j.ev_afterCompareModalHidden(), j.btn_trigger.on("click", {
                                clickable_el: !0
                            }, j.ev_drawer), j.heading.on("click", {
                                clickable_el: !1
                            }, j.ev_drawer), j.btn_reset.click(j.ev_reset), j.updateEmptySlots(), j.chkCookiesExistance(), c.resize(function () {
                                if (j.pos(), $) j.equalColumnHeight();
                                else {
                                    var a = j.content.attr("style");
                                    j.content.css({
                                        position: "absolute",
                                        visibility: "hidden",
                                        display: "block"
                                    }), k.special_offer_check() > 0 ? (j.content.find(".slot").find("h3").css("margin-top", k.special_offer_height()), j.equalColumnHeight({
                                        res_ev: !0,
                                        no_ani: !0
                                    }), j.content.attr("style", a || "")) : (j.equalColumnHeight({
                                        res_ev: !0,
                                        no_ani: !0
                                    }), j.content.attr("style", a || ""))
                                }
                                j.drawer_status && k.pos_btt({
                                    ani: !1
                                })
                            }), l.ev_on_scroll(), o.printHeading(), o.printProdAmt()
                        },
                        chkCookiesExistance: function () {
                            if (j.cookieids_arr.length > 0) {
                                for (var a = 0; a <= j.cookieids_arr.length - 1; a++) {
                                    var b = j.cookieids_arr[a],
                                        c = b.split("_")[1],
                                        d = j.cookie_name(b, c),
                                        e = j.cookie_name(b, "id"),
                                        f = j.cookie_name(b, "name"),
                                        h = j.cookie_name(b, "img"),
                                        i = j.cookie_name(b, "cp_type"),
                                        l = j.cookie_name(b, "s_offer"),
                                        m = j.cookie_name(b, "url");
                                    j.add_prod("fromcookie", g.cookies.getItem(d), g.cookies.getItem(e), g.cookies.getItem(f), g.cookies.getItem(h), g.cookies.getItem(i), g.cookies.getItem(l), g.cookies.getItem(decodeURI(m))), k.remove_btn_compare()
                                }
                                j.visibility(!0)
                            }
                        },
                        pos: function () {
                            var c, f, g = d.body.clientWidth,
                                h = b(q).css("width");
                            a.innerWidth >= e ? (c = h, f = (g - j.nopx(c)) / 2, j.td_container.css("width", c), j.csd.css("left", f + "px")) : (j.td_container.css("width", d.body.clientWidth + "px"), j.csd.css("left", "0px"))
                        },
                        visibility: function (a, b) {
                            var c = !1;
                            void 0 !== b && 1 == b.open && (c = !0), a ? (j.csd.slideDown("normal", function () {
                                1 == c ? j.expand(b.callback) : j.collapse(), j.drawer_status = !0
                            }), p.show_drawer()) : (j.csd.slideUp("normal", function () {
                                1 == c ? j.expand() : j.collapse(), j.drawer_status = !1, k.pos_btt()
                            }), p.hide_drawer())
                        },
                        expand: function (a) {
                            k.btt_hidden(), j.content.removeClass("height-transition-hidden"), j.content.slideDown(function () {
                                j.equalColumnHeight(), 1 != o.getProdAmt() && k.add_btn_compare(), j.drawer_content_status = !0
                            }), j.btn_trigger.find(t).addClass("switched").css("margin-top", "0px"), p.expanded_content(), void 0 !== a && setTimeout(function () {
                                a()
                            }, 1500)
                        },
                        collapse: function () {
                            c.scrollTop() > 0 && k.btt_visible(), j.content.addClass("height-transition-hidden"), j.content.slideUp(function () {
                                k.remove_btn_compare(), j.drawer_content_status = !1
                            }), j.btn_trigger.find(t).removeClass("switched").css("margin-top", "1px"), p.collapsed_content(), p.backtoprevious()
                        },
                        add_prod: function (a, c, d, e, f, h, i, l, m, n) {
                            var p = j.content.find(".slot.added").length,
                                q = n ? 0 : 1e3,
                                r = n ? 0 : "normal";
                            j.content.find(".slot").each(function (n, s) {
                                var t = b(this);
                                if (!t.hasClass("added")) return 0 == p ? (t.hide().addClass("added"), t.html(j.html_prod(c, d, e, f, i, l)).promise().done(function () {
                                    g.initLinks(), t.fadeIn(r, function () {
                                        var g = b(this);
                                        1 != i && "true" != i || k.special_offer_onoff("on"), "fromcookie" == a ? g.find(".btn_rm_prod").on("click", {
                                            w: a,
                                            t: c,
                                            cp_t: h
                                        }, j.ev_delete) : (g.find(".btn_rm_prod").on("click", {
                                            cb: m,
                                            t: c,
                                            cp_t: h
                                        }, j.ev_delete), j.setCookie(c, d, e, f, h, i, l, k.cookie_updated)), k.pos_btt()
                                    })
                                })) : (t.addClass("added"), t.fadeOut(q, function () {
                                    var p = b(this);
                                    p.children().remove(), p.append(j.html_prod(c, d, e, f, i, l)).promise().done(function () {
                                        g.initLinks(), t.fadeIn(r, function () {
                                            var g = b(this);
                                            "fromcookie" == a ? (g.find(".btn_rm_prod").on("click", {
                                                w: a,
                                                t: c,
                                                cp_t: h
                                            }, j.ev_delete), n == o.getProdAmt() - 1 && (1 == i || "true" == i || k.special_offer_check() > 0 ? k.special_offer_onoff("on", !0) : j.equalColumnHeight())) : (g.find(".btn_rm_prod").on("click", {
                                                cb: m,
                                                t: c,
                                                cp_t: h
                                            }, j.ev_delete), j.setCookie(c, d, e, f, h, i, l, k.cookie_updated), 1 == i || k.special_offer_check() > 0 ? k.special_offer_onoff("on", !0) : j.equalColumnHeight())
                                        })
                                    })
                                }), o.getProdAmt() > 0 && k.add_btn_compare()), !1
                            })
                        },
                        cookie_updated: function () {
                            setTimeout(function () {
                                g.ev.trigger(g.events.afterCompareCbChanged)
                            }, 150)
                        },
                        remove_prod_by_id: function (a, c) {
                            var d = a + "_" + c;
                            b("#dr_" + d).parent().fadeOut("normal", function () {
                                var c = b(this);
                                c.children().remove(), c.removeClass("added"), c.html(j.html_emptySlot(a)), j.ev_chk_other_prod(), c.fadeIn("normal", function () {
                                    0 == k.special_offer_check() ? k.special_offer_onoff("off", !0) : j.equalColumnHeight(), 1 == o.getProdAmt() && k.remove_btn_compare()
                                }), 0 == j.content.find(".slot.added").length && (j.visibility(!1), p.backtoprevious())
                            }), j.delCookie("rm_" + d, k.cookie_updated), C && j.enableCheckboxes(), o.printHeading(), o.printProdAmt(), setTimeout(function () {
                                j.equalColumnHeight({
                                    no_ani: !0,
                                    row_height: !0
                                })
                            }, 500)
                        },
                        remove_prod: function (a, c) {
                            var d = b(a).parent().parent().parent(),
                                e = a.id,
                                f = c.cb,
                                g = c.t,
                                h = c.w,
                                i = c.cp_t;
                            d.fadeOut("normal", function () {
                                var a = b(this),
                                    c = j.getIdFromClosebtn(e);
                                if ("fromcookie" == h)
                                    if ("a-banner-product" == i || "catalogue-card" == i) {
                                        var d = b("#" + c);
                                        d.removeAttr("disabled"), d.is(":checked") && d.click(), d.attr("checked", !1)
                                    } else b("#" + c).removeAttr("disabled").attr("checked", !1);
                                else f.call("", !1);
                                a.children().remove(), a.removeClass("added"), a.html(j.html_emptySlot(g)), j.ev_chk_other_prod(), a.fadeIn("normal", function () {
                                    0 == k.special_offer_check() ? k.special_offer_onoff("off", !0) : j.equalColumnHeight(), 1 == o.getProdAmt() && k.remove_btn_compare()
                                }), 0 == j.content.find(".slot.added").length && (j.visibility(!1), p.backtoprevious())
                            }), j.delCookie(e, k.cookie_updated), C && j.enableCheckboxes(), o.printHeading(), o.printProdAmt(), setTimeout(function () {
                                j.equalColumnHeight({
                                    no_ani: !0,
                                    row_height: !0
                                })
                            }, 500)
                        },
                        add_btn_compare: function () {
                            j.btn_compare.off("click").on("click", {
                                getUrl: z,
                                openInNewWindow: A
                            }, j.ev_compare), j.trigger_panel.addClass("activate"), p.activate_compare()
                        },
                        remove_btn_compare: function () {
                            j.btn_compare.off("click"), j.trigger_panel.removeClass("activate"), p.deactivate_compare()
                        },
                        load_phone_layout: function () {
                            j.content.find(".td-col-xs-4").each(function (a, c) {
                                b(this).addClass("td-col-xs-6").removeClass("td-col-xs-4"), 2 == a && b(this).remove()
                            })
                        },
                        pos_btt: function (a) {
                            if (void 0 !== j.td_rq_linkToTop) {
                                var b = j.heading.height() + 15,
                                    c = !0;
                                void 0 !== a && (a.s && (b = k.btt_defaut_bottom), a.a || (c = !1)), 0 != j.td_container.height() && 0 != o.getProdAmt() || (b = k.btt_defaut_bottom), c ? j.td_rq_linkToTop.animate({
                                    bottom: b
                                }, 200) : j.td_rq_linkToTop.css("bottom", b)
                            }
                        },
                        btt_visible: function () {
                            void 0 !== j.td_rq_linkToTop && j.td_rq_linkToTop.addClass("activate").promise().done(function () {
                                b(this).css("z-index", "9001")
                            })
                        },
                        btt_hidden: function () {
                            void 0 !== j.td_rq_linkToTop && j.td_rq_linkToTop.removeClass("activate").promise().done(function () {
                                b(this).css("z-index", "8000")
                            })
                        },
                        special_offer_height: function (a) {
                            var c;
                            return c = o.nopx(b(".td-indicator-offer-triangle").css("border-bottom-width")) - 10, c < 0 && (c = b(".td-indicator-offer-triangle").outerHeight(!0) + parseInt(b(".td-indicator-offer-triangle").css("top"))), c
                        },
                        special_offer_check: function () {
                            return j.content.find(".slot").find(".td-indicator-offer-triangle").length
                        },
                        special_offer_onoff: function (a, b) {
                            var c = 0;
                            c = "off" == a ? 30 : k.special_offer_height(), j.content.find(".slot").find("h3").animate({
                                "margin-top": c
                            }, 200, function () {
                                1 == b && j.equalColumnHeight()
                            })
                        },
                        updateEmptySlots: function () {
                            var a = j.content.find(".slot");
                            a.children().remove(), a.html(j.html_emptySlot(j.product_type)), j.ev_chk_other_prod()
                        }
                    }, l = {
                        max_prod_num: function () {
                            var b = 3;
                            return $ && a.innerWidth < f && (b = 2), b
                        },
                        ev_afterProdInfo: function () {
                            g.ev.on(g.events.afterProdInfo, function (a, b) {
                                a.preventDefault();
                                var c = b.prodinfo.prod_type,
                                    d = b.prodinfo.prod_id,
                                    e = b.prodinfo.prod_name,
                                    f = b.prodinfo.prod_img,
                                    h = b.prodinfo.comp_type,
                                    i = b.prodinfo.evt_type,
                                    k = b.prodinfo.speical_offer,
                                    m = b.prodinfo.prod_url,
                                    n = b.prodinfo.cb_func,
                                    p = j.content.find(".slot.added").length,
                                    q = b.prodinfo.drawer_open,
                                    r = b.prodinfo.no_delay;
                                "add" == i ? p > l.max_prod_num() - 1 ? n.call("", !1) : (j.add_prod(g.events.afterProdInfo, c, d, e, f, h, k, m, n, r), n.call("", !0), 0 != o.getProdAmt() || q ? j.visibility(!0, {
                                    open: !0
                                }) : j.visibility(!0)) : "remove" == i && (0 != p ? (j.remove_prod_by_id(c, d), n.call("", !0)) : n.call("", !1))
                            })
                        },
                        ev_compare: function (b) {
                            if (b.data) {
                                var c = "";
                                c = "" != b.data.getUrl ? b.data.getUrl + "?prod_ids=" + escape(j.cookieids_arr.join(",")) : a.location.pathname + "?prod_ids=" + escape(j.cookieids_arr.join(",")), "" != b.data.openInNewWindow && "_blank" == b.data.openInNewWindow ? a.open(c, "_blank") : d.location.href = c
                            }
                        },
                        ev_drawer: function (a) {
                            a.stopPropagation(), a.preventDefault();
                            var c = a.keyCode ? a.keyCode : a.which;
                            if ("click" == a.type || 1 == c) {
                                var d = a.currentTarget;
                                0 == a.data.clickable_el ? b(d).next().hasClass("height-transition-hidden") ? j.expand() : j.collapse() : b(d).parent().next().hasClass("height-transition-hidden") ? j.expand() : j.collapse()
                            }
                        },
                        ev_reset: function (a) {
                            a.stopPropagation(), a.preventDefault();
                            for (var c = j.cookieids_arr.length, d = 0; d < c; d++) {
                                var e = j.cookieids_arr[0],
                                    f = e.split("_")[1],
                                    h = j.cookie_name(e, f),
                                    i = j.cookie_name(e, "id");
                                b("#rm_" + g.cookies.getItem(h) + "_" + g.cookies.getItem(i)).trigger("click")
                            }
                            k.remove_btn_compare(), j.visibility(!0)
                        },
                        ev_delete: function (a) {
                            a.preventDefault();
                            var b = a.keyCode ? a.keyCode : a.which;
                            if ("click" == a.type || 1 == b) {
                                var c = a.currentTarget;
                                "fromcookie" == a.data.w ? j.remove_prod(c, {
                                    t: a.data.t,
                                    w: a.data.w,
                                    cp_t: a.data.cp_t
                                }) : j.remove_prod(c, {
                                    cb: a.data.cb,
                                    t: a.data.t,
                                    w: a.data.w
                                })
                            }
                        },
                        ev_afterBackToTop: function () {
                            g.ev.on(g.events.afterBackToTop, function (a, c) {
                                j.td_rq_linkToTop = b(c)
                            })
                        },
                        ev_chk_other_prod: function () {
                            if (1 == j.prod_landing) j.content.find(".anchor_emptyslot, .emptyslot").attr({
                                cursor: "pointer",
                                href: "javascript:void(0);"
                            }), j.compare_modal && j.compare_modal_id ? j.content.find(".anchor_emptyslot, .emptyslot").off("click").click(function () {
                                b("#" + j.compare_modal_id).tdModal({
                                    show: !0,
                                    scroll_height: "85%",
                                    overlayClose: !1
                                })
                            }) : j.content.find(".anchor_emptyslot, .emptyslot").click(function () {
                                j.collapse()
                            });
                            else {
                                var a = "";
                                void 0 !== P && null !== sessionStorage.getItem(P) && (a = sessionStorage.getItem(P)), "undefined" != typeof Storage && void 0 !== a && "" != a ? (j.content.find(".emptyslot").attr("href", a), j.content.find(".anchor_emptyslot").attr("href", a)) : j.compare_modal && j.compare_modal_id ? (j.content.find(".anchor_emptyslot, .emptyslot").attr("href", "javascript:void(0);"), j.content.find(".anchor_emptyslot, .emptyslot").off("click").click(function () {
                                    b("#" + j.compare_modal_id).tdModal({
                                        show: !0,
                                        scroll_height: "85%",
                                        overlayClose: !1
                                    })
                                })) : (j.content.find(".emptyslot").attr("href", j.prod_catalogue_url), j.content.find(".anchor_emptyslot").attr("href", j.prod_catalogue_url))
                            }
                        },
                        ev_afterCompareModalHidden: function () {
                            g.ev.on(g.events.afterCompareModalHidden, function (a) {
                                j.expand(), l.ev_on_scroll()
                            })
                        },
                        ev_on_scroll: function () {
                            c.scroll(function () {
                                j.drawer_content_status && (j.collapse(), j.drawer_content_status = !1), j.drawer_status && 0 == j.drawer_content_status && k.pos_btt({
                                    ani: !1
                                })
                            })
                        }
                    }, m = {
                        placeholder_image: j.placeholder_image,
                        prod_special_label: j.prod_special_label,
                        html_prod: function (a, b, c, d, e, f) {
                            var g = "",
                                h = "",
                                i = a + "_" + b,
                                l = "",
                                m = "",
                                n = "";
                            return 1 != e && "true" != e || (m = '<span class="td-indicator-offer-triangle"><span class="td-indicator-offer-text">' + this.prod_special_label + "</span></span>"), k.special_offer_check() > 0 && (n = 'style="margin-top:' + k.special_offer_height() + 'px"'), j.lang, "cc" == a ? (g = "remove card", h += m, h += '<h3 id="dr_' + i + '" class="prod_name" ' + n + '><a href="' + f + '" class="td-link-standalone">' + c + ' </a></h3><div class="td-col-sm-8 td-col-sm-offset-2 td-col-md-6 td-col-md-offset-3">\t<div class="prod_image">\t\t<a aria-describedby="dr_' + i + '" id="rm_' + i + '" href="javascript:void(0);" aria-label="' + g + '" class="btn_rm_prod"><span class="td-icon" aria-hidden="true"></span></a>\t\t<img class="img-responsive" src="' + d + '" alt="' + l + '">\t</div></div>') : (g = "remove account", h += m, h += '<h3 id="dr_' + i + '" class="prod_name" ' + n + '><a href="' + f + '" class="td-link-standalone">' + c + '</a></h3><div class="td-col-sm-8 td-col-sm-offset-2 td-col-md-6 td-col-md-offset-3">\t<div class="prod_image">\t\t<a aria-describedby="dr_' + i + '" id="rm_' + i + '" href="javascript:void(0);" aria-label="' + g + '" class="btn_rm_prod"><span class="td-icon" aria-hidden="true"></span></a>\t\t<img class="img-responsive" src="' + d + '" alt="' + l + '">\t</div></div>'), h
                        },
                        html_emptySlot: function (a) {
                            var b = m.placeholder_image,
                                c = "",
                                d = "";
                            return void 0 !== R && "" != R && (d = 'data-analytics-click="' + R + '"', console.log(d)), k.special_offer_check() > 0 && (c = 'style="margin-top:' + k.special_offer_height() + 'px"'), "<h3 " + c + '><a class="emptyslot">' + F + '</a></h3><div class="td-col-sm-8 td-col-sm-offset-2 td-col-md-6 td-col-md-offset-3">\t<div class="prod_image">\t\t<a class="anchor_emptyslot" aria-hidden="true" tabindex="-1" ' + d + '><img class="img-responsive" src="' + b + '" alt=""></a>\t</div></div>'
                        },
                        html_prodAmt: function (a, b) {
                            return "number" == typeof a && "number" == typeof b ? "(" + a + "/" + b + ")" : "(0/" + b + ")"
                        },
                        html_heading: function (b, c) {
                            var d = G,
                                e = H,
                                g = I,
                                h = J;
                            return $ && a.innerWidth < f && (d = e, g = h), d + c + g
                        }
                    }, o = {
                        nopx: function (a) {
                            return a.split("px")[0]
                        },
                        getIdFromClosebtn: function (a) {
                            return a.split("_")[1] + "_" + a.split("_")[2]
                        },
                        enableCheckboxes: function () {
                            if ($ && a.innerWidth < f) {
                                if (1 == j.cookieids_arr.length) {
                                    b(x).find(y).removeAttr("disabled");
                                    for (var c = 0; c <= j.cookieids_arr.length - 1; c++) b("#" + j.cookieids_arr[c]).attr("disabled", !0).attr("checked", !0)
                                }
                            } else if (2 == j.cookieids_arr.length) {
                                b(x).find(y).removeAttr("disabled");
                                for (var c = 0; c <= j.cookieids_arr.length - 1; c++) b("#" + j.cookieids_arr[c]).attr("disabled", !0).attr("checked", !0)
                            }
                        },
                        equalColumnHeight: function (c) {
                            var d, e = j.content.find("h3"),
                                g = j.content.find(".prod_image"),
                                h = o.getEqualHeight(e, {
                                    full: !0
                                }),
                                i = o.getEqualHeight(g, {
                                    full: !0
                                }),
                                k = h + i,
                                l = !1,
                                m = !1,
                                n = !1;
                            void 0 !== c && ("" != c.no_ani && (l = c.no_ani), "" != c.res_ev && (m = c.res_ev), "" != c.row_height && (n = c.row_height)), d = o.getEqualHeight(e, {
                                na: l
                            }), n && (h = o.getEqualHeight(e, {
                                full: !0
                            }), k = h + i), j.content.children(".td-row").children("div").css("height", k + "px"), m ? e.css("height", d + "px") : e.each(function () {
                                var a = b(this);
                                a.outerHeight() != d && a.animate({
                                    height: d
                                }, 100)
                            }), a.innerWidth < f && j.content.children(".td-row").children("div:last-child").css("height", "auto")
                        },
                        getEqualHeight: function (a, c) {
                            var d, e = 0,
                                f = !1,
                                g = !1;
                            return void 0 !== c && ("" != c.no_ani && (f = c.na), void 0 !== c.full && (g = c.full)), a.each(function () {
                                d = b(this), f && d.css({
                                    height: "auto"
                                }), e = Math.max(e, d.outerHeight(g))
                            }), e
                        },
                        getProdAmt: function () {
                            return j.cookieids_arr.length
                        },
                        printProdAmt: function () {
                            if (K) {
                                var a = m.html_prodAmt(o.getProdAmt(), l.max_prod_num());
                                j.csd.find(r).children("h2").children("span").eq(1).text(a)
                            }
                        },
                        printHeading: function () {
                            var a;
                            a = K ? m.html_heading(j.product_type, l.max_prod_num()) : m.html_heading(j.product_type, ""), j.csd.find(r).children("h2").children("span").eq(0).text(a)
                        }
                    }, n = {
                        cookieids_arr: [],
                        expires: 2592e3,
                        loadCookieIds: function (a) {
                            var b = "prod_ids_" + a + "_" + j.lang;
                            null != g.cookies.getItem(b) && "" != g.cookies.getItem(b) && (j.cookieids_arr = unescape(g.cookies.getItem(b)).split(","))
                        },
                        setCookie: function (a, b, c, d, e, f, h, i) {
                            if ("string" == typeof a && void 0 !== a && void 0 !== b) {
                                var k = n.cookie_name(j.lang, a),
                                    k = n.cookie_name(k, b),
                                    l = n.cookie_name(k, a),
                                    m = n.cookie_name(k, "id"),
                                    o = n.cookie_name(k, "name"),
                                    p = n.cookie_name(k, "img"),
                                    q = n.cookie_name(k, "cp_type"),
                                    r = n.cookie_name(k, "s_offer"),
                                    s = n.cookie_name(k, "url");
                                n.add_cookie_id(k, a), g.cookies.setItem(l, a, n.expires, Q), g.cookies.setItem(m, b, n.expires, Q), g.cookies.setItem(o, c, n.expires, Q), g.cookies.setItem(p, d, n.expires, Q), g.cookies.setItem(q, e, n.expires, Q), g.cookies.setItem(r, f, n.expires, Q), g.cookies.setItem(s, encodeURI(h), n.expires, Q), void 0 !== i && i()
                            }
                        },
                        delCookie: function (a, b) {
                            var c = a.split("_")[1],
                                d = a.split("_")[2],
                                e = n.cookie_name(j.lang, c),
                                e = n.cookie_name(e, d),
                                f = n.cookie_name(e, c),
                                h = n.cookie_name(e, "id"),
                                i = n.cookie_name(e, "name"),
                                k = n.cookie_name(e, "img"),
                                l = n.cookie_name(e, "cp_type"),
                                m = n.cookie_name(e, "s_offer"),
                                o = n.cookie_name(e, "url");
                            n.del_cookie_id(e, c), g.cookies.removeItem(f, Q), g.cookies.removeItem(h, Q), g.cookies.removeItem(i, Q), g.cookies.removeItem(k, Q), g.cookies.removeItem(l, Q), g.cookies.removeItem(m, Q), g.cookies.removeItem(o, Q), void 0 !== b && b()
                        },
                        add_cookie_id: function (a, b) {
                            j.cookieids_arr.indexOf(a) < 0 && j.cookieids_arr.push(a);
                            var c = "prod_ids_" + b + "_" + j.lang;
                            g.cookies.setItem(c, escape(j.cookieids_arr.join(",")), n.expires, Q), o.printProdAmt()
                        },
                        del_cookie_id: function (a, b) {
                            var c = j.cookieids_arr.indexOf(a);
                            c > -1 ? j.cookieids_arr.splice(c, 1) : console.log("del_cookie_id, td-compare-sticky-drawer: id not found, " + a + ", " + j.cookieids_arr.join(","));
                            var d = "prod_ids_" + b + "_" + j.lang;
                            g.cookies.setItem(d, escape(j.cookieids_arr.join(",")), n.expires, Q)
                        },
                        cookie_name: function (a, b) {
                            return a + "_" + b
                        }
                    }, b.extend(j, k, l, m, n, o, p), j.init(), j
                };
            b.fn.compareStickyDrawer = g.getPluginDef(h, "compareStickyDrawer"), b.fn.compareStickyDrawer.defaults = {
                prod_type: "cc",
                targetUrl: "",
                target: "",
                placeholder_image: "",
                targetComponent: "",
                checkboxCSS: "",
                disable_remaining_checkboxes: !1,
                prod_catalogue_url: "#",
                prod_text: {
                    lang: "en",
                    special_label: "Special Offer",
                    empty_slot: "Add another card to compare"
                },
                heading_text: {
                    prefix: "Compare up to ",
                    mobile_prefix: "Compare ",
                    suffix: "cards",
                    mobile_suffix: "cards",
                    print_prodAmount: !0
                },
                accessibility: {
                    td_container: "Compare",
                    icon: "Compare"
                },
                prod_landing: !1,
                prod_sessionStorageName_forSpecificUrl: "",
                context: "/",
                analytics_title: "",
                compare_modal: {
                    enabled: !1,
                    id: ""
                }
            }, b(".td_rq_compare-sticky-drawer").compareStickyDrawer()
        }(a)
    }],
    td_rq_dataInteractionTest: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.document),
                d = (b(c), function (c, d) {
                    var e = b(c),
                        f = b.extend(b.fn.dataInteractionTest.defaults, e.metadata(), d),
                        h = f.prod_type,
                        i = f.prod_id,
                        j = f.prod_name,
                        k = f.prod_img,
                        l = f.classname,
                        m = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
                        n = {},
                        o = {},
                        p = ".chk_compare";
                    return n.cookie_name = "prod_ids_cc", n.compare_checkbox = e.find(p), n.compare_checkbox_id = n.compare_checkbox.attr("id"), n.allCheckboxes = b(l).find(p), n.flyToDrawer_compare_drawer = b(".td_rq_compare-sticky-drawer"), o = {
                        cb_return: !0,
                        max_card_num: 3,
                        cur_card_num: 0,
                        init: function () {
                            m && a.innerWidth < g.bpSet("sm") && (o.max_card_num = 2), n.compare_checkbox.on("click", o.checkbox_evt), o.loadCookieIds()
                        },
                        checkbox_evt: function (a) {
                            var c = b(a.currentTarget);
                            null != g.cookies.getItem(n.cookie_name) && "" != g.cookies.getItem(n.cookie_name) ? (o.cookieids_arr = unescape(g.cookies.getItem(n.cookie_name)).split(","), o.cur_card_num = o.cookieids_arr.length) : o.cur_card_num = 0, g.addProdToDrawer(o.callback, h, i, j, k);
                            var d = c.parent().parent().children("img");
                            o.flyToDrawer(d)
                        },
                        callback: function () {
                            o.cb_return = arguments[0], o.cb_return ? (o.cur_card_num += 1, o.cur_card_num == o.max_card_num && n.allCheckboxes.attr("disabled", !0), n.compare_checkbox.attr("disabled", !0)) : (o.cur_card_num--, n.compare_checkbox.removeAttr("disabled").attr("checked", !1))
                        },
                        flyToDrawer: function (a) {
                            g.flyToElement(a, n.flyToDrawer_compare_drawer)
                        },
                        cookieids_arr: [],
                        loadCookieIds: function () {
                            null != g.cookies.getItem(n.cookie_name) && "" != g.cookies.getItem(n.cookie_name) && (o.cookieids_arr = unescape(g.cookies.getItem(n.cookie_name)).split(","), o.cur_card_num = o.cookieids_arr.length, o.cookieids_arr.length >= o.max_card_num && n.allCheckboxes.attr("disabled", !0), o.cookieids_arr.indexOf(n.compare_checkbox_id) > -1 && b("#" + n.compare_checkbox_id).attr("disabled", !0).attr("checked", !0))
                        }
                    }, b.extend(n, o), n.init(), n
                });
            b.fn.dataInteractionTest = g.getPluginDef(d, "dataInteractionTest"), b.fn.dataInteractionTest.defaults = {
                prod_type: "cc",
                prod_id: "",
                prod_name: "",
                prod_img: "",
                classname: ".td_rq_dataInteractionTest"
            }, b(".td_rq_dataInteractionTest").dataInteractionTest()
        }(a)
    }],
    td_rq_questions: [function (a) {
        "use strict";
        ! function (a) {
            function b() {
                $(".icon-medium").addClass("td-dark-bg"), $(".td-copy-gray").addClass("td-text-white")
            }

            function c() {
                $(".icon-medium").removeClass("td-dark-bg"), $(".td-copy-gray").removeClass("td-text-white")
            }
            $(".td-side .td-link-wrapper a").hover(function () {
                b()
            }), $(".td-side .td-link-wrapper a").mouseout(function () {
                c()
            })
        }()
    }],
    td_rq_expand: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = a.g,
                d = c.detectIE(),
                e = function (e, f, g) {
                    function h(a, b, c) {
                        a.on("click", function (a) {
                            a.preventDefault(), b(c)
                        }).on("keypress", function (a) {
                            13 === a.which && (a.preventDefault(), b(c))
                        })
                    }
                    var i, j = {},
                        k = b(e),
                        l = k.parent(),
                        m = k.children("span:first-child"),
                        n = k.children("span:last-child"),
                        o = b.extend(b.fn.tdCollapse.defaults, k.metadata(), f),
                        p = o.addedToModal,
                        q = o.targetelement_status,
                        r = o.analytics_title,
                        s = ".td_rq_expand",
                        t = ".td_rq_player",
                        u = b(".td-header-nav"),
                        v = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()),
                        w = (/android/i.test(navigator.userAgent.toLowerCase()), /Mac/i.test(navigator.userAgent.toLowerCase())),
                        x = /edge/i.test(navigator.userAgent.toLowerCase()),
                        y = /firefox/i.test(navigator.userAgent.toLowerCase());
                    return j.target = b(o.targetelement || k.attr("data-target")), o.fx = k.metadata().fx, i = k.find(".td-triggericon").html(""), k.parents(".td-complex-chart").get(0) || k.parents(".td-chart").get(0) || h(k, function () {
                        j[j.target.is(":visible") ? "hide" : "show"]()
                    }), b.extend(j, {
                        init: function () {
                            k.parents(".td-complex-chart").get(0) || k.parents(".td-chart").get(0) || (i.attr("aria-hidden", "true"), j.isUnderTab() || "open" == q || 1 == j.chk_param() || j.changeState(j.target.is(":visible")), v && i.addClass("ios"), w && k.addClass("mac"), x && k.addClass("edge"), 11 == d && k.addClass("IE11"), y && k.addClass("firefox"))
                        },
                        changeState: function (a) {
                            k.text().trim();
                            a ? k.addClass("expanded") : k.addClass("collapsed").removeClass("expanded"), k.attr("aria-expanded", a.toString()), i.toggleClass("td-triggericon-expanded", a), void 0 !== r && "" != r && (a ? i.removeAttr("data-analytics-expand").attr("data-analytics-collapse", r) : i.removeAttr("data-analytics-collapse").attr("data-analytics-expand", r)), j.target.attr("aria-hidden", !a)
                        },
                        hide: function () {
                            j.target.is("table,tr,th,td") || "quickfade" === o.fx ? j.target.animate({
                                opacity: 0
                            }, 250, function () {
                                j.target.hide()
                            }) : "none" === o.fx ? j.target.animate({
                                opacity: 0
                            }, 0, function () {
                                j.target.hide()
                            }) : j.target.animate({
                                height: "toggle",
                                opacity: "toggle"
                            }, 250, function () {
                                if (p) {
                                    var a = parseInt(k.parents(s).outerHeight(!0));
                                    c.ev.trigger(c.events.afterExpand, [{
                                        tdExpandInfo: {
                                            videoplayer: t,
                                            t_h: a,
                                            status: "hide"
                                        }
                                    }])
                                }
                            }), j.changeState(!1)
                        },
                        show: function () {
                            o.accordion && b(g.nodes).each(function () {
                                this.target.is(":visible") && this.hide()
                            }), j.target.is("table,tr,th,td") || "quickfade" === o.fx ? j.target.show().css({
                                opacity: "0"
                            }).animate({
                                opacity: 1
                            }, 500) : "none" === o.fx ? j.target.show().css({
                                opacity: "0"
                            }).animate({
                                opacity: 1
                            }, 0) : j.target.animate({
                                height: "toggle",
                                opacity: "toggle"
                            }, 400, function () {
                                if (j.target.find(c.queryLazyImages).get(0) && c.checkLazyImages(), p) {
                                    var a = parseInt(k.parents(s).outerHeight(!0));
                                    c.ev.trigger(c.events.afterExpand, [{
                                        tdExpandInfo: {
                                            videoplayer: t,
                                            t_h: a,
                                            status: "show"
                                        }
                                    }])
                                }
                                c.ev.trigger(c.events.afterExpandForOthers, [{
                                    obj: k.parents(s)
                                }])
                            }), j.changeState(!0)
                        },
                        resize_title_width: function () {
                            var a = l.outerWidth(!0),
                                b = m.outerWidth(!0),
                                c = a - b - 18;
                            n.css("width", c + "px")
                        },
                        chk_param: function () {
                            var c = a.location.hash.replace(/^#\//, "#"),
                                d = k.attr("id"),
                                e = b("#" + d);
                            c = decodeURIComponent(c), c = c.substring(1);
                            var f = document.createElement("textarea");
                            return f.innerHTML = c, c = f.value, d == c && (j.slide_down(e), !0)
                        },
                        slide_down: function (a) {
                            var d = 0;
                            u.get(0) && (d = u.height() + 20), "object" == typeof a && (a.attr("tabindex", "0"), b("html, body").animate({
                                scrollTop: a.offset().top - d
                            }, 1e3, function () {
                                a.focus().css({
                                    "outline-width": "0px"
                                }), a.on("focus blur keydown", function (b) {
                                    b.stopPropagation(), (9 === b.which || b.shiftKey && 9 === b.which) && a.focus().css({
                                        "outline-width": "1px"
                                    })
                                }), c.ev.trigger(c.events.afterScroll, [{
                                    id: a[0].id
                                }])
                            }))
                        },
                        isUnderTab: function () {
                            return void 0 !== j.getUrlVars().tdtab && "" != j.getUrlVars().tdtab
                        },
                        getUrlVars: function () {
                            var b = {};
                            a.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, c, d) {
                                b[c] = d
                            });
                            return b
                        }
                    }), c.ev.on(c.events.afterAnchorDown, function (a, b) {
                        var c = b.type,
                            d = b.id;
                        "expandCollapse" != c || k.attr("id") != d || j.target.is(":visible") || j.show()
                    }), c.ev.on(c.events.afterScroll, function (a, b) {
                        var c = b.id;
                        k.attr("id") == c && (j.changeState(!0), j.target.slideDown())
                    }), c.ev.on(c.events.afterTabActiveChangedForExternal, function (a) {
                        j.chk_param()
                    }), j.init(), j
                },
                f = function (a, c) {
                    var d, f = {},
                        g = b(a),
                        h = {};
                    return f.nodes = [], d = g.attr("data-collapse") || "", b.each(d.split(" "), function () {
                        this && (h[this] = !0)
                    }), b.extend(h, c), g.find("> :even").each(function () {
                        var a = b(this).css({
                            cursor: "pointer"
                        });
                        h["no-icons"] || a.prepend('<span class="td-triggericon"></span>'), h.targetelement = a.next(), f.nodes.push(e(this, h, f))
                    }), f
                };
            b.fn.tdCollapse = c.getPluginDef(e, "tdCollapse"), b.fn.tdCollapseGroup = c.getPluginDef(f, "tdCollapseGroup"), b.fn.tdCollapse.defaults = {
                addedToModal: !1,
                targetelement_status: "close",
                analytics_title: ""
            }, b(".td-link-toggle").tdCollapse(), b("[data-collapse]").tdCollapseGroup()
        }(a)
    }],
    td_rq_tools_swipe: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = (a.document, g.bpSet("sm") - 1),
                e = g.bpSet("md") - 1,
                f = function (f, h) {
                    function i(b) {
                        switch (n.children("div").length) {
                            case 1:
                                l(" > div:nth-child(1) " + o), l(" > div:nth-child(1) " + u);
                                break;
                            case 2:
                                a.innerWidth >= e && "left" == n.find(" > div:nth-child(1)").css("float") ? (l(" > div " + o), l(" > div " + u)) : (l(" > div:nth-child(1) " + o), l(" > div:nth-child(2) " + o), l(" > div:nth-child(1) " + u), l(" > div:nth-child(2) " + u));
                                break;
                            default:
                                l(" > div:nth-child(1) " + o), l(" > div:nth-child(2) " + o), l(" > div:nth-child(1) " + u), l(" > div:nth-child(2) " + u)
                        }
                        b()
                    }

                    function j() {
                        switch (n.children("div").length) {
                            case 1:
                                l(" > div:nth-child(1) " + s);
                                break;
                            case 2:
                                a.innerWidth >= e && "left" == n.find(" > div:nth-child(1)").css("float") ? l(" > div " + s) : (l(" > div:nth-child(1) " + s), l(" > div:nth-child(2) " + s));
                                break;
                            default:
                                l(" > div:nth-child(1) " + s), l(" > div:nth-child(2) " + s)
                        }
                    }

                    function k() {
                        void 0 === n.find(y).get(0) && n.find(".slick-list").css("margin-top", "0px")
                    }

                    function l(a) {
                        var b = n.find(a),
                            c = g.getEqualHeight(b);
                        b.css("height", c + "px")
                    }

                    function m() {
                        n.find(".slick-block").get(0) && n.find(".slick-block").attr("aria-hidden", "false"), n.find(x).get(0) && n.find(x).attr("aria-hidden", "false"), n.find(y).get(0) && (n.find(y + " li").attr("aria-hidden", "true"), n.find(y + " li button").attr("tabindex", "-1")), a.innerWidth < d && r.find(".slick-list").removeAttr("aria-live")
                    }
                    var n = b(f),
                        o = (n.attr("class"), ".td-cta-heading"),
                        p = n.find(o),
                        q = b.extend({}, b.fn.tdSwipeable.defaults, n.metadata(), h),
                        r = n.children().find(".slick-content"),
                        s = ".slick-content-copy",
                        t = n.find(s),
                        u = ".rte",
                        v = n.find(u),
                        w = ".slick-content-second-row",
                        x = ".slick-block-second-row",
                        y = ".slick-dots",
                        z = n.parent().parent().hasClass("td-product-illustration-cta");
                    if (r.slick({
                            arrows: q.arrows,
                            dots: q.dots,
                            infinite: q.infinite,
                            accessibility: q.accessibility
                        }), r.on("swipe", function (a, b, c) {
                            m()
                        }), r.on("beforeChange afterChange", function () {
                            m()
                        }), g.ev.on(g.events.afterExpandForOthers, function (b, c) {
                            if (n.parents(c.obj).get(0)) {
                                if (a.innerWidth >= d)
                                    if (a.innerWidth < e)
                                        if (n.children("div").length < 2) {
                                            i(j);
                                            var f = r.find(".slick-block").attr("class"),
                                                g = new RegExp("\\btd-col-sm-12\\b");
                                            !z && g.test(f) && r.find(".slick-block").css("margin-bottom", "30px")
                                        } else i(j);
                                else n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), i(j);
                                else r.attr("aria-hidden", "true"), r.slick("unslick"), r.slick({
                                    arrows: q.arrows,
                                    dots: q.dots,
                                    infinite: q.infinite,
                                    accessibility: q.accessibility
                                }), p.css({
                                    height: "auto"
                                }), t.css({
                                    height: "auto"
                                }), v.css({
                                    height: "auto"
                                }), n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), k(), setTimeout(function () {
                                    r.attr("aria-hidden", "false")
                                }, 1e3);
                                m()
                            }
                        }), g.ev.on(g.events.afterTabActiveChanged, function (b, c) {
                            if (b.preventDefault(), c.has(n).length > 0) {
                                if (a.innerWidth >= d)
                                    if (a.innerWidth < e)
                                        if (n.children("div").length < 2) {
                                            i(j);
                                            var f = r.find(".slick-block").attr("class"),
                                                g = new RegExp("\\btd-col-sm-12\\b");
                                            !z && g.test(f) && r.find(".slick-block").css("margin-bottom", "30px")
                                        } else i(j);
                                else n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), i(j);
                                else r.attr("aria-hidden", "true"), r.slick("unslick"), r.slick({
                                    arrows: q.arrows,
                                    dots: q.dots,
                                    infinite: q.infinite,
                                    accessibility: q.accessibility
                                }), p.css({
                                    height: "auto"
                                }), t.css({
                                    height: "auto"
                                }), v.css({
                                    height: "auto"
                                }), n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), k(), setTimeout(function () {
                                    r.attr("aria-hidden", "false")
                                }, 1e3);
                                m()
                            }
                        }), a.innerWidth >= d)
                        if (r.slick("unslick"), a.innerWidth < e)
                            if (n.children("div").length < 2) {
                                setTimeout(function () {
                                    i(j)
                                }, 300);
                                var A = r.find(".slick-block").attr("class"),
                                    B = new RegExp("\\btd-col-sm-12\\b");
                                !z && B.test(A) && r.find(".slick-block").css("margin-bottom", "30px")
                            } else setTimeout(function () {
                                i(j)
                            }, 300);
                    else n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), setTimeout(function () {
                        i(j)
                    }, 300);
                    else r.slick("slickAdd", n.children().find(w).children(x)), p.css({
                        height: "auto"
                    }), t.css({
                        height: "auto"
                    }), v.css({
                        height: "auto"
                    }), n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), k();
                    m();
                    c.on("resize", function () {
                        if (a.innerWidth >= d)
                            if (r.slick("unslick"), r.slick("slickRemove", !1), n.children().find(".slick-content").children(x).appendTo(n.find(w)), a.innerWidth < e)
                                if (n.children("div").length < 2) {
                                    i(j);
                                    var b = r.find(".slick-block").attr("class"),
                                        c = new RegExp("\\btd-col-sm-12\\b");
                                    !z && c.test(b) && r.find(".slick-block").css("margin-bottom", "30px")
                                } else i(j);
                        else n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), i(j);
                        else r.hasClass("slick-initialized") || (r.slick("unslick"), r.slick({
                            arrows: q.arrows,
                            dots: q.dots,
                            infinite: q.infinite,
                            accessibility: q.accessibility
                        }), r.slick("slickAdd", n.children().find(w).children(x))), p.css({
                            height: "auto"
                        }), t.css({
                            height: "auto"
                        }), v.css({
                            height: "auto"
                        }), n.children("div").length < 2 && r.find(".slick-block").css("margin-bottom", "inherit"), k();
                        m()
                    })
                };
            b.fn.tdSwipeable = g.getPluginDef(f, "tdSwipeable"), b.fn.tdSwipeable.defaults = {
                infinite: !1,
                dots: !0,
                arrows: !1,
                accessibility: !1
            }, b(".td-swipeable-blocks").tdSwipeable()
        }(a)
    }],
    td_rq_multiple_cta: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, function (a, e) {
                    function f() {
                        if (l.find(".td-more-options-div").get(0) && l.find(".td-more-options-div").remove(), l.find(".td-more-options-mobile").get(0) && l.find(".td-more-options-mobile").remove(), 1 == n ? h() : i(g), l.find(".td-cta:first").append(w), l.hasClass("td-cta-3") || l.hasClass("td-cta-4")) {
                            var a = " tabindex='0'";
                            1 == n && (a = ""), l.find(".td-cta:first + .td-cta").children().wrapAll("<div class='td-cta-content' " + a + " />"), l.find(".td-cta:first + .td-cta").append(v)
                        }
                        k = l.find(".td-more-options, .td-more-options-mobile"), k.off("click"), k.on("click", function () {
                            h()
                        }), c.resize(function () {
                            i(g)
                        })
                    }

                    function g() {
                        if (!l.hasClass("td-cta-2") && 1 != n && l.hasClass("collapsed"))
                            if (c.width() > 750) {
                                var a = d.getEqualHeight(q);
                                r.css("height", a + "px")
                            } else p.css("height", "auto")
                    }

                    function h() {
                        l.removeClass("collapsed"), p.hide(), p.fadeIn(function () {
                            i(g), j(), p.css("height", "auto"), 1 != n && l.find(".td-cta-content").focus().css("outline", 0).attr("tabindex", "-1")
                        })
                    }

                    function i(a) {
                        var b = d.getEqualHeight(s),
                            e = d.getEqualHeight(t),
                            f = d.getEqualHeight(u);
                        c.width() > 750 ? (s.css("height", b + "px"), t.css("height", e + "px"), u.css("height", f + "px")) : (s.css("height", "auto"), t.css("height", "auto"), u.css("height", "auto")), !l.hasClass("td-cta-2") && 1 != n && l.hasClass("collapsed") && a()
                    }

                    function j() {
                        l.find(".td-cta-content").next("button").attr("aria-expanded", !0), l.find(".td-more-options-mobile a").attr("aria-expanded", !0)
                    }
                    var k, l = b(a),
                        m = b.extend(b.fn.tdMultipleCTA.defaults, l.metadata(), e),
                        n = m.expand,
                        o = m.btn_more_label,
                        p = l.find(".td-cta"),
                        q = l.find(".td-cta:eq( 0 )"),
                        r = l.find(".td-cta:eq( 1 )"),
                        s = l.find(".td-cta-heading"),
                        t = l.find(".rte"),
                        u = (l.find(".td-illustration"), l.find(".td-cta-action")),
                        v = "<div class='td-more-options-div'><button class='td-button td-button-block td-button-large td-button-clear-green td-more-options' aria-expanded='false'>" + o + "</button></div>",
                        w = "<div class='td-more-options-mobile'><a href='javascript:void(0);' aria-expanded='false' role='button'>" + o + "<span class='td-icon' aria-hidden='true'></span></a></div>";
                    f(), d.ev.on(d.events.afterExpandForOthers, function (a, b) {
                        b.obj.has(l).length > 0 && f()
                    }), d.ev.on(d.events.afterTabActiveChanged, function (a, b) {
                        a.preventDefault(), b.has(l).length > 0 && f()
                    })
                });
            b.fn.tdMultipleCTA = d.getPluginDef(e, "tdMultipleCTA"), b.fn.tdMultipleCTA.defaults = {
                expand: !1,
                btn_more_label: "More options"
            }, b(".td-multiple-cta").tdMultipleCTA()
        }(a)
    }],
    td_rq_product_illustration_cta: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = (a.document, function (a, c) {
                    function d() {
                        e()
                    }

                    function e() {}
                    b(a);
                    d()
                });
            b.fn.tdProdCTA = c.getPluginDef(d, "tdProdCTA"), b.fn.tdProdCTA.defaults = {}, b(".td-product-illustration-cta").tdProdCTA()
        }(a)
    }],
    td_rq_product_service_illustration_grid: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, d.bpSet("md")),
                f = d.bpSet("sm"),
                g = function (g, h) {
                    function i() {
                        F = A.find(E + ":not(.hide, .ng-hide)"), F.each(function (a, c) {
                            a == F.length - 1 ? w = b(c).find(" > div") : a == F.length - 2 ? x = b(c).find(" > div") : a == F.length - 3 && (y = b(c).find(" > div"))
                        }), m(n)
                    }

                    function j() {
                        F.each(function (a, c) {
                            var d = b(c).attr("id"),
                                e = b(c).find("h2");
                            d && e.get(0) && e.attr("id", d + "_title")
                        })
                    }

                    function k(a) {
                        if (D) i();
                        else {
                            if (!a && void 0 === a) {
                                A.find(E + ":last").remove()
                            }
                            F = A.find(E + ":not(.hide, .ng-hide)"), F.each(function (a, c) {
                                a == F.length - 1 ? w = b(c).find(" > div") : a == F.length - 2 ? x = b(c).find(" > div") : a == F.length - 3 && (y = b(c).find(" > div"))
                            }), j(), m(n), c.load(function () {
                                m(n)
                            }), c.resize(function () {
                                z = r(), i()
                            }), d.ev.on(d.events.afterTabActiveChanged, function (a, b) {
                                a.preventDefault(), b.has(A).length > 0 && m(n)
                            })
                        }
                    }

                    function l(a, c, d) {
                        b.each(a, function (a, e) {
                            b(this).find(c).css({
                                height: "auto",
                                "padding-top": d + "px"
                            })
                        })
                    }

                    function m(c) {
                        if ("borrowing" == C) {
                            var d = A.find(M).innerHeight(),
                                e = A.find(N).innerHeight(),
                                g = 0;
                            G.css("padding-top", g + "px"), F = A.find(E + ":not(.hide, .ng-hide)"), a.innerWidth >= f ? (z || (z = r()), F.each(function (a, c) {
                                var f = !1;
                                if (b(c).find(M).hasClass("show") ? (g = d + 1, f = !0) : b(c).find(N).hasClass("show") && (g = e + 1, f = !0), f) {
                                    var h = parseInt(a / O);
                                    l(z[h], "h2", g)
                                }
                            })) : F.each(function (a, c) {
                                b(c).find(M).hasClass("show") ? (g = d + 29, b(c).find("h2").css("padding-top", g + "px")) : b(c).find(N).hasClass("show") && (g = e + 2, b(c).find("h2").css("padding-top", g + "px"))
                            })
                        }
                        c(s)
                    }

                    function n(a) {
                        a(), o()
                    }

                    function o() {
                        if (a.innerWidth >= f) {
                            z || (z = r());
                            for (var b = 0; b <= z.length - 1; b++) "borrowing" == C ? p(z[b], "h2") : p(z[b], "h3"), p(z[b], ".td-product-image"), p(z[b], ".td-product-description"), "borrowing" == C && p(z[b], ".td-product-description-2"), p(z[b], ".td-product-action")
                        } else "borrowing" == C ? G.css("height", "auto") : H.css("height", "auto"), K.css("height", "auto"), I.css("height", "auto"), "borrowing" == C && J.css("height", "auto"), L.css("height", "auto");
                        A.animate({
                            opacity: 1
                        })
                    }

                    function p(a, c) {
                        var d = q(a, c);
                        b.each(a, function () {
                            b(this).find(c).css("height", d + "px")
                        })
                    }

                    function q(a, c, d) {
                        var e, f = 0,
                            g = !1;
                        return void 0 !== d && void 0 !== d.full && (g = d.full), b.each(a, function () {
                            e = b(this).find(c), e.css({
                                height: "auto"
                            }), f = Math.max(f, e.outerHeight(g))
                        }), f
                    }

                    function r() {
                        var c = new Array,
                            d = 0,
                            g = 0;
                        return O = 0, a.innerWidth >= e ? O = 3 : a.innerWidth < e && a.innerWidth >= f && (O = 2), c[d] = new Array, F = A.find(E + ":not(.hide, .ng-hide)"), F.each(function (a, e) {
                            a++, c[d][g] = b(e), g++, a % O == 0 && (g = 0, d++, c[d] = new Array)
                        }), c
                    }

                    function s() {
                        F = A.find(E + ":not(.hide, .ng-hide)");
                        var c = F.length,
                            d = 0;
                        if (c < 1) return !1;
                        t(), a.innerWidth < f ? w.addClass("border-bottom-removed-byJS") : a.innerWidth < e && a.innerWidth >= f ? (d = c % 2, u(d)) : (d = c % 3, v(d)), F.each(function (c, d) {
                            var g = b(d).find(" > div");
                            a.innerWidth < f ? g.addClass("border-right-removed-byJS") : a.innerWidth < e && a.innerWidth >= f ? (c + 1) % 2 == 0 && g.addClass("border-right-removed-byJS") : (c + 1) % 3 == 0 && g.addClass("border-right-removed-byJS")
                        })
                    }

                    function t() {
                        void 0 !== A.find(E + " > div ") && A.find(E + " > div ").removeClass("border-right-removed-byJS").removeClass("border-bottom-removed-byJS"), void 0 !== w && w.removeClass("border-bottom-removed-byJS"), void 0 !== x && x.removeClass("border-bottom-removed-byJS"), void 0 !== y && y.removeClass("border-bottom-removed-byJS")
                    }

                    function u(a) {
                        switch (a) {
                            case 1:
                                w.addClass("border-bottom-removed-byJS");
                                break;
                            default:
                                w.addClass("border-bottom-removed-byJS"), x.addClass("border-bottom-removed-byJS")
                        }
                    }

                    function v(a) {
                        switch (a) {
                            case 1:
                                w.addClass("border-bottom-removed-byJS");
                                break;
                            case 2:
                                w.addClass("border-bottom-removed-byJS"), x.addClass("border-bottom-removed-byJS");
                                break;
                            default:
                                w.addClass("border-bottom-removed-byJS"), x.addClass("border-bottom-removed-byJS"), y.addClass("border-bottom-removed-byJS")
                        }
                    }
                    var w, x, y, z, A = b(g),
                        B = b.extend(b.fn.tdProductServiceIllustrationGrid.defaults, A.metadata(), h),
                        C = B.cat_type,
                        D = B.re_render,
                        E = ".td-product-service",
                        F = A.find(E),
                        G = A.find("h2"),
                        H = A.find("h3"),
                        I = A.find(".td-product-description"),
                        J = A.find(".td-product-description-2"),
                        K = A.find(".td-product-image"),
                        L = A.find(".td-product-action"),
                        M = ".td-indicator-offer",
                        N = ".td-indicator-recently-viewed",
                        O = 0;
                    k(), d.ev.on(d.events.afterExpandForOthers, function (a, b) {
                        A.parents(b.obj).get(0) && k(!0)
                    })
                };
            b.fn.tdProductServiceIllustrationGrid = d.getPluginDef(g, "tdProductServiceIllustrationGrid"), b.fn.tdProductServiceIllustrationGrid.defaults = {
                cat_type: "common",
                re_render: !1
            }, b(".td-product-service-illustration-grid").tdProductServiceIllustrationGrid()
        }(a)
    }],
    td_rq_image_blocks_123_with_bullet_list: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, d.bpSet("sm")),
                f = function (d, f) {
                    function g() {
                        b(".td-container-fluid .td-lazy").append(o), j.find(".td-more-details").append(l), i = j.find(".td-more-details-mobile"), a.innerWidth <= e ? k.attr("aria-hidden", "true") : k.attr("aria-hidden", "false"), i.on("click", function () {
                            b(this).parent().fadeOut(), b(this).children("a").attr("aria-expanded", "true"), k.fadeIn(), k.attr("aria-hidden", "false").focus()
                        }), c.resize(h)
                    }

                    function h() {
                        a.innerWidth > e ? k.attr("aria-hidden", "false") : k.attr("aria-hidden", "true")
                    }
                    var i, j = b(d),
                        k = j.find(".td-show-more-content"),
                        l = "<div class='td-more-details-mobile'><a href='javascript:void(0);' tabindex='0' aria-controls='coll-0' aria-expanded='false' aria-label='More details' title='More details'>More details<span class='td-icon' aria-hidden='true'></span></a></div>",
                        m = j.find(".td-container-fluid picture"),
                        n = m.find("img").attr("srcset"),
                        o = "<img src='" + n + "' class='visible-print' aria-hidden='true'>";
                    g()
                };
            b.fn.tdImg123withBulletList = d.getPluginDef(f, "tdImg123withBulletList"), b.fn.tdImg123withBulletList.defaults = {}, b(".td-image-blocks-123-with-bulleted-list").tdImg123withBulletList()
        }(a)
    }],
    td_rq_a_banner: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.document,
                e = b(d),
                f = "xs",
                h = "sm",
                i = "md",
                j = "lg",
                k = 0,
                l = g.bpSet("sm"),
                m = g.bpSet("md"),
                n = g.bpSet("lg"),
                o = g.detectIE(),
                p = function (p, q) {
                    function r() {
                        L = T + b.tdABannerModules.uid, b.tdABannerModules.uid += 1, Q.attr("id", L), X && x(), K(Y), (Y && !sa || Y && aa) && B(), W && y(), !da || "undefined" === L && "" == L || setTimeout(v, 300), 1 == la && u(), V || (Q.animate({
                            opacity: 1
                        }), Q.parent().parent().find(".a-login-banner-loginbox").get(0) && Q.parent().parent().find(".a-login-banner-loginbox").animate({
                            opacity: 1
                        }))
                    }

                    function s() {
                        var a = d.createEvent("Event");
                        a.initEvent("adobeBanner", !0, !0), d.dispatchEvent(a)
                    }

                    function t(b, d) {
                        if (Y && !sa || Y && aa)
                            if (o >= 11) {
                                var e, f = C(a.innerWidth);
                                e = za.get(0) ? za.height() : Aa.get(0) && Ba.get(0) ? "xs" == f || "sm" == f ? Aa.height() : Ba.height() : "xs" == f ? _ : $, "open" == d ? (Da.animate({
                                    "margin-top": b
                                }), b += e, Q.css("background-position-y", b)) : Q.css({
                                    "background-position-y": -c.scrollTop() / Z + e + "px"
                                })
                            } else "open" == d ? (Q.animate({
                                "background-position-y": "+=" + b
                            }), Da.animate({
                                "margin-top": b
                            })) : Q.animate({
                                "background-position-y": "-=" + b
                            });
                        else "open" == d && Da.animate({
                            "margin-top": b
                        })
                    }

                    function u() {
                        if (b(ma).get(0)) {
                            var a = b(ma).children().clone();
                            b(ma).children().html(""), Q.parent().parent().find("#login-body-content-cloned").html(a)
                        } else console.log("missing login content");
                        if (oa.get(0)) {
                            var c = oa.clone();
                            oa.remove(), Q.parent().parent().find(".a-login-banner-loginbox " + R + " " + na).remove(), Q.parent().parent().find(".a-login-banner-loginbox " + R).prepend(c), z()
                        }
                    }

                    function v() {
                        w(a.innerWidth >= n ? ea : a.innerWidth >= m ? fa : a.innerWidth >= l ? ga : ha)
                    }

                    function w(a) {
                        var b = "td-a-banner-callout",
                            c = d.getElementById(L).getElementsByClassName(b)[0],
                            e = d.getElementById(L).querySelector("." + b + " > div");
                        if (c.style.minHeight = "0", c.style.height = "auto", e.classList.remove("callout_center"), 0 != a) {
                            c.style.minHeight = a + "px";
                            var f = c.offsetHeight;
                            f <= a && (c.style.height = f + "px", e.classList.add("callout_center"))
                        }
                    }

                    function x() {
                        var b = Q.find("a");
                        if (b.length > 1) {
                            a.innerWidth <= l && b.addClass("td-display-default");
                            var c = b.eq(0).outerWidth(),
                                d = b.eq(1).outerWidth();
                            a.innerWidth <= l && b.removeClass("td-display-default"), b.css("width", c > d ? c + 1 : d + 1 + "px")
                        }
                    }

                    function y() {
                        var a = Q.find(va),
                            b = Q.find(wa);
                        if (a.get(0)) {
                            var c = a.attr("src"),
                                d = new Image;
                            d.src = c, d.onload = function () {
                                b.get(0) && b.css({
                                    width: this.width + "px",
                                    height: this.height + "px"
                                })
                            }
                        }
                    }

                    function z() {
                        var c = ".a-login-banner .a-login-banner-loginbox .td-a-banner-loginbox",
                            d = b(c);
                        if (a.innerWidth < l) {
                            var e = d.find(na).width() / 2;
                            e = d.width() / 2 - e, d.find(na).css({
                                left: e + "px"
                            })
                        } else d.find(na).removeAttr("style")
                    }

                    function A() {
                        var b = ka.width() / 2,
                            c = ka.height() / 2;
                        a.innerWidth < m && a.innerWidth >= l ? (b = (S.width() - S.find("> div.td-col").width()) / 2 - 30, c = S.height() / 2 - c) : a.innerWidth < l ? (b = S.width() / 2 - b, c = (S.height() - S.find(".td-a-banner-callout").innerHeight()) / 2 - c) : (b = S.width() / 2 - b, c = S.height() / 2 - c), ka.css({
                            top: c + "px",
                            left: b + "px",
                            display: "block"
                        })
                    }

                    function B() {
                        M = Q.outerWidth(), N = Q.outerHeight();
                        var b = new Image;
                        b.src = D(a.innerWidth), b.onload = function () {
                            var b = C(a.innerWidth),
                                c = H(this.width, this.height);
                            xa[ya] = new Array(2), xa[ya][0] = b, xa[ya][1] = c, ya++, G(b, c, M, N)
                        }
                    }

                    function C(a) {
                        return "number" == typeof a && E(a >= n ? j : a >= m ? i : a >= l ? h : f)
                    }

                    function D(a) {
                        var b;
                        return "number" == typeof a && (b = a >= n ? E(j, !0) : a >= m ? E(i, !0) : a >= l ? E(h, !0) : E(f, !0)), b
                    }

                    function E(a, b) {
                        var c = [],
                            d = "";
                        if (void 0 === b && (b = !1), "string" == typeof a && "boolean" == typeof b) {
                            c = F(a);
                            for (var e = 0; e <= c.length - 1; e++)
                                if ("string" == typeof ra[c[e]]) {
                                    d = 1 == b ? ra[c[e]] : c[e];
                                    break
                                }
                        }
                        return d
                    }

                    function F(a) {
                        var b = [];
                        if ("string" == typeof a) switch (a) {
                            case "lg":
                                b = [j, i, h, f];
                                break;
                            case "md":
                                b = [i, j, h, f];
                                break;
                            case "sm":
                                b = [h, i, j, f];
                                break;
                            case "xs":
                                b = [f, h, i, j];
                                break;
                            default:
                                b = [j, i, h, f]
                        }
                        return b
                    }

                    function G(b, d, e, f, g) {
                        var h, i, j = e + "px " + e / d + "px",
                            k = f,
                            l = 0;
                        i = za.get(0) ? za.height() : Aa.get(0) && Ba.get(0) ? "xs" == b || "sm" == b ? Aa.height() : Ba.height() : "xs" == b ? _ : $, aa && "xs" == C(a.innerWidth) ? (j = "auto " + ba + "px", h = ta ? "50% 0" : "50% " + i + "px", Q.css({
                            backgroundSize: j,
                            backgroundPosition: h
                        }), ca.css("margin-top", ba + "px")) : (k > e / d && (j = k * d + "px " + k + "px"), l = Ca.get(0) && 1 == g && "open" == P ? -c.scrollTop() / Z + Ca.height() : -c.scrollTop() / Z, h = aa && "xs" != C(a.innerWidth) && ta ? "50% 0" : "50% " + (i + l) + "px", Q.css({
                            backgroundSize: j,
                            backgroundPosition: h
                        }))
                    }

                    function H(a, b) {
                        return a / b
                    }

                    function I(a, b) {
                        pa[a] = new Array(2), pa[a][0] = b, pa[a][1] = F(a)
                    }

                    function J(a) {
                        var b;
                        switch (a) {
                            case f:
                                b = k;
                                break;
                            case h:
                                b = l;
                                break;
                            case i:
                                b = m;
                                break;
                            case j:
                                b = n
                        }
                        return b
                    }

                    function K(a) {
                        var c = Q.data("bg-srcset"),
                            d = "";
                        d += "<style type='text/css'>";
                        var e = [];
                        for (var f in c) {
                            var g = c[f];
                            (a && !sa || a && aa) && (I(f, g), -1 != qa.indexOf(f) && qa.splice(qa.indexOf(f), 1)), f = J(f), e.push([f, g])
                        }
                        if (a && !sa || a && aa)
                            for (var h = 0; h <= qa.length - 1; h++) {
                                var j = qa[h],
                                    g = E(j, !0);
                                e.push([J(j), g])
                            }
                        e.sort(function (a, b) {
                            return a[0] - b[0]
                        });
                        for (var k = 0; k < e.length; k++) {
                            var f = e[k][0],
                                g = e[k][1];
                            d += a && !sa || a && aa ? "@media(min-width:" + f + "px) { #" + L + " {background-image: url('" + g + "');background-position:50% 0px; background-repeat: no-repeat;background-attachment: fixed;width: 100%;position: relative; background-size:0; } } " : "@media(min-width:" + f + "px) { #" + L + " {background-image: url('" + g + "');} } "
                        }
                        d += "@media print { section.td-a-banner:before{ content:url(" + c[i] + ") !important; position:relative !important; background-size: contain !important; } }", d += "</style>", b("head").append(d)
                    }
                    var L, M, N, O, P, Q = b(p),
                        R = ".td-container",
                        S = Q.find(R),
                        T = "aBanner",
                        U = b.extend(b.fn.tdABanner.defaults, Q.metadata(), q),
                        V = U.adobeTrigger,
                        W = U.logo,
                        X = U.btnEqualWidth,
                        Y = U.parallax,
                        Z = U.parallax_speed,
                        $ = U.parallax_top,
                        _ = U.parallax_top_m,
                        aa = U.parallax_static_callout_m.status,
                        ba = U.parallax_static_callout_m.height,
                        ca = (Q.find(".a-banner-basic-content"), S.find("> div > div")),
                        da = U.callout_min_height,
                        ea = U.callout_min_height_sizes.lg,
                        fa = U.callout_min_height_sizes.md,
                        ga = U.callout_min_height_sizes.sm,
                        ha = U.callout_min_height_sizes.xs,
                        ia = U.videoplay,
                        ja = U.videoplay_icon,
                        ka = Q.find(ja),
                        la = U.loginbox.status,
                        ma = U.loginbox.targetedElement,
                        na = U.loginbox.videoplay_icon,
                        oa = Q.find(na),
                        pa = new Array(4),
                        qa = [f, h, i, j],
                        ra = Q.data("bg-srcset"),
                        sa = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
                        ta = /android/i.test(navigator.userAgent.toLowerCase()),
                        ua = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()),
                        va = ".dIconImg",
                        wa = ".mIconImg",
                        xa = [
                            []
                        ],
                        ya = 0,
                        za = b(".td-header-nav"),
                        Aa = b(".td-header"),
                        Ba = b(".td-navigation"),
                        Ca = b(),
                        Da = b("body");
                    switch (g.ev.on(g.events.afterOperationalMessage, function (a, b) {
                        var c = b.position_y;
                        Ca = b.obj, P = b.ems, t(c, P)
                    }), r(), d.addEventListener("aBanner", function (a) {
                        r()
                    }), (Y && !sa || Y && aa) && (c.scroll(function () {
                        if (O = za.get(0) ? za.height() : Aa.get(0) && Ba.get(0) ? "xs" == C(a.innerWidth) || "sm" == C(a.innerWidth) ? Aa.height() : Ba.height() : "xs" == C(a.innerWidth) ? _ : $, aa && "xs" == C(a.innerWidth) && sa) {
                            var b = "";
                            b = ta ? "50% 0" : "50% " + O + "px", Q.css({
                                backgroundPosition: b
                            })
                        } else {
                            var d = -c.scrollTop() / Z + O,
                                e = 0,
                                f = d;
                            Ca.get(0) && "open" == P ? (e = Ca.height(), f = d + e) : Ca.get(0) && "close" == P && (f = d);
                            var g = Q.css("backgroundPosition").split(" ")[0],
                                b = "";
                            b = aa && "xs" != C(a.innerWidth) && ta ? "50% 0" : aa && "xs" != C(a.innerWidth) && ua ? "50% " + O + "px" : g + " " + f + "px", Q.css({
                                backgroundPosition: b
                            })
                        }
                    }), c.resize(function (b) {
                        M = Q.outerWidth(), N = Q.outerHeight();
                        for (var c = C(a.innerWidth), d = !1, e = 0; e <= xa.length - 1; e++) xa[e][0] == c && (d = !0);
                        if (d)
                            for (var f = 0; f <= xa.length - 1; f++) xa[f][0] == c && G(c, xa[f][1], M, N, !0);
                        else {
                            var g = new Image;
                            g.src = pa[c][0], Q.css({
                                backgroundSize: 0
                            }), g.onload = function () {
                                var a = H(this.width, this.height);
                                xa[ya] = new Array(2), xa[ya][0] = c, xa[ya][1] = a, ya++, G(c, a, M, N, !0)
                            }
                        }
                        aa && ("xs" == C(a.innerWidth) ? ca.css("margin-top", ba + "px") : ca.css("margin-top", "auto"))
                    })), c.resize(function () {
                        !da || "undefined" === L && "" == L || setTimeout(v, 300), ia && A(), 1 == la && oa.get(0) && z()
                    }), e.ready(function () {
                        ia && A()
                    }), V) {
                        case !0:
                            0 != o ? g.adobeTriggerIntervalABanner = setInterval(s, 1) : s();
                            break;
                        case !1:
                            0 != o && clearInterval(g.adobeTriggerIntervalABanner)
                    }
                };
            b.tdABannerModules || (b.tdABannerModules = {
                uid: 0
            }), b.fn.tdABanner = g.getPluginDef(p, "tdABanner"), b.fn.tdABanner.defaults = {
                logo: !1,
                btnEqualWidth: !1,
                parallax: !0,
                parallax_speed: 5,
                parallax_top: 62,
                parallax_top_m: 47,
                parallax_static_callout_m_status: !1,
                parallax_static_callout_m: {
                    status: !1,
                    height: 190
                },
                videoplay: !1,
                videoplay_icon: "",
                callout_min_height: !1,
                callout_min_height_sizes: {
                    lg: 156,
                    md: 156,
                    sm: 131,
                    xs: 0
                },
                loginbox: {
                    status: !1,
                    targetedElement: "",
                    videoplay_icon: ""
                },
                adobeTrigger: !1
            }, b(".td-a-banner").tdABanner()
        }(a)
    }],
    td_rq_catalogue_card: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, d.bpSet("sm")),
                f = function (f, g) {
                    function h() {
                        Q = B.hasClass("show"), T = D.hasClass("show"), b(".td-catalogue-card h2").css("padding-top", 0), q(Q, T)
                    }

                    function i() {
                        H ? h() : (b("*").on("keydown", function (a) {
                            (9 === a.which || a.shiftKey && 9 === a.which) && z.css({
                                "outline-width": "1px"
                            })
                        }), y.click(function (a) {
                            a.preventDefault()
                        }), n(), 1 == I ? (z.click(k), x.change(j), o(), Z.init()) : v.hide(), p(Q, R, S), s(T, U), q(Q, T), d.ev.on(d.events.afterTabActiveChanged + " " + d.events.afterExpandForOthers, function (a, b) {
                            a.preventDefault(), q(Q, T)
                        }))
                    }

                    function j() {
                        var a = b(this);
                        console.log("checkbox input change"), !1 === a.is(":checked") ? m() : l()
                    }

                    function k(a) {
                        z.on("click", function (a) {
                            1 == a.which && b(this).css({
                                "outline-width": "0px"
                            })
                        }), x.prop("checked") ? Z.checkbox_uncheck_evt(a) : Z.checkbox_check_evt(a)
                    }

                    function l() {
                        x.prop("checked", !0), x.addClass("checked"), y.addClass("label-checked"), z.attr("aria-checked", "true")
                    }

                    function m() {
                        x.prop("checked", !1), x.removeClass("checked"), y.removeClass("label-checked"), z.attr("aria-checked", "false")
                    }

                    function n() {
                        u.get(0) && u.attr("id", J + "_" + K + "_title")
                    }

                    function o() {
                        w.attr("aria-describedby", J + "_" + K + "_title"), x.attr("aria-hidden", "true"), x.attr("tabindex", -1), z.attr("tabindex", 0), z.attr("role", "checkbox"), z.on("keyup", function (a) {
                            32 !== a.which && 13 !== a.which || k()
                        }), z.on("click", function (a) {
                            1 == a.which && b(this).css({
                                "outline-width": "0px"
                            })
                        }), z.on("keydown", function (a) {
                            32 === a.which && a.preventDefault()
                        })
                    }

                    function p(a, b, c) {
                        1 == a && (2 == c ? C.addClass("show") : ("left" == b && B.addClass("left"), B.addClass("show")))
                    }

                    function q(b, c) {
                        if (b || c) {
                            var f = B.innerHeight(),
                                g = D.innerHeight(),
                                h = 0;
                            a.innerWidth >= e ? B.hasClass("show") ? h = f + 1 : D.hasClass("show") && (h = g + 1) : B.hasClass("show") ? h = f + 4 : D.hasClass("show") && (h = g + 2);
                            var i = r();
                            setTimeout(function () {
                                d.ev.trigger(d.events.afterCatalogueIndicator, [{
                                    indicator_status: !0,
                                    obj: t,
                                    h2_padding_top: h,
                                    index: i
                                }])
                            }, 10)
                        }
                    }

                    function r() {
                        for (var a = E.find(".td_rq_catalogue-card:not(.hide,.ng-hide)"), c = t.attr("id"), d = 0; d < a.length; d++)
                            if (b(a[d]).attr("id") == c) return d
                    }

                    function s(a, b) {
                        1 == a && ("left" == b && D.addClass("left"), D.addClass("show"))
                    }
                    var t = b(f),
                        u = t.find("h2"),
                        v = t.find(".td-product-compare"),
                        w = t.find(".td-label-content-wrapper"),
                        x = v.find("input"),
                        y = v.find("label"),
                        z = v.find(".td-label-content-wrapper"),
                        A = t.find("img.td-product-image"),
                        B = t.find(".td-indicator-offer"),
                        C = t.find(".td-indicator-offer-type2"),
                        D = t.find(".td-indicator-recently-viewed"),
                        E = t.parent(),
                        F = b.extend(b.fn.tdCatalogueCard.defaults, t.metadata(), g),
                        G = F.lang,
                        H = F.re_render,
                        I = F.compare_checkbox.status,
                        J = F.compare_checkbox.prod_type,
                        K = F.compare_checkbox.prod_id,
                        L = F.compare_checkbox.prod_name,
                        M = F.compare_checkbox.prod_img,
                        N = F.compare_checkbox.classname,
                        O = F.compare_checkbox.comp_type,
                        P = F.compare_checkbox.cookie_ids,
                        Q = F.compare_checkbox.prod_special.status,
                        R = F.compare_checkbox.prod_special.position,
                        S = F.compare_checkbox.prod_special.type,
                        T = F.compare_checkbox.prod_recentlyview.status,
                        U = F.compare_checkbox.prod_recentlyview.position,
                        V = F.compare_checkbox.prod_url,
                        W = F.compare_checkbox.state_chg,
                        X = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
                        Y = {},
                        Z = {},
                        $ = P + "_" + G,
                        _ = ".td-product-compare";
                    Y.cookie_name = $, Y.compare_checkbox = t.find(_), Y.allCheckboxes = b(N).find(_), Y.flyToDrawer_compare_drawer = b(".td_rq_compare-sticky-drawer"), Z = {
                        cb_return: !0,
                        max_card_num: 3,
                        cur_card_num: 0,
                        init: function () {
                            x.attr("id", J + "_" + K), y.attr("for", J + "_" + K), X && a.innerWidth < d.bpSet("sm") && (Z.max_card_num = 2), Z.loadCookieIds(), W && (Z.updateCheckboxStatus(), d.ev.on(d.events.afterCompareCbChanged, function (a, b) {
                                Z.updateCheckboxStatus()
                            }))
                        },
                        checkbox_check_evt: function (a) {
                            null != d.cookies.getItem(Y.cookie_name) && "" != d.cookies.getItem(Y.cookie_name) ? (Z.cookieids_arr = unescape(d.cookies.getItem(Y.cookie_name)).split(","), Z.cur_card_num = Z.cookieids_arr.length) : Z.cur_card_num = 0, d.addProdToDrawer(Z.check_callback, J, K, L, M, O, Q, V)
                        },
                        checkbox_uncheck_evt: function (a) {
                            null != d.cookies.getItem(Y.cookie_name) && "" != d.cookies.getItem(Y.cookie_name) ? (Z.cookieids_arr = unescape(d.cookies.getItem(Y.cookie_name)).split(","), Z.cur_card_num = Z.cookieids_arr.length) : Z.cur_card_num = 0, d.removeProdFromDrawer(Z.uncheck_callback, J, K, O)
                        },
                        check_callback: function () {
                            Z.cb_return = arguments[0], Z.cb_return ? (setTimeout(function () {
                                Z.flyToDrawer(A)
                            }, 0), l()) : m()
                        },
                        uncheck_callback: function () {
                            Z.cb_return = arguments[0], Z.cb_return ? m() : l()
                        },
                        flyToDrawer: function (a) {
                            d.flyToElement(a, Y.flyToDrawer_compare_drawer)
                        },
                        cookieids_arr: [],
                        loadCookieIds: function () {
                            null != d.cookies.getItem(Y.cookie_name) && "" != d.cookies.getItem(Y.cookie_name) && (Z.cookieids_arr = unescape(d.cookies.getItem(Y.cookie_name)).split(","), Z.cur_card_num = Z.cookieids_arr.length, Z.cookieids_arr.indexOf(G + "_" + x.attr("id")) > -1 ? l() : m())
                        },
                        updateCheckboxStatus: function () {
                            Z.cookieids_arr = unescape(d.cookies.getItem(Y.cookie_name)).split(","), Z.cur_card_num = Z.cookieids_arr.length, Z.cookieids_arr.indexOf(G + "_" + x.attr("id")) > -1 ? l() : m(), Z.cur_card_num >= Z.max_card_num && !x.prop("checked") ? (v.addClass("disabled"), z.attr("tabindex", -1)) : v.hasClass("disabled") && (v.removeClass("disabled"), z.attr("tabindex", 0))
                        }
                    };
                    var aa = b(a).width();
                    i(), c.resize(function () {
                        b(a).width() != aa && (aa = b(a).width(), b(".td-catalogue-card h2").css("padding-top", 0), q(Q, T))
                    })
                };
            b.fn.tdCatalogueCard = d.getPluginDef(f, "tdCatalogueCard"), b.fn.tdCatalogueCard.defaults = {
                lang: "en",
                re_render: !1,
                compare_checkbox: {
                    status: !0,
                    prod_type: "cc",
                    prod_id: "",
                    prod_name: "",
                    prod_img: "",
                    classname: ".td-a-banner-product",
                    comp_type: "",
                    cookie_ids: "prod_ids_cc",
                    prod_special: {
                        status: !1,
                        position: "right",
                        type: 1
                    },
                    prod_recentlyview: {
                        status: !1,
                        position: "right"
                    },
                    prod_url: "#",
                    state_chg: !1
                }
            }, b(".td-catalogue-card").tdCatalogueCard()
        }(a)
    }],
    td_rq_tabs_carousel: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.document),
                d = (b(c), function (d, e) {
                    function f() {
                        V = ka + b.tdTabsCarouselModules.uid, b.tdTabsCarouselModules.uid += 1, X.slick(qa), void 0 != X.data("settings") && (void 0 != X.data("settings").keyboardNavigation && (_ = X.data("settings").keyboardNavigation), void 0 != X.data("settings").carouselOnly && (aa = X.data("settings").carouselOnly)), X.on("setPosition", function (a) {
                            k()
                        }), X.on("breakpoint", function (a) {
                            l()
                        }), X.find(ea).scroll(o), X.find(da).mousedown(p), X.find(da).mouseup(q), X.find(da).click(u), X.find(da).blur(s), X.find(da).focus(t), X.find(da).keydown(r), X.find(fa).off("click"), X.find(fa).click(v), X.find(ga).off("click"), X.find(ga).click(w), h(), i(), O(), x(), 1 == aa && D(), C(S()), I(), n(), M(), N()
                    }

                    function h() {
                        0 == aa ? (X.attr("role", "tablist"), X.find(da).attr("role", "tab"), X.find(".slick-list").removeAttr("aria-live"), X.find(da).each(function (a) {
                            var c = V + "_tab" + a;
                            b(this).attr({
                                "aria-controls": c,
                                "aria-selected": !1
                            }), b(Y.get(a)).attr("id", c)
                        }), Y.attr("role", "tabpanel"), Y.each(function () {
                            var a = T(b(this));
                            a.blur(G), a.mousedown(function (a) {
                                b(this).css("outline", "none")
                            })
                        })) : 1 == aa && (X.attr("role", "presentation"), X.find(da).attr("role", "link"))
                    }

                    function i() {
                        var a = "drag-id-" + V;
                        X.children(ea).attr("id", a);
                        var b = P() - Q() + 1;
                        U = new Dragdealer(a, {
                            handleClass: "slick-track",
                            loose: !0,
                            dragStopCallback: j,
                            vertical: !1,
                            steps: b,
                            snap: !1
                        }), P() <= Q() && U.disable()
                    }

                    function j(a, b) {
                        var c, d = Q(),
                            e = P(),
                            c = (R(), Math.round((e - d) * a));
                        c < 0 && (c = 0), X.slick("setCurrentSlide", c), X.slick("updateArrows")
                    }

                    function k() {
                        W.outerWidth() == X.outerWidth() ? (P() > Q() && m(), W.find(".accessibility-instructions").attr("aria-hidden", !0)) : W.find(".accessibility-instructions").removeAttr("aria-hidden"), X.find(da).attr("aria-hidden", "false"), n()
                    }

                    function l() {
                        i(), J(), C(S()), I(), n(), M(), X.find(ea).scroll(o), X.find(fa).off("click"), X.find(fa).click(v), X.find(ga).off("click"), X.find(ga).click(w)
                    }

                    function m() {
                        var a, c = 0;
                        a = Math.round(X.outerWidth() / (Q() + .5)), X.find(da).each(function () {
                            b(this).css("width", a), c += b(this).outerWidth(!0)
                        }), X.find(".slick-track").width(c), U.reflow()
                    }

                    function n() {
                        var a = 0;
                        0 == X.hasClass(ia) && (X.find(da).each(function () {
                            var c = b(this).children();
                            c.outerHeight() > a && (a = c.outerHeight())
                        }), X.find(da).each(function () {
                            b(this).height(a)
                        }))
                    }

                    function o(a) {
                        U.disable()
                    }

                    function p(a) {
                        Z = a.pageX
                    }

                    function q(a) {
                        var c = a.currentTarget;
                        c.onclick && (b(c).data("onclick", c.onclick), b(c).removeAttr("onclick"))
                    }

                    function r(c) {
                        switch (Z = NaN, 0 != U.getValue()[0] && U.setValue(0, 0, !0), c.which) {
                            case 32:
                            case 13:
                                c.preventDefault(), H(b(c.currentTarget).index(), !1), c.currentTarget.onclick && c.currentTarget.onclick.call(c.currentTarget, c || a.e), b(c.currentTarget).data("onclick") && b(c.currentTarget).data("onclick").call(c.currentTarget, c || a.e);
                                break;
                            case 39:
                                1 == _ && A(b(c.currentTarget), !0);
                                break;
                            case 37:
                                1 == _ && B(b(c.currentTarget), !0)
                        }
                    }

                    function s(a) {
                        b(a.currentTarget).css("outline", "")
                    }

                    function t(a) {
                        ba = !0
                    }

                    function u(c, d) {
                        var e = !1,
                            f = c.currentTarget,
                            g = !1;
                        d && d.forceSelect && (g = d.forceSelect), g || isNaN(Z) ? z(b(f)) : Math.abs(Z - c.pageX) < ca && ($ || (e = !0, $ = !0), ba || C(b(f), !1), 0 == aa && z(b(f), !1, e), b(f).css("outline", "none"), H(b(f).index(), !0), b(f).data("onclick") && b(f).data("onclick").call(f, c || a.e))
                    }

                    function v(a) {
                        K()
                    }

                    function w(a) {
                        L()
                    }

                    function x() {
                        var d, e = a.location.hash,
                            f = "";
                        if (void 0 !== y().tdtab && "" != y().tdtab) {
                            e = y().tdtab, f = (f = y().hashType) ? f : "";
                            var h = e,
                                i = new RegExp("Tab_");
                            "number" != typeof parseInt(e) || i.test(h) || (e = "Tab_" + e)
                        } else {
                            e = decodeURIComponent(e), e = e.substring(1);
                            var j = c.createElement("textarea");
                            j.innerHTML = e, e = j.value
                        }
                        var k = e.length > 0 && "" != a.location.hash && "expand" == f;
                        z(X.find(da).eq(0)), e.length > 0 && (X.find(da).each(function () {
                            b(this).attr("id") == e && (d = b(this))
                        }), void 0 != d && d.length > 0 && (z(d, !1, !k), $ = !0, k && setTimeout(function () {
                            g.ev.trigger(g.events.afterTabActiveChangedForExternal)
                        }, 100)))
                    }

                    function y() {
                        var b = {};
                        a.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, c, d) {
                            b[c] = d
                        });
                        return b
                    }

                    function z(a, c, d) {
                        D(), a.addClass("td-tabs-carousel-tab--on"), a.attr("aria-selected", !0), a.attr("tabindex", "0"), c && a.focus(), d && b("html, body").animate({
                            scrollTop: X.offset().top + ja
                        }, 1e3), E(a.index())
                    }

                    function A(a, c) {
                        var d = a.index();
                        d >= P() - 1 ? d = 0 : d++, z(b(X.find(da).get(d)), c)
                    }

                    function B(a, c) {
                        var d = a.index();
                        d <= 0 ? d = P() - 1 : d--, z(b(X.find(da).get(d)), c)
                    }

                    function C(a, b) {
                        var c = a.index(),
                            d = Q();
                        void 0 == b && (b = !0);
                        var e, f = U.getStep()[0] - 1;
                        c > d - 1 + f ? (e = c - (d - 1), X.slick("slickGoTo", e, !0), U.setStep(e + 1, 1, b)) : c < f && (e = c, X.slick("slickGoTo", e, !0), U.setStep(e + 1, 1, b))
                    }

                    function D() {
                        X.find(da).each(function () {
                            var a = b(this);
                            a.removeClass("td-tabs-carousel-tab--on"), a.attr("aria-selected", !1), a.attr("aria-hidden", "false"), 1 == _ ? a.attr("tabindex", "-1") : a.attr("tabindex", "0")
                        })
                    }

                    function E(a) {
                        F();
                        var d = b(Y.get(a));
                        d.show(), d.attr("aria-hidden", "false"), g.ev.trigger(g.events.afterTabActiveChanged, [d]);
                        var e = c.createEvent("Event");
                        e.initEvent(g.events.afterTabActiveChangedForExternal, !0, !0), c.dispatchEvent(e)
                    }

                    function F() {
                        Y.each(function () {
                            var a = b(this);
                            a.hide(), a.attr("aria-hidden", "true")
                        })
                    }

                    function G(a) {
                        b(a.currentTarget).css("outline", "")
                    }

                    function H(c, d) {
                        var e = b(a).scrollTop(),
                            f = b(Y.get(c)),
                            g = T(f);
                        g.focus(), b(a).scrollTop(e), d && g.css("outline", "none")
                    }

                    function I() {
                        if (0 == X.slick("slickGetOption", "centerMode")) {
                            var a = Q(),
                                b = P(),
                                c = R();
                            if (b <= a) {
                                var d = (X.innerWidth() - c * b) / 2;
                                X.find(".slick-track").css("padding-left", d)
                            }
                        }
                    }

                    function J() {
                        X.slick("setCurrentSlide", 0), X.slick("updateArrows"), X.find(ea).scrollLeft(0)
                    }

                    function K() {
                        var a = X.slick("slickCurrentSlide"),
                            b = P() - Q(),
                            c = a + Q();
                        c > b && (c = b), X.slick("slickGoTo", c)
                    }

                    function L() {
                        var a = X.slick("slickCurrentSlide"),
                            b = a - Q();
                        b < 0 && (b = 0), X.slick("slickGoTo", b)
                    }

                    function M() {
                        X.find(ga).attr("tabindex", -1).attr("aria-disabled", "true").attr("aria-hidden", "true"), X.find(fa).attr("tabindex", -1).attr("aria-disabled", "true").attr("aria-hidden", "true")
                    }

                    function N() {
                        X.find(da).each(function () {
                            b(this).on("touchstart", function (a) {})
                        })
                    }

                    function O() {
                        X.find(da).each(function () {
                            b(this).append("<div class='separator'></div>")
                        })
                    }

                    function P() {
                        return X.find(da).length
                    }

                    function Q() {
                        return X.slick("slickGetOption", "slidesToShow")
                    }

                    function R() {
                        return X.find(da).first().outerWidth(!0)
                    }

                    function S() {
                        return X.find(da + "[aria-selected='true']")
                    }

                    function T(a) {
                        return a.find(ha).children().eq(0)
                    }
                    var U, V, W = b(d),
                        X = W.find(".td-tabs-carousel"),
                        Y = W.find(".td-tabs-carousel-content"),
                        Z = NaN,
                        $ = !1,
                        _ = !0,
                        aa = !1,
                        ba = !1,
                        ca = 15,
                        da = ".td-tabs-carousel-tab",
                        ea = ".slick-list",
                        fa = ".slick-next",
                        ga = ".slick-prev",
                        ha = ".td-container",
                        ia = "fixed-tab-height",
                        ja = -1 * b(".td_rq_header-nav").height(),
                        ka = "tabsCarousel",
                        la = W.metadata(),
                        ma = la.xs_slides ? la.xs_slides : 3,
                        na = la.sm_slides ? la.sm_slides : 3,
                        oa = la.md_slides ? la.md_slides : 5,
                        pa = la.lg_slides ? la.lg_slides : 5,
                        qa = {
                            prevArrow: '<button type="button" data-role="none" class="' + ga.substr(1) + '" aria-label="Previous" tabindex="-1" role="button"><span class="td-icon td-icon-arrowLeft"></span></button>',
                            nextArrow: '<button type="button" data-role="none" class="' + fa.substr(1) + '" aria-label="Next" tabindex="-1" role="button"><span class="td-icon td-icon-arrowRight"></span></button>',
                            centerMode: !1,
                            infinite: !1,
                            arrows: !0,
                            slidesToShow: pa,
                            slidesToScroll: pa,
                            initialSlide: 0,
                            swipeToSlide: !0,
                            variableWidth: !1,
                            draggable: !1,
                            touchMove: !1,
                            accessibility: !1,
                            waitForAnimate: !1,
                            speed: 500,
                            useCSS: !1,
                            responsive: [{
                                breakpoint: g.bpSet("md") + 1,
                                settings: {
                                    centerMode: !1,
                                    infinite: !1,
                                    swipeToSlide: !0,
                                    variableWidth: !1,
                                    draggable: !1,
                                    touchMove: !1,
                                    slidesToShow: oa,
                                    slidesToScroll: oa,
                                    useCSS: !1
                                }
                            }, {
                                breakpoint: g.bpSet("sm") + 1,
                                settings: {
                                    centerMode: !1,
                                    infinite: !1,
                                    swipeToSlide: !0,
                                    variableWidth: !1,
                                    draggable: !1,
                                    touchMove: !1,
                                    slidesToShow: na,
                                    slidesToScroll: na,
                                    useCSS: !1
                                }
                            }, {
                                breakpoint: g.bpSet("xs") + 1,
                                settings: {
                                    centerMode: !1,
                                    infinite: !1,
                                    swipeToSlide: !0,
                                    variableWidth: !1,
                                    draggable: !1,
                                    touchMove: !1,
                                    slidesToShow: ma,
                                    slidesToScroll: ma,
                                    useCSS: !1
                                }
                            }]
                        };
                    0 == X.hasClass("td-tabs-carousel-disabled") && f()
                });
            b.tdTabsCarouselModules || (b.tdTabsCarouselModules = {
                uid: 0
            }), b.fn.tdTabsCarousel = g.getPluginDef(d, "tdTabsCarousel"), b.fn.tdTabsCarousel.defaults = {}, b(".td-tabs-carousel-container").tdTabsCarousel(), b(".td_rq_tabs-carousel").css("opacity", "1").slideDown(300), b(".td-product-service-icon-links").css("opacity", "1").slideDown(300)
        }(a)
    }],
    td_rq_compare_table_sticky: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.document,
                e = (b(d), g.bpSet("sm")),
                f = function (f, h) {
                    var i = {},
                        j = {},
                        k = {},
                        l = {},
                        m = {},
                        n = b(f),
                        o = b.extend(b.fn.compareTableSticky.defaults, n.metadata(), h),
                        p = o.prod_type,
                        q = b(".td_rq_header-nav"),
                        r = b(".td_rq_compare-table").find("thead"),
                        s = b(".td_rq_compare-table").find("> div > table > tbody > tr:first-child"),
                        t = s.find(">th:first-child").get(0),
                        u = b("footer"),
                        v = b(".td_rq_compare-table-sticky-mobile"),
                        w = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
                    return i.product_type = p, i.el = n, i.m_btns = v, i.top_nav = q, i.footer = u, i.compareTable, i.activeElement, m = {
                        show_sticky: function () {
                            i.el.attr("aria-hidden", "false"), i.el.attr("tabindex", "0")
                        },
                        hide_sticky: function () {
                            i.el.attr("aria-hidden", "true"), i.el.attr("tabindex", "-1")
                        },
                        show_sticky_btns: function () {
                            i.m_btns.attr("aria-hidden", "false"), i.m_btns.attr("tabindex", "0")
                        },
                        hide_sticky_btns: function () {
                            i.m_btns.attr("aria-hidden", "true"), i.m_btns.attr("tabindex", "-1")
                        }
                    }, j = {
                        get_footer_pos: function () {
                            return i.footer.offset().top
                        },
                        get_compareTable_pos: function () {
                            var a;
                            return a = void 0 === i.compareTable ? r : i.compareTable, t ? a.offset().top + a.height() - q.height() : a.offset().top + (a.height() + s.height()) - q.height()
                        },
                        btt_defaut_bottom: 30,
                        status: !1,
                        init_scroll: !1,
                        init: function () {
                            j.init_reset(j.init_load_default_layout), k.ev_onScroll(), c.scroll(), k.ev_afterCompareModalClose()
                        },
                        init_reset: function (a) {
                            i.el.find("td").removeClass("td-col-last-spacing"), a(j.init_default)
                        },
                        init_load_default_layout: function (a) {
                            i.el.find("td:not(.td-hide-cell)").each(function (a) {
                                3 == a && b(this).addClass("td-col-last-spacing")
                            }), a.call()
                        },
                        init_default: function () {
                            w && a.innerWidth < e ? j.load_phone_layout(i.pos) : i.pos(), k.ev_afterCompareTable(), k.ev_afterBackToTop(), c.resize(function () {
                                i.pos(), 1 == j.status && l.equalHeight(".slot > a"), 0 == j.status && (j.init_scroll = !1), j.pos_btt()
                            })
                        },
                        pos: function () {
                            i.el.css("top", q.height() + "px"), l.m_btns_status()
                        },
                        pos_btt: function () {
                            void 0 !== i.td_rq_linkToTop && (a.innerWidth < e ? i.td_rq_linkToTop.css("bottom", i.m_btns.height() + 10 + "px") : i.td_rq_linkToTop.css("bottom", j.btt_defaut_bottom + "px"))
                        },
                        load_phone_layout: function (a) {
                            i.el.find("td:not(.td-hide-cell)").each(function (a) {
                                1 != a && 2 != a || b(this).addClass("mobile"), 0 != a && 1 != a && 2 != a && b(this).addClass("td-hide-cell")
                            }), i.m_btns.find("td:not(.td-hide-cell)").each(function (a) {
                                0 != a && 1 != a || b(this).addClass("mobile"), 0 != a && 1 != a && b(this).addClass("td-hide-cell")
                            }), a.call()
                        }
                    }, k = {
                        ev_afterBackToTop: function () {
                            g.ev.on(g.events.afterBackToTop, function (a, c) {
                                i.td_rq_linkToTop = b(c), j.pos_btt()
                            })
                        },
                        ev_afterCompareTable: function () {
                            g.ev.on(g.events.afterCompareTable, function (a, c) {
                                i.compareTable = b(c)
                            })
                        },
                        ev_onScroll: function () {
                            c.scroll(function () {
                                if (c.scrollTop() > j.get_compareTable_pos()) {
                                    if (j.status = !0, i.el.removeClass("deactivate").addClass("activate").promise().done(function () {
                                            m.show_sticky(), 0 == j.init_scroll && (l.equalHeight(".slot > a", !0), j.init_scroll = !0)
                                        }), a.innerWidth < e)
                                        if (b(d).scrollTop() + i.footer.height() > j.get_footer_pos()) i.m_btns.addClass("deactivate").removeClass("activate"), m.hide_sticky_btns();
                                        else {
                                            i.m_btns.removeClass("deactivate").addClass("activate"), m.show_sticky_btns();
                                            var f = g.getEqualHeight(v.find("button"));
                                            v.find("button").css("height", f + "px")
                                        }
                                } else i.el.addClass("deactivate").removeClass("activate").promise().done(function () {
                                    m.hide_sticky(), j.status = !1
                                }), a.innerWidth < e && (i.m_btns.addClass("deactivate").removeClass("activate"), m.hide_sticky_btns())
                            })
                        },
                        ev_afterCompareModalClose: function () {
                            g.ev.on(g.events.afterCompareModalHidden, function (a, b) {
                                k.ev_onScroll()
                            })
                        }
                    }, l = {
                        equalHeight: function (a, b) {
                            void 0 !== b && 1 == b || (b = !1);
                            var c = i.el.find(a),
                                d = g.getEqualHeight(c);
                            1 == b ? c.animate({
                                height: d
                            }, 300) : c.css("height", d + "px")
                        },
                        m_btns_status: function () {
                            if (a.innerWidth < e) {
                                if (c.scrollTop() > j.get_compareTable_pos())
                                    if (b(d).scrollTop() + i.footer.height() > j.get_footer_pos()) i.addClass("deactivate").removeClass("activate"), m.hide_sticky_btns();
                                    else {
                                        i.m_btns.removeClass("deactivate").addClass("activate"), m.show_sticky_btns();
                                        var f = g.getEqualHeight(v.find("button"));
                                        v.find("button").css("height", f + "px")
                                    }
                            } else i.m_btns.addClass("deactivate").removeClass("activate"), m.hide_sticky_btns()
                        }
                    }, b.extend(i, j, k, l, m), i.init(), i
                };
            b.fn.compareTableSticky = g.getPluginDef(f, "compareTableSticky"), b.fn.compareTableSticky.defaults = {
                prod_type: "cc"
            }, b(".td_rq_compare-table-sticky").compareTableSticky()
        }(a)
    }],
    td_rq_compare_table: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.document,
                e = (b(d), g.bpSet("sm")),
                f = g.bpSet("md"),
                h = function (d, h) {
                    var i = {},
                        j = {},
                        k = {},
                        l = {},
                        m = {},
                        n = b(d),
                        o = b.extend(b.fn.compareTable.defaults, n.metadata(), h),
                        p = o.prod_type,
                        q = n.find("> div > table > thead > tr"),
                        r = q.find(">td:first-child").get(0),
                        s = n.find("> div > table > tbody > tr"),
                        t = n.find("> div > table > tbody > tr:first-child"),
                        u = t.find(">th:first-child").get(0),
                        v = "> td.no-padding table.nested-table > thead > tr > th",
                        w = s.find(v),
                        x = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
                    return i.product_type = p, i.el = n, i.thead = q, i.tbody = s, i.tbody_first_row = t, m = {
                        add_col: function () {
                            i.thead.find("> th").attr("scope", "col")
                        },
                        add_row: function () {
                            i.tbody.find("> th").attr("scope", "row")
                        },
                        add_describedby: function (a, b) {
                            var c = a.find("div").children("button");
                            c.get(0) && c.attr("aria-describedby", b)
                        }
                    }, j = {
                        init: function () {
                            j.init_reset(j.init_load_default_layout)
                        },
                        init_reset: function (a) {
                            i.thead.find("> th").removeClass("td-col-last-spacing"), i.tbody.each(function () {
                                b(this).find("> td").removeClass("td-col-last-spacing")
                            }), a(j.init_default)
                        },
                        init_load_default_layout: function (a) {
                            var c = 0,
                                d = 0;
                            r && (c += 1), i.thead.find("> th:not(.td-hide-cell)").each(function (a) {
                                a + c == 3 && b(this).addClass("td-col-last-spacing")
                            }), u || (d += 1), i.tbody.each(function () {
                                b(this).find("> td:not(.td-hide-cell)").each(function (a) {
                                    a == 2 + d && (b(this).addClass("td-col-last-spacing"), d = 0)
                                })
                            }), a()
                        },
                        init_default: function () {
                            x && a.innerWidth < e ? j.load_phone_layout(j.load_required_fn) : j.load_required_fn(), !x && a.innerWidth < e ? j.rating_star_mobile_custom() : j.rating_star_mobile_custom_reset(), c.resize(function () {
                                j.load_required_fn(), !x && a.innerWidth < e ? j.rating_star_mobile_custom() : j.rating_star_mobile_custom_reset()
                            })
                        },
                        alignment: function () {
                            i.thead.each(function () {
                                var a = b(this);
                                a.find("> th").each(function (a) {
                                    var c = b(this);
                                    u ? m.add_describedby(c, c.find("div > span:first-child").children("a").attr("id")) : m.add_describedby(i.tbody_first_row.find(" td:eq(" + (a + 1) + ")"), c.find("div > span:first-child").children("a").attr("id"))
                                });
                                var c = a.find("th").find(".td-indicator-offer");
                                if (c.is(":visible")) {
                                    var d = a.find("th").children(".td-indicator-wrapper");
                                    d.hasClass("indicator-type2") ? d.css("height", c.outerHeight(!0)) : d.css("height", "70px")
                                }
                                l.equalHeight(a, "th > div:not(:has( > span.td-indicator-offer:first-child))  > span:first-child")
                            }), i.tbody.each(function () {
                                var c = b(this);
                                a.innerWidth < f ? (c.find("> td > span:not(:has(ul))").addClass("align"), c.find("> td > span:has(ul)").removeClass("align"), l.equalHeight(c, "> td")) : (c.find("> td").css("height", "74px"), c.find("> td > span").removeClass("align"), c.find("> td:has(span:has(ul))").css({
                                    "vertical-align": "top",
                                    height: "auto"
                                }))
                            })
                        },
                        alignment_th_in_nested_table: function (c) {
                            w.get(0) && i.tbody.each(function () {
                                var c = b(this);
                                c.find(v).each(function (c) {
                                    var d = b(this),
                                        f = "",
                                        g = " /";
                                    0 != c && c % 2 != 0 || (a.innerWidth < e ? (-1 != d.text().indexOf(g) ? (f = d.text().substring(0, d.text().lastIndexOf(g)), f += g) : f = d.text() + g, d.text(f)) : -1 != d.text().indexOf(g) && (f = d.text().substring(0, d.text().lastIndexOf(g)), d.text(f)))
                                }), l.equalHeight(c, v + ":last-child")
                            }), c()
                        },
                        alignment_th: function () {
                            a.innerWidth < f ? i.thead.each(function () {
                                var a = b(this);
                                l.equalHeight(a, "> th")
                            }) : i.thead.each(function () {
                                b(this).find("> th").css("height", "auto")
                            }), c.load(function () {
                                a.innerWidth < f ? i.thead.each(function () {
                                    var a = b(this);
                                    l.equalHeight(a, "> th")
                                }) : i.thead.each(function () {
                                    b(this).find("> th").css("height", "auto")
                                })
                            })
                        },
                        load_phone_layout: function (a) {
                            var c = 0,
                                d = 0;
                            r && (c += 1), i.thead.find("> th:not(.td-hide-cell)").each(function (a) {
                                a += c, 1 != a && 2 != a || b(this).addClass("mobile"), 0 != a && 1 != a && 2 != a && b(this).addClass("td-hide-cell")
                            }), u || (d += 1), i.tbody.each(function () {
                                b(this).find("> td:not(.td-hide-cell)").each(function (a) {
                                    a != 0 + d && a != 1 + d || b(this).addClass("mobile"), a != 0 + d && a != 1 + d && b(this).addClass("td-hide-cell")
                                }), d = 0
                            }), a.call()
                        },
                        remove_btn_applynow: function (b) {
                            a.innerWidth < e ? u ? i.thead.find("button").hide() : (i.tbody_first_row.find("button").hide(), l.equalHeight(i.tbody_first_row, "> td")) : u ? i.thead.find("button").show() : (i.tbody_first_row.find("button").show(), l.equalHeight(i.tbody_first_row, "> td")), b()
                        },
                        rating_star_mobile_custom: function () {
                            b("div.td-star-ratings, div.td-stars, div.td-stars-clip, .td-comments").addClass("mobile")
                        },
                        rating_star_mobile_custom_reset: function () {
                            b("div.td-star-ratings, div.td-stars, div.td-stars-clip, .td-comments").removeClass("mobile")
                        },
                        load_required_fn: function () {
                            k.trigger(), j.alignment_th_in_nested_table(j.alignment), m.add_col(), m.add_row(), j.remove_btn_applynow(j.alignment_th)
                        }
                    }, k = {
                        trigger: function () {
                            g.ev.trigger(g.events.afterCompareTable, i.el.find("thead"))
                        }
                    }, l = {
                        equalHeight: function (a, b, c) {
                            void 0 !== c && 1 == c || (c = !1);
                            var d = a.find(b),
                                e = g.getEqualHeight(d);
                            1 == c ? d.animate({
                                height: e
                            }, 300) : d.css("height", e + "px")
                        }
                    }, b.extend(i, j, k, l, m), i.init(), i
                };
            b.fn.compareTable = g.getPluginDef(h, "compareTable"), b.fn.compareTable.defaults = {
                prod_type: "cc",
                placeholder_image: ""
            }, b(".td_rq_compare-table").compareTable()
        }(a)
    }],
    td_rq_blocks: [function (a) {
        "use strict";
        ! function (a) {
            function b(a, b) {
                a.children(o).length && ("3-column-grid" == b ? (a.children(o).fadeIn(150), a.children(".grid-over").fadeOut(150)) : "4-column-grid" == b ? (a.children(o).fadeIn(150).attr("aria-hidden", !0), a.children(".grid-over").fadeOut(150).attr({
                    role: "link",
                    tabindex: "0",
                    "aria-expanded": !0
                }), a.children(".grid-hover").find(".overlay-close").attr({
                    role: "link",
                    tabindex: "0",
                    "aria-expanded": !1
                })) : (a.children(o).fadeIn(150).attr("aria-hidden", !1), a.children(".grid-over").fadeOut(150).attr({
                    role: "link",
                    tabindex: "0",
                    "aria-expanded": !0
                })))
            }

            function c(a, b) {
                a.children(o).length && ("3-column-grid" == b ? (a.children(o).fadeOut(150), a.children(".grid-over").fadeIn(150)) : "4-column-grid" == b ? (a.children(o).fadeOut(150).attr("aria-hidden", !1), a.children(".grid-over").fadeIn(150).attr({
                    role: "link",
                    tabindex: "0",
                    "aria-expanded": !1
                }), a.children(".grid-hover").find(".overlay-close").removeAttr("role aria-expanded tabindex")) : (a.children(o).fadeOut(150).attr("aria-hidden", !0), a.children(".grid-over").fadeIn(150).attr({
                    role: "link",
                    tabindex: "0",
                    "aria-expanded": !1
                })))
            }

            function d() {
                void 0 != f(this).attr("onClick") && (f(this).keypress(function (a) {
                    13 == a.which && (f(this).click(), a.preventDefault()), f(this).unbind("keypress")
                }), f(this).css("cursor", "pointer"))
            }

            function e(a) {
                var b = g.getEqualHeight(a);
                a.css("height", b + "px")
            }
            var f = a.jQuery,
                h = (f(a), a.document),
                i = (a.body, f(h), g.bpSet("sm") - 1),
                j = /Nexus 10 Build/i.test(navigator.userAgent.toLowerCase()),
                k = function (g, h) {
                    function j() {
                        "button" == p.attr("role") && p.css("cursor", "pointer"), l = n.slick({
                            arrows: !1,
                            dots: !0,
                            infinite: !1,
                            accessibility: !1
                        }), p.each(function () {
                            var a = f(this);
                            a.attr("role") || a.find(q).attr("aria-hidden", !1);
                            var b = a.find(q);
                            if (b.get(0)) {
                                var c = "grid_block_hover_title_id_" + Math.floor(1e3 * Math.random() + 1);
                                b.find("h3").attr("id", c), b.find("a span.td-forscreenreader").attr({
                                    "aria-describedby": c,
                                    "aria-hidden": !0
                                }).text("More information")
                            }
                        }), a.innerWidth >= i && n.slick("unslick"), f(a).on("resize", function () {
                            var b = l,
                                c = !1;
                            b.find(".video-js").each(function () {
                                var a = this.player;
                                c = a.isFullscreen()
                            }), c || (a.innerWidth >= i ? b.slick("unslick") : b.hasClass("slick-initialized") || (b.slick("unslick"), b.slick({
                                arrows: !1,
                                dots: !0,
                                infinite: !1
                            }))), e(m.find(".grid-over"))
                        }), !1 === android && !1 === iOS && (p.hover(function (a) {
                            a.preventDefault(), f(".grid_over").fadeIn(), b(f(this), o), f(this).find("a span.td-forscreenreader").attr("aria-hidden", !1)
                        }, function (a) {
                            a.preventDefault(), c(f(this), o), f(this).find("a span.td-forscreenreader").attr("aria-hidden", !0)
                        }), p.focus(function (a) {
                            var c = f(this);
                            if (c.children(q).is(":visible")) return !1;
                            f(".grid-hover").fadeOut(), f(".grid-over").fadeIn(), b(c, o)
                        })), "ontouchstart" in a && p.on("click", function (b) {
                            var c = f(this).attr("data-target");
                            if (!c) return !0;
                            a.location.href = c
                        }), p.on("focus", d), e(m.find(".grid-over"))
                    }

                    function k(a) {
                        "object" == typeof l && n.slick("unslick"), p.off("hover"), p.off("focus"), p.off("click"), a()
                    }
                    var l, m = f(g).parent(),
                        n = m.find(".slick-content"),
                        o = "3-column-grid",
                        p = m.find("." + o),
                        q = ".grid-hover";
                    m.find(q);
                    k(j)
                },
                l = function (g, h) {
                    var j, k = f(g).parent(),
                        l = "grid-expand-toggle",
                        m = k.find(".td-4-column-grid-title"),
                        n = ".td-icon-close",
                        o = k.find(n),
                        p = "td-triggericon",
                        q = "td-triggericon-open",
                        r = "custom-fourcolgrid",
                        s = "td-icon-wrapper-green",
                        t = ".overlay-close",
                        u = k.find(t),
                        v = ".td-4-column-grid-content",
                        w = k.find(v),
                        x = ".td-forscreenreader",
                        y = k.find(x),
                        z = "4-column-grid",
                        A = k.find("." + z),
                        B = ".grid-hover",
                        C = k.find(B),
                        D = ".grid-over",
                        E = (k.find(D), "block-selected-next"),
                        F = (k.find("." + E), ".grid-block-overlay"),
                        G = k.find(F);
                    "button" == A.attr("role") && A.css("cursor", "pointer"), a.innerWidth < i ? (m.addClass(l), o.addClass(p + " " + r), u.addClass(s), u.removeAttr("aria-expanded"), y.html("More details"), G.find(t).removeAttr("role tabindex").attr({
                        "aria-hidden": !0
                    }), G.find("> div").attr({
                        role: "link",
                        "aria-expanded": !1,
                        tabindex: 0
                    }).css({
                        cursor: "default",
                        "outline-width": "0px"
                    }), G.find("." + l + " > span").attr("aria-hidden", !0)) : (A.find(x).html("Learn more"), G.find(x).html("Close"), G.find(t).attr({
                        tabindex: 0,
                        role: "button"
                    }).removeAttr("aria-hidden"), G.find("> div").removeAttr("role aria-expanded tabindex"), G.find("." + l + " > span").attr("aria-hidden", !0), e(k.find(".grid-over")), u.attr("aria-expanded", !1), j = !1), k.on("click keydown", F, function (a) {
                        if ("click" == a.type || "keydown" == a.type && 13 === a.which) {
                            var b = f(this).find("." + l);
                            b.next(v).slideToggle();
                            var c = b.children().eq(2).children().children(n),
                                d = b.children().eq(2).children(t);
                            c.hasClass(q) ? (c.removeClass(q), f(this).find("> div").attr("aria-expanded", !1)) : (c.addClass(q), d.addClass(s), f(this).find("> div").attr("aria-expanded", !0))
                        }
                    }), f("body").on("focus blur keydown", function (a) {
                        9 === event.which && G.find("> div").css({
                            "outline-width": "1px"
                        }), event.shiftKey && 9 === event.which && G.find("> div").css({
                            "outline-width": "1px"
                        })
                    }), f(a).on("resize", function () {
                        a.innerWidth < i ? m.hasClass(l) || (m.addClass(l), o.addClass(p + " " + r), u.addClass(s), u.removeAttr("aria-expanded"), w.hide(), y.html("More details"), G.find(t).removeAttr("role tabindex").attr("aria-hidden", !0), G.find("> div").attr({
                            role: "link",
                            "aria-expanded": !1,
                            tabindex: 0
                        }), G.find("." + l + " > span").attr("aria-hidden", !0), A.find(".overlay-close").removeAttr("role aria-expanded tabindex")) : (m.removeClass(l), o.removeClass(p + " " + r + " " + q), u.removeClass(s), u.attr("aria-expanded", j), w.show(), A.find(x).html("Learn more"), G.find(x).html("Close"), G.find(t).attr({
                            tabindex: 0,
                            role: "button"
                        }).removeAttr("aria-hidden"), G.find("> div").removeAttr("role aria-expanded tabindex "), G.find("." + l + " > span").attr("aria-hidden", !0), e(k.find(".grid-over")), A.find(".overlay-close").attr({
                            role: "link",
                            tabindex: "0",
                            "aria-expanded": !1
                        }))
                    });
                    var H = 0;
                    f(B + ", ." + z).on("click keypress", function (a) {
                        H += 1;
                        var b = f(this).attr("data-target"),
                            c = a.which;
                        if (1 == c || 13 == c) {
                            if (!b) return;
                            f(b).fadeIn("fast").focus(), f(b).attr("aria-hidden", !1).focus(), f(this).find(".overlay-close").attr({
                                "aria-expanded": !0
                            }), 2 == H && (f("." + z).attr("aria-hidden", !0), f(this).attr("aria-hidden", !1)), f(b).find(t).attr("aria-expanded", !0), j = !0
                        }
                        2 == H && (H = 0)
                    }), f(".grid-hover").focus(function () {
                        f(this).attr("aria-hidden", !1)
                    }), !1 === android && !1 === iOS && (A.hover(function (a) {
                        a.preventDefault(), C.fadeOut(), b(f(this), z)
                    }, function (a) {
                        a.preventDefault(), c(f(this), z)
                    }), A.focus(function () {
                        var a = f(this);
                        a.children(B).is(":visible") || (A.removeClass(E), a.addClass(E), f(".grid-hover").fadeOut(), f(".grid-over").fadeIn(), A.attr("tabindex", 0), b(a, z))
                    })), u.on("click keypress", function (b) {
                        var c = f(this).closest(".grid-block-overlay"),
                            d = b.which;
                        1 != d && 13 != d || (a.innerWidth < i ? f("body").removeClass("td-modal-open") : (c.removeClass("in"), c.fadeOut().attr("aria-hidden", !0), C.slideUp(), f(".grid-over").fadeIn(), 13 == d && f("." + E).focus(), f(this).attr("aria-expanded", !1), j = !1, f("." + z).attr("aria-hidden", !1)))
                    }), A.on("focus", d)
                },
                m = function (b, c) {
                    function e(a) {
                        a.children(v).length && (a.children(v).fadeIn(150).attr("aria-hidden", !1), a.children(".grid-over").fadeOut(150))
                    }

                    function g(a) {
                        a.children(v).length && (a.children(v).fadeOut(150).attr("aria-hidden", !0), a.children(".grid-over").fadeIn(150))
                    }
                    var h, k = 0,
                        l = f(b).find(".grid-block"),
                        m = f("#grid-blocks-full"),
                        n = "#grid-block-full",
                        o = f(n),
                        p = ".grid-block-half",
                        q = f(p),
                        r = ".grid-block-overlay-full",
                        s = f(r),
                        t = ".grid-block",
                        u = f(t),
                        v = ".grid-hover-half",
                        w = f(v),
                        x = "block-selected-next",
                        y = f("." + x);
                    "button" == l.attr("role") && l.css("cursor", "pointer"), f(a).load(function () {
                        if (j) {
                            var a, b = o.width(),
                                c = new Image;
                            c.src = f("#grid-block-full").find("img").attr("src"), c.onload = function () {
                                a = this.width / this.height, h = b / a, o.find("img").height(h);
                                var c = q.map(function (a, b) {
                                    return parseInt(f(b).height())
                                }).get();
                                null == h ? q.height(Math.max.apply(null, c)) : q.height((h - 3) / 2)
                            }
                        } else h = o.find("img").height();
                        var d = q.map(function (a, b) {
                            return parseInt(f(b).height())
                        }).get();
                        null == h ? q.height(Math.max.apply(null, d)) : (q.width(q - 40), q.height((h - 3) / 2))
                    }), f(a).on("resize", function () {
                        if (j) {
                            var a, b = o.width(),
                                c = new Image;
                            c.src = f("#grid-block-full").find("img").attr("src"), c.onload = function () {
                                a = this.width / this.height, h = b / a, o.find("img").height(h);
                                var c = q.map(function (a, b) {
                                    return parseInt(f(b).height())
                                }).get();
                                null == h ? q.height(Math.max.apply(null, c)) : q.height((h - 3) / 2)
                            }
                        }
                        var d = q.map(function (a, b) {
                            return parseInt(f(b).height())
                        }).get();
                        null == f(".grid-block-full").find("img").height() ? q.height(Math.max.apply(null, d)) : q.height((o.height() - 3) / 2), s.width(m.width())
                    }), f(t + ", " + v).on("click keypress", function (b) {
                        var c = f(this).attr("data-target"),
                            d = b.which;
                        if (k = f(a).scrollTop(), 1 == d || 13 == d) {
                            var e = c;
                            if (!e) return !0;
                            "#" == e.substring(0, 1) ? (s.width(m.width()), f(c).fadeIn().focus(), f(c + r).addClass("in").attr("aria-hidden", !1).focus()) : a.location.href = e
                        }
                        a.innerWidth < i && f("body").addClass("td-modal-open-block")
                    }), l.on("focus", d);
                    !1 === android && !1 === iOS && (u.hover(function (a) {
                        a.preventDefault(), w.fadeOut(), e(f(this))
                    }, function (a) {
                        a.preventDefault(), g(f(this))
                    }), u.focus(function () {
                        var b = f(this);
                        b.children(v).is(":visible") || (u.removeClass(x), b.addClass(x), f(".grid-hover-half").fadeOut(), f(".grid-over").fadeIn(), q.attr("tabindex", 0), a.innerWidth >= i && e(b))
                    })), f(".overlay-close").on("click keypress", function (b) {
                        var c = f(this).closest(".grid-block-overlay-full"),
                            d = b.which;
                        1 != d && 13 != d || (c.removeClass("in"), c.fadeOut().attr("aria-hidden", !0), 13 == d && y.focus()), a.innerWidth < i && (f("body").removeClass("td-modal-open-block"), f(a).scrollTop(k), k = 0)
                    })
                },
                n = function (b, c) {
                    function g(a) {
                        a.children(s).length && (a.children(s).fadeIn(150).attr("aria-hidden", !1), a.children(v).fadeOut(150), a.find(w).attr("aria-expanded", !0), y = !1)
                    }

                    function h(a) {
                        a.children(s).length && (a.children(s).fadeOut(150).attr("aria-hidden", !0), a.children(v).fadeIn(150), a.find(w).attr("aria-expanded", !1), y = !1, z = !1)
                    }

                    function j() {
                        f(q + ", " + s).off("click keypress"), l.off("focus"), !1 === android && !1 === iOS && r.find(v).off("click keypress"), f(".overlay-close").off("click keypress"), r.off("mouseenter mouseleave")
                    }
                    var k = 0,
                        l = f(b).find(".grid-block"),
                        m = (f("#grid-blocks-full"), "#grid-block-full"),
                        n = (f(m), ".grid-block-half"),
                        o = (f(n), ".grid-block-overlay-full"),
                        p = f(o),
                        q = ".grid-block",
                        r = f(q),
                        s = ".grid-hover-half",
                        t = f(s),
                        u = "block-selected-next",
                        v = (f("." + u), ".grid-over"),
                        w = ".grid-over-title",
                        x = null,
                        y = !1,
                        z = !1;
                    j(), f(".overlay-close").prop("tabindex", 0), p.find(".overlay-close").attr({
                        role: "button",
                        "aria-expanded": !0
                    }), t.find(".overlay-close").attr({
                        "aria-expanded": !1,
                        role: "button"
                    }), t.attr("aria-hidden", !0), f(w).attr({
                        tabindex: 0,
                        role: "button",
                        "aria-expanded": !1
                    }), "button" == l.attr("role") && l.css("cursor", "pointer"), f(a).on("resize", function () {
                        e(r.find(v))
                    });
                    var A;
                    f(q + ", " + s).on("click keypress", function (b) {
                        var c = f(this),
                            d = f(this).attr("data-target"),
                            e = b.which;
                        if (x = f(this)[0], k = f(a).scrollTop(), 1 == e || 13 == e) {
                            r.removeClass(u), f(s + " .overlay-close").removeClass(u), 13 == e && 0 == y && 1 == z && (f(this).find(s).attr("aria-hidden", !1), A = f(this).find(s)), f(this).find(".overlay-close").attr("aria-expanded", !0), l.attr("aria-hidden", !0);
                            var g = d;
                            if (!g) return !0;
                            "#" == g.substring(0, 1) ? (!1 === android && !1 === iOS || f(this).find(v).css("display", "none"), f(d).fadeIn(function () {
                                c.find(s + " .overlay-close").addClass(u)
                            }).focus(), f(d + o).addClass("in").attr("aria-hidden", !1).focus()) : a.location.href = g
                        }
                        a.innerWidth < i && f("body").addClass("td-modal-open-block")
                    }), l.on("focus", d);
                    !1 === android && !1 === iOS && (l.each(function () {
                        f(this).find(".grid-over").get(0) || f(this).attr("tabindex", 0)
                    }), r.find(v).on("click keypress", function (a) {
                        a.preventDefault(), a.stopPropagation();
                        var b = a.which;
                        1 != b && 13 != b || (t.fadeOut(), t.attr("aria-hidden", !0), t.removeAttr("tabindex"), r.find(v).css("display", "block"), f(this).css("display", "none"), f(this).find(w).attr("aria-expanded", !0), f(this).parent().children(s).fadeIn(function () {
                            f(this).attr("tabindex", 0).focus()
                        }), f(this).parent().children(s).attr("aria-hidden", !1))
                    }), r.hover(function (a) {
                        a.preventDefault(), t.fadeOut(), g(f(this))
                    }, function (a) {
                        a.preventDefault(), h(f(this))
                    }), r.focus(function () {
                        var b = f(this);
                        b.children(s).is(":visible") || b.find(".grid-over").get(0) || (y = !0, z = !0, r.removeClass(u), f(s + " .overlay-close").removeClass(u), b.addClass(u), f(".grid-hover-half").fadeOut(), f(v).fadeIn(), f(this).find(".GRID_BLOCK_HALF").attr("tabindex", 0), a.innerWidth >= i && g(b))
                    })), f(".td-flexbox-overlay-container div:only-child a, .td-flexbox-overlay-content:last-child a").focusout(function (a) {
                        f(this).closest(".grid-block-overlay-full").removeClass("in"), f(this).closest(".grid-block-overlay-full").fadeOut().attr("aria-hidden", !0)
                    }), f(".overlay-close").on("click keypress", function (b) {
                        var c = f(this).closest(".grid-block-overlay-full"),
                            d = b.which;
                        1 != d && 13 != d || (13 == d && 0 == y && 1 == z && (A.attr("aria-hidden", !1), z = !1), t.find(".overlay-close").attr("aria-expanded", !1), l.removeAttr("aria-hidden"), c.removeClass("in"), c.is(":visible") && c.fadeOut().attr("aria-hidden", !0), !1 === android && !1 === iOS || r.find(v).css("display", "block")), a.innerWidth < i && (f("body").removeClass("td-modal-open-block"), f(a).scrollTop(k), k = 0), void 0 != x && (x.focus(), x = f()), 13 == d && (c.is(":visible") ? f(".td-icon-wrapper-white.td-interactive-icon.overlay-close").focus() : x = f())
                    })
                },
                o = ".grid-hover";
            f.fn.td3GridBlocks = g.getPluginDef(k, "td3GridBlocks"), f.fn.td4GridBlocks = g.getPluginDef(l, "td4GridBlocks"), f.fn.tdGridBlocks = g.getPluginDef(m, "tdGridBlocks"), f.fn.tdGridBlocksFlexbox = g.getPluginDef(n, "tdGridBlocksFlexbox"), f.fn.td3GridBlocks.defaults = {}, f.fn.td4GridBlocks.defaults = {}, f.fn.tdGridBlocks.defaults = {}, f.fn.tdGridBlocksFlexbox.defaults = {}, f(".td-3-column-grid-blocks").td3GridBlocks(), f(".td-4-column-grid-blocks").td4GridBlocks(), f(".td-grid-blocks").tdGridBlocks(), f(".td-grid-blocks-flexbox").tdGridBlocksFlexbox(), h.addEventListener("threeColumnGridBlocks", function (a) {
                f(".td-3-column-grid-blocks").td3GridBlocks()
            })
        }(a)
    }],
    td_rq_tooltip: [function (a) {
        "use strict"; + function (a) {
            function b(b) {
                return this.each(function () {
                    var d = a(this),
                        e = d.data("bs.tooltip"),
                        f = "object" == typeof b && b;
                    !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
                })
            }
            var c = function (a, b) {
                this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
            };
            c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: {
                    selector: "body",
                    padding: 0
                }
            }, c.prototype.init = function (b, c, d) {
                if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                        click: !1,
                        hover: !1,
                        focus: !1
                    }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
                    var g = e[f];
                    if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
                    else if ("manual" != g) {
                        var h = "hover" == g ? "mouseenter" : "focusin",
                            i = "hover" == g ? "mouseleave" : "focusout";
                        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
                    }
                }
                this.options.selector ? this._options = a.extend({}, this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
            }, c.prototype.getDefaults = function () {
                return c.DEFAULTS
            }, c.prototype.getOptions = function (b) {
                return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
                    show: b.delay,
                    hide: b.delay
                }), b
            }, c.prototype.getDelegateOptions = function () {
                var b = {},
                    c = this.getDefaults();
                return this._options && a.each(this._options, function (a, d) {
                    c[a] != d && (b[a] = d)
                }), b
            }, c.prototype.enter = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
                    "in" == c.hoverState && c.show()
                }, c.options.delay.show)) : c.show())
            }, c.prototype.isInStateTrue = function () {
                for (var a in this.inState)
                    if (this.inState[a]) return !0;
                return !1
            }, c.prototype.leave = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) {
                    if (clearTimeout(c.timeout), c.hoverState = "out", !c.options.delay || !c.options.delay.hide) return c.hide();
                    c.timeout = setTimeout(function () {
                        "out" == c.hoverState && c.hide()
                    }, c.options.delay.hide)
                }
            }, c.prototype.show = function () {
                var b = a.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    this.$element.trigger(b);
                    var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                    if (b.isDefaultPrevented() || !d) return;
                    var e = this,
                        f = this.tip(),
                        g = this.getUID(this.type);
                    this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
                    var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                        i = /\s?auto?\s?/i,
                        j = i.test(h);
                    j && (h = h.replace(i, "") || "top"), f.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
                    var k = this.getPosition(),
                        l = f[0].offsetWidth,
                        m = f[0].offsetHeight;
                    if (j) {
                        var n = h,
                            o = this.getPosition(this.$viewport);
                        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
                    }
                    var p = this.getCalculatedOffset(h, k, l, m);
                    this.applyPlacement(p, h);
                    var q = function () {
                        var a = e.hoverState;
                        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
                    };
                    a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
                }
            }, c.prototype.applyPlacement = function (b, c) {
                var d = this.tip(),
                    e = d[0].offsetWidth,
                    f = d[0].offsetHeight,
                    g = parseInt(d.css("margin-top"), 10),
                    h = parseInt(d.css("margin-left"), 10);
                isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
                    using: function (a) {
                        d.css({
                            top: Math.round(a.top),
                            left: Math.round(a.left)
                        })
                    }
                }, b), 0), d.addClass("in");
                var i = d[0].offsetWidth,
                    j = d[0].offsetHeight;
                "top" == c && j != f && (b.top = b.top + f - j);
                var k = this.getViewportAdjustedDelta(c, b, i, j);
                k.left ? b.left += k.left : b.top += k.top;
                var l = /top|bottom/.test(c),
                    m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
                    n = l ? "offsetWidth" : "offsetHeight";
                d.offset(b), this.replaceArrow(m, d[0][n], l)
            }, c.prototype.replaceArrow = function (a, b, c) {
                this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
            }, c.prototype.setContent = function () {
                var a = this.tip(),
                    b = this.getTitle();
                a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
            }, c.prototype.hide = function (b) {
                function d() {
                    "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
                }
                var e = this,
                    f = a(this.$tip),
                    g = a.Event("hide.bs." + this.type);
                if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
            }, c.prototype.fixTitle = function () {
                var a = this.$element;
                (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
            }, c.prototype.hasContent = function () {
                return this.getTitle()
            }, c.prototype.getPosition = function (b) {
                b = b || this.$element;
                var c = b[0],
                    d = "BODY" == c.tagName,
                    e = c.getBoundingClientRect();
                null == e.width && (e = a.extend({}, e, {
                    width: e.right - e.left,
                    height: e.bottom - e.top
                }));
                var f = d ? {
                        top: 0,
                        left: 0
                    } : b.offset(),
                    g = {
                        scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
                    },
                    h = d ? {
                        width: a(window).width(),
                        height: a(window).height()
                    } : null;
                return a.extend({}, e, g, h, f)
            }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
                return "bottom" == a ? {
                    top: b.top + b.height,
                    left: b.left + b.width / 2 - c / 2
                } : "top" == a ? {
                    top: b.top - d,
                    left: b.left + b.width / 2 - c / 2
                } : "left" == a ? {
                    top: b.top + b.height / 2 - d / 2,
                    left: b.left - c
                } : {
                    top: b.top + b.height / 2 - d / 2,
                    left: b.left + b.width
                }
            }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
                var e = {
                    top: 0,
                    left: 0
                };
                if (!this.$viewport) return e;
                var f = this.options.viewport && this.options.viewport.padding || 0,
                    g = this.getPosition(this.$viewport);
                if (/right|left/.test(a)) {
                    var h = b.top - f - g.scroll,
                        i = b.top + f - g.scroll + d;
                    h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
                } else {
                    var j = b.left - f,
                        k = b.left + f + c;
                    j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
                }
                return e
            }, c.prototype.getTitle = function () {
                var a = this.$element,
                    b = this.options;
                return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) : b.title)
            }, c.prototype.getUID = function (a) {
                do {
                    a += ~~(1e6 * Math.random())
                } while (document.getElementById(a));
                return a
            }, c.prototype.tip = function () {
                if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
                return this.$tip
            }, c.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
            }, c.prototype.enable = function () {
                this.enabled = !0
            }, c.prototype.disable = function () {
                this.enabled = !1
            }, c.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled
            }, c.prototype.toggle = function (b) {
                var c = this;
                b && ((c = a(b.currentTarget).data("bs." + this.type)) || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
            }, c.prototype.destroy = function () {
                var a = this;
                clearTimeout(this.timeout), this.hide(function () {
                    a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
                })
            };
            var d = a.fn.tooltip;
            a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
                return a.fn.tooltip = d, this
            }
        }(jQuery)
    }],
    td_rq_popover: [function (a) {
        "use strict"; + function (a) {
            function b(b) {
                return this.each(function () {
                    var d = a(this),
                        e = d.data("bs.popover"),
                        f = "object" == typeof b && b;
                    !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
                })
            }
            var c = function (a, b) {
                this.init("popover", a, b)
            };
            if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
            c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
                return c.DEFAULTS
            }, c.prototype.setContent = function () {
                var a = this.tip(),
                    b = this.getTitle(),
                    c = this.getContent();
                a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
            }, c.prototype.hasContent = function () {
                return this.getTitle() || this.getContent()
            }, c.prototype.getContent = function () {
                var a = this.$element,
                    b = this.options;
                return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
            }, c.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".arrow")
            };
            var d = a.fn.popover;
            a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
                return a.fn.popover = d, this
            }
        }(jQuery)
    }],
    td_rq_descriptor: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = a.document,
                e = function (c, e) {
                    function f() {
                        function c(a) {
                            a.each(function (a) {
                                b(this).attr("data-container") || b(this).attr("data-container", "body")
                            })
                        }

                        function f() {
                            b.fn.popover && (b("body").on("click", function (a) {
                                j()
                            }), b("body").on("focus blur keydown", function (a) {
                                n(a)
                            }), k.popover(e), k.on("click", function (a) {
                                o(a)
                            }), k.focusout(function (a) {
                                p(this, a)
                            }), k.focusin(function (a) {
                                q(this, a)
                            }), k.on("shown.bs.popover", function (a) {
                                r(this, a)
                            }))
                        }

                        function j() {
                            b("#" + h).popover("hide"), b("#td-descriptor-lightbox").is(":visible") && b("#td-descriptor-lightbox").hide(), b(".td-bst-desc").css({
                                "outline-width": "0px"
                            })
                        }

                        function n(a) {
                            9 === a.which && b(".td-bst-desc").css({
                                "outline-width": "0px"
                            }), a.shiftKey && 9 === a.which && b(".td-bst-desc").css({
                                "outline-width": "0px"
                            })
                        }

                        function o(c) {
                            c.stopPropagation(), c.preventDefault(), b("#" + h).popover("hide"), b("#td-descriptor-lightbox").is(":visible") && b("#td-descriptor-lightbox").hide();
                            var d = b(c.currentTarget);
                            if (i = d, a.innerWidth > 767) d.popover("show"), b("#" + h).find(".close.hairline").focus();
                            else {
                                if (d.popover("show"), d.closest(".slick-slider").length > 0 && d.closest(".td_rq_tools-swipe.td-product-description-cta").length > 0) {
                                    var e = b(d.closest(".slick-slider")[0]),
                                        f = b(e.find(".slick-track")[0]),
                                        g = f.css("width");
                                    e.css("z-index", "9000"), f.css("width", "auto"), f.css("width", g);
                                    b(e.find(".popover")[0]).css("max-width", "none").css("width", a.innerWidth + "px")
                                }
                                b("#" + h).find(".close.hairline").focus(), b("#td-descriptor-lightbox").show()
                            }
                            b(".td-bst-desc").css({
                                "outline-width": "0px"
                            })
                        }

                        function p(a, c) {
                            c.stopPropagation();
                            b(a);
                            0 == l || b("body").hasClass("td-no-focus-outline") || (i.focus(), l = !1)
                        }

                        function q(a, c) {
                            c.stopPropagation(), b(".td-bst-desc").css({
                                "outline-width": "0px"
                            }), b(a).css({
                                "outline-width": "1px"
                            })
                        }

                        function r(a, c) {
                            c.stopPropagation();
                            var e = b(a);
                            h = b(c.target).attr("aria-describedby"), b("#" + h).focus(), g(e, b("#" + h)), b(".popover").find(".close.hairline").off("click keydown"), b(".popover").off("focus blur keydown"), b("#" + h).on("click", function (a) {
                                a.stopPropagation()
                            }), b("#" + h).find(".close.hairline").on("click keydown", function (a) {
                                9 === a.which || a.shiftKey || (b("#" + h).popover("hide"), l = !1, setTimeout(function () {
                                    e.focus()
                                }, 30), b("#td-descriptor-lightbox").is(":visible") && b("#td-descriptor-lightbox").hide())
                            }), b("#" + h).on("focus blur keydown", ".inner", function (a) {
                                c.stopPropagation();
                                var e = b(this);
                                if (9 == a.keyCode) {
                                    var f = e.find("*"),
                                        g = f.filter(m).filter(":visible"),
                                        h = b(d.activeElement),
                                        i = g.length,
                                        j = g.index(h);
                                    a.shiftKey || j != i - 1 || (g.get(0).focus(), a.preventDefault()), a.shiftKey && 0 == j && (g.get(i - 1).focus(), a.preventDefault())
                                }
                            }).on("keyup", ":not(.inner)", function (a) {
                                var c = (b(this), b("#" + h)),
                                    e = b(d.activeElement),
                                    f = !!e.parents(c).length;
                                c.length && 9 == a.keyCode && !1 === f && c.find(".close.hairline").focus()
                            }), l = !0
                        }
                        c(k), f(), b(d).ready(function () {
                            f()
                        })
                    }

                    function g(a, b) {
                        var c = a.data("aria-label-close");
                        void 0 !== c && b.find(".close.hairline").attr("aria-label", c)
                    }
                    var h, i, j = b(c),
                        k = j.find('[data-toggle="popover"]'),
                        e = {
                            template: '<div class="popover" role="tooltip" tabindex="-1"><div class="inner"><div class="close hairline" tabindex="0" role="button"></div><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>',
                            html: !0,
                            content: function () {
                                var a = b(this).data("content-id");
                                return j.find("#" + a).html()
                            },
                            title: function () {
                                return b("#popover-title").html()
                            }
                        },
                        l = !1,
                        m = "a[href], button:not([disabled]), *[tabindex]";
                    f()
                };
            b.fn.tdDescriptor = c.getPluginDef(e, "tdDescriptor"), b.fn.tdDescriptor.defaults = {}, b(".td-descriptor").tdDescriptor()
        }(a)
    }],
    td_rq_color_test: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = (a.document, function (a, c) {
                    function d() {
                        f.on("click", function () {
                            i.removeClass("td-bg-light-gray td-bg-mint-green")
                        }), g.on("click", function () {
                            i.removeClass("td-bg-mint-green").addClass("td-bg-light-gray")
                        }), h.on("click", function () {
                            i.removeClass("td-bg-light-gray").addClass("td-bg-mint-green")
                        })
                    }
                    var e = b(a),
                        f = e.find(".test-bg-white"),
                        g = e.find(".test-bg-gray"),
                        h = e.find(".test-bg-mint"),
                        i = b(".td-contentarea > section:first-of-type");
                    d()
                });
            b.fn.tdColorTest = c.getPluginDef(d, "tdColorTest"), b.fn.tdColorTest.defaults = {}, b(".td-color-selector").tdColorTest()
        }(a)
    }],
    td_rq_table_image_right: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, d.bpSet("sm")),
                f = function (d, f) {
                    function g() {
                        j.find(".td-more-details-1").append(l), i = j.find(".td-more-details-mobile"), a.innerWidth <= e ? k.attr("aria-hidden", "true") : k.attr("aria-hidden", "false"), i.on("click", function () {
                            b(this).parent().fadeOut(), b(this).children("a").attr("aria-expanded", "true"), k.fadeIn(), k.attr("aria-hidden", "false").focus()
                        }), c.resize(h)
                    }

                    function h() {
                        a.innerWidth > e ? k.attr("aria-hidden", "false") : k.attr("aria-hidden", "true")
                    }
                    var i, j = b(d),
                        k = j.find(".td-show-more-content-1"),
                        l = "<div class='td-more-details-mobile'><a href='javascript:void(0);' tabindex='0' aria-controls='coll-1' aria-expanded='false' aria-label='Load more' title='Load more'>Load more<span class='td-icon' aria-hidden='true'></span></a></div>";
                    g()
                };
            b.fn.tdTableImageRight = d.getPluginDef(f, "tdTableImageRight"), b.fn.tdTableImageRight.defaults = {}, b(".td-image-block-right-with-copy").tdTableImageRight()
        }(a)
    }],
    td_rq_chart: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = a.g,
                d = function (d, e) {
                    function f(a, b, c, d) {
                        b.removeClass(l), b.addClass(m), c.removeClass(n), c.length, a.animate({
                            height: "toggle",
                            opacity: "toggle"
                        }, function () {
                            a.removeClass("open")
                        })
                    }

                    function g(a, b, c, d) {
                        b.removeClass(m), b.addClass(l), c.addClass(n), c.length, a.animate({
                            height: "toggle",
                            opacity: "toggle"
                        }, function () {
                            a.removeClass("hide").addClass("open")
                        })
                    }

                    function h(a, b) {
                        var d = a.find(b),
                            e = c.getEqualHeight(d);
                        d.css("height", e + "px")
                    }
                    var i = b(d).parent().parent().parent().prev().find(".td-chart-m"),
                        j = b(d).parents().hasClass("td-complex-chart"),
                        k = ".td-chart-item-head",
                        l = "td-chart-item-expanded",
                        m = "td-chart-item-collapsed",
                        n = "td-triggericon-expanded",
                        o = ".td-link-toggle";
                    return b(a).resize(function () {
                        h(i, k)
                    }), c.equaliseHeight(i, k), c.ev.on(c.events.afterTabActiveChanged, function (a, b) {
                        a.preventDefault(), b.has(i).length > 0 && c.equaliseHeight(i, k)
                    }), b(k + " .rte a").on("click", function (a) {
                        a.stopPropagation()
                    }), 0 == j && b("*").on("keydown", function (a) {
                        a.which, b(this).find(k).css({
                            "outline-width": "1px"
                        })
                    }), i.each(function () {
                        b(this).find(k).each(function () {
                            var a = b(this),
                                c = a.next(),
                                d = a.find(".td-triggericon"),
                                e = a.find(".td-forscreenreader");
                            0 == j ? (a.attr({
                                "aria-expanded": !1,
                                tabindex: "0",
                                role: "button"
                            }), d.parent().parent().attr({
                                "aria-hidden": !0,
                                tabindex: "-1"
                            })) : a.find(o).attr({
                                "aria-expanded": !1,
                                tabindex: "0"
                            }), 0 == j ? a.on("click keydown", function (h) {
                                var i = h.which;
                                if (1 == i && b(this).css({
                                        "outline-width": "0px"
                                    }), 1 == i || 13 == i) {
                                    if ("td-link-standalone" == h.target.className || "td-link-lastword" == h.target.className) return !0;
                                    if (!c.is(":visible")) return g(c, a, d, e), a.attr({
                                        "aria-expanded": !0
                                    }), a.focus(), !1;
                                    if (c.is(":visible")) return f(c, a, d, e), a.attr({
                                        "aria-expanded": !1
                                    }), a.focus(), !1
                                }
                            }) : a.on("click", function (b) {
                                return "td-link-standalone" == b.target.className || "td-link-lastword" == b.target.className || (c.is(":visible") ? c.is(":visible") ? (f(c, a, d, e), a.find(o).attr({
                                    "aria-expanded": !1
                                }), a.focus(), !1) : void 0 : (g(c, a, d, e), a.find(o).attr({
                                    "aria-expanded": !0
                                }), a.focus(), !1))
                            })
                        })
                    })
                };
            b.fn.td_chart = c.getPluginDef(d, "td_chart"), b.fn.td_chart.defaults = {}, b("table.td-chart").td_chart()
        }(a)
    }],
    td_rq_daily_rates: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = (a.document, "xs"),
                e = "sm",
                f = "md",
                g = "lg",
                h = c.bpSet("sm"),
                i = c.bpSet("md"),
                j = c.bpSet("lg"),
                k = function (k, l) {
                    function m() {
                        b.each(r, function (b, c) {
                            p(a.innerWidth) !== s[b] && n(k.find(c))
                        })
                    }

                    function n(a) {
                        var b = c.getEqualHeight(a);
                        a.css("height", b + "px")
                    }

                    function o(a) {
                        c.getEqualHeight(a);
                        a.css("height", "auto")
                    }

                    function p(a) {
                        return "number" == typeof a && (a >= j ? g : a >= i ? f : a >= h ? e : d)
                    }
                    var q = b.extend(b.fn.tdDailyRates.defaults, b(k).metadata(), l),
                        r = q.selectors,
                        s = q.exceptions;
                    m(), b(a).on("resize", function () {
                        p(a.innerWidth);
                        b.each(r, function (b, c) {
                            p(a.innerWidth) === s[b] ? o(k.find(c)) : n(k.find(c))
                        })
                    })
                };
            b.fn.tdDailyRates = c.getPluginDef(k, "tdDailyRates"), b.fn.tdDailyRates.defaults = {}, b(".td-daily-rates").tdDailyRates()
        }(a)
    }],
    td_rq_simple_slidedown: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = a.g,
                d = function (c, d) {
                    var e = b(c),
                        f = b.extend(b.fn.tdSimpleSlideDown.defaults, e.metadata(), d),
                        g = f.targetelement,
                        h = e.parents(".td-article-list").find(g),
                        i = e.parents(".td-article-list"),
                        j = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
                    if (e.attr("aria-expanded", "false"), i.on("keydown", function (a) {
                            9 === a.which && b(g).attr("tabindex", -1)
                        }), h.get(0)) {
                        var k = f.targetelementToStyle,
                            l = f.removeClass,
                            m = f.addClass;
                        e.on("click", function (c) {
                            c.preventDefault(), "" != k && ("" != l && e.find(k).removeClass(l), "" != m && e.find(k).addClass(m)), h.slideDown({
                                complete: function () {
                                    if (j) {
                                        var c = b(a).scrollTop();
                                        b(a).scrollTop(c + 1)
                                    } else b(this).trigger("resize");
                                    b(this).animate({
                                        opacity: 1
                                    })
                                }
                            }), b(g).attr("tabindex", 0).css("outline", 0).focus(), b(this).parent().hide(), b(this).attr({
                                "aria-hidden": "true",
                                "aria-expanded": "true"
                            })
                        }).on("keydown", function (c) {
                            13 === c.which && (c.preventDefault(), h.slideDown({
                                complete: function () {
                                    if (j) {
                                        var c = b(a).scrollTop();
                                        b(a).scrollTop(c + 1)
                                    } else b(this).trigger("resize");
                                    b(this).animate({
                                        opacity: 1
                                    })
                                }
                            }), b(g).attr("tabindex", 0).css("outline", 0).focus(), b(this).parent().hide(), b(this).attr({
                                "aria-hidden": "true",
                                "aria-expanded": "true"
                            }))
                        });
                        var n = e.parent(".td-row"),
                            o = h[0];
                        n.clone(!0).insertBefore(o), n.remove()
                    }
                };
            b.fn.tdSimpleSlideDown = c.getPluginDef(d, "tdSimpleSlideDown"), b.fn.tdSimpleSlideDown.defaults = {
                targetelement: "slidingContent",
                targetelementToStyle: "",
                removeClass: "",
                addClass: ""
            }, b(".btn_load_more").tdSimpleSlideDown()
        }(a)
    }],
    td_rq_special_offer_indicator: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.document,
                e = (b(d), g.bpSet("md")),
                f = g.bpSet("sm"),
                h = function (d, h) {
                    var i = {},
                        j = b(d),
                        k = j.find("h1"),
                        l = j.find("h2"),
                        m = j.find(".td-indicator-offer"),
                        n = j.prev(".td-back-text-link"),
                        o = j.find(".td-indicator-offer-type2"),
                        p = b.extend(b.fn.tdSpecialOfferindicator.defaults, j.metadata(), h),
                        q = p.prod_special.status,
                        r = p.prod_special.position,
                        s = p.prod_special.type;
                    return i = {
                        init: function () {
                            i.special_offer_indicator(q, r, s)
                        },
                        special_offer_indicator: function (a, b, d) {
                            1 == a && (2 == d ? o.addClass("show") : ("left" == b && m.addClass("left"), m.show(), i.special_offer_indicator_alignment(), c.resize(function () {
                                i.special_offer_indicator_alignment()
                            })))
                        },
                        special_offer_indicator_alignment: function () {
                            if (n.get(0))
                                if (a.innerWidth >= e) {
                                    var b = -1 * n.outerHeight(!0);
                                    m.css("top", b + "px")
                                } else m.css("top", "0px");
                            if (a.innerWidth < f) {
                                var c = m.outerHeight(!0);
                                k.get(0) ? k.css({
                                    "padding-left": "0px",
                                    "padding-right": "0px",
                                    "margin-top": c + "px"
                                }) : l.css({
                                    "padding-left": "0px",
                                    "padding-right": "0px",
                                    "margin-top": c + "px"
                                })
                            } else k.get(0) ? k.css({
                                "padding-left": "10%",
                                "padding-right": "10%",
                                "margin-top": "20px"
                            }) : l.css({
                                "padding-left": "10%",
                                "padding-right": "10%",
                                "margin-top": "20px"
                            })
                        }
                    }, b.extend(i), i.init(), g.ev.on(g.events.afterExpandForOthers + " " + g.events.afterTabActiveChanged, function (a, b) {
                        j.parents(b.obj).get(0) && i.init()
                    }), i
                };
            b.fn.tdSpecialOfferindicator = g.getPluginDef(h, "tdSpecialOfferindicator"), b.fn.tdSpecialOfferindicator.defaults = {
                prod_special: {
                    status: !1,
                    position: "right",
                    type: 1
                }
            }, b(".td_rq_special_offer_indicator").tdSpecialOfferindicator()
        }(a)
    }],
    td_rq_scrollbar: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.document),
                d = (b(c), g.bpSet("md"), g.bpSet("sm"), function (d, e) {
                    var f = {},
                        h = {},
                        i = b(d),
                        j = b.extend(b.fn.tdScrollbar.defaults, i.metadata(), e),
                        h = {
                            aConts: [],
                            mouseY: 0,
                            N: 0,
                            sc: 0,
                            sp: 0,
                            to: 0,
                            parentCSS: j.parentCSS,
                            parentHeight: "",
                            scrollStatus: "yes",
                            scrollbarWidth: 17,
                            scrollbarTopPos: 10,
                            asd: {
                                sg: !1
                            },
                            getId: function () {
                                var a = "scrollbarid_" + Math.floor(1e3 * Math.random() + 1);
                                return i.attr("id", a), a
                            },
                            scrollbar: function (b) {
                                var d = c.getElementById(b);
                                if (!h.initialization()) return !1;
                                var e = c.createElement("div"),
                                    f = d.parentNode;
                                return e.style.overflow = "hidden", e.style.position = "relative", j.modalstatus && (e.style.height = h.parentHeight), e.className = h.parentCSS, f.insertBefore(e, d), e.appendChild(d), d.style.position = "absolute", d.style.left = d.style.top = "0px", d.style.width = d.style.height = "100%", h.aConts[h.N++] = d, d.sg = !1, d.st = this.create_div("ssb_st", d, e), "no" === h.scrollStatus ? d.sb = this.create_div("ssb_sb ssb_sb_disable", d, e) : d.sb = this.create_div("ssb_sb", d, e), d.sb.onmousedown = function (b) {
                                    return this.cont.sg || (b || (b = a.event), h.asd = this.cont, this.cont.yZ = b.screenY, this.cont.sZ = d.scrollTop, this.cont.sg = !0), !1
                                }, d.st.onmousedown = function (b) {
                                    b || (b = a.event), h.asd = this.cont, h.mouseY = b.clientY + c.body.scrollTop + c.documentElement.scrollTop;
                                    for (var d = this.cont, e = 0; null !== d; d = d.offsetParent) e += d.offsetTop;
                                    this.cont.scrollTop = (h.mouseY - e - this.cont.ratio * this.cont.offsetHeight / 2 - this.cont.sw) / this.cont.ratio, this.cont.sb.onmousedown(b)
                                }, d.ssb_onscroll = function () {
                                    this.ratio = (this.offsetHeight - 2) / this.scrollHeight, this.sb.style.top = Math.floor(h.scrollbarTopPos + this.scrollTop * this.ratio) + "px"
                                }, d.sw = h.scrollbarWidth, d.ssb_onscroll(), h.refresh(), d.onscroll = d.ssb_onscroll, d
                            },
                            initialization: function () {
                                function b(b, c, d) {
                                    return a.addEventListener ? (b.addEventListener(c, d, !1), h.w3c = !0, !0) : !!a.attachEvent && b.attachEvent("on" + c, d)
                                }
                                return !(a.oper || !a.addEventListener && !a.attachEvent) && (b(a.document, "mousemove", h.onmousemove), b(a.document, "mouseup", h.onmouseup), b(a, "resize", h.refresh), !0)
                            },
                            create_div: function (a, b, d) {
                                var e = c.createElement("div");
                                return e.cont = b, e.className = a, d.appendChild(e), e
                            },
                            clear: function () {
                                return clearTimeout(h.to), h.sc = 0, !1
                            },
                            refresh: function () {
                                for (var a = 0, b = h.N; a < b; a++) {
                                    var c = h.aConts[a];
                                    c.ssb_onscroll(), c.st.style.width = c.sw + "px", c.sb.style.height = Math.ceil(Math.max(.5 * c.sw, c.ratio * c.offsetHeight) + 1) - (h.scrollbarTopPos + 10) + "px"
                                }
                            },
                            arrow_scroll: function () {
                                0 !== h.sc && (h.asd.scrollTop += 6 * h.sc / h.asd.ratio, h.to = setTimeout(h.arrow_scroll, h.sp), h.sp = 32)
                            },
                            mousedown: function (a, b) {
                                0 === h.sc && (a.cont.sb.className = "ssb_sb ssb_sb_down", h.asd = a.cont, h.sc = b, h.sp = 400, h.arrow_scroll())
                            },
                            onmousemove: function (b) {
                                b || (b = a.event), h.mouseY = b.screenY, h.asd.sg && (h.asd.scrollTop = h.asd.sZ + (h.mouseY - h.asd.yZ) / h.asd.ratio)
                            },
                            onmouseup: function (b) {
                                b || (b = a.event), c.onselectstart = "", h.clear(), h.asd.sg = !1
                            },
                            trigger: function () {
                                h.scrollbar(h.getId())
                            }
                        };
                    return f = {
                        init: function () {
                            g.ev.on(g.events.afterLargeModalOverlay, function (a, c) {
                                f.modal_id = c.scrollbarInfo.id;
                                var d = c.scrollbarInfo.height,
                                    e = c.scrollbarInfo.status;
                                h.parentHeight = d, h.scrollStatus = e, i.parent("." + f.parentCSS).css("height", d), f.modal_height = d, "yes" == e ? (setTimeout(function () {
                                    h.refresh()
                                }, 0), i.next(".ssb_st").removeClass("ssb_st_disable"), i.next().next(".ssb_sb").removeClass("ssb_sb_disable"), b("#" + f.modal_id).css("overflow-y", "auto")) : (i.next(".ssb_st").addClass("ssb_st_disable"), i.next().next(".ssb_sb").addClass("ssb_sb_disable"), b("#" + f.modal_id).css("overflow-y", "hidden"))
                            }), g.ev.on(g.events.afterExpand, function (d, e) {
                                var g = e.tdExpandInfo.videoplayer,
                                    j = e.tdExpandInfo.t_h,
                                    k = (e.tdExpandInfo.status, 0),
                                    l = 0,
                                    m = b("#" + f.modal_id).parent("." + f.parentCSS).prev(),
                                    n = m.children("h2"),
                                    o = 0,
                                    p = 0;
                                if (n.get(0) && (o = parseInt(n.outerHeight(!0))), m.get(0) && (p = parseInt(m.css("marginTop").split("px")[0]) + o), !b("#" + f.modal_id).find(g).get(0)) return void b(a).trigger("resize");
                                k = parseInt(b("#" + f.modal_id).find(g).outerHeight(!0)) + parseInt(j), a.innerWidth < 768 ? (l = a.innerHeight, l -= p) : (l = .85 * c.documentElement.clientHeight, l -= p + 12), k >= l ? i.parent("." + f.parentCSS).css("height", parseInt(l) + "px") : i.parent("." + f.parentCSS).css("height", parseInt(k) + "px"), setTimeout(function () {
                                    h.refresh()
                                }, 0), k >= l ? (i.next(".ssb_st").removeClass("ssb_st_disable"), i.next().next(".ssb_sb").removeClass("ssb_sb_disable"), b("#" + f.modal_id).css("overflow-y", "auto")) : (i.next(".ssb_st").addClass("ssb_st_disable"), i.next().next(".ssb_sb").addClass("ssb_sb_disable"), b("#" + f.modal_id).css("overflow-y", "hidden"))
                            }), h.trigger()
                        }
                    }, b.extend(f, h), setTimeout(function () {
                        f.init()
                    }, 500), f
                });
            b.fn.tdScrollbar = g.getPluginDef(d, "tdScrollbar"), b.fn.tdScrollbar.defaults = {
                parentCSS: "custom_scroll_parent_div",
                modalstatus: !0
            }, b(".td_rq_scrollbar").tdScrollbar()
        }(a)
    }],
    td_rq_checkbox: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = (a.document, function (a, c) {
                    function d() {
                        m.click(e), h()
                    }

                    function e(a) {
                        void 0 === k.attr("class") ? f() : k.attr("class").indexOf("checked") >= 0 ? g() : f()
                    }

                    function f() {
                        k.prop("checked", !0), k.addClass("checked"), l.addClass("label-checked"), m.attr("aria-checked", "true")
                    }

                    function g() {
                        k.prop("checked", !1), k.removeClass("checked"), l.removeClass("label-checked"), m.attr("aria-checked", "false"), m.attr("tabindex", 0).focus()
                    }

                    function h() {
                        k.attr("aria-hidden", "true"), k.attr("tabindex", -1), m.attr("aria-checked", "false"), m.attr("tabindex", 0), m.attr("role", "checkbox"), m.on("keyup", function (a) {
                            32 !== a.which && 13 !== a.which || e()
                        }), m.click(function () {
                            b(this).trigger("blur")
                        }), m.on("keydown", function (a) {
                            32 === a.which && a.preventDefault()
                        })
                    }
                    var i = b(a),
                        j = i.find(".td-form-stacked"),
                        k = j.find("input"),
                        l = j.find("label"),
                        m = j.find(".td-label-content-wrapper");
                    d()
                });
            b.fn.tdCheckbox = c.getPluginDef(d, "tdCheckbox"), b.fn.tdCheckbox.defaults = {}, b(".td-checkbox").tdCheckbox()
        }(a)
    }],
    td_rq_product_grid: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, d.bpSet("md")),
                f = d.bpSet("sm"),
                g = function (g, h) {
                    function i() {
                        d.ev.on(d.events.afterCatalogueIndicator, function (b, c) {
                            b.preventDefault();
                            var d = (c.indicator_status, c.obj),
                                e = c.index,
                                g = c.h2_padding_top;
                            if (a.innerWidth >= f) {
                                var h = parseInt(e / M);
                                j(u[h + 1], d, g)
                            } else d.find("h2").css({
                                height: "auto",
                                "padding-top": g + "px"
                            })
                        }), d.ev.on(d.events.afterTabActiveChanged + " " + d.events.afterExpandForOthers, function (a, b) {
                            a.preventDefault(), k(r)
                        }), k(r), c.load(function () {
                            k(r)
                        }), c.resize(function () {
                            k(r)
                        })
                    }

                    function j(a, c, d) {
                        if (a) {
                            for (var e = c.find("h2").attr("id"), f = !1, g = 0; g < a.length && !(f = b(a[g]).find("h2").attr("id") == e); g++);
                            f && (b.each(a, function (a, c) {
                                b(this).find("h2").css({
                                    height: "auto",
                                    "padding-top": d + "px"
                                })
                            }), o(a, "h2"))
                        }
                    }

                    function k(a) {
                        l(), a()
                    }

                    function l() {
                        if (a.innerWidth >= f) {
                            u = q();
                            for (var b = 0; b <= u.length - 1; b++) o(u[b], "h2"), I || (I = m(u[b])), I ? (n(u[b], ".td-product-info-row .rte"), o(u[b], ".td-product-info-row .td-product-info-row-content")) : o(u[b], ".td-product-info-row .rte"), o(u[b], ".td-product-info-row > div:first-child", !0), "rates" == x ? (o(u[b], ".rate"), o(u[b], "> div > div:last-child > div:not(.td-product-compare)")) : (o(u[b], "> div > div:last-child > div:first-child"), o(u[b], "> div > div:last-child > div:not(.td-product-details,.td-product-compare,.rte,.td-product-details-2)"), o(u[b], "> div > div:last-child > div.td-product-details-2")), o(u[b], "> div > div:last-child > div.td-product-compare")
                        } else u = q(), A.css("height", "auto"), K.css("height", "auto"), B.css("height", "auto"), C.css("height", "auto"), "rates" == x ? D.css("height", "auto") : (F.css("height", "auto"), L.css("height", "auto")), G.css("height", "auto"), H.css("height", "auto")
                    }

                    function m(a) {
                        var c = !1;
                        return b.each(a, function () {
                            c || (c = b(this).find(J).hasClass("show"))
                        }), c
                    }

                    function n(a, c) {
                        b.each(a, function () {
                            b(this).find(c).css("height", "auto")
                        })
                    }

                    function o(a, c, d) {
                        if (1 == d) {
                            var e = p(a, c);
                            b.each(a, function () {
                                b(this).find(c).css("height", e + "px")
                            })
                        } else {
                            var e = p(a, c);
                            b.each(a, function () {
                                b(this).find(c).css("height", e + "px")
                            })
                        }
                    }

                    function p(a, c, d) {
                        var e, f = 0,
                            g = !1;
                        return void 0 !== d && void 0 !== d.full && (g = d.full), b.each(a, function () {
                            e = b(this).find(c), e.css({
                                height: "auto"
                            }), f = Math.max(f, e.outerHeight(g))
                        }), f
                    }

                    function q() {
                        var c = new Array,
                            d = 0,
                            g = 0,
                            h = 0;
                        return M = 0, a.innerWidth >= e ? M = 3 : a.innerWidth < e && a.innerWidth >= f && (M = 2), c[d] = new Array, z.each(function (a, e) {
                            b(e).hasClass("hide") || b(e).hasClass("ng-hide") || ((h % M == 0 || 0 == M && 0 != h) && (g = 0, d++, c[d] = new Array), h++, c[d][g] = b(e), g++)
                        }), c
                    }

                    function r() {
                        var b = (v.find(y + ":not(.hide, .ng-hide)").length, 1);
                        s(), a.innerWidth < f ? t(b) : a.innerWidth < e && a.innerWidth >= f ? (b = 2, t(b)) : (b = 3, t(b)), v.animate({
                            opacity: 1
                        })
                    }

                    function s() {
                        z.find("> div").removeClass("border-bottom-removed-byJS").removeClass("border-right-removed-byJS").removeClass("border-right-added-byJS")
                    }

                    function t(a) {
                        for (var c = 0; c <= u.length - 1; c++) b.each(u[c], function (d) {
                            (d + 1) % a == 0 ? b(this).find("> div").addClass("border-right-removed-byJS") : b(this).find("> div").addClass("border-right-added-byJS"), c == u.length - 1 && b(this).find("> div").addClass("border-bottom-removed-byJS")
                        })
                    }
                    var u, v = b(g),
                        w = b.extend(b.fn.tdProductGrid.defaults, v.metadata(), h),
                        x = w.cat_type,
                        y = ".td_rq_catalogue-card",
                        z = v.find(y),
                        A = z.find("h2"),
                        B = z.find(".td-product-info-row > div:first-child"),
                        C = z.find(".td-product-info-row .rte"),
                        D = z.find(".rate"),
                        E = z.find("> div > div:last-child"),
                        F = E.find("> div:first-child"),
                        G = E.find("> div:not(.td-product-details,.td-product-compare,.rte)"),
                        H = E.find("> div.td-product-compare"),
                        I = !1,
                        J = ".td-indicator-offer-type2",
                        K = z.find(".td-product-info-row .td-product-info-row-content"),
                        L = E.find("div.td-product-details-2"),
                        M = 0;
                    i()
                };
            b.fn.tdProductGrid = d.getPluginDef(g, "tdProductGrid"), b.fn.tdProductGrid.defaults = {
                cat_type: "common"
            }, b(".td_rq_product_grid").tdProductGrid()
        }(a)
    }],
    td_rq_filter_tool: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = (a.document, function (a, c) {
                    var d = b(a),
                        e = d.find("select.td-select"),
                        f = {};
                    return f = {
                        init: function () {
                            e.each(function (a) {
                                var c = f.get_param("ftparm" + (a + 1));
                                void 0 !== c && (b(this)[0].options.selectedIndex = c - 1)
                            })
                        },
                        get_param: function (a) {
                            if (a = new RegExp("[?&]" + encodeURIComponent(a) + "=([^&]*)").exec(location.search)) return decodeURIComponent(a[1])
                        }
                    }, b.extend(f), f.init(), f
                });
            b.fn.tdFilterTool = c.getPluginDef(d, "tdFilterTool"), b.fn.tdFilterTool.defaults = {}, b(".td_rq_filter-tool").tdFilterTool()
        }(a)
    }],
    td_rq_sms_text_message: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = a.document,
                e = function (a, c) {
                    var e = b(a),
                        f = e.find("input[name=your-phone]"),
                        g = e.find(".msg_result_success, .msg_result_error ,msg_wait"),
                        h = e.find(".legal-heading"),
                        i = e.find("button"),
                        j = {};
                    return j = {
                        init: function () {
                            j.phone_formatting(f)
                        },
                        show_legal_message: function () {
                            h.css("display", "block"), h.attr("aria-hidden", !1), g.css("display", "none"), g.attr("aria-hidden", !0)
                        },
                        phone_formatting: function (a) {
                            a.keydown(function (a) {
                                var b = a.keyCode || a.charCode;
                                if (console.log("Key: " + b), 0 != b && 229 != b)
                                    if ((b >= 48 && b <= 57 || b >= 96 && b <= 105) && !a.shiftKey && j.phone_text_trim(this.value).length < 10) this.value = j.phone_masking(this.value), j.show_legal_message();
                                    else {
                                        var c = d.activeElement,
                                            e = c ? c.tagName.toLowerCase() : null;
                                        if ("input" == e && /^(?:text|search|password|tel|url)$/i.test(c.type)) {
                                            var f = this.selectionStart,
                                                g = this.selectionEnd,
                                                h = "";
                                            if (b >= 48 && b <= 57 && (h = this.value.slice(f, g)), 13 == b) return i.trigger("click"), !1;
                                            if (8 != b && "" == h && 9 != b && "" == h) return a.preventDefault(), !1
                                        }
                                        8 == b && j.show_legal_message()
                                    }
                            }), a.keyup(function (a) {
                                var b = a.keyCode || a.which;
                                if (0 == b || 229 == b) {
                                    if (!((b = j.get_keycode_android(this.value)) >= 48 && b <= 57 && j.phone_text_trim(this.value).length < 11)) return this.value = this.value.substring(0, this.value.length - 1), a.preventDefault(), !1;
                                    this.value = j.phone_masking(this.value)
                                }
                            })
                        },
                        get_keycode_android: function (a) {
                            return a.charCodeAt(a.length - 1)
                        },
                        phone_masking: function (a) {
                            var b = j.phone_text_trim(a),
                                c = parseInt(b.length),
                                d = "";
                            return 1 == c || 2 == c ? d = "(" + b : 3 == c ? d = "(" + b + ")" : c > 3 && c < 7 ? d = "(" + b.substring(0, 3) + ") " + b.substring(3, 6) : c >= 7 && (d = "(" + b.substring(0, 3) + ") " + b.substring(3, 6) + "-" + b.substring(6)), d
                        },
                        phone_text_trim: function (a) {
                            return a.replace(/\s/g, "").replace(/[\(\)\-']+/g, "")
                        }
                    }, b.extend(j), j.init(), j
                };
            b.fn.tdSMSTextMessage = c.getPluginDef(e, "tdSMSTextMessage"), b.fn.tdSMSTextMessage.defaults = {}, b(".td_rq_sms-text-message").tdSMSTextMessage()
        }(a)
    }],
    td_rq_anchor_down: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = (a.document, function (a, d) {
                    var e = b(a),
                        f = b.extend(b.fn.tdAnchorDown.defaults, e.metadata(), d),
                        g = f.scrollable_area,
                        h = f.targetedID,
                        i = f.offset_top,
                        j = f.modalID,
                        k = f.scrolling_speed,
                        l = f.targetedElInfo.status,
                        m = f.targetedElInfo.type,
                        n = f.targetedElInfo.id,
                        o = f.targetedElInfo.tabID,
                        p = b(".td-header-nav"),
                        q = {};
                    return q = {
                        init: function () {
                            q.scroll_down(e)
                        },
                        scroll_down: function (a) {
                            a.on("click", function (a) {
                                a.preventDefault(), "" != typeof o && b("#" + o).trigger("click", [{
                                    forceSelect: !0
                                }]);
                                var d = b("#" + h).offset().top;
                                void 0 !== j ? (g = "#" + j + " .td_rq_scrollbar", d = d - b(g).offset().top - i) : p.get(0) && void 0 === j ? d = d - p.height() - i : d -= i, b("#" + h).attr("tabindex", "0"), b(g).animate({
                                    scrollTop: d
                                }, k, function () {
                                    b("#" + h).focus(), l && c.ev.trigger(c.events.afterAnchorDown, [{
                                        type: m,
                                        id: n
                                    }])
                                })
                            })
                        }
                    }, b.extend(q), q.init(), q
                });
            b.fn.tdAnchorDown = c.getPluginDef(d, "tdAnchorDown"), b.fn.tdAnchorDown.defaults = {
                scrollable_area: "body, html",
                offset_top: 0,
                scrolling_speed: 600,
                targetedElInfo: {
                    status: !1,
                    type: "expandCollapse",
                    id: "",
                    tabID: ""
                }
            }, b(".td_rq_anchor-down").tdAnchorDown()
        }(a)
    }],
    td_rq_dropdown_redirect: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = a.g,
                d = function (c, d) {
                    var e = b(c),
                        f = b.extend(b.fn.tdDropdownRedirect.defaults, e.metadata(), d),
                        g = f.fullUrlValue,
                        h = 0,
                        i = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
                        j = (f.targetelement, function (b) {
                            var c = b.currentTarget.options.selectedIndex,
                                d = b.currentTarget.options[c].value,
                                e = a.location.pathname + d;
                            "default" != d && h > 0 && (document.location.href = 1 == g ? d : e), h++
                        });
                    i ? e.on("change", function (a) {
                        h++, j(a)
                    }) : (e.on("click", function (a) {
                        j(a)
                    }), e.on("keydown", function (a) {
                        13 == a.which && (h++, a.preventDefault(), j(a))
                    })), "dd_lang" != e.attr("id") && b(a).on("pageshow", function () {
                        e.prop("selectedIndex", 0)
                    })
                };
            b.fn.tdDropdownRedirect = c.getPluginDef(d, "tdDropdownRedirect"), b.fn.tdDropdownRedirect.defaults = {
                fullUrlValue: !1
            }, b("select.form-control.auto_redirect, .td_rq_dropdown_redirect.td-select").tdDropdownRedirect()
        }(a)
    }],
    td_rq_logo_link: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, d.bpSet("sm")),
                f = function (f, g) {
                    var h = b(f),
                        i = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
                        j = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()),
                        k = h.find(".equal-height"),
                        l = {};
                    return l = {
                        init: function () {
                            c.load(function () {
                                l.init_behaviours(l.equal_height)
                            }), c.resize(l.equal_height)
                        },
                        init_behaviours: function (a) {
                            i && (h.css("display", "block"), h.attr("aria-hidden", "false"), j ? (h.find(".ios").css("display", "block"), h.find(".ios").attr("aria-hidden", "false")) : (h.find(".android").css("display", "block"), h.find(".android").attr("aria-hidden", "false")), a.call())
                        },
                        equal_height: function () {
                            if (a.innerWidth >= e) {
                                var b = d.getEqualHeight(k);
                                k.css("height", b + "px")
                            } else k.css("height", "auto")
                        }
                    }, b.extend(l), l.init(), l
                };
            b.fn.logoLink = d.getPluginDef(f, "logoLink"), b.fn.logoLink.defaults = {}, b(".td_rq_logo-link").logoLink()
        }(a)
    }],
    td_rq_spinner: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = a.document,
                f = (b(e), function (d, e) {
                    var f = {},
                        g = {},
                        h = d,
                        i = h.find("img");
                    return g = {
                        init: function () {
                            g.re_position(), c.resize(function () {
                                g.re_position()
                            }), c.scroll(function () {
                                g.re_position()
                            })
                        },
                        re_position: function (b) {
                            var d = i.height() / 2;
                            d = a.innerHeight / 2 - d, d += c.scrollTop(), i.css({
                                "margin-top": d + "px"
                            })
                        }
                    }, b.extend(f, g), f.init(), f
                });
            b.fn.spinner = d.getPluginDef(f, "spinner"), b(".td_rq_spinner").spinner()
        }(a)
    }],
    td_rq_article: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = a.document,
                f = (b(e), d.bpSet("sm")),
                g = function (d, e) {
                    function g() {
                        h(j)
                    }

                    function h(b) {
                        a.innerWidth >= f && (n = !1), b.call()
                    }

                    function i(b, c, d) {
                        if (a.innerWidth < f) {
                            if (0 == m) {
                                var e = b.next("p");
                                e.clone().insertBefore(b), e.remove()
                            }
                            c == d && (m = !0), l = !1, n = !0
                        } else {
                            if (0 == l && 1 == n) {
                                var g = b.prev("p");
                                g.clone().insertAfter(b), g.remove()
                            }
                            c == d && (l = !0), m = !1
                        }
                    }

                    function j() {
                        k.each(function (a) {
                            var c = b(this).find(".td-rte-text-warp-right"),
                                d = c.length,
                                e = 0;
                            c.each(function (a) {
                                var c = b(this);
                                e = a + 1, i(c, e, d)
                            })
                        })
                    }
                    var k = d,
                        l = !1,
                        m = !1,
                        n = !0;
                    return c.resize(function () {
                        j()
                    }), g()
                };
            b.fn.article = d.getPluginDef(g, "article"), b(".td_article.content").article()
        }(a)
    }],
    td_rq_icon_link_carousel: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.document),
                d = (b(c), function (d, e) {
                    function f() {
                        if (1 == ca) {
                            Z.find(fa + ":not([onclick])").removeAttr("tabindex aria-selected"), b(a).trigger("resize")
                        }
                    }

                    function h(a) {
                        W = na + b.tdTabsCarouselModules.uid, b.tdTabsCarouselModules.uid += 1, "object" == typeof X && Z.slick("unslick"), X = Z.slick(oa), void 0 != Z.data("settings") && (void 0 != Z.data("settings").keyboardNavigation && (ba = Z.data("settings").keyboardNavigation), void 0 != Z.data("settings").carouselOnly && (ca = Z.data("settings").carouselOnly)), Z.on("setPosition", function (a) {
                            l()
                        }), Z.on("breakpoint", function (a) {
                            m()
                        }), Z.find(ga).scroll(p), Z.find(fa).mousedown(q), Z.find(fa).mouseup(r), Z.find(fa).click(v), Z.find(fa).blur(t), Z.find(fa).focus(u), Z.find(fa).keydown(s), Z.find(ha).off("click"), Z.find(ha).click(w), Z.find(ia).off("click"), Z.find(ia).click(x), i(), j(), P(), y(), 1 == ca && E(), D(T()), J(), o(), N(), O(), a()
                    }

                    function i() {
                        0 == ca ? (Z.attr("role", "tablist"), Z.find(fa).attr("role", "tab"), Z.find(".slick-list").removeAttr("aria-live"), Z.find(fa).each(function (a) {
                            var c = W + "_tab" + a;
                            b($.get(a)).attr("id", c)
                        }), $.attr("role", "tabpanel"), $.each(function () {
                            var a = U(b(this));
                            a.blur(H), a.mousedown(function (a) {
                                b(this).css("outline", "none")
                            })
                        })) : 1 == ca && (Z.attr("role", "presentation"), Z.find(fa + "[onclick]").attr("role", "link"))
                    }

                    function j() {
                        var a = "drag-id-" + W;
                        Z.children(ga).attr("id", a);
                        var b = Q() - R() + 1;
                        V = new Dragdealer(a, {
                            handleClass: "slick-track",
                            loose: !0,
                            dragStopCallback: k,
                            vertical: !1,
                            steps: b,
                            snap: !1
                        }), Q() <= R() && V.disable()
                    }

                    function k(a, b) {
                        var c, d = R(),
                            e = Q(),
                            c = (S(), Math.round((e - d) * a));
                        c < 0 && (c = 0), Z.slick("setCurrentSlide", c), Z.slick("updateArrows")
                    }

                    function l() {
                        Y.outerWidth() == Z.outerWidth() ? (Q() > R() && n(), Y.find(".accessibility-instructions").attr("aria-hidden", !0)) : Y.find(".accessibility-instructions").removeAttr("aria-hidden"), Z.find(fa).attr("aria-hidden", "false"), o()
                    }

                    function m() {
                        j(), K(), D(T()), J(), o(), N(), Z.find(ga).scroll(p), Z.find(ha).off("click"), Z.find(ha).click(w), Z.find(ia).off("click"), Z.find(ia).click(x)
                    }

                    function n() {
                        var a, c = 0;
                        a = Math.round(Z.outerWidth() / (R() + .5)), Z.find(fa).each(function () {
                            b(this).css("width", a), c += b(this).outerWidth(!0)
                        }), Z.find(".slick-track").width(c), V.reflow()
                    }

                    function o() {
                        var a = 0;
                        0 == Z.hasClass(ka) && (Z.find(fa).each(function () {
                            var c = b(this).children();
                            c.outerHeight() > a && (a = c.outerHeight())
                        }), Z.find(fa).each(function () {
                            b(this).height(a)
                        }))
                    }

                    function p(a) {
                        V.disable()
                    }

                    function q(a) {
                        _ = a.pageX
                    }

                    function r(a) {
                        var c = a.currentTarget;
                        c.onclick && (b(c).data("onclick", c.onclick), b(c).removeAttr("onclick"))
                    }

                    function s(c) {
                        switch (_ = NaN, 0 != V.getValue()[0] && V.setValue(0, 0, !0), c.which) {
                            case 32:
                            case 13:
                                c.preventDefault(), I(b(c.currentTarget).index(), !1), c.currentTarget.onclick && c.currentTarget.onclick.call(c.currentTarget, c || a.e), b(c.currentTarget).data("onclick") && b(c.currentTarget).data("onclick").call(c.currentTarget, c || a.e);
                                break;
                            case 39:
                                1 == ba && B(b(c.currentTarget), !0);
                                break;
                            case 37:
                                1 == ba && C(b(c.currentTarget), !0)
                        }
                    }

                    function t(a) {
                        b(a.currentTarget).css("outline", "")
                    }

                    function u(a) {
                        da = !0
                    }

                    function v(c) {
                        var d = !1,
                            e = c.currentTarget;
                        isNaN(_) ? A(b(e)) : Math.abs(_ - c.pageX) < ea && (aa || (d = !0, aa = !0), da || D(b(e), !1), 0 == ca && A(b(e), !1, d), b(e).css("outline", "none"), I(b(e).index(), !0), b(e).data("onclick") && b(e).data("onclick").call(e, c || a.e))
                    }

                    function w(a) {
                        L()
                    }

                    function x(a) {
                        M()
                    }

                    function y() {
                        var d, e = a.location.hash;
                        if (void 0 !== z().tdtab && "" != z().tdtab) {
                            e = z().tdtab;
                            var f = e,
                                g = new RegExp("Tab_");
                            "number" != typeof parseInt(e) || g.test(f) || (e = "Tab_" + e)
                        } else {
                            e = decodeURIComponent(e), e = e.substring(1);
                            var h = c.createElement("textarea");
                            h.innerHTML = e, e = h.value
                        }
                        A(Z.find(fa).eq(0)), e.length > 0 && (Z.find(fa).each(function () {
                            b(this).attr("id") == e && (d = b(this))
                        }), void 0 != d && d.length > 0 && (A(d, !1, !0), aa = !0))
                    }

                    function z() {
                        var b = {};
                        a.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, c, d) {
                            b[c] = d
                        });
                        return b
                    }

                    function A(a, c, d) {
                        E(), a.addClass("td-tabs-carousel-tab--on"), a.attr("aria-selected", !0), a.attr("tabindex", "0"), c && a.focus(), d && b("html, body").animate({
                            scrollTop: Z.offset().top + ma
                        }, 1e3), F(a.index())
                    }

                    function B(a, c) {
                        var d = a.index();
                        d >= Q() - 1 ? d = 0 : d++, A(b(Z.find(fa).get(d)), c)
                    }

                    function C(a, c) {
                        var d = a.index();
                        d <= 0 ? d = Q() - 1 : d--, A(b(Z.find(fa).get(d)), c)
                    }

                    function D(a, b) {
                        var c = a.index(),
                            d = R();
                        void 0 == b && (b = !0);
                        var e, f = V.getStep()[0] - 1;
                        c > d - 1 + f ? (e = c - (d - 1), Z.slick("slickGoTo", e, !0), V.setStep(e + 1, 1, b)) : c < f && (e = c, Z.slick("slickGoTo", e, !0), V.setStep(e + 1, 1, b))
                    }

                    function E() {
                        Z.find(fa).each(function () {
                            var a = b(this);
                            a.removeClass("td-tabs-carousel-tab--on"), a.removeAttr("aria-selected"), a.attr("aria-hidden", "false"), 1 == ba ? a.attr("tabindex", "-1") : a.attr("tabindex", "0")
                        })
                    }

                    function F(a) {
                        G();
                        var d = b($.get(a));
                        d.show(), d.attr("aria-hidden", "false"), g.ev.trigger(g.events.afterTabActiveChanged, [d]);
                        var e = c.createEvent("Event");
                        e.initEvent(g.events.afterTabActiveChangedForExternal, !0, !0), c.dispatchEvent(e)
                    }

                    function G() {
                        $.each(function () {
                            var a = b(this);
                            a.hide(), a.attr("aria-hidden", "true")
                        })
                    }

                    function H(a) {
                        b(a.currentTarget).css("outline", "")
                    }

                    function I(c, d) {
                        var e = b(a).scrollTop(),
                            f = b($.get(c)),
                            g = U(f);
                        g.focus(), b(a).scrollTop(e), d && g.css("outline", "none")
                    }

                    function J() {
                        if (0 == Z.slick("slickGetOption", "centerMode")) {
                            var a = R(),
                                b = Q(),
                                c = S();
                            if (b <= a) {
                                var d = (Z.innerWidth() - c * b) / 2;
                                Z.find(".slick-track").css("padding-left", d)
                            }
                        }
                    }

                    function K() {
                        Z.slick("setCurrentSlide", 0), Z.slick("updateArrows"), Z.find(ga).scrollLeft(0)
                    }

                    function L() {
                        var a = Z.slick("slickCurrentSlide"),
                            b = Q() - R(),
                            c = a + R();
                        c > b && (c = b), Z.slick("slickGoTo", c)
                    }

                    function M() {
                        var a = Z.slick("slickCurrentSlide"),
                            b = a - R();
                        b < 0 && (b = 0), Z.slick("slickGoTo", b)
                    }

                    function N() {
                        Z.find(ia).attr("tabindex", -1).attr("aria-disabled", "true").attr("aria-hidden", "true"), Z.find(ha).attr("tabindex", -1).attr("aria-disabled", "true").attr("aria-hidden", "true")
                    }

                    function O() {
                        Z.find(fa).each(function () {
                            b(this).on("touchstart", function (a) {})
                        })
                    }

                    function P() {
                        Z.find(fa).each(function () {
                            b(this).append("<div class='separator'></div>")
                        })
                    }

                    function Q() {
                        return Z.find(fa).length
                    }

                    function R() {
                        return Z.slick("slickGetOption", "slidesToShow")
                    }

                    function S() {
                        return Z.find(fa).first().outerWidth(!0)
                    }

                    function T() {
                        return Z.find(fa + "[aria-selected='true']")
                    }

                    function U(a) {
                        return a.find(ja).children().eq(0)
                    }
                    var V, W, X, Y = b(d),
                        Z = Y.find(".td-tabs-carousel-icon-link-only"),
                        $ = Y.find(".td-tabs-carousel-content"),
                        _ = NaN,
                        aa = !1,
                        ba = !0,
                        ca = !1,
                        da = !1,
                        ea = 15,
                        fa = ".td-tabs-carousel-tab",
                        ga = ".slick-list",
                        ha = ".slick-next",
                        ia = ".slick-prev",
                        ja = ".td-container",
                        ka = "fixed-tab-height",
                        la = "td-tabs-carousel-disabled",
                        ma = -100,
                        na = "tabsCarousel",
                        oa = {
                            prevArrow: '<button type="button" data-role="none" class="' + ia.substr(1) + '" aria-label="Previous" tabindex="-1" role="button"><span class="td-icon td-icon-arrowLeft"></span></button>',
                            nextArrow: '<button type="button" data-role="none" class="' + ha.substr(1) + '" aria-label="Next" tabindex="-1" role="button"><span class="td-icon td-icon-arrowRight"></span></button>',
                            centerMode: !1,
                            infinite: !1,
                            arrows: !0,
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            initialSlide: 0,
                            swipeToSlide: !0,
                            variableWidth: !1,
                            draggable: !1,
                            touchMove: !1,
                            accessibility: !1,
                            waitForAnimate: !1,
                            speed: 500,
                            useCSS: !1,
                            responsive: [{
                                breakpoint: g.bpSet("md"),
                                settings: {
                                    centerMode: !1,
                                    infinite: !1,
                                    swipeToSlide: !0,
                                    variableWidth: !1,
                                    draggable: !1,
                                    touchMove: !1,
                                    slidesToShow: 5,
                                    slidesToScroll: 5,
                                    useCSS: !1
                                }
                            }, {
                                breakpoint: g.bpSet("sm"),
                                settings: {
                                    centerMode: !1,
                                    infinite: !1,
                                    swipeToSlide: !0,
                                    variableWidth: !1,
                                    draggable: !1,
                                    touchMove: !1,
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    useCSS: !1
                                }
                            }, {
                                breakpoint: g.bpSet("xs"),
                                settings: {
                                    centerMode: !1,
                                    infinite: !1,
                                    swipeToSlide: !0,
                                    variableWidth: !1,
                                    draggable: !1,
                                    touchMove: !1,
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    useCSS: !1
                                }
                            }]
                        };
                    0 == Z.hasClass(la) && h(f), g.ev.on(g.events.afterTabActiveChanged, function (b, c) {
                        b.preventDefault(), c.has(Z).length > 0 && (a.innerWidth < g.bpSet("sm") || h(f))
                    })
                });
            b.tdTabsCarouselModules || (b.tdTabsCarouselModules = {
                uid: 0
            }), b.fn.tdTabsCarousel = g.getPluginDef(d, "tdTabsCarousel"), b.fn.tdTabsCarousel.defaults = {}, b(".td-tabs-carousel-container-icon-link-only-slider").tdTabsCarousel(), b(".td-product-service-icon-links").css("opacity", "1").slideDown(300)
        }(a)
    }],
    td_rq_equal_height_row: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = a.document,
                f = d.bpSet("lg"),
                g = d.bpSet("md"),
                h = d.bpSet("sm"),
                i = function (i, j) {
                    function k() {
                        w && x && A.addClass(x), r.hasClass("ready") || r.addClass("ready")
                    }

                    function l() {
                        b(e).ready(function () {
                            setTimeout(function () {
                                m(k)
                            }, 1e3)
                        }), c.resize(function () {
                            setTimeout(function () {
                                m(k)
                            }, 500)
                        }), d.ev.on(d.events.afterTabActiveChanged + " " + d.events.afterExpandForOthers, function (a, b) {
                            a.preventDefault(), setTimeout(function () {
                                m(k)
                            }, 100)
                        })
                    }

                    function m(a) {
                        A.removeClass(x), r.is(":visible") && n(), a()
                    }

                    function n() {
                        var c;
                        if (a.innerWidth >= h) {
                            c = q();
                            for (var d = 0; d <= c.length - 1; d++) v && o(c[d], v), w && !x && o(c[d], w), o(c[d], u)
                        } else c = q(), b(v).css("height", "auto"), z.css("height", "auto"), b(w).css("height", "auto")
                    }

                    function o(a, c) {
                        var d = p(a, c);
                        b.each(a, function () {
                            b(this).find(c).css("height", d + "px")
                        })
                    }

                    function p(a, c, d) {
                        var e, f = 0,
                            g = !1;
                        return void 0 !== d && void 0 !== d.full && (g = d.full), b.each(a, function () {
                            e = b(this).find(c), e.css({
                                height: "auto"
                            }), f = Math.max(f, e.outerHeight(g))
                        }), f
                    }

                    function q() {
                        var c = 0,
                            d = new Array,
                            e = 0,
                            i = 0,
                            j = 0;
                        return a.innerWidth >= f ? c = B : a.innerWidth >= g ? c = C : a.innerWidth >= h && (c = D), d[e] = new Array, y.each(function (a, f) {
                            (j % c == 0 || 0 == c && 0 != j) && (i = 0, e++, d[e] = new Array), j++, d[e][i] = b(f), i++
                        }), d
                    }
                    var r = b(i),
                        s = b.extend("", b.fn.tdEqualHeightRow.defaults, r.metadata(), j),
                        t = s.card_container,
                        u = s.card_content,
                        v = s.card_head,
                        w = s.card_cta,
                        x = s.cta_custom_css,
                        y = r.find(t),
                        z = y.find(u),
                        A = y.find(w),
                        B = s.lg_cols_per_row,
                        C = s.md_cols_per_row,
                        D = s.sm_cols_per_row;
                    l()
                };
            b.fn.tdEqualHeightRow = d.getPluginDef(i, "tdEqualHeightRow"), b.fn.tdEqualHeightRow.defaults = {
                card_container: ".td-service",
                card_content: ".td-callout",
                card_head: null,
                card_cta: ".td-cta-button",
                cta_custom_css: null,
                sm_cols_per_row: 2,
                md_cols_per_row: 2,
                lg_cols_per_row: 4
            }, b(".td_rq_equal_height_row").tdEqualHeightRow()
        }(a)
    }],
    td_rq_special_offer_banner: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = a.document,
                f = (d.bpSet("md"), d.bpSet("sm")),
                g = function (a, g) {
                    function h() {
                        b(e).ready(function () {
                            setTimeout(function () {
                                i()
                            }, 10)
                        }), i(), d.ev.on(d.events.afterTabActiveChanged + " " + d.events.afterExpandForOthers, function (a, b) {
                            a.preventDefault(), i()
                        })
                    }

                    function i() {
                        var a = d.getEqualHeight(k);
                        c.width() >= f ? k.css("height", a + "px") : k.css("height", "auto")
                    }
                    var j = b(a),
                        k = (b.extend(b.fn.tdSpecialOfferBanner.defaults, j.metadata(), g), j.find(".so-feature-subtext"));
                    h(), c.resize(function () {
                        i()
                    })
                };
            b.fn.tdSpecialOfferBanner = d.getPluginDef(g, "tdSpecialOfferBanner"), b.fn.tdSpecialOfferBanner.defaults = {}, b(".td_rq_special-offer-banner").tdSpecialOfferBanner()
        }(a)
    }],
    td_rq_custom_width_tbl: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = b(a),
                d = a.g,
                e = (a.document, d.bpSet("lg")),
                f = d.bpSet("md"),
                g = d.bpSet("sm"),
                h = function (d, h) {
                    var i = {},
                        j = b(d),
                        k = b.extend(b.fn.tdCustomWidthTbl.defaults, j.metadata(), h),
                        l = [k.width_lg, k.width_md, k.width_sm, k.width_xs],
                        m = b(j.find("table")[0]),
                        n = m.find("col"),
                        o = n.length;
                    return i = {
                        init: function () {
                            i.settings = k, i.adjustLayout(), c.resize(function () {
                                i.adjustLayout()
                            })
                        },
                        setWidth: function () {
                            var c = a.innerWidth,
                                d = "";
                            d = c >= e ? 0 : c >= f ? 1 : c >= g ? 2 : 3;
                            for (var h = 0; h < o; h++) {
                                var i = l[d]["col" + (h + 1)];
                                void 0 === i && (i = 100 / o + "%"), b(n[h]).css("width", i)
                            }
                        },
                        showComponent: function () {
                            m.hasClass("ready") || m.addClass("ready")
                        },
                        adjustLayout: function () {
                            m && o > 0 && i.setWidth(), i.showComponent()
                        }
                    }, b.extend(i), i.init(), i
                };
            b.fn.tdCustomWidthTbl = d.getPluginDef(h, "tdCustomWidthTbl"), b.fn.tdCustomWidthTbl.defaults = {
                width_lg: "",
                width_md: "",
                width_sm: "",
                width_xs: ""
            }, b(".td_rq_custom_width_tbl").tdCustomWidthTbl()
        }(a)
    }],
    td_rq_custom_dropdown: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = a.g,
                d = function (a, c) {
                    function d() {
                        if ("" == o) {
                            if (A.find(t).on("click", function (a) {
                                    e(a)
                                }), A.find(t + " " + v).on("click", function (a) {
                                    a.stopPropagation()
                                }), A.find(y).children("a").each(function () {
                                    b(this).attr("aria-expanded", "false"), b(this).attr("role", "button"), b(this).addClass("active")
                                }), p) {
                                j(b("html")[0].lang)
                            }
                            if (q) {
                                var a = B.width("auto").width();
                                B.width(a), A.width(a)
                            }
                        } else p && j(o)
                    }

                    function e(a) {
                        var c = 300,
                            d = b(a.currentTarget),
                            e = d.find(v);
                        d.hasClass(u) ? (e.slideUp(c, function () {
                            d.removeClass(u)
                        }), d.children("a").attr("aria-expanded", "false"), g(A)) : (f(A), d.addClass(u), e.slideDown(c), e.find("li:first-child a").focus(), d.children("a").attr("aria-expanded", "true"))
                    }

                    function f(a) {
                        var c = b("<span class='accessibility'>");
                        c.attr("tabindex", "0"), c.on("focus", function (a) {
                            b(a.currentTarget).parents(w).find("a:visible,button:visible").first().focus()
                        }), a.append(c);
                        var d = b("<span class='accessibility'>");
                        d.attr("tabindex", "0"), d.on("focus", function (a) {
                            b(a.currentTarget).parents(w).find(y + ":visible").last().find("a:visible").focus()
                        }), a.prepend(d)
                    }

                    function g(a) {
                        a.children("span.accessibility").remove()
                    }

                    function h() {
                        k.find(z + " a.selected").each(function () {
                            var a = b(this);
                            a.removeClass("selected"), a.removeAttr("tabindex")
                        }), A.find(v + " li").each(function () {
                            var a = b(this);
                            a.removeClass("active"), a.find("span.accessibility").remove()
                        }), A.find(t + ">a")[0] && (A.find(t + ">a")[0].innerHTML = m + s)
                    }

                    function i(a) {
                        A.find(v + " li").each(function () {
                            var c = b(this);
                            if (c.attr("lang") == a) {
                                var d = A.find(t + ">a")[0];
                                return d.innerHTML = c[0].innerText + s, b(d).attr("lang", a), c.addClass("active"), c.children("a").append('<span class="accessibility td-icon selected" aria-hidden="true"></span><span class="accessibility td-forscreenreader">' + n + "</span></a>"), !1
                            }
                        })
                    }

                    function j(a) {
                        h(), "-1" != jQuery.inArray(a, r) ? k.find(z + " a").each(function () {
                            var c = b(this);
                            a == c.attr("lang") && (c.addClass("selected"), c.attr("tabindex", -1))
                        }) : i(a)
                    }
                    var k = b(a),
                        l = b.extend(b.fn.tdCustomDropdown.defaults, k.metadata(), c),
                        m = l.dd_select,
                        n = l.dd_selected,
                        o = l.default_item,
                        p = l.is_language_selector,
                        q = l.is_dynamic_width,
                        r = l.arr_langLinks,
                        s = '<span class="td-icon expand"></span><span class="td-icon collapse"></span>',
                        t = ".td-accordion",
                        u = "td-accordion-active",
                        v = ".td-accordion-content",
                        w = ".dropdown-container",
                        x = ".dropdown-list",
                        y = ".dropdown-list-item",
                        z = ".lang_links",
                        A = k.find(w),
                        B = k.find(x);
                    d()
                };
            b.fn.tdCustomDropdown = c.getPluginDef(d, "tdCustomDropdown"), b.fn.tdCustomDropdown.defaults = {
                default_item: "",
                dd_select: "Please Select",
                dd_selected: "Selected",
                is_language_selector: !1,
                is_dynamic_width: !0,
                arr_langLinks: ["en-CA", "fr-CA", "zh-Hans", "zh-Hant"]
            }, b(".td_rq_custom-dropdown").tdCustomDropdown()
        }(a)
    }],
    td_rq_region_selector: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.g),
                d = (a.document, c.bpSet("sm"), function (c, d) {
                    function e() {
                        o.find(".close-button-custom").removeClass("show"), b(".rs-copy").removeClass("hide"), b(".rs-copy2").addClass("hide"), b(".rs-notInCanada").length > 0 && b(".rs-para").removeClass()
                    }

                    function f() {
                        a.dispatchEvent(t)
                    }

                    function g(a) {
                        var c = o.find(".td_rq_scrollbar");
                        c.animate({
                            scrollTop: b(a).offset().top - c.offset().top + c.scrollTop() - c.height() / 2
                        }, "500", "swing")
                    }

                    function h() {
                        var a = b(this).parent();
                        l = a.find("label").text(), b(".td-region-selector .rs-selectedProvince").html(l), o.find(".close-button-custom").removeClass("show"), a.find(".close-button-custom").addClass("show"), b(".rs-copy").addClass("hide"), b(".rs-copy2").removeClass("hide"), b(".rs-notInCanada").length > 0 && b(".rs-para").hide(), f(), g(this)
                    }

                    function i() {
                        b("#" + n).prop("checked", !0), b(".rs-selectedProvince").html(m), e()
                    }

                    function j() {
                        b(".rs-selectedProvince").html(l), m = l, n = b("input[name=radioProvinces]:checked").attr("id"), e()
                    }

                    function k() {
                        if ("" != s) {
                            b("input[type=radio][name=radioProvinces]").off("change"), p.off("click.cancel"), q.off("click.save");
                            var a = b("input[type=radio][name=radioProvinces][value=" + s + "]");
                            a.prop("checked", !0), b(".td-region-selector .rs-selectedProvince").html(a.parent().find("label").text())
                        }
                        m = b("input[name=radioProvinces]:checked").length > 0 ? b("input[name=radioProvinces]:checked").parent().find("label").text() : "", n = b("input[name=radioProvinces]:checked").length > 0 ? b("input[name=radioProvinces]:checked").attr("id") : "", b("input[type=radio][name=radioProvinces]").on("change", h), p.on("click.cancel", i), q.on("click.save", j)
                    }
                    var l, m, n, o = b(c),
                        p = o.find(".td-modal-header .close-button"),
                        q = o.find(".close-button-custom"),
                        r = b.extend(b.fn.tdRegionSelector.defaults, o.metadata(), d),
                        s = r.province,
                        t = a.document.createEvent("UIEvents");
                    t.initUIEvent("resize", !0, !1, a, 0), k()
                });
            b.fn.tdRegionSelector = c.getPluginDef(d, "tdRegionSelector"), b.fn.tdRegionSelector.defaults = {
                province: ""
            }, b(".td_rq_region-selector").tdRegionSelector()
        }(a)
    }],
    td_rq_floating_cta: [function (a) {
        "use strict";
        ! function (a) {
            var b = a.jQuery,
                c = (b(a), a.document),
                d = (b(c), g.bpSet("lg")),
                e = g.bpSet("md"),
                f = g.bpSet("sm"),
                h = function (c, h) {
                    var i = {},
                        j = {},
                        k = {},
                        l = b(c),
                        m = b.extend(b.fn.floatingCTA.defaults, l.metadata(), h),
                        n = m.scroll.start,
                        o = m.scroll.startInx,
                        p = m.scroll.end,
                        q = m.scroll.endInx,
                        r = m.disable,
                        s = l.find(".fcta-container");
                    return b(p).length < 1 && (p = "footer"), i.start_el = b(b(n)[o]), i.end_el = b(b(p)[q]), i.full_width = s.hasClass("full-width"), i.headerHeight, i.ctaHeight = l.height(), i.ctaHeightExtra = i.ctaHeight + 3, i.disableBP = {
                        xs: !1,
                        sm: !1,
                        md: !1,
                        lg: !1
                    }, i.disabled = !1, i.overlap_status = !1, i.userScroll = !1, i.cta_hidden, i.innerWidth, j = {
                        init: function () {
                            r && r.length > 0 && (i.disableBP.xs = r.indexOf("xs") >= 0, i.disableBP.sm = r.indexOf("sm") >= 0, i.disableBP.md = r.indexOf("md") >= 0, i.disableBP.lg = r.indexOf("lg") >= 0), j.adjustLayout(), k.ev_userscroll(), k.ev_on_scroll(), k.ev_on_resize(), k.ev_on_afterModalHidden()
                        },
                        adjustLayout: function () {
                            if (i.disabled = !1, i.cta_hidden = !0, 0 == i.start_el.length || 0 == i.end_el.length ? i.disabled = !0 : (i.innerWidth = a.innerWidth, i.innerWidth < f && i.disableBP.xs && (i.disabled = !0), i.innerWidth >= f && i.innerWidth < e && i.disableBP.sm && (i.disabled = !0), i.innerWidth >= e && i.innerWidth < d && i.disableBP.md && (i.disabled = !0), i.innerWidth >= d && i.disableBP.lg && (i.disabled = !0)), i.headerHeight = b(".td-header-nav").height(), l.css("top", i.headerHeight - i.ctaHeightExtra + "px"), i.ctaHeight = l.height(), i.innerWidth < f || i.full_width) l.css("left", 0).css("width", "100%"), s.css("width", "100%");
                            else {
                                var c = l.outerWidth() / 2;
                                l.css("left", "calc(50% - " + c + "px)").css("width", "auto"), s.css("width", "auto")
                            }
                        },
                        notAfterStartingElement: function (c) {
                            var d = b(c);
                            return d.offset().top + d.outerHeight() - i.headerHeight > b(a).scrollTop()
                        },
                        isEndingElementOverlapped: function (a) {
                            var c = b(a),
                                d = c.offset().top,
                                e = l.offset().top,
                                f = e + i.ctaHeight;
                            return l.is(":visible") ? d <= f + 30 : d <= f + i.ctaHeight + 30
                        }
                    }, k = {
                        toggleCTA: function () {
                            if (i.disabled) return l.hide(), void(i.cta_hidden = !0);
                            i.userScroll = !0, i.notAfterStartingElement(i.start_el) || i.isEndingElementOverlapped(i.end_el) ? i.cta_hidden || (i.cta_hidden = !0, l.stop().animate({
                                duration: 200,
                                top: i.headerHeight - i.ctaHeightExtra + "px"
                            }, function () {
                                l.hide()
                            })) : i.cta_hidden && (i.cta_hidden = !1, l.stop().show().animate({
                                duration: 200,
                                top: i.headerHeight + "px"
                            }))
                        },
                        ev_on_resize: function () {
                            b(a).on("resize", function () {
                                var b = a.innerWidth;
                                i.innerWidth != b && setTimeout(function () {
                                    j.adjustLayout(), k.toggleCTA()
                                }, 150)
                            })
                        },
                        ev_userscroll: function () {
                            b(a).on("pageshow", function (a) {
                                l.hide(), i.cta_hidden = !0, setTimeout(function () {
                                    i.userScroll = !0
                                }, 50)
                            })
                        },
                        ev_on_scroll: function () {
                            b(a).on("scroll", function (a) {
                                i.userScroll && k.toggleCTA()
                            })
                        },
                        ev_on_afterModalHidden: function () {
                            g.ev.on(g.events.afterModalHidden, function () {
                                i.userScroll = !1, setTimeout(function () {
                                    k.toggleCTA()
                                }, 50)
                            }), g.ev.on(g.events.afterCompareModalHidden, function () {
                                k.ev_on_scroll()
                            })
                        }
                    }, b.extend(i, j, k), i.init(), i
                };
            b.fn.floatingCTA = g.getPluginDef(h, "floatingCTA"), b.fn.floatingCTA.defaults = {
                scroll: {
                    start: "section",
                    startInx: 0,
                    end: "footer",
                    endInx: 0
                },
                disable: []
            }, b(".td_rq_floating-cta").floatingCTA()
        }(a)
    }]
}), $(".td_rq_top-message") && $(".td_rq_top-message").length > 0 && processEMSMessage();