import _ from 'lodash'
import eventManager from './eventBus'

(function(t) {
		t.widget("block.finChart", {
			options: {
				range: null,
				series: null,
				end: null,
				userTimezoneToDisplay: "",
				maxPoints: 500,
				defaultState: {
					zoom: 10
				},
				initialState: {},
				saveStateUrl: "",
				periods: {
					M1: 60,
					M3: 180,
					M5: 300,
					M15: 900,
					M30: 1800,
					H1: 3600,
					H4: 14400,
					D1: 86400,
					D7: 604800,
					"1M": 2592e3
				},
				estimateDigitWidth: 8,
				emaPeriod: 5,
				secondEmaPeriod: 10,
				emaEnabled: 0,
				saveState: !0,
				separatedWindowUrl: "",
				selfDomain: ""
			},
			_create: function() {
				etLog(`_create`);
				var e = this;
				this._super(), this.cachedData = null, this.chartState = _.isEmpty(this.options.initialState) ? this.options.defaultState : this.options.initialState, this.$configurator = t("#configurator").data("blockConfigurator"), this.$updater = t(".updater").data("blockUpdater"), this._rendered = !1, this._sizeCache = {}, this.connectionEstablished = !1, this.loadingDone = !0, this.socketBehaviorRunning = !1, this._timer(), this.mobile = !1, this._currentEMAs = {}, this.period = this.options.periods[void 0 !== t.cookie("hitbtcPeriod") ? t.cookie("hitbtcPeriod") : "D1"];
				var i = this._getWidth(),
					n = this._getHeight();
				this.chart = window.tickp("#chart", {
					plotwidth: i - 105,
					plotht: n,
					rmargin: 105
				}), this.chart.marketsOptions = this.options.marketsOptions, this.chart.setUserTimezoneToDisplay(this.options.userTimezoneToDisplay);
				var s = this.window.getTheme();
				this.chart.setTheme(null != s ? s : "default"), eventManager.on("theme", function() {
					var t = this.window.getTheme();
					this.chart.setTheme(null != t ? t : "default"), this.refreshChart()
				}.bind(this)), this.$periodItem = this._elem("periodItem"), this.$period = this._elem("period"), this.$zoom_plus = t(".finChart__zoom_plus"), this.$zoom_minus = t(".finChart__zoom_minus"), this.$openNewWindow = t(".finChart__openWindow"), this.$overlay = this._elem("overlay"), this.$sub_window = this.element.parents(".window__window"), this.$sub_window.on("mobileWindow", t.proxy(function() {
					this._mobileView()
				}, this)), this.$sub_window.on("desktopWindow", t.proxy(function() {
					this._desktopWindow()
				}, this)), this._changePeriod(), this._switchChart(), this.element.passScroll(null, {
					preventDefault: !1,
					mouseMaxMove: 20
				}), this._scroll(), this.$period.show(), this.$zoom_plus.on("click", t.proxy(function() {
					this._zoom(!0)
				}, this)), this.$zoom_minus.on("click", t.proxy(function() {
					this._zoom(!1)
				}, this)), this._updater(), setTimeout(function() {
					e.socketBehaviorRunning || e.onConnection()
				}, 500), eventManager.on("terminal__setPeriod", t.proxy(function(t) {
					this.changePeriod(t.period), this._updateRMargin(), _.isUndefined(this.cachedData) || (this.refreshChart(), this.onLoadingDone()), this._saveChartState()
				}, this)), eventManager.on("terminal__setSymbol", function() {
					this.chart.clear(), this.cachedData = null, this.clearChartCache(), this._subscribeCandles(this.$configurator.getCurrentSymbol(), this.$configurator.getCurrentPeriod())
				}.bind(this)), this.$window.bind("windowonresize", t.proxy(function() {
					this._invalidateSizeCache(), this._updateRMargin(), _.isUndefined(this.cachedData) || this.refreshChart()
				}, this)), this.$window.bind("windowresize", t.proxy(function() {
					this._invalidateSizeCache(), this._updateRMargin(), _.isUndefined(this.cachedData) || this.refreshChart()
				}, this)), this.$window.bind("windowmove", t.proxy(function() {
					this._invalidateSizeCache(), this.chart.updateOptions({
						widgetOffset: this.element.offset()
					}), _.isUndefined(this.cachedData) || this.refreshChart()
				}, this)), eventManager.on("trend_line", t.proxy(function(t) {
					this.chart.lastPrice = new BigNumber(t.lastPrice), this.chart.trend = t.trend
				}, this)), eventManager.on("terminal.helper.line", t.proxy(function(e) {
					this.chart._setHelperLine(e), this.refreshChart(), this.onLoadingDone();
					var i = "__helperLineTimeout_" + (e.buy ? "buy" : "sell");
					clearInterval(this[i]), this[i] = setTimeout(t.proxy(function() {
						this.chart._removeHelperLine(e.buy), this.refreshChart(), this.onLoadingDone()
					}, this), 5e3)
				}, this)), eventManager.on("ioConnectionState", function(t) {
					t && this._subscribeCandles(this.$configurator.getCurrentSymbol(), this.$configurator.getCurrentPeriod())
				}.bind(this)), eventManager.on("terminal.helper.hide_line", t.proxy(function(t) {
					this.chart._removeHelperLine(t.buy), this.refreshChart()
				}, this)), eventManager.on("chart_ema_state", function(t) {
					var i = +t.first,
						n = +t.second;
					if ((+t.first != e.options.emaPeriod || n != e.options.secondEmaPeriod || t.enabled != e.options.emaEnabled) && (e.options.emaPeriod = i, e.options.secondEmaPeriod = n, e.options.emaEnabled = t.enabled, null != e.cachedData)) {
						var s = e._convertData(e.cachedData.chart),
							o = !(e.chartState.period != e._getPeriod() || e.chartState.symbol != e._getSymbol());
						e._redraw(s, o)
					}
				}), this._sepWindows = {}, this.$openNewWindow.click(function() {
					e._openInNewWindow({
						directories: "no",
						titlebar: "no",
						toolbar: "no",
						location: "no",
						status: "no",
						menubar: "no",
						scrollbars: "no",
						fullscreen: "no",
						width: e.$window.width(),
						height: e.$window.height() - 10,
						top: Math.floor(e.$window.offset().top) - t(window).scrollTop(),
						left: Math.floor(e.$window.offset().left)
					})
				}), this.chart.clear(), this.onLoading(!0)
			},
			_updateRMargin: function() {
				if (null != this.cachedData) {
					var t = this._getWidth(),
						e = this._getHeight(),
						i = this.element.find("canvas"),
						n = this.$configurator.getSymbol(this._getSymbol()),
						s = n.price_length,
						o = _.max(this.cachedData.chart, function(t) {
							return t.volumeQuote
						}).volumeQuote,
						r = _.max(this.cachedData.chart, function(t) {
							return t.max
						}).max;
					s += (Math.ceil(r) + " ").length;
					var a, l = (a = "" + (a = o == 1 / 0 || o == -1 / 0 ? 1 : o > 1e3 ? 1e3 * Math.ceil(o / 1e3) : o > 100 ? 100 * Math.ceil(o / 100) : 0 == (a = Math.ceil(o)) ? 1 : a)).length + n.price_length,
						h = (l > s ? l : s) * this.options.estimateDigitWidth;
					i.attr({
						width: t,
						height: e + 70
					}), this.chart.updateOptions({
						plotwidth: t - h - 14,
						rmargin: h + 14,
						plotht: e
					})
				}
			},
			_openInNewWindow: function(t) {
				var e = this._getSymbol(),
					i = e + "_chart",
					n = this;
				if (null == this._sepWindows[i]) {
					var s = window.open(this.options.separatedWindowUrl + "/" + e, i, _.reduce(t, function(t, e, i) {
						return t.concat([i + "=" + e])
					}, []).join(","));
					s.addEventListener("beforeunload", function(t) {
						delete n._sepWindows[i]
					}, !1), this._sepWindows[i] = s
				} else this._sepWindows[i].focus()
			},
			_mobileView: function() {
				this._invalidateSizeCache(), this._switchToHit(!1), this.mobile = !0
			},
			_desktopWindow: function() {
				this._invalidateSizeCache(), !this.options.currentHit && this.isTradingViewEnabled() && this._switchToTV(!1), this.mobile = !1
			},
			_getPeriod: function() {
				return this.$configurator.getCurrentPeriod()
			},
			_getSymbol: function() {
				return this.$configurator.getCurrentSymbol()
			},
			_getWidth: function() {
				var t = this._getWidthCache();
				return null == t && (t = this.$window.width() - 5, this._saveSizeCache({
					width: t
				})), t
			},
			_getHeight: function() {
				var t = this._getHeightCache();
				return null == t && (t = this.$window.height() - (this.mobile ? 144 : 124), this._saveSizeCache({
					height: t
				})), t
			},
			_getWidthCache: function() {
				return null != this._sizeCache ? this._sizeCache.width : null
			},
			_getHeightCache: function() {
				return null != this._sizeCache ? this._sizeCache.height : null
			},
			_saveSizeCache: function(t) {
				null == this._sizeCache ? this._sizeCache = t : this._sizeCache = _.assign({}, this._sizeCache, t)
			},
			_invalidateSizeCache: function() {
				this._sizeCache = null
			},
			_saveChartState: function() {
				this.chartState.period = this._getPeriod(), this.chartState.symbol = this._getSymbol(), this._rendered && (this.chartState.zoom = this._getZoom()), this.options.saveState && this._debouncedSendState();
				var t = this.$configurator.getSymbol(this.chartState.symbol),
					e = t.is_frozen ? "<small>Frozen</small>" : "";
				this._elem("state-text").html(t.name + " " + e)
			},
			_debouncedSendState: _.debounce(function() {
				t.post(this.options.saveStateUrl, {
					state: JSON.stringify(this.chartState)
				})
			}, 200),
			_redraw: function(t, e) {
				var i = this.$configurator.getSymbol(this._getSymbol()),
					n = {
						first: [],
						second: []
					};
				this.options.emaEnabled && (_.forEach(this._currentEMAs.first, function(t) {
					n.first[t.ts] = t.val
				}), _.forEach(this._currentEMAs.second, function(t) {
					n.second[t.ts] = t.val
				})), this.chart.setData(t, e, i.price_length, i.amount_length, n), this.chart.setZoomLevelNoRedraw(this.chartState.zoom), this._updateRMargin(), e || this.chart.resetVScale(!1), this.chart.plot(), this.chart.recalcMidnightPoses()
			},
			clearChartCache: function() {
				this.chart.clearCache()
			},
			_zoom: function(t) {
				this.chart.zoom(t), this._saveChartState()
			},
			_getZoom: function() {
				return this.chart.getZoomLevel()
			},
			_setZoom: function(t) {
				this.chart.setZoomLevel(t)
			},
			update: function(t) {
				var e, i, n, s, o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
				_.isEmpty(t.chart) || (this._rendered = !0);
				var r = t.full;
				if (e = !(this.chartState.period != this._getPeriod() || this.chartState.symbol != this._getSymbol()), (i = new Date).setUTCMinutes(i.getMinutes() + 1, 0, 0), this.options.end = Math.floor(i.getTime() / 1e3), !_.isUndefined(t.chart))
					if (s = Object.keys(t.chart), (n = s.length ? +s[s.length - 1] : 0) + 60 > this.options.end && (this.options.end = n + 60), s.length) {
						if (r) {
							this._cacheData(t);
							var a = this._convertData(t.chart)
						} else {
							null == this.cachedData.chart && (this.cachedData.chart = {});
							for (var l in t.chart) this.cachedData.chart[l] = t.chart[l];
							a = this._convertData(this.cachedData.chart)
						}
						this._redraw(a, e)
					} else this._cacheData({
						full: !0,
						chart: []
					}), this._redraw([
						[0, 0, 0, 0, 0]
					], e);
				e || (this._saveChartState(), this._clearUpdater(), this._updater());
				var h = this.$configurator.getSymbol(this.chartState.symbol),
					c = h.is_frozen ? "<small>Frozen</small>" : "";
				this._elem("state-text").html(h.name + " " + c), o && this.onLoadingDone()
			},
			refreshChart: function() {
				null != this.cachedData ? this.update(this.cachedData, !1) : this.update({
					full: !0,
					chart: []
				}, !1)
			},
			_convertData: function(t) {
				if (0 === t.length) return [];
				if (_.isUndefined(t)) return !1;
				var e, i, n, s = [];
				e = !1 === (e = this._getFirstChild(t)) ? 0 : +e, this.period = this.options.periods[t[e].type], n = (i = this._calcCandlesCount(e, this.options.end, t[e].type, this.period)) > this.options.maxPoints ? i - this.options.maxPoints : 0;
				var o, r = 2 / (this.options.emaPeriod + 1),
					a = 2 / (this.options.secondEmaPeriod + 1);
				this._currentEMAs.first = [], this._currentEMAs.second = [];
				for (var l = n; l < i; l++) {
					var h, c, u = this._calcTsByNdx(e, l, t[e].type);
					t[u] && t[u].volume && 0 !== t[u].volume ? (this.options.emaEnabled && (h = 0 == this._currentEMAs.first.length ? t[u].close : t[u].close * r + (1 - r) * this._currentEMAs.first[this._currentEMAs.first.length - 1].val, this._currentEMAs.first.push({
						ts: 1e3 * u,
						val: h
					}), c = 0 == this._currentEMAs.second.length ? t[u].close : t[u].close * a + (1 - a) * this._currentEMAs.second[this._currentEMAs.second.length - 1].val, this._currentEMAs.second.push({
						ts: 1e3 * u,
						val: c
					})), s[l] = [1e3 * u, t[u].open, t[u].max, t[u].min, t[u].close, t[u].volumeQuote], o = t[u]) : _.isUndefined(o) ? s[l] = [1e3 * u] : (this.options.emaEnabled && (h = 0 == this._currentEMAs.first.length ? o.close : o.close * r + (1 - r) * this._currentEMAs.first[this._currentEMAs.first.length - 1].val, this._currentEMAs.first.push({
						ts: 1e3 * u,
						val: h
					}), c = 0 == this._currentEMAs.second.length ? o.close : o.close * a + (1 - a) * this._currentEMAs.second[this._currentEMAs.second.length - 1].val, this._currentEMAs.second.push({
						ts: 1e3 * u,
						val: c
					})), s[l] = [1e3 * u, o.close, o.close, o.close, o.close, 0])
				}
				return s
			},
			_calcTsByNdx: function(t, e, i) {
				switch (i) {
					case "1M":
						return +moment.utc(1e3 * t).add(e, "months").startOf("month") / 1e3;
					default:
						return t + this.period * e
				}
			},
			_calcCandlesCount: function(t, e, i, n) {
				switch (i) {
					case "1M":
						for (var s = 1, o = moment(1e3 * t); !o.isSame(moment(1e3 * e), "month");) s++, o = o.add(1, "months");
						break;
					default:
						s = Math.ceil((e - t) / n)
				}
				return s
			},
			_cacheData: function(t) {
				this.cachedData = t
			},
			_getFirstChild: function(t) {
				if (_.isUndefined(t)) return !1;
				var e = Object.keys(t);
				return e.length > 0 && e[0]
			},
			_changePeriod: function() {
				var e = this;
				e.$periodItem.on("click", function() {
					e.$configurator.setCurrentPeriod(t(this).data("value"))
				})
			},
			changePeriod: function(e, i) {
				var n = t(this._elem("periodItem[data-value=" + e + "]")[0]);
				this._clearActiveMenu(), this._setActiveMenu(n), this.chart.resetVScale(), _.isUndefined(i) && 1 == i && this.clearChartCache(), this._subscribeCandles(this.$configurator.getCurrentSymbol(), this.$configurator.getCurrentPeriod())
			},
			_switchChart: function() {
				var e = this;
				e.$oldZoom = t(".finChart__zoom"), e.options.currentHit || e.$oldZoom.hide(), t("#switcherToHit a").on("click", function() {
					return e._switchToHit(!0), e.$oldZoom.show(), !1
				}), t("#switcherToTv a").on("click", function() {
					return e.$oldZoom.hide(), e._switchToTV(!0), !1
				})
			},
			_switchToTV: function(e) {
				eventManager.emit("show_tv_chart"), t("#switcherToTv").hide(), t("#switcherToHit").show(), t("#chart").hide(), t("#chartTv").show(), !0 === e && (this.options.currentHit = !1, t.cookie("tradingViewChart", "1", {
					expires: 30,
					path: "/"
				}))
			},
			_switchToHit: function(e) {
				t("#switcherToTv").show(), t("#switcherToHit").hide(), t("#chart").show(), t("#chartTv").hide(), eventManager.emit("show_hit_chart"), this.chart.updateOptions({
					widgetOffset: this.element.offset()
				}), _.isUndefined(this.cachedData) || this.refreshChart(), !0 === e && (this.options.currentHit = !0, t.cookie("tradingViewChart", "0", {
					expires: 30,
					path: "/"
				})), this._subscribeCandles(this.$configurator.getCurrentSymbol(), this.$configurator.getCurrentPeriod())
			},
			_subscribeCandles: function(e, i) {
				null == this.$updater && (this.$updater = t(".updater").data("blockUpdater")), null != this.$updater && !this.$updater.isCandlesticksSubscribed(e, i) && this.options.currentHit && this.$updater.subscribeCandlesticks(e, i)
			},
			_clearActiveMenu: function() {
				var e = t("." + this._getModElemClass("periodItem", "active"));
				this._delMod(e, "active")
			},
			_setActiveMenu: function(t) {
				this._setMod(t, "active")
			},
			_scroll: function() {
				var e = !1,
					i = this,
					n = null;
				this.element.on("mousewheel", t.proxy(function(t, i) {
					e && (this._zoom(i > 0), t.preventDefault(), t.stopImmediatePropagation())
				}, this)), this.$window.on("click", "*", function() {
					i.element.find("canvas").focus()
				}), this.$window.on("focusin", function() {
					null == n && (n = setTimeout(function() {
						e = !0
					}, 80))
				}), this.$window.on("focusout", function() {
					e = !1, clearTimeout(n), n = null
				})
			},
			_timer: function() {
				var t = this;
				setInterval(function() {
					t.options.end += t.options.periods.M1
				}, 6e4)
			},
			_updater: function() {
				var t = this;
				this.interval = setInterval(function() {
					t.refreshChart()
				}, 1e3 * t.period)
			},
			_clearUpdater: function() {
				clearInterval(this.interval)
			},
			onConnection: function() {
				this.socketBehaviorRunning = !0, this.connectionEstablished = !0, this._elem("overlay_notice").hide(), this._elem("overlay_noticeConnecting").show(), this.$overlay.show(), this._subscribeCandles(this.$configurator.getCurrentSymbol(), this.$configurator.getCurrentPeriod())
			},
			onConnectionError: function() {
				this.socketBehaviorRunning = !0, this.connectionEstablished = !1, this._elem("overlay_notice").hide(), this._elem("overlay_noticeNotConnected").show(), this.$overlay.show()
			},
			onConnectionFailed: function() {
				this.socketBehaviorRunning = !0, this.connectionEstablished = !1, this._elem("overlay_logo").addClass("died"), this._elem("overlay_notice").hide(), this._elem("overlay_noticeConnectionFailed").show(), this.$overlay.show()
			},
			onConnectionEstablished: function() {
				this.socketBehaviorRunning = !0, this.connectionEstablished = !0
			},
			onLoading: function() {
				var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
				if (this.connectionEstablished && this.loadingDone) {
					var e = this;
					e.loadingDone = !1, setTimeout(function() {
						e.loadingDone || (e._elem("overlay_notice").hide(), e._elem("overlay_noticeLoading").show(), e.$overlay.show())
					}, t ? 0 : 100)
				}
			},
			onLoadingDone: function() {
				this.loadingDone = !0, this.$overlay.hide(), this._elem("notice").hide()
			},
			isTradingViewEnabled: function() {
				return this.options.isTradingViewEnabled
			}
		})
	})(jQuery);