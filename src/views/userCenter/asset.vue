<template>
  <page>
    <div class="asset-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#4399e9">
          <span slot="title">{{ $t('userCenter.asset.title') }}</span>
          <div class="card-main clearfix">
            <div class="asset-amount">
              <span class="asset-amount-title">{{ $t('userCenter.asset.title') }}</span>
              <span>{{ $t('userCenter.asset.estimatedValue') }}：</span>
              <span class="total-amount">{{BTCBalance}}BTC / {{ $t('userCenter.asset.transfer.volumeUnit') }}{{CNYBalance}}</span>
            </div>
            <div class="opera-box clearfix">
              <router-link to="/usercenter/manageaddr" class="manage-addr-btn opera-box-btn fr">{{ $t('userCenter.asset.withdrawAddress') }}</router-link>
            </div>
            <Table :columns="assetListTable" :data="assetListData" :disabled-hover="true"></Table>
          </div>

          <Modal
            v-model="showTransferModal"
            class-name="change-pwd-model"
            :closable="false">
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
                    <span class="available-amount">{{ $t('userCenter.asset.transfer.balance') }} : <i v-show="(trabsferModal.from === 'master')">{{master}}</i><i v-show="(trabsferModal.from === 'trade')">{{trade}}</i> {{trabsferModal.token}}</span>
                  </FormItem>

                  <FormItem :label="$t('userCenter.asset.transfer.to')" prop="to" class="available-box">
                    <Select v-model="trabsferModal.to" @on-change="handleSelectToChange">
                      <Option v-for="(item, index) in toList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                    <span class="available-amount">{{ $t('userCenter.asset.transfer.balance') }} : <i v-show="(trabsferModal.to === 'master')">{{master}}</i><i v-show="(trabsferModal.to === 'trade')">{{trade}}</i> {{trabsferModal.token}}</span>
                  </FormItem>

                  <FormItem :label="$t('userCenter.asset.transfer.volume')" prop="amount">
                    <Input v-model="trabsferModal.amount"></Input>
                  </FormItem>
                </Form>
              </div>
            </crd>
            <div slot="footer">
              <div class="change-model-footer clearfix">
                <span class="model-btn fr" @click="handleCloseTransfer('formCustom')">{{$t('userCenter.asset.transfer.cancel')}}</span>
                <div class="model-btn model-btn-active fl" @click="handleTransfer('formCustom')">
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
import page from "../components/page"
import crd from "../components/crd.vue"
import ax from 'axios'
import config from '../../config/config.js'
import encharge from './encharge'
import getCash from './getCash'
import manageAddr from './manageAddr'
import util from '../../libs/util.js'
import { setInterval } from 'timers';
export default {
  name: 'asset',
  components: {
    crd,
    page,
    encharge,
    getCash,
    manageAddr
  },
  data () {
    return {
      pageHeight: 0,
      showExType: '',
      enchargeToken: '',
      tokenFee: '',
      master: '',
      trade: '',
      BTCBalance: '',
      CNYBalance: '',
      showTransferModal: false,
      transferLoading: false,
      showCharge: false,
      showColor: '',
      trabsferModal: {
        token: '',
        from: '',
        to: '',
        amount: ''
      },
      transRules: {
        from: [
          { required: true, message: this.$t('errorMsg.FROM_ADDR_BLANK'), trigger: 'change' }
        ],
        to: [
          { required: true, message: this.$t('errorMsg.TO_ADDR_BLANK'), trigger: 'change' }
        ],
        amount: [
          { required: true, message: this.$t('errorMsg.AMOUNT_BLANK'), trigger: 'blur' },
          { 
            validator: (rule, value, callback) => {
              if (value === '' || value === 0 || value === '0') {
                callback(this.$t('errorMsg.AMOUNT_BLANK'))
              }
              // 判断精度
              var decimal = this.tokenObj[this.trabsferModal.token].decimal
              console.log('decimal' + decimal)
              var reg = RegExp('^[0-9]{0,8}(\.[0-9]{0,' + decimal + '})?$')
              if (!reg.test(value)) {
                callback(this.$t('errorMsg.DECIMAL_LIMIT') + decimal + this.$t('errorMsg.DECIMAL_UNIT'))
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
            }, trigger: 'change, blur'
          }
        ]
      },

      assetListTable: [
        {
          title: 'token',
          key: 'token'
        },
        {
          title: 'account_available',
          key: 'account_available'
        },
        {
          title: 'exchange_available',
          key: 'exchange_available'
        },
        {
          title: 'exchange_freeze',
          key: 'exchange_freeze'
        },
        {
          title: ' ',
          key: 'opera',
          minWidth: 250,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: this.assetListData[params.index].showCharge ? '#419cf6' : '',
                  cursor: 'pointer',
                  marginRight: '30px',
                  display: params.row.recharge ? 'inline' : 'none'
                },
                on: {
                  click: () => {
                    this.showColor = 'encharge'
                    this.handleOpera(params.index, params.row, 'encharge')
                  }
                }
              }, [
                h('i', this.$t('userCenter.asset.transfer.deposit')),
                h('Icon', {
                  props: {
                    type: 'arrow-down-b'
                  },
                  style: {
                    marginLeft: '4px'
                  }
                })
              ]),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '30px',
                  color: this.assetListData[params.index].showCash ? '#419cf6' : '',
                  display: params.row.withdraw ? 'inline' : 'none'
                },
                on: {
                  click: () => {
                    this.showColor = 'getCash'
                    this.handleOpera(params.index, params.row, 'getCash')
                  }
                }
              }, [
                h('i', this.$t('userCenter.asset.transfer.withdraw')),
                h('Icon', {
                  props: {
                    type: 'arrow-down-b'
                  },
                  style: {
                    marginLeft: '4px'
                  }
                })
              ]),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '30px'
                },
                on: {
                  click: () => {
                    this.handleTransferShow(params.row.token, params.row.account_available, params.row.exchange_available)
                  }
                }
              }, this.$t('userCenter.asset.transfer.transfer')),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '30px',
                  display: params.row.trade ? 'inline' : 'none'
                },
                on: {
                  click: () => {
                  }
                }
              }, this.$t('userCenter.asset.transfer.trade'))
            ]);
          }
        },
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h('div', {
              style: {
                width: '100%',
                padding: '20px',
                backgroundColor: 'rgb(247, 247, 247)' 
              }
            }, [
              h(encharge, {
                props: {
                  showCharge: this.showCharge,
                  token: this.enchargeToken
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
            ])
          }
        },  
      ],
      assetListData: [],
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
      fromList: [
        {
          label: this.$t('userCenter.asset.transfer.account_available'),
          value: 'master'
        },
        {
          label: this.$t('userCenter.asset.transfer.exchange_available'),
          value: 'trade'
        }
      ],
      toList: [
        {
          label: this.$t('userCenter.asset.transfer.account_available'),
          value: 'master'
        },
        {
          label: this.$t('userCenter.asset.transfer.exchange_available'),
          value: 'trade'
        }
      ],
      tokenObj: {}
    }
  },
  watch: {
    tokenObj () {
      for (var key in this.tokenObj) {
        for (var i = 0; i < this.assetListData.length; i++) {
          if (this.assetListData[i].token === key) {
            this.assetListData[i].trade = key.trade
            this.assetListData[i].recharge = key.recharge
            this.assetListData[i].withdraw = key.withdraw
            this.assetListData[i].decimal = key.decimal
            this.$set( this.assetListData, i, this.assetListData[i])
            break
          }
        }
      }
    }
  },
  methods: {
    /**
     * 获取资产估值
     */
    getBalance () {
      ax.get('/api/account/balanceQuery?types=BTC,CNY', {withcredentials: true}, {
        headers: {
          "pn": sessionStorage.pn
        }
      })
        .then((res) => {
          if (res.status == '200' && res.data.errorCode == 0) {
            this.BTCBalance = res.data.result.BTC.available
            this.CNYBalance = res.data.result.CNY.available
          }
        })
        .catch((err) => {})
    },
    /**
     * 屏幕
     */
    handleWindowResize () {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 获取我的资产列表
     */
    getMyAsset () {
      var vu = this
      this.assetListData = []
      ax.get('/api/account/assetsList', {
        headers: {
          "pn": sessionStorage.PN
        }
      }).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          var obj = {}
          var result = res.data.result
          for (var key in result) {
            obj.token = key
            obj.account_available = result[key].account_available
            obj.withdraw_fee = result[key].withdraw_fee
            obj.exchange_available = result[key].exchange_available
            obj.exchange_freeze = result[key].exchange_freeze
            obj._expanded = false
            obj.trade = vu.tokenObj[key].trade
            obj.recharge = vu.tokenObj[key].recharge
            obj.withdraw = vu.tokenObj[key].withdraw
            obj.decimal = vu.tokenObj[key].decimal
            obj.recharge_min = vu.tokenObj[key].recharge_min
            obj.withdraw_min = vu.tokenObj[key].withdraw_min
            vu.assetListData.push(JSON.parse(JSON.stringify(obj)))
          }
        }
      })
    },
    /**
     * 获取所有币种的属性
     */
    getTokenObj () {
      var vu = this
      ax.get('/api/quotation/getSymbolLists')
        .then((res) => {
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
          }
        })
        .catch((err) => {
          //
        })
    },
    /**
     * 充值和提现点击操作
     */
    handleOpera (index, params, exType) {
      this.assetListData.forEach((value, index) => {
        value._expanded = false
        value.showCharge = false
        value.showCash = false
      })
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
    },
    /**
     * 划转模态框的显示
     */
    handleTransferShow (token, master, trade) {
      this.master = master
      this.trade = trade
      this.showTransferModal = true
      this.trabsferModal.token = token
    },
    /**
     * 关闭划转模态框
     */
    handleCloseTransfer (form) {
      this.$refs[form].resetFields()
      this.showTransferModal = false
    },
    /**
     * 划转
     */
    handleTransfer (form) {
      if (this.transferLoading) {
        return
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          var vu = this
          this.transferLoading = true
          if (this.trabsferModal.to === 'trade') {
            // 转到交易账户
            ax.get('/api/account/toExchange?type=' + this.trabsferModal.token + '&balance=' + this.trabsferModal.amount)
              .then((res) => {
                if (res.status == '200' && res.data.errorCode == 0) {
                  this.getMyAsset()
                  // 可优化为只改变需要改变的数据
                  this.$refs[form].resetFields()
                  this.showTransferModal = false
                  this.transferLoading = false
                  vu.$Message.success(this.$t('errorMsg.SUCCESS'))
                } else {
                  this.transferLoading = false
                  vu.$Message.error(this.$t('errorMsg.FAIL'))
                }
              })
              .catch((err) => {
                vu.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
                this.transferLoading = false
              })
          } else if (this.trabsferModal.to === 'master') {
            // 转到主账户
            ax.get('/api/exchange/toAccount?type=' + this.trabsferModal.token + '&balance=' + this.trabsferModal.amount)
              .then((res) => {
                if (res.status == '200' && res.data.errorCode == 0) {
                  this.getMyAsset()
                  this.$refs[form].resetFields()
                  this.showTransferModal = false
                  this.transferLoading = false
                  vu.$Message.success(this.$t('errorMsg.SUCCESS'))
                } else {
                  vu.$Message.error(this.$t('errorMsg.FAIL'))
                  this.transferLoading = false
                }
              })
              .catch((err) => {
                vu.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
                this.transferLoading = false
              })
          }
        } else {}
      })
    },
    /**
     * 选择划出账户
     */
    handleSelectFromChange () {
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
    handleSelectToChange () {
      if (this.trabsferModal.to === 'master') {
        this.trabsferModal.from = 'trade'
      }
      if (this.trabsferModal.to === 'trade') {
        this.trabsferModal.from = 'master'
      }
    }
  },
  mounted () {
    // function subQuo (pair) {
    //   ws.postData({
    //     event: 'sub',
    //     channel: 'huobi.market.' + pair + '.kline.1min'
    //   })
    // }
    // subQuo('btcusdt')
    // bus.$on('wsUpdate', data => {
    //   console.log(data)
    // })
  },
  created () {
    this.getTokenObj()
    this.getBalance()
    this.getMyAsset()
    var vu = this
    util.toggleTableHeaderLang(vu.assetListTable, 3, 'userCenter.asset.transfer.', vu)
    bus.$on('langChange', () => {
      util.toggleTableHeaderLang(vu.assetListTable, 3, 'userCenter.asset.transfer.', vu)
    })
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
  @import url(../style/config.less);
  .asset-cont {
    padding: 40px 0;
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
        padding: 55px 60px 0;
        .asset-amount {
          padding-bottom: 45px;
          line-height: 1.5;
          border-bottom: 1px solid #e9eaec;
          .asset-amount-title {
            padding-right: 120px;
          }
          .total-amount {
            font-size: 24px;
            line-height: 24px;
            color: #4b96e6;
          }
        }
        .opera-box {
          width: 100%;
          margin-top: 16px;
          .opera-box-btn {
            display: inline-block;
            min-width: 160px;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            text-align: center;
            color: #fff;
            background-color: @font-color-blue;
            cursor: pointer;
          }
        }
      }
    }
    .ivu-table-wrapper {
      border: none;
      padding-top: 55px;
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
      .ivu-table td{
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
    .ivu-spin-fix {
      background-color: rgb(247, 247, 247);
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