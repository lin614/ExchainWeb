<template>
  <page>
    <div class="asset-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main">
        <crd potColor="#4399e9">
          <span slot="title">我的资产</span>
          <div class="card-main clearfix">
            <div class="asset-amount">
              <span class="asset-amount-title">我的资产</span>
              <span>当前估值：</span>
              <span class="total-amount">{{BTCBalance}}BTC / ￥{{CNYBalance}} CNY</span>
            </div>
            <div class="opera-box clearfix">
              <router-link to="/usercenter/manageaddr" class="manage-addr-btn opera-box-btn fr">提现地址管理</router-link>
            </div>
            <Table :columns="assetListTable" :data="assetListData" :disabled-hover="true"></Table>
          </div>
          <Modal v-model="showTransferModal" class-name="change-pwd-model" :closable="false">
            <crd potColor="#4399e9">
              <span slot="title">资金划转</span>
              <div class="form-box">
                <Form ref="formCustom" :rules="transRules" :model="trabsferModal" label-position="top">
                  <FormItem label="币种" prop="tokenType">
                    <!-- <Select v-model="trabsferModal.tokenType">
                      <Option v-for="(item, index) in transferTokenList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select> -->
                    <Input v-model="trabsferModal.token" disabled></Input>
                  </FormItem>
                  <FormItem label="从" prop="from" class="available-box">
                    <Select v-model="trabsferModal.from" @on-change="handleSelectFromChange">
                      <Option v-for="(item, index) in fromList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                    <span class="available-amount">余额为
                      <i v-show="(trabsferModal.from === 'master')">{{master}}</i>
                      <i v-show="(trabsferModal.from === 'trade')">{{trade}}</i> {{trabsferModal.token}}</span>
                  </FormItem>
                  <FormItem label="转至" prop="to" class="available-box">
                    <Select v-model="trabsferModal.to" @on-change="handleSelectToChange">
                      <Option v-for="(item, index) in toList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                    <span class="available-amount">余额为
                      <i v-show="(trabsferModal.to === 'master')">{{master}}</i>
                      <i v-show="(trabsferModal.to === 'trade')">{{trade}}</i> {{trabsferModal.token}}</span>
                  </FormItem>
                  <FormItem label="数量" prop="amount">
                    <Input v-model="trabsferModal.amount"></Input>
                  </FormItem>
                </Form>
              </div>
            </crd>
            <div slot="footer">
              <div class="change-model-footer clearfix">
                <span class="model-btn fr" @click="handleCloseTransfer('formCustom')">取消</span>
                <div class="model-btn model-btn-active fl" @click="handleTransfer('formCustom')">
                  <span>立刻划转</span>
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
        from: [{ required: true, message: '请选择转出账户', trigger: 'blur' }],
        to: [{ required: true, message: '请选择转入账户', trigger: 'blur' }],
        amount: [
          { required: true, message: '请输入划转数量', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '' || value === 0 || value === '0') {
                callback('请输入划转数量')
              }
              // 判断精度
              var decimal = this.tokenObj[this.trabsferModal.token].decimal
              console.log('decimal' + decimal)
              var reg = RegExp('^[0-9]{0,8}(.[0-9]{0,' + decimal + '})?$')
              if (!reg.test(value)) {
                callback('划转数量格式有误')
              }
              if (this.trabsferModal.from === 'master') {
                if (parseFloat(value) > parseFloat(this.master)) {
                  callback('超过可用额度')
                }
              } else if (this.trabsferModal.from === 'trade') {
                if (parseFloat(value) > parseFloat(this.trade)) {
                  callback('超过可用额度')
                }
              } else {
                if (parseFloat(value) > 0) {
                  callback('超过可用额度')
                }
              }
              callback()
            },
            trigger: 'change'
          }
        ]
      },
      assetListTable: [
        {
          title: '币种',
          key: 'token'
        },
        {
          title: '主账户',
          key: 'account_available'
        },
        {
          title: '交易账户',
          key: 'exchange_available'
        },
        {
          title: '冻结',
          key: 'exchange_freeze'
        },
        {
          title: ' ',
          key: 'opera',
          minWidth: 250,
          render: (h, params) => {
            // console.log('行数据如下： ')
            // console.log(params.row)
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: this.assetListData[params.index].showCharge
                      ? '#419cf6'
                      : '',
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
                },
                [
                  h('i', '充值'),
                  h('Icon', {
                    props: {
                      type: 'arrow-down-b'
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
                    marginRight: '30px',
                    color: this.assetListData[params.index].showCash
                      ? '#419cf6'
                      : '',
                    display: params.row.withdraw ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {
                      this.showColor = 'getCash'
                      this.handleOpera(params.index, params.row, 'getCash')
                    }
                  }
                },
                [
                  h('i', '提现'),
                  h('Icon', {
                    props: {
                      type: 'arrow-down-b'
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
                '划转'
              ),
              h(
                'span',
                {
                  style: {
                    cursor: 'pointer',
                    marginRight: '30px',
                    display: params.row.trade ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {}
                  }
                },
                '交易'
              )
            ])
          }
        },
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  width: '100%',
                  padding: '20px',
                  minHeight: '200px',
                  backgroundColor: '#f5f5f5'
                }
              },
              [
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
                  }
                })
              ]
            )
          }
        }
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
          label: '主账户',
          value: 'master'
        },
        {
          label: '交易账户',
          value: 'trade'
        }
      ],
      toList: [
        {
          label: '主账户',
          value: 'master'
        },
        {
          label: '交易账户',
          value: 'trade'
        }
      ],
      tokenObj: {}
    }
  },
  watch: {
    tokenObj() {
      // this.assetListData
      console.log('watch')
      console.log(this.tokenObj)
      for (var key in this.tokenObj) {
        for (var i = 0; i < this.assetListData.length; i++) {
          if (this.assetListData[i].token === key) {
            this.assetListData[i].trade = key.trade
            this.assetListData[i].recharge = key.recharge
            this.assetListData[i].withdraw = key.withdraw
            this.assetListData[i].decimal = key.decimal
            this.$set(this.assetListData, i, this.assetListData[i])
            break
          }
        }
      }
    }
  },
  methods: {
    getBalance() {
      ax
        .get(
          '/api/account/balanceQuery?types=BTC,CNY',
          { withcredentials: true },
          {
            headers: {
              pn: sessionStorage.PN
            }
          }
        )
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            this.BTCBalance = res.data.result.BTC.available
            this.CNYBalance = res.data.result.CNY.available
          }
        })
        .catch(err => {})
    },
    handleWindowResize() {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 获取我的资产列表
     */
    getMyAsset() {
      var vu = this
      ax
        .get('/api/account/assetsList', {
          headers: {
            pn: sessionStorage.PN
          }
        })
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            // console.log(res.data.result)
            // this.assetListData = res.data.result
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
              vu.assetListData.push(JSON.parse(JSON.stringify(obj)))
            }
          }
        })
    },
    getTokenObj() {
      var vu = this
      ax
        .get('/api/quotation/getSymbolLists')
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            var result = res.data.result
            console.log('-----------------------')
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
        .catch(err => {
          console.log('error')
        })
    },
    handleOpera(index, params, exType) {
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
    handleTransferShow(token, master, trade) {
      this.master = master
      this.trade = trade
      this.showTransferModal = true
      this.trabsferModal.token = token
    },
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
      this.$refs[form].validate(valid => {
        if (valid) {
          var vu = this
          this.transferLoading = true
          if (this.trabsferModal.to === 'trade') {
            // 转到交易账户
            ax
              .get(
                '/api/account/toExchange?type=' +
                  this.trabsferModal.token +
                  '&balance=' +
                  this.trabsferModal.amount
              )
              .then(res => {
                if (res.status == '200' && res.data.errorCode == 0) {
                  console.log('操作成功')
                  this.$refs[form].resetFields()
                  this.showTransferModal = false
                  this.transferLoading = false
                  vu.$Message.success('操作成功')
                } else {
                  this.transferLoading = false
                  vu.$Message.error('网络异常')
                }
              })
              .catch(err => {
                this.transferLoading = false
              })
          } else if (this.trabsferModal.to === 'master') {
            // 转到主账户
            ax
              .get(
                '/api/exchange/toAccount?type=' +
                  this.trabsferModal.token +
                  '&balance=' +
                  this.trabsferModal.amount
              )
              .then(res => {
                if (res.status == '200' && res.data.errorCode == 0) {
                  this.$refs[form].resetFields()
                  vu.$Message.success('操作成功')
                } else {
                  vu.$Message.error('网络异常')
                }
              })
              .catch(err => {})
          }
        } else {
        }
      })
    },
    handleSelectFromChange() {
      console.log(this.trabsferModal.from)
      if (this.trabsferModal.from === 'master') {
        this.trabsferModal.to = 'trade'
      }
      if (this.trabsferModal.from === 'trade') {
        this.trabsferModal.to = 'master'
      }
    },
    handleSelectToChange() {
      console.log(this.trabsferModal.to)
      if (this.trabsferModal.to === 'master') {
        this.trabsferModal.from = 'trade'
      }
      if (this.trabsferModal.to === 'trade') {
        this.trabsferModal.from = 'master'
      }
    }
  },
  created() {
    this.getTokenObj()
    this.getBalance()
    this.getMyAsset()
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed() {
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
