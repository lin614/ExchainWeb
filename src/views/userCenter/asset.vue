<template>
  <page>
    <div class="asset-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content">
        <crd potColor="#4399e9">
          <span slot="title">我的资产</span>
          <div class="card-main clearfix">
            <div class="asset-amount">
              <span class="asset-amount-title">我的资产</span>
              <span>当前估值：</span>
              <span class="total-amount">0.00000BTC / ￥0.00 CNY</span>
            </div>
            <div class="opera-box clearfix">
              <!-- <span class="transfer-btn opera-box-btn fl" @click="handleTransferShow">资金划转</span> -->
              <router-link to="/usercenter/manageaddr" class="manage-addr-btn opera-box-btn fr" @click="handleManageAddr">提现地址管理</router-link>
            </div>
            <Table :columns="assetListTable" :data="assetListData" :disabled-hover="true"></Table>
          </div>
          <Modal
            v-model="showTransferModal"
            class-name="change-pwd-model"
            :closable="false">
            <crd potColor="#4399e9">
              <span slot="title">资金划转</span>
              <div class="form-box">
                <Form ref="formCustom" :rules="rules" :model="trabsferModal" label-position="top">
                  <FormItem label="币种" prop="tokenType">
                    <!-- <Select v-model="trabsferModal.tokenType">
                      <Option v-for="(item, index) in transferTokenList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select> -->
                    <Input v-model="trabsferModal.token" disabled></Input>
                  </FormItem>
                  <FormItem label="从" prop="from">
                    <Select v-model="trabsferModal.from">
                      <Option v-for="(item, index) in fromList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="转至" prop="to">
                    <Select v-model="trabsferModal.to">
                      <Option v-for="(item, index) in toList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="数量" prop="amount">
                    <Input v-model="trabsferModal.amount"></Input>
                  </FormItem>
                </Form>
              </div>
            </crd>
            <div slot="footer">
              <div class="change-model-footer clearfix">
                <span class="model-btn fr" @click="handleCloseTransfer">取消</span>
                <span class="model-btn model-btn-active fl" @click="handleTransfer"><Spin v-if="transferLoading" size="small"></Spin>立刻划转</span>
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
      showTransferModal: false,
      transferLoading: false,
      showCharge: false,
      trabsferModal: {
        token: '',
        from: '',
        to: '',
        amount: ''
      },
      rules: {},
      assetListTable: [
        {
          title: '币种',
          key: 'token'
        },
        {
          title: '主账户',
          key: 'main_account'
        },
        {
          title: '交易账户',
          key: 'trade_account'
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
            return h('div', [
              h('span', {
                style: {
                  color: '#419cf6',
                  cursor: 'pointer',
                  marginRight: '30px'
                },
                on: {
                  click: () => {
                    this.handleOpera(params.index, params.row, 'encharge')
                  }
                }
              }, '充值'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '30px'
                },
                on: {
                  click: () => {
                    this.handleOpera(params.index, params.row, 'getCash')
                  }
                }
              }, '提现'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '30px'
                },
                on: {
                  click: () => {
                    this.handleTransferShow(params.row.token)
                  }
                }
              }, '划转')
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
                minHeight: '200px',
                backgroundColor: '#f5f5f5' 
              }
            }, [
              h(encharge, {
                props: {
                  params: params,
                  showCharge: this.showCharge
                }
              }),
              h(getCash, {
                props: {
                  params: params
                }
              })
            ])
          }
        },  
      ],
      assetListData: [
        {
          token: 'BTC',
          main_account: '1000',
          exchange_freeze: '19000',
          trade_account: '0.000',
          _expanded: false
        },
        {
          token: 'ETH',
          main_account: '1000',
          exchange_freeze: '19000',
          trade_account: '0.000',
          _expanded: false
        },
        {
          token: 'USDT',
          main_account: '1000',
          exchange_freeze: '19000',
          trade_account: '0.000',
          _expanded: false
        }
      ],
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
      ]
    }
  },
  methods: {
    getBalance () {
      ax.get('/api/account/balanceQuery?types=BTC,CNY', {withcredentials: true}, {
        headers: {
          "pn": sessionStorage.pn
        }
      })
        .then((res) => {
          if (res.status == '200' && res.data.errorCode == 0) {
            console.log(res.data)
          }
        })
        .catch((err) => {})
    },
    handleWindowResize () {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 获取我的资产列表
     */
    getMyAsset () {
      ax.get('/api/account/assetsList', {
        headers: {
          "pn": sessionStorage.PN
        }
      }).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          this.assetListData = res.data.result.data;
        }
      });
    },
    handleOpera (index, params, exType) {
      if (exType === 'encharge') {
        /**
         * 充值
         * 
         * {
         *  "errorCode": 0,
         *  "errorMsg": "成功",
         *  "result": {
         *      "address": "0x6e522f4a8d369700d53aa52f2a4d6bac9186d030",
         *      "qrcode": "/qrcode.png?d=ZXRoZXJldW06MHg2ZTUyMmY0YThkMzY5NzAwZDUzYWE1MmYyYTRkNmJhYzkxODZkMDMw&rand=1531753032&sign=af852ef4f894992201c1320a1cf451de"
         *    }
         *  }
         */
        this.showCharge = true
        ax.get('/api/account/getAddress?type=' + params.token)
          .then((res) => {
            if (res.status == '200' && res.data.errorCode == 0) {
              console.log('ok')
            }
          })
          .catch((err) => {})
      } else {
        /**
         * 提现
         */
        this.showCharge = false
      }
      //request
      this.assetListData.forEach((value, index) => {
        value._expanded = false
      })
      console.log(this.assetListData)
      this.assetListData[index]._expanded = true
      this.assetListData[index].isEncharge = true
      this.showExType = exType
      console.log(this.showExType)
      this.$set(this.assetListData, index, this.assetListData[index])
    },
    handleTransferShow (token) {
      this.showTransferModal = true
      this.trabsferModal.token = token
    },
    handleManageAddr () {},
    handleCloseTransfer () {
      this.showTransferModal = false
    },
    handleTransfer () {}
  },
  created () {
    this.getBalance()
    this.getMyAsset()
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
            min-width: 100px;
            height: 30px;
            font-size: @font-text;
            line-height: 30px;
            margin-right: 30px;
            padding: 0 10px;
            background-color: @font-color-blue;
            color: #fff;
            text-align: center;
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
  }
</style>
