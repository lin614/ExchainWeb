<style scoped>
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}

.index h1 {
  height: 150px;
}

.index h1 img {
  height: 100%;
}

.index h2 {
  color: #666;
  margin-bottom: 200px;
}

.index h2 p {
  margin: 0 0 50px;
}

.index .ivu-row-flex {
  height: 100%;
}
</style>
<template>
    <div class="index">
        <header class="header">
            <div class="logo">
                <a href="/"><img src="/static/images/logo_beta.png"></a>
            </div>
            <div class="menu-box">
                <a href="https://exchange.fcoin.com/exchange" class="">交易</a>
                <a href="/aboutft.html" class="">FT</a>
                <a href="/ft.pdf?v=1.3" class="" target="_blank">白皮书</a>
                <a href="/transparent.html">资产透明</a>
                <a href="/gpm.html">创业板</a>
            </div>

            <!-- <div class='getNav'><i class="fa fa-navicon" aria-hidden="true"></i></div> -->
            <div class="notice-box"></div>
            <div class="navbar-nav">
                <div class="lang-box">
                    <div class="select-box">
                        <div class="select-curr">
                            <i class="icon icon-lang"></i>
                            <span>简体中文</span>
                            <i class="icon icon-down"></i>
                        </div>
                        <div class="select-options" id="lang">
                            <div class="option" data-value="zh-cn">简体中文</div>
                            <div class="option" data-value="en-us">English</div>
                        </div>
                    </div>

                </div>
                <div class="user-box">
                    <a href="https://exchange.fcoin.com/u/login" class="login">登录</a>
                    <a href="https://exchange.fcoin.com/u/register" class="register">注册</a>
                </div>
            </div>
            <div class="h5-menu">
                <div class="username">
                    <a href="https://exchange.fcoin.com/u/login">登录</a>/
                    <a href="https://exchange.fcoin.com/u/register">注册</a>
                </div>
                <i class="icon icon-menu" id="h5_menu"></i>
            </div>
        </header>

        <div class="drawer drawer-box" id="menu_box">
            <ul class="drawer-list">
                <li>
                    <a href="https://exchange.fcoin.com/exchange">
                        <i class="icon icon-exchange"></i>交易</a>
                </li>
                <li>
                    <a href="https://exchange.fcoin.com/finance">
                        <i class="icon icon-asset"></i>资产</a>
                </li>
                <li>
                    <a href="https://exchange.fcoin.com/clearing/dw">
                        <i class="icon icon-finance"></i>财务明细</a>
                </li>
                <li>
                    <a href="https://exchange.fcoin.com/orders">
                        <i class="icon icon-order"></i>订单管理</a>
                </li>
                <li>
                    <a href="https://exchange.fcoin.com/setting">
                        <i class="icon icon-user"></i>设置</a>
                </li>

            </ul>
        </div>

        <div class="menu-list" id="menu_list">
            <a href="https://exchange.fcoin.com/exchange" class="">交易</a>
            <a href="/aboutft.html" class="">FT</a>
            <a href="/ft.pdf?v=1.3" class="" target="_blank">白皮书</a>
            <div class="h5-lang">
                <a href="javascript:;" data-value="zh-cn">简体中文</a>
                <a href="javascript:;" data-value="en-us">English</a>
            </div>
        </div>
        <div class="main">
            <div class="block-1 zh-cn">
                <div class="container relative">
                    <h2>资产透明公开，收入返还用户</h2>
                    <div class="info">FCoin是世界首家资产透明的数字资产交易平台，会将平台80%的收入定期分配给FT持有者。</div>
                    <div class="number-box index_data" style="display: block;">
                        <div class="number-item mid">
                            <div class="item">前一日挖矿产出：
                                <i class="turn"></i>
                                <a href="/return_fees.html" target="_blank" title="交易手续费返还">
                                    <span id="ft_count">2019724.97008296</span>
                                    <span>FT</span>
                                </a>
                                <a class="link" href="https://support.fcoin.com/hc/zh-cn/articles/360005046194-%E5%85%B3%E4%BA%8EFCoin-%E4%BA%A4%E6%98%93%E5%8D%B3%E6%8C%96%E7%9F%BF-%E6%9C%BA%E5%88%B6%E7%9A%84%E8%AF%B4%E6%98%8E" target="_blank">[查看挖矿原理]</a>
                            </div>
                            <div class="item mt">FT总流通量：
                                <i class="turn"></i>
                                <span id="ft_circulation">2498374734.11544662</span>
                                <span>FT</span>
                                <a class="link" href="https://support.fcoin.com/hc/zh-cn/articles/360005046434-%E5%85%B3%E4%BA%8EFT%E6%B5%81%E9%80%9A%E9%87%8F-%E5%8F%82%E4%B8%8E%E6%94%B6%E5%85%A5%E5%88%86%E9%85%8D%E6%AF%94%E4%BE%8B%E7%9A%84%E8%AF%B4%E6%98%8E" target="_blank">[查看流通量说明]</a>
                            </div>
                            <div class="item mt">FT二级市场流通量：
                                <i class="turn"></i>
                                <span id="ft_secondary">1623943577.1750405</span>
                                <span>FT</span>
                                <a class="link" href="https://support.fcoin.com/hc/zh-cn/articles/360005878434-Founding-Team%E5%8F%8AFCoin-Fund%E6%8C%81%E6%9C%89FT%E9%94%81%E4%BB%93%E8%AE%A1%E5%88%92" target="_blank">[查看锁仓情况]</a>
                            </div>
                        </div>
                        <div class="number-item dividend_payment" style="display: none;">
                            <div class="tis">今日待分配收入累积折合</div>
                            <div class="number">收入分配发放中</div>
                        </div>
                        <div class="number-item calculating" style="display: none;">
                            <div class="tis">今日待分配收入累积折合</div>
                            <div class="number">清算中</div>
                        </div>
                        <div class="number-item normal" style="display: block;">
                            <div class="tis">今日待分配收入累积折合</div>
                            <div class="number">
                                <a href="/distribution_today.html" target="_blank" title="点击查看详情">
                                    <i class="iconfont icon-socialbitcoin"></i>
                                    <span id="today_summary">35.75253838</span>
                                </a>
                            </div>
                            <div class="check">今日连续持有FT每百万份收入折合：
                                <span class="green">
                                    <i class="iconfont icon-socialbitcoin"></i>
                                    <span id="today_income">0.01431032</span>
                                </span>
                            </div>
                        </div>
                        <div class="number-item">
                            <div class="tis">昨日待分配收入累积折合：</div>
                            <div class="number">
                                <a href="/distribution.html" target="_blank" title="点击查看详情">
                                    <i class="iconfont icon-socialbitcoin"></i>
                                    <span id="prev_summary">107.16984517</span>
                                </a>
                            </div>
                            <div class="check">昨日每百万份FT累积收入折合：
                                <span class="green">
                                    <i class="iconfont icon-socialbitcoin"></i>
                                    <span id="prev_income">0.04282794</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block-2">
                <div class="container relative ">
                    <div class="support-box">
                        <div class="support">
                            <div class="support-title" id="notice_item">公告</div>
                            <div class="support-link">
                                <a href="https://support.fcoin.com/hc/zh-cn/articles/360006531633-%E5%88%9B%E4%B8%9A%E6%9D%BF%E6%96%B0%E5%B8%81%E5%8F%91%E8%A1%8C%E4%BB%B7%E6%A0%BC%E5%85%AC%E7%A4%BA" title="创业板新币发行价格公示" target="_blank">
                                    <i>[07-03] 创业板新币发行价格公示</i>
                                    <span>&gt;</span>
                                </a>
                            </div>
                            <div class="support-link">
                                <a href="https://support.fcoin.com/hc/zh-cn/articles/360006528933-%E5%88%9B%E4%B8%9A%E6%9D%BF%E6%96%B0%E5%B8%81%E4%B8%8A%E7%BA%BF%E8%A7%84%E8%8C%83-2018-07-02-" title="创业板新币上线规范【2018-07-02】" target="_blank">
                                    <i>[07-03] 创业板新币上线规范【2018-07-02】</i>
                                    <span>&gt;</span>
                                </a>
                            </div>
                            <div class="support-link">
                                <a href="https://support.fcoin.com/hc/zh-cn/articles/360006418354-%E5%88%9B%E4%B8%9A%E6%9D%BF%E5%8F%91%E5%B8%83%E6%8E%A8%E8%BF%9F%E5%85%AC%E5%91%8A" title="创业板发布推迟公告" target="_blank">
                                    <i>[07-02] 创业板发布推迟公告</i>
                                    <span>&gt;</span>
                                </a>
                            </div>
                        </div>
                        <div class="support">
                            <div class="support-title">帮助</div>
                            <div class="support-link">
                                <a href="https://support.fcoin.com/hc/zh-cn/articles/360002669933-FCoin%E8%B4%A6%E6%88%B7%E6%B3%A8%E5%86%8C" title="[06-01] FCoin账户注册" target="_blank">
                                    <i>[06-01] FCoin账户注册</i>
                                    <span>&gt;</span>
                                </a>
                            </div>
                            <div class="support-link">
                                <a href="https://support.fcoin.com/hc/zh-cn/articles/360003738993-%E6%8F%90%E5%85%85%E5%B8%81%E5%88%B0%E8%B4%A6%E6%97%B6%E9%97%B4%E5%8F%8A%E9%99%90%E9%A2%9D" title="[06-25] 提充币到账时间及限额" target="_blank">
                                    <i>[06-25] 提充币到账时间及限额</i>
                                    <span>&gt;</span>
                                </a>
                            </div>
                            <div class="support-link">
                                <a href="https://support.fcoin.com/hc/zh-cn/articles/360003740353-FCoin-Token%E4%BB%8B%E7%BB%8D" title="[06-01] FCoin Token介绍" target="_blank">
                                    <i>[06-01] FCoin Token介绍</i>
                                    <span>&gt;</span>
                                </a>
                            </div>
                        </div>
                        <div class="support">
                            <div class="support-title">新闻</div>
                            <div class="support-link">
                                <a href="/listing.html" title="[06-29] FCoin 创业板上币排行公示" target="_blank">
                                    <i>[06-29] FCoin 创业板上币排行公示</i>
                                    <span>&gt;</span>
                                </a>
                            </div>

                            <div class="support-link">
                                <a href="https://support.fcoin.com/hc/zh-cn/articles/360006436313-%E5%BC%95%E5%85%A5-%E4%BA%A4%E6%98%93%E5%8D%B3%E6%8C%96%E7%9F%BF-%E6%9C%BA%E5%88%B6-%E5%88%9B%E9%80%A0%E4%B8%80%E4%B8%AA%E7%AC%A6%E5%90%88%E4%B8%AD%E6%9C%AC%E8%81%AA%E5%88%9D%E5%BF%83%E7%9A%84%E6%AF%94%E7%89%B9%E5%B8%81" title="[06-29] 张健在团队博客发文【引入“交易即挖矿”机制，创造一个符合中本聪初心的比特币】" target="_blank">
                                    <i>[06-29] 张健在团队博客发文【引入“交易即挖矿”机制，创造一个符合中本聪初心的比特币】</i>
                                    <span>&gt;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="blank"></div>
                    <div class="table-box">
                        <div class="table-title">
                            <div class="t-title">主区</div>
                        </div>
                        <div class="table-head" id="symbols_main">
                            <span>交易对</span>
                            <span>最新价格</span>
                            <span>24h波动</span>
                            <span>24h高点</span>
                            <span>24h低点</span>
                            <span>24h交易量</span>
                            <span>去交易</span>
                        </div>

                        <div class="table-item" data-symbol="ftusdt" data-price_decimal="6" data-quote="usdt">
                            <span>FT/USDT</span>
                            <span class="price">0.349946
                                <i> / ¥2.34</i>
                            </span>
                            <span class="rate red">-5.18%</span>
                            <span class="high">0.395000</span>
                            <span class="low">0.340113</span>
                            <span class="volume">55026482.24</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/ft-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="fteth" data-price_decimal="8" data-quote="eth">
                            <span>FT/ETH</span>
                            <span class="price">0.00072398
                                <i> / ¥2.35</i>
                            </span>
                            <span class="rate red">-12.30%</span>
                            <span class="high">0.00087132</span>
                            <span class="low">0.00070000</span>
                            <span class="volume">49832.30</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/ft-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="ftbtc" data-price_decimal="8" data-quote="btc">
                            <span>FT/BTC</span>
                            <span class="price">0.00005275
                                <i> / ¥2.35</i>
                            </span>
                            <span class="rate red">-9.81%</span>
                            <span class="high">0.00006188</span>
                            <span class="low">0.00005104</span>
                            <span class="volume">2438.99</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/ft-btc"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="btcusdt" data-price_decimal="2" data-quote="usdt">
                            <span>BTC/USDT</span>
                            <span class="price">6648.77
                                <i> / ¥44546.76</i>
                            </span>
                            <span class="rate green">+5.41%</span>
                            <span class="high">6697.89</span>
                            <span class="low">6257.69</span>
                            <span class="volume">61724970.94</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/btc-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="ethusdt" data-price_decimal="2" data-quote="usdt">
                            <span>ETH/USDT</span>
                            <span class="price">483.90
                                <i> / ¥3242.13</i>
                            </span>
                            <span class="rate green">+8.24%</span>
                            <span class="high">486.99</span>
                            <span class="low">445.06</span>
                            <span class="volume">51902202.82</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/eth-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="bchusdt" data-price_decimal="2" data-quote="usdt">
                            <span>BCH/USDT</span>
                            <span class="price">821.15
                                <i> / ¥5501.70</i>
                            </span>
                            <span class="rate green">+12.60%</span>
                            <span class="high">832.44</span>
                            <span class="low">719.31</span>
                            <span class="volume">10904200.46</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/bch-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="ltcusdt" data-price_decimal="2" data-quote="usdt">
                            <span>LTC/USDT</span>
                            <span class="price">89.60
                                <i> / ¥600.32</i>
                            </span>
                            <span class="rate green">+13.13%</span>
                            <span class="high">89.83</span>
                            <span class="low">78.12</span>
                            <span class="volume">7411390.07</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/ltc-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="etcusdt" data-price_decimal="2" data-quote="usdt">
                            <span>ETC/USDT</span>
                            <span class="price">16.55
                                <i> / ¥110.89</i>
                            </span>
                            <span class="rate green">+8.10%</span>
                            <span class="high">16.80</span>
                            <span class="low">15.22</span>
                            <span class="volume">4330509.22</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/etc-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="xrpusdt" data-price_decimal="4" data-quote="usdt">
                            <span>XRP/USDT</span>
                            <span class="price">0.5177
                                <i> / ¥3.47</i>
                            </span>
                            <span class="rate green">+13.48%</span>
                            <span class="high">0.5211</span>
                            <span class="low">0.4526</span>
                            <span class="volume">220624.52</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/xrp-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                    </div>

                    <div class="table-box mt">
                        <div class="table-title">
                            <div class="t-title">创新区
                                <div class="tis-box">
                                    <img src="/static/images/index5_20/icon_tis.png">
                                    <div class="innovation-tis">风险提示：创新区数字资产属于新型投资产品，价格波动较大，投资风险较大。在投资前，我们希望您能充分了解目标数字资产，合理判断您自己的投资能力，并认真做出投资决策。</div>
                                </div>
                            </div>
                        </div>
                        <div class="table-head" id="symbols_innovation">
                            <span>交易对</span>
                            <span>最新价格</span>
                            <span>24h波动</span>
                            <span>24h高点</span>
                            <span>24h低点</span>
                            <span>24h交易量</span>
                            <span>去交易</span>
                        </div>

                        <div class="table-item" data-symbol="fieth" data-price_decimal="8" data-quote="eth">
                            <span>FI/ETH</span>
                            <span class="price">0.00079657
                                <i> / ¥2.58</i>
                            </span>
                            <span class="rate red">-32.26%</span>
                            <span class="high">0.00119302</span>
                            <span class="low">0.00075000</span>
                            <span class="volume">33805.80</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/fi-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="fiusdt" data-price_decimal="6" data-quote="usdt">
                            <span>FI/USDT</span>
                            <span class="price">0.385900
                                <i> / ¥2.59</i>
                            </span>
                            <span class="rate red">-26.77%</span>
                            <span class="high">0.543515</span>
                            <span class="low">0.361100</span>
                            <span class="volume">30264859.48</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/fi-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="zipusdt" data-price_decimal="6" data-quote="usdt">
                            <span>ZIP/USDT</span>
                            <span class="price">0.007350
                                <i> / ¥0.05</i>
                            </span>
                            <span class="rate red">-12.91%</span>
                            <span class="high">0.009200</span>
                            <span class="low">0.006500</span>
                            <span class="volume">8772383.23</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/zip-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="zipeth" data-price_decimal="8" data-quote="eth">
                            <span>ZIP/ETH</span>
                            <span class="price">0.00001520
                                <i> / ¥0.05</i>
                            </span>
                            <span class="rate red">-19.28%</span>
                            <span class="high">0.00001941</span>
                            <span class="low">0.00001303</span>
                            <span class="volume">19409.14</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/zip-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="zileth" data-price_decimal="6" data-quote="eth">
                            <span>ZIL/ETH</span>
                            <span class="price">0.000170
                                <i> / ¥0.55</i>
                            </span>
                            <span class="rate green">+8.15%</span>
                            <span class="high">0.000175</span>
                            <span class="low">0.000150</span>
                            <span class="volume">934.35</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/zil-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="omgeth" data-price_decimal="6" data-quote="eth">
                            <span>OMG/ETH</span>
                            <span class="price">0.018037
                                <i> / ¥58.48</i>
                            </span>
                            <span class="rate green">+3.74%</span>
                            <span class="high">0.018394</span>
                            <span class="low">0.017200</span>
                            <span class="volume">4675.78</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/omg-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="icxeth" data-price_decimal="8" data-quote="eth">
                            <span>ICX/ETH</span>
                            <span class="price">0.00350008
                                <i> / ¥11.35</i>
                            </span>
                            <span class="rate green">+2.37%</span>
                            <span class="high">0.00370000</span>
                            <span class="low">0.00340800</span>
                            <span class="volume">202.40</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/icx-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="btmusdt" data-price_decimal="4" data-quote="usdt">
                            <span>BTM/USDT</span>
                            <span class="price">0.4222
                                <i> / ¥2.83</i>
                            </span>
                            <span class="rate green">+11.11%</span>
                            <span class="high">0.4244</span>
                            <span class="low">0.3650</span>
                            <span class="volume">977436.89</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/btm-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="aeeth" data-price_decimal="6" data-quote="eth">
                            <span>AE/ETH</span>
                            <span class="price">0.004731
                                <i> / ¥15.33</i>
                            </span>
                            <span class="rate green">+11.84%</span>
                            <span class="high">0.004892</span>
                            <span class="low">0.004071</span>
                            <span class="volume">1186.63</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/ae-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="zrxeth" data-price_decimal="6" data-quote="eth">
                            <span>ZRX/ETH</span>
                            <span class="price">0.001984
                                <i> / ¥6.43</i>
                            </span>
                            <span class="rate red">-1.39%</span>
                            <span class="high">0.002150</span>
                            <span class="low">0.001860</span>
                            <span class="volume">4281.71</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/zrx-eth"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                        <div class="table-item" data-symbol="bnbusdt" data-price_decimal="4" data-quote="usdt">
                            <span>BNB/USDT</span>
                            <span class="price">14.7309
                                <i> / ¥98.70</i>
                            </span>
                            <span class="rate green">+4.24%</span>
                            <span class="high">14.7881</span>
                            <span class="low">13.9986</span>
                            <span class="volume">9607275.90</span>
                            <span>
                                <a href="https://exchange.fcoin.com/exchange/bnb-usdt"><img src="/static/images/index5_20/exchange.png"></a>
                            </span>
                        </div>

                    </div>

                    <div class="table-box gpm mt">
                        <div class="table-title">
                            <div class="t-title">创业板</div>
                        </div>
                        <div class="table-head" id="symbols_gpm">
                            <span>交易对</span>
                            <span>最新价格</span>
                            <span>发行价波动</span>
                            <span>24h波动</span>
                            <span>24h高点</span>
                            <span>24h低点</span>
                            <span>24h交易量</span>
                            <span>去交易</span>
                        </div>
                        <div id="gpm_list">

                            <div class="table-item">
                                <span>PRA/ETH</span>
                                <span class="price">

                                    0.00068700
                                    <i> / ¥2.22</i>

                                </span>
                                <span class="issue green">+37.40%</span>
                                <span class="rate green">+18.24%</span>
                                <span class="high">0.00099710</span>
                                <span class="low">0.00056000</span>
                                <span class="volume">3395.77</span>
                                <span>
                                    <a href="https://exchange.fcoin.com/exchange/pra-eth"><img src="/static/images/index5_20/exchange.png"></a>
                                </span>
                            </div>

                            <div class="table-item">
                                <span>DCC/ETH</span>
                                <span class="price">

                                    0.00007520
                                    <i> / ¥0.24</i>

                                </span>
                                <span class="issue green">+5.92%</span>
                                <span class="rate red">-37.33%</span>
                                <span class="high">0.00014162</span>
                                <span class="low">0.00007455</span>
                                <span class="volume">2858.97</span>
                                <span>
                                    <a href="https://exchange.fcoin.com/exchange/dcc-eth"><img src="/static/images/index5_20/exchange.png"></a>
                                </span>
                            </div>

                            <div class="table-item">
                                <span>PMD/ETH</span>
                                <span class="price">

                                    0.00058085
                                    <i> / ¥1.88</i>

                                </span>
                                <span class="issue green">+29.08%</span>
                                <span class="rate red">-35.30%</span>
                                <span class="high">0.00089775</span>
                                <span class="low">0.00056000</span>
                                <span class="volume">2476.04</span>
                                <span>
                                    <a href="https://exchange.fcoin.com/exchange/pmd-eth"><img src="/static/images/index5_20/exchange.png"></a>
                                </span>
                            </div>

                            <div class="table-item">
                                <span>GUS/ETH</span>
                                <span class="price">

                                    0.00014510
                                    <i> / ¥0.47</i>

                                </span>
                                <span class="issue green">+45.10%</span>
                                <span class="rate red">-75.82%</span>
                                <span class="high">0.00060000</span>
                                <span class="low">0.00011000</span>
                                <span class="volume">1678.98</span>
                                <span>
                                    <a href="https://exchange.fcoin.com/exchange/gus-eth"><img src="/static/images/index5_20/exchange.png"></a>
                                </span>
                            </div>

                            <div class="table-item">
                                <span>XPS/ETH</span>
                                <span class="price">

                                    0.00001546
                                    <i> / ¥0.05</i>

                                </span>
                                <span class="issue green">+23.68%</span>
                                <span class="rate green">+10.43%</span>
                                <span class="high">0.00002493</span>
                                <span class="low">0.00001000</span>
                                <span class="volume">1337.38</span>
                                <span>
                                    <a href="https://exchange.fcoin.com/exchange/xps-eth"><img src="/static/images/index5_20/exchange.png"></a>
                                </span>
                            </div>

                        </div>
                        <div class="table-item loading">
                            <a href="/gpm.html">更多</a>
                        </div>
                    </div>

                </div>
            </div>
            <div class="block-3">
                <div class="container">
                    <div class="block-title">FCoin 优势</div>
                    <div class="advantage-menu-box">
                        <div class="advantage-menu active">
                            <div class="icon advantage-1"></div>
                            <div class="advantage-title">顶级技术</div>
                        </div>
                        <div class="advantage-menu">
                            <div class="icon advantage-2"></div>
                            <div class="advantage-title">公开透明</div>
                        </div>
                        <div class="advantage-menu">
                            <div class="icon advantage-3"></div>
                            <div class="advantage-title">自治生态</div>
                        </div>
                        <div class="advantage-menu">
                            <div class="icon advantage-4"></div>
                            <div class="advantage-title">安全</div>
                        </div>
                        <div class="advantage-menu">
                            <div class="icon advantage-5"></div>
                            <div class="advantage-title">审计认证</div>
                        </div>
                        <div class="advantage-menu">
                            <div class="icon advantage-6"></div>
                            <div class="advantage-title">专业团队</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block-4">
                <div class="container">
                    <div class="advantage-info active">
                        <div class="info-title">顶级技术</div>
                        <div class="info-word">金融级别的速度和稳定，交易高效有保障；国际顶尖团队自主研发撮合系统，能够每秒处理200万笔交易；证券级先进算法，支持GTT、GTC、FOK、IOC等多种专业交易指令，为交易者提供专业量化支持。</div>
                    </div>
                    <div class="advantage-info">
                        <div class="info-title">公开透明</div>
                        <div class="info-word">世界范围内首个实时公开透明的交易平台，建立实时的资产与交易数据查询验证机制，并面向公众公开。</div>
                    </div>
                    <div class="advantage-info">
                        <div class="info-title">自治生态</div>
                        <div class="info-word">FCoin不是传统意义的公司，它迈出了数字资产交易平台向社区进化的关键一步。<br>FCoin是一个所有FT持有者共有、共治、共享的社区型组织。</div>
                    </div>
                    <div class="advantage-info">
                        <div class="info-title">安全</div>
                        <div class="info-word">多维度，分层防护。<br>安全防护体系，严格保护用户资金安全。</div>
                    </div>
                    <div class="advantage-info">
                        <div class="info-title">审计认证</div>
                        <div class="info-word">无偏性零知识订单加密通过 CertEurope6 的 PKI-on-blockchain 服务提供的密钥完成。定期外部审计，并获得 ANSSI7 提供的安全认证。</div>
                    </div>
                    <div class="advantage-info">
                        <div class="info-title">专业团队</div>
                        <div class="info-word">来自世界顶级金融机构和科技公司，具有华尔街和加密金融经验的专业开发团队自主研发撮合系统。<br>专业产品设计团队打造产品细节，交易操作便捷，追求极致用户体验。</div>
                    </div>
                </div>
            </div>
            <div class="block-6">
                <div class="container">
                    <div class="block-title">交易平台路线图</div>
                    <div class="plan-box">
                        <div class="plan-list">
                            <div class="plan-item plan1">
                                <div class="date">2018.4</div>
                                <div class="info">开放模拟盘交易</div>
                            </div>
                            <div class="plan-item plan2">
                                <div class="date">2018.5</div>
                                <div class="info">开放公测板本</div>
                            </div>
                            <div class="plan-item plan3">
                                <div class="date">2018.6</div>
                                <div class="info">启动收入分配<br>开放资产的公开透明</div>
                            </div>
                            <div class="plan-item plan4">
                                <div class="date">2018.7</div>
                                <div class="info">开放创业板<br>开放正式版本</div>
                            </div>
                            <div class="plan-item plan5">
                                <div class="date">2018.8</div>
                                <div class="info">开放智能合约投票<br>开放通过智能合约执行收入分配</div>
                            </div>
                            <div class="plan-item plan6">
                                <div class="date">2018.9</div>
                                <div class="info">按新型数字资产评估系统筛选数字资产上市流通交易</div>
                            </div>
                            <div class="plan-item plan7">
                                <div class="date">2019.4</div>
                                <div class="info">社区委员会成员换届选举</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block-7">
                <div class="container">
                    <div class="block-title">合作伙伴</div>
                    <div class="logo-box">
                        <img src="/static/images/index5_20/logo_01.png">
                        <img src="/static/images/index5_20/logo_02.png">
                        <img src="/static/images/index5_20/logo_03.png">
                        <img src="/static/images/index5_20/logo_04.png">
                        <img src="/static/images/index5_20/logo_05.png">
                        <img src="/static/images/index5_20/logo_06.png">
                        <img src="/static/images/index5_20/logo_07.png">
                    </div>
                </div>
            </div>
        </div>

        <div class="footer_new">
            <div class="container">
                <div class="copyright-box">
                    <a href="/"><img src="/static/images/index5_20/mini_logo.png"></a>
                    <div class="copyright">Copyright © 2018 FCoin</div>
                </div>
                <dl class="item-1">
                    <dt>服务</dt>
                    <dd>
                        <a href="https://exchange.fcoin.com/exchange/">交易中心</a>
                    </dd>
                    <dd>
                        <a href="https://support.fcoin.com/hc/zh-cn" target="_blank">支持</a>
                    </dd>
                    <dd>
                        <a href="https://support.fcoin.com/hc/zh-cn/requests/new" target="_blank">提交请求</a>
                    </dd>
                    <dd>
                        <a href="https://goo.gl/forms/8dEeb7flB3xo0avJ2" target="_blank">创业板登记上币</a>
                    </dd>
                </dl>
                <dl class="item-2">
                    <dt>条款说明</dt>
                    <dd>
                        <a href="https://exchange.fcoin.com/privateTerm">隐私政策</a>
                    </dd>
                    <dd>
                        <a href="https://exchange.fcoin.com/userAgreement">用户协议</a>
                    </dd>
                    <dd>
                        <a href="https://support.fcoin.com/hc/zh-cn/articles/360003715514-%E4%BA%A4%E6%98%93%E7%9B%B8%E5%85%B3%E8%A7%84%E5%88%99" target="_blank">手续费</a>
                    </dd>
                </dl>
                <dl class="item-3">
                    <dt>关于我们</dt>
                    <dd>
                        <a href="javascript:;">客户支持</a>
                    </dd>
                    <dd>
                        <a href="https://t.me/fcoinofficial" target="_blank">联系我们</a>
                    </dd>

                </dl>
                <dl class="item-4">
                    <dt>社区</dt>
                    <dd class="media-box">
                        <a href="https://twitter.com/FCoinOfficial">
                            <i class="iconfont icon-twitter"></i>
                        </a>
                        <a href="https://www.facebook.com/FCoinOfficial/" target="_blank">
                            <i class="iconfont icon-facebook"></i>
                        </a>
                        <a href="https://github.com/FCoinOfficial" target="_blank">
                            <i class="iconfont icon-github"></i>
                        </a>
                        <a href="https://medium.com/@FCoinOfficial" target="_blank">
                            <i class="iconfont icon-medium"></i>
                        </a>
                        <a href="https://www.reddit.com/user/fcoinoffical/" target="_blank">
                            <i class="iconfont icon-reddit"></i>
                        </a>
                        <a href="https://fcoinofficial.slack.com" target="_blank">
                            <i class="iconfont icon-slack"></i>
                        </a>
                    </dd>
                    <dd class="copyright-h5">Copyright © 2018 FCoin</dd>
                </dl>
            </div>
        </div>
        <Row type="flex" justify="center" align="middle">
            <Col span="24">

            <!-- <h1>
                    <img src="https://raw.githubusercontent.com/iview/iview/master/assets/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button type="ghost" @click="handleStart">Start iView</Button>
                </h2> -->
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  methods: {
    handleStart() {
      this.$Modal.info({
        title: 'Bravo',
        content: 'Now, enjoy the convenience of iView.'
      })
    }
  }
}
</script>