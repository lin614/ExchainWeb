<template>
  <page class="page_content-padding">
    <div class="asset-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#4399e9">
          <div class="tit" slot="title">
            <span>{{ $t('userCenter.asset.title') }}</span>
            <router-link to="/usercenter/financeRecord" class="fr">{{$t('userCenter.financeRecord.title')}}</router-link>
          </div>
          
          <div class="card-main clearfix">
            
            <div class="card-main-hd">
              <div class="asset-amount fl">
                <!-- <span class="asset-amount-title">{{ $t('userCenter.asset.title') }}</span> -->
                <span>{{ $t('userCenter.asset.estimatedValue') }}：</span>
                <!-- {{ $t('userCenter.asset.transfer.volumeUnit') }} -->
                <span class="total-amount">{{BTCBalance}}BTC / {{ $t('userCenter.asset.legalTender') }}{{balanceTotal}}</span>
                <!-- <div class="asset-notice">{{$t('userCenter.asset.notice')}}</div> -->
              </div>
              <div class="opera-box clearfix">
                <!-- <router-link to="/usercenter/manageaddr" class="manage-addr-btn opera-box-btn fr">{{ $t('userCenter.asset.withdrawAddress') }}</router-link> -->
              </div>
            </div>

            <div class="hide-asset">
              <Checkbox v-model="hideAsset">{{ $t('userCenter.asset.hideAsset') }}</Checkbox>
              <Tooltip :content="$t('userCenter.asset.hideAssetTip')" placement="top">
                <Icon type="ios-information-outline"></Icon>
              </Tooltip>
            </div>

            <Table :columns="assetListTable" :data="assetListData" :disabled-hover="true"></Table>
          </div>

          <!-- 资金划转模态框 -->
          <Modal v-model="showTransferModal" class-name="change-pwd-model" :closable="false" @on-cancel="handleCloseTransfer('formCustom')">
            <crd potColor="#4399e9">
              <span slot="title">{{ $t('userCenter.asset.transfer.title') }}</span>
              <div class="form-box">
                <Form ref="formCustom" :rules="transRules" :model="trabsferModal" label-position="top">
                  <FormItem :label="$t('userCenter.asset.transfer.token')" prop="tokenType">
                    <!-- <Select v-model="trabsferModal.tokenType">
                      <Option v-for="(item, index) in transferTokenList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select> -->
                    <Input v-model="trabsferModal.token" disabled></Input>
                  </FormItem>

                  <FormItem :label="$t('userCenter.asset.transfer.from')" prop="from" class="available-box">
                    <Select v-model="trabsferModal.from" @on-change="handleSelectFromChange">
                      <Option v-for="(item, index) in fromList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                    <span class="available-amount">{{ $t('userCenter.asset.transfer.balance') }} :
                      <i v-show="(trabsferModal.from === 'master')" @click="copyAmount(master)" style="cursor:pointer">{{master}}</i>
                      <i v-show="(trabsferModal.from === 'trade')" @click="copyAmount(trade)" style="cursor:pointer">{{trade}}</i>
                      {{trabsferModal.token}}
                    </span>
                  </FormItem>

                  <FormItem :label="$t('userCenter.asset.transfer.to')" prop="to" class="available-box">
                    <Select v-model="trabsferModal.to" @on-change="handleSelectToChange">
                      <Option v-for="(item, index) in toList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                    <span class="available-amount">{{ $t('userCenter.asset.transfer.balance') }} :
                      <i v-show="(trabsferModal.to === 'master')" @click="copyAmount(master)" style="cursor:pointer">{{master}}</i>
                      <i v-show="(trabsferModal.to === 'trade')" @click="copyAmount(trade)" style="cursor:pointer">{{trade}}</i>
                      {{trabsferModal.token}}
                    </span>
                  </FormItem>

                  <FormItem :label="$t('userCenter.asset.transfer.volume')" prop="amount">
                    <Input v-model="trabsferModal.amount"></Input>
                  </FormItem>
                </Form>
              </div>
            </crd>

            <div slot="footer">
              <div class="model-btn-wrap clearfix">
                <span class="model-btn fr" @click="handleCloseTransfer('formCustom')">{{$t('userCenter.asset.transfer.cancel')}}</span>
                <div class="model-btn primary fl" @click="handleTransfer('formCustom')">
                  <span>{{ $t('userCenter.asset.transfer.confirm') }}</span>
                  <Spin v-if="transferLoading" size="small" fix></Spin>
                </div>
              </div>
            </div>
          </Modal>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from '../components/page'
import crd from '../components/crd.vue'
import ax from 'axios'
import config from '../../config/config.js'
import encharge from './encharge'
import getCash from './getCash'
import manageAddr from './manageAddr'
import cookie from 'js-cookie'
import {scientificNotation2Number} from "..//js/utils/money.js";
import NP from 'number-precision'

ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})

let instance = null

import util from '../../libs/util.js'
import { setInterval, clearInterval } from 'timers'
export default {
  name: 'asset',
  components: {
    crd,
    page,
    encharge,
    getCash,
    manageAddr
  },
  data() {
    var vu = this
    return {
      pageHeight: 0,
      showExType: '',
      enchargeToken: '',
      balanceTotal: '--',
      timer: null,
      initBTCPriceTimer: null,
      tokenFee: '',
      master: '',
      trade: '',
      BTCBalance: '--',
      showTransferModal: false,
      transferLoading: false,
      showCharge: false,
      showColor: '',
      usdtPrice: null,
      btcPrice: null,
      hideAsset: null,
      trabsferModal: {
        token: '',
        from: '',
        to: '',
        amount: ''
      },
      transRules: {
        from: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(this.$t('errorMsg.FROM_ADDR_BLANK'))
              }
              if (instance.trabsferModal.amount) {
                instance.$refs.formCustom.validateField('amount', () => {})
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        to: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(this.$t('errorMsg.TO_ADDR_BLANK'))
              }
              if (instance.trabsferModal.amount) {
                instance.$refs.formCustom.validateField('amount', () => {})
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        amount: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(this.$t('errorMsg.AMOUNT_BLANK'))
              }
              if (value <= 0) {
                callback(this.$t('errorMsg.AMOUNT_EFFECTIVE'))
              }
              // 判断精度
              var decimal = this.tokenObj[this.trabsferModal.token].decimal
              var reg = RegExp('^[0-9]{1,8}(.[0-9]{0,' + decimal + '})?$')
              if (!reg.test(value)) {
                callback(
                  this.$t('errorMsg.DECIMAL_LIMIT') +
                    decimal +
                    this.$t('errorMsg.DECIMAL_UNIT')
                )
              }
              if (this.trabsferModal.from === 'master') {
                if (parseFloat(value) > parseFloat(this.master)) {
                  callback(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
                }
              } else if (this.trabsferModal.from === 'trade') {
                if (parseFloat(value) > parseFloat(this.trade)) {
                  callback(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
                }
              } else {
                if (parseFloat(value) > 0) {
                  callback(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
                }
              }
              callback()
            },
            trigger: 'change, blur'
          }
        ]
      },

      assetListTable: [
        {
          title: 'token',
          key: 'token',
          minWidth: 20
        },
        {
          title: 'account_available',
          key: 'account_available',
          minWidth: 120
        },
        {
          title: 'exchange_available',
          key: 'exchange_available',
          minWidth: 120
        },
        {
          title: 'exchange_freeze',
          key: 'exchange_freeze',
          minWidth: 120
        },
        {
          title: ' ',
          key: 'opera',
          minWidth: 230,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: params.row.recharge
                      ? this.assetListData[params.index].showCharge
                        ? '#419cf6'
                        : ''
                      : '#999',
                    cursor: params.row.recharge ? 'pointer' : 'not-allowed',
                    marginRight: '30px'
                  },
                  on: {
                    click: () => {
                      if (params.row.recharge) {
                        this.showColor = 'encharge'
                        this.handleOpera(params.index, params.row, 'encharge')
                      }
                    }
                  }
                },
                [
                  h('i', this.$t('userCenter.asset.transfer.deposit')),
                  h('Icon', {
                    props: {
                      type: params.row.showCharge
                        ? 'arrow-up-b'
                        : 'arrow-down-b'
                    },
                    style: {
                      marginLeft: '4px'
                    }
                  })
                ]
              ),
              h(
                'span',
                {
                  style: {
                    color: params.row.withdraw
                      ? this.assetListData[params.index].showCash
                        ? '#419cf6'
                        : ''
                      : '#999',
                    cursor: params.row.withdraw ? 'pointer' : 'not-allowed',
                    marginRight: '30px'
                  },
                  on: {
                    click: () => {
                      if (params.row.withdraw) {
                        this.showColor = 'getCash'
                        this.handleOpera(params.index, params.row, 'getCash')
                      }
                    }
                  }
                },
                [
                  h('i', this.$t('userCenter.asset.transfer.withdraw')),
                  h('Icon', {
                    props: {
                      type: params.row.showCash ? 'arrow-up-b' : 'arrow-down-b'
                    },
                    style: {
                      marginLeft: '4px'
                    }
                  })
                ]
              ),
              h(
                'span',
                {
                  style: {
                    cursor: 'pointer',
                    marginRight: '30px'
                  },
                  on: {
                    click: () => {
                      this.handleTransferShow(
                        params.row.token,
                        params.row.account_available,
                        params.row.exchange_available
                      )
                    }
                  }
                },
                this.$t('userCenter.asset.transfer.transfer')
              ),
              h(
                'span',
                {
                  style: {
                    color: params.row.trade ? '' : '#999',
                    cursor: 'pointer',
                    cursor: params.row.trade ? 'pointer' : 'not-allowed'
                  },
                  on: {
                    click: () => {
                      if (params.row.trade) {
                        var token = params.row.token
                        var pair = 'btc_usdt'

                        var matchs = new RegExp(
                          '[^,]*' + token + '/[^,]+'
                        ).exec(localStorage.getItem('pairs'))
                        this.toTrade(matchs ? matchs[0] : pair)
                      }
                    }
                  }
                },
                this.$t('userCenter.asset.transfer.trade')
              )
            ])
          }
        },
        {
          type: 'expand',
          width: 1,
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'rgb(247, 247, 247)'
                }
              },
              [
                h(encharge, {
                  props: {
                    showCharge: this.showCharge,
                    token: this.enchargeToken,
                    params: params.row
                  }
                }),
                h(getCash, {
                  props: {
                    showCharge: this.showCharge,
                    fee: this.tokenFee,
                    token: this.enchargeToken,
                    params: params.row,
                    getTokenObj: this.tokenObj
                  },
                  on: {
                    submitGetCash: () => {
                      this.getMyAsset()
                    }
                  }
                })
              ]
            )
          }
        }
      ],
      assetListData: [],
      assetListDataFilter: [],
      transferTokenList: [
        {
          label: 'BTC',
          value: 'BTC'
        },
        {
          label: 'ETH',
          value: 'ETH'
        },
        {
          label: 'USDT',
          value: 'USDT'
        }
      ],
      tokenObj: {}
    }
  },
  computed: {
    getActiveLang() {
      return this.$store.state.activeLang
    },
    fromList() {
      return [
        {
          label: this.$t('userCenter.asset.transfer.account_available'),
          value: 'master'
        },
        {
          label: this.$t('userCenter.asset.transfer.exchange_available'),
          value: 'trade'
        }
      ]
    },
    toList() {
      return [
        {
          label: this.$t('userCenter.asset.transfer.account_available'),
          value: 'master'
        },
        {
          label: this.$t('userCenter.asset.transfer.exchange_available'),
          value: 'trade'
        }
      ]
    }
  },
  watch: {
    getActiveLang(val) {
      if (val === 'cn') {
        this.balanceTotal = scientificNotation2Number(NP.times(this.BTCBalance, this.btcPrice, this.usdtPrice))
        this.balanceTotal = scientificNotation2Number(NP.round(this.balanceTotal, 2))
      } else {
        this.balanceTotal = scientificNotation2Number(NP.times(this.BTCBalance, this.btcPrice))
      }
    },
    hideAsset () {
      let data = [];
      if (this.hideAsset) {
        for (var i = 0; i < this.assetListDataFilter.length; i++) {
          if (this.assetListDataFilter[i].btc > 0.0001) {
            data.push(this.assetListDataFilter[i])
          }
        }
        this.assetListData = util.deepClone(data);
      } else {
        this.assetListData = util.deepClone(this.assetListDataFilter);
      }
    },
    // tokenObj() {
    //   for (var key in this.tokenObj) {
    //     for (var i = 0; i < this.assetListData.length; i++) {
    //       if (this.assetListData[i].token === key) {
    //         this.assetListData[i].trade = key.trade
    //         this.assetListData[i].recharge = key.recharge
    //         this.assetListData[i].withdraw = key.withdraw
    //         this.assetListData[i].decimal = key.decimal
    //         this.$set(this.assetListData, i, this.assetListData[i])
    //         break
    //       }
    //     }
    //   }
    // },
    $store() {
    },
    btcPrice() {
      if (
        isNaN(this.btcPrice) ||
        this.btcPrice === null ||
        this.usdtPrice === null ||
        isNaN(this.usdtPrice)
      ) {
        return
      }
      if (isNaN(this.BTCBalance) || this.BTCBalance === null) {
        return
      }

      this.getBalanceTotal();      
    },
    BTCBalance() {
      if (isNaN(this.btcPrice) || this.btcPrice === null) {
        return
      }
      if (isNaN(this.BTCBalance) || this.BTCBalance === null) {
        return
      }
      if (isNaN(this.usdtPrice) || this.usdtPrice === null) {
        return
      }
      this.getBalanceTotal();
    }
  },
  methods: {
    // 获取资产法币估值
    getBalanceTotal() {
      if (this.BTCBalance === '--' || this.btcPrice === null || this.usdtPrice === null) {
        return;
      }
      // 根据中英文计算
      if (this.$store.state.activeLang === 'cn') {
        this.balanceTotal = scientificNotation2Number(NP.times(this.BTCBalance, this.btcPrice, this.usdtPrice))
      } else {
        this.balanceTotal = scientificNotation2Number(NP.times(this.BTCBalance, this.btcPrice))
      }

      this.balanceTotal = scientificNotation2Number(NP.round(this.balanceTotal, 2))
      if (isNaN(this.balanceTotal)) {
        this.balanceTotal = '--'
      }
    },

    copyAmount(value) {
      this.trabsferModal.amount = parseFloat(value)
    },

    /**
     * 屏幕
     */
    handleWindowResize() {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 获取我的资产列表
     */
    getMyAsset() {
      var vu = this
      this.assetListData = []
      ax.get(config.url.user + '/api/account/assetsList', getHeader).then(
        res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            var obj = {}
            let btcBalance = 0
            var result = res.data.result
            for (var key in result) {
              obj.token = key
              obj.account_available = result[key].account_available
              obj.btc = result[key].btc
              obj.withdraw_fee = result[key].withdraw_fee
              obj.exchange_available = result[key].exchange_available
              obj.exchange_freeze = result[key].exchange_freeze
              obj._expanded = false
              obj.trade = vu.tokenObj[key].trade
              obj.recharge = vu.tokenObj[key].recharge
              obj.withdraw = vu.tokenObj[key].withdraw
              obj.decimal = vu.tokenObj[key].decimal
              obj.recharge_min = vu.tokenObj[key].recharge_min
              obj.withdraw_max = vu.tokenObj[key].withdraw_max
              obj.withdraw_min = vu.tokenObj[key].withdraw_min
              obj.show = false
              vu.assetListDataFilter.push(JSON.parse(JSON.stringify(obj)))
              vu.assetListData = util.deepClone(vu.assetListDataFilter)
              btcBalance = NP.plus(
                parseFloat(btcBalance),
                parseFloat(result[key].btc)
              )
            }
            if (isNaN(btcBalance)) {
              vu.BTCBalance = '--'
            } else {
              vu.BTCBalance = scientificNotation2Number(NP.round(btcBalance, 8))
            }
          } else {
            apiError(vu, res)
          }
        }
      )
    },
    
    /**
     * 获取所有币种的属性
     */
    getTokenObj() {
      var vu = this
      ax.get(config.url.user + '/api/quotation/getSymbolLists', getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            var result = res.data.result
            vu.tokenObj = JSON.parse(JSON.stringify(result))
            vu.assetListData.forEach((value, index) => {
              value.decimal || (value.decimal = 8)
              value.trade || (value.trade = false)
              value.recharge || (value.recharge = false)
              value.withdraw || (value.withdraw = false)
              vu.$set(vu.assetListData, index, vu.assetListData[index])
            })
          } else {
            apiError(vu, res)
          }
        })
        .catch(err => {
          apiReqError(vu, err)
        })
    },
    /**
     * 充值和提现点击操作
     */
    handleOpera(index, params, exType) {
      // 点击同一 token 两次关闭
      for (var i = 0; i < this.assetListData.length; i++) {
        if (
          this.assetListData[i]._expanded &&
          this.assetListData[i].token === params.token
        ) {
          if (
            (exType === 'encharge' && this.assetListData[i].showCharge) ||
            (exType === 'getCash' && this.assetListData[i].showCash)
          ) {
            this.assetListData[i]._expanded = false
            this.assetListData[i].showCharge = false
            this.assetListData[i].showCash = false
            this.$set(this.assetListData, index, this.assetListData[index])
            return
          }
        }
      }

      this.assetListData.forEach((value, index) => {
        value._expanded = false
        value.showCharge = false
        value.showCash = false
      })

      setTimeout(() => {
        if (exType === 'encharge') {
          /**
           * 充值
           */
          this.enchargeToken = params.token
          this.showCharge = true
          this.assetListData[index]._expanded = true
          this.showExType = exType
          this.assetListData[index].showCharge = true
          this.$set(this.assetListData, index, this.assetListData[index])
        } else {
          /**
           * 提现
           */
          this.enchargeToken = params.token
          this.tokenFee = params.withdraw_fee
          this.showCharge = false
          this.assetListData[index]._expanded = true
          this.assetListData[index].showCash = true
          this.$set(this.assetListData, index, this.assetListData[index])
        }
      }, 10)
    },
    /**
     * 划转模态框的显示
     */
    handleTransferShow(token, master, trade) {
      this.master = master
      this.trade = trade
      this.showTransferModal = true
      this.trabsferModal.token = token
    },
    /**
     * 关闭划转模态框
     */
    handleCloseTransfer(form) {
      this.$refs[form].resetFields()
      this.showTransferModal = false
    },
    /**
     * 划转
     */
    handleTransfer(form) {
      if (this.transferLoading) {
        return
      }
      var vu = this
      this.$refs[form].validate(valid => {
        if (valid) {
          vu.transferLoading = true
          if (vu.trabsferModal.to === 'trade') {
            // 转到交易账户
            ax.get(
              config.url.user +
                '/api/account/toExchange?type=' +
                vu.trabsferModal.token +
                '&balance=' +
                vu.trabsferModal.amount,
              getHeader
            )
              .then(res => {
                if (res.status == '200' && res.data.errorCode == 0) {
                  vu.getMyAsset()
                  // 可优化为只改变需要改变的数据
                  vu.$refs[form].resetFields()
                  vu.showTransferModal = false
                  vu.transferLoading = false
                  vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
                } else {
                  vu.transferLoading = false
                  apiError(vu, res)
                }
              })
              .catch(err => {
                vu.transferLoading = false
                apiReqError(vu, err)
              })
          } else if (vu.trabsferModal.to === 'master') {
            // 转到主账户
            ax.get(
              config.url.user +
                '/api/exchange/toAccount?type=' +
                vu.trabsferModal.token +
                '&balance=' +
                vu.trabsferModal.amount,
              getHeader
            )
              .then(res => {
                if (res.status == '200' && res.data.errorCode == 0) {
                  vu.getMyAsset()
                  vu.$refs[form].resetFields()
                  vu.showTransferModal = false
                  vu.transferLoading = false
                  vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
                } else {
                  vu.transferLoading = false
                  apiError(vu, res)
                }
              })
              .catch(err => {
                vu.transferLoading = false
                apiReqError(vu, err)
              })
          }
        } else {
        }
      })
    },
    /**
     * 选择划出账户
     */
    handleSelectFromChange() {
      if (this.trabsferModal.from === 'master') {
        this.trabsferModal.to = 'trade'
      }
      if (this.trabsferModal.from === 'trade') {
        this.trabsferModal.to = 'master'
      }
    },
    /**
     * 选择划至账户
     */
    handleSelectToChange() {
      if (this.trabsferModal.to === 'master') {
        this.trabsferModal.from = 'trade'
      }
      if (this.trabsferModal.to === 'trade') {
        this.trabsferModal.from = 'master'
      }
    },
    
    /**
     * 初始化资产列表
     */
    initAsset() {
      var vu = this
      ax.all([
        ax.get(config.url.user + '/api/quotation/getSymbolLists', getHeader),
        ax.post(config.url.user + '/api/account/assetsList', getHeader)
      ])
        .then(
          ax.spread((tokenListRes, assetListRes) => {
            if (
              tokenListRes.status == '200' &&
              tokenListRes.data.errorCode == 0 &&
              assetListRes.status == '200' &&
              assetListRes.data.errorCode == 0
            ) {
              var obj = {}
              let btcBalance = 0
              var result = assetListRes.data.result
              var tokenObj = tokenListRes.data.result
              vu.tokenObj = JSON.parse(JSON.stringify(tokenObj))
              for (var key in result) {
                obj.token = key
                obj.account_available = result[key].account_available
                obj.btc = result[key].btc
                obj.withdraw_fee = result[key].withdraw_fee
                obj.exchange_available = result[key].exchange_available
                obj.exchange_freeze = result[key].exchange_freeze
                obj._expanded = false
                obj.trade = tokenObj[key].trade
                obj.recharge = tokenObj[key].recharge
                obj.withdraw = tokenObj[key].withdraw
                obj.decimal = tokenObj[key].decimal
                obj.recharge_min = tokenObj[key].recharge_min
                obj.withdraw_max = vu.tokenObj[key].withdraw_max
                obj.withdraw_min = tokenObj[key].withdraw_min
                obj.show = false
                vu.assetListDataFilter.push(JSON.parse(JSON.stringify(obj)))
                vu.assetListData = util.deepClone(vu.assetListDataFilter)
                btcBalance = NP.plus(
                  parseFloat(btcBalance),
                  parseFloat(result[key].btc)
                )
              }
              if (isNaN(btcBalance)) {
                vu.BTCBalance = '--'
              } else {
                vu.BTCBalance = scientificNotation2Number(NP.round(btcBalance, 8)) 
              }
              this.getBalanceTotal();
            } else {
              if (tokenListRes.data.errorCode !== 0) {
                apiError(vu, tokenListRes)
              } else if (assetListRes.data.errorCode !== 0) {
                apiError(vu, assetListRes)
              }
            }
          })
        )
        .catch(() => {
          vu.$Message.error(vu.$t('errorMsg.NETWORK_ERROR'))
        })
    },

    /**
     * 获取 USDT 汇率
     */
    getUsdt() {
      var vu = this
      ax.get(config.url.user + '/api/quotation/getUSDCNY').then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          vu.usdtPrice = res.data.result
          window.localStorage.setItem('exchange-usdt', vu.usdtPrice)
          etLog('usdt 汇率:' + vu.usdtPrice)
          this.getBalanceTotal();
        } else {
          apiError(vu, res)
        }
      })
      // this.usdtPrice = parseFloat(this.usdtPrice)
    },

    /**
     * 初始化BTC价格， 每分钟查询一次，订阅数据到达后清除
     */
    initBTCPrice() {
      var vu = this
      ax.get(
        config.url.user +
          '/api/v1-b/market/trade_history?market=huobi&symbol=btcusdt&limit=1',
        getHeader
      )
        .then(res => {
          if (res.status == 200 && res.data.code === 0) {
            var data = res.data.data.length === 0 ? 0 : res.data.data[0][1]
            vu.btcPrice = data
            this.getBalanceTotal();
            etLog('btcPrice : ' + vu.btcPrice)
          } else {
            apiError(vu, res)
          }
        })
        .catch(err => {
          apiReqError(vu, err)
        })
    }
  },
  mounted() {
    instance = this
    var vu = this
    ws.postData({
      event: 'sub',
      channel: 'huobi.market.btcusdt.kline.1min'
    })
    clearInterval(this.initBTCPriceTimer)
    // this.initBTCPriceTimer = setInterval(vu.initBTCPrice, 60 * 1000)
    bus.$on('wsUpdate', data => {
      etLog(data)
      if (data.data) {
        if (data.channel === 'huobi.market.btcusdt.kline.1min') {
          clearInterval(vu.initBTCPriceTimer)
          vu.btcPrice = data.data[0][1]
        }
      }
    })
    bus.$on('langChange', () => {
      util.toggleTableHeaderLang(
        vu.assetListTable,
        3,
        'userCenter.asset.transfer.',
        vu
      )
    })
    window.addEventListener('resize', this.handleWindowResize)
  },
  created() {
    this.getUsdt()
    this.initBTCPrice()
    this.initAsset()
    clearInterval(this.timer)
    var vu = this
    
    util.toggleTableHeaderLang(
      vu.assetListTable,
      3,
      'userCenter.asset.transfer.',
      vu
    )
    this.pageHeight = window.innerHeight - 360
  },

  destroyed() {
    bus.$off('langChange')
    clearInterval(this.timer)
    clearInterval(this.initBTCPriceTimer)
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.asset-cont {
  .tit {
    width: 100%;
    padding-right: 20px;
  }
  font-size: 14px;
  .crd {
    margin-bottom: 0;
    .ivu-card {
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
    .card-main {
      padding: 45px 60px 0;
      .card-main-hd {
        border-bottom: 1px solid #e9eaec;
      }
      .asset-amount {
        position: relative;
        padding-bottom: 45px;
        line-height: 1.5;
        .asset-amount-title {
          padding-right: 120px;
        }
        .total-amount {
          font-size: 24px;
          line-height: 24px;
          color: #4b96e6;
        }
        .asset-notice {
          // position: absolute;
          // bottom: 10px;
          // left: 0px;
          color: #999;
        }
      }
      .opera-box {
        .opera-box-btn {
          display: inline-block;
          min-width: 160px;
          height: 50px;
          line-height: 30px;
          padding: 10px 16px;
          text-align: center;
          color: #fff;
          font-size: 16px;
          border-radius: 0px;
          background-color: @font-color-blue;
          cursor: pointer;
        }
      }
    }
    .ivu-spin-fix {
      background-color: rgb(247, 247, 247);
    }
  }
  .ivu-table-wrapper {
    border: none;
    padding-top: 45px;
    padding-bottom: 25px;
    .ivu-table::after {
      width: 0;
    }
    .ivu-table::before {
      width: 0;
    }
    .ivu-table tr {
      height: 41px;
      line-height: 41px;
    }
    .ivu-table th {
      background-color: transparent;
      border-bottom: none;
    }
    .ivu-table th:last-child {
      width: 250px;
    }
    .ivu-table td {
      border-bottom: none;
    }
    .ivu-table td:last-child {
      width: 250px;
    }
    td.ivu-table-expanded-cell {
      padding: 0;
    }
    .ivu-table-cell-expand {
      display: none;
    }
  }
  .hide-asset{
    text-align: right;
    margin-top: 10px;
  }
}
.send-code-down {
  box-sizing: border-box;
  min-width: 140px;
  height: 40px;
  line-height: 38px;
  padding: 0 10px;
  border: 1px solid #999;
  color: #fff;
  background-color: #999;
  text-align: center;
  border-radius: 0px;
}
.send-code-btn {
  position: relative;
  // display: inline-block;
  box-sizing: border-box;
  min-width: 140px;
  height: 40px;
  line-height: 40px;
  border-radius: 0px;
  padding: 0 10px;
  border: 1px solid #419aec;
  color: #419aec;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #419aec;
    color: #fff;
  }
}
.available-box {
  position: relative;
  .available-amount {
    position: absolute;
    top: -27px;
    right: 0;
  }
}
</style>