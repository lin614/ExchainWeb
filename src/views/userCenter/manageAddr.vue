<template>
  <page>
    <div class="manage-addr-cont">
      <div class="content-body-main">
        <crd>
          <span slot="title">{{ $t('userCenter.withdrawAddress.title') }}</span>
          <div class="mge-addr-main">
            <div class="form-box">
              <Form class="clearfix" ref="magAddrForm" :rules="magAddrRules" :model="magAddrForm" label-position="top" inline>
                <FormItem :label="$t('userCenter.withdrawAddress.type')" prop="tokenType" style="width: 180px;">
                  <Select v-model="magAddrForm.tokenType">
                    <Option v-for="(item, index) in tokenList" :value="item.value" :key="index">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem :label="$t('userCenter.withdrawAddress.outer_address')" prop="addr" style="width: 420px;">
                  <Input v-model="magAddrForm.addr"></Input>
                </FormItem>
                <FormItem :label="$t('userCenter.withdrawAddress.name')" prop="note" style="width: 420px;">
                  <Input v-model="magAddrForm.note"></Input>
                </FormItem>
                <FormItem class="fr">
                  <Button class="add-btn" @click="handleAddAddr">{{ $t('userCenter.withdrawAddress.add') }}</Button>
                </FormItem>
              </Form>
            </div>
            <div class="addr-list">
              <div class="addr-list-title"></div>
              <Table :columns="addrListTable" :data="addrListData" :disabled-hover="true"></Table>
            </div>
          </div>
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
import util from '../../libs/util.js'
export default {
  name: 'manageAddr',
  components: {
    page,
    crd
  },
  data() {
    return {
      magAddrForm: {
        tokenType: '',
        addr: '',
        note: ''
      },
      tokenList: [],
      magAddrRules: {
        tokenType: [
          {
            required: true,
            message: this.$t('errorMsg.TOKEN_UNSELECT'),
            trigger: 'change'
          }
        ],
        addr: [
          {
            required: true,
            message: this.$t('errorMsg.ADDR_BLANK'),
            trigger: 'blur'
          },
          { max: 100, message: this.$t('errorMsg.ADDR_LIMIT'), trigger: 'change, blur' }
        ],
        note: [
          {
            required: true,
            message: this.$t('errorMsg.NOTE_BLANK'),
            trigger: 'blur'
          },
          { max: 255, message: this.$t('errorMsg.NOTE_LIMIT'), trigger: 'change, blur' }
        ]
      },
      addrListTable: [
        {
          title: this.$t('userCenter.withdrawAddress.type'),
          key: 'type',
          maxWidth: 150,
          filters: [],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.type === value
          }
        },
        {
          title: this.$t('userCenter.withdrawAddress.outer_address'),
          key: 'outer_address',
          minWidth: 250,
          render: function(h, params) {
            return h('span', params.row.outer_address)
          }
        },
        {
          title: this.$t('userCenter.withdrawAddress.name'),
          minWidth: 250,
          key: 'name'
        },
        {
          title: this.$t('userCenter.withdrawAddress.opera'),
          key: 'opera',
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  color: '#419aec',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.handleRemoveAddr(
                      params.index,
                      params.row.type,
                      params.row.outer_address
                    )
                  }
                }
              },
              this.$t('userCenter.withdrawAddress.delete')
            )
          }
        }
      ],
      addrListData: []
    }
  },
  methods: {
    /**
     * 获取币种支持列表
     */
    getTokenList() {
      var vu = this
      ax
        .get(config.url.user + '/api/quotation/getSymbolLists', getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            var result = res.data.result
            var obj = {}
            for (var key in result) {
              obj.value = key
              obj.label = key
              vu.tokenList.push(JSON.parse(JSON.stringify(obj)))
              vu.addrListTable[0].filters.push(JSON.parse(JSON.stringify(obj)))
            }
          }
        })
        .catch(err => {})
    },
    /**
     * 查询地址列表
     */
    getWithdrawAddress() {
      var vu = this
      ax
        .post(config.url.user + '/api/account/getWithdrawAddress', {
          type: ''
        }, getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            vu.addrListData = [...res.data.result.data]
          }
        })
        .catch(() => {})
    },
    /**
     * 添加地址
     */
    handleAddAddr() {
      const vu = this
      this.$refs.magAddrForm.validate(valid => {
        if (valid) {
          ax
            .post(config.url.user + '/api/account/addWithdrawAddress', {
              type: vu.magAddrForm.tokenType,
              name: vu.magAddrForm.note,
              outerAddress: vu.magAddrForm.addr
            }, getHeader)
            .then(res => {
              if (res.status == '200' && res.data.errorCode == 0) {
                vu.getWithdrawAddress()
                vu.$refs.magAddrForm.resetFields()
                vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
              } else if (res.data.errorCode == 2) {
                vu.$Message.error(vu.$t('errorMsg.REGISTER_IPT_ERR'))
              } else {
                vu.$Message.error(vu.$t('errorMsg.FAIL'))
              }
            })
            .catch(err => {
              vu.$Message.error(vu.$t('errorMsg.NETWORK_ERROR'))
            })
        }
      })
    },
    /**
     * 删除地址
     */
    handleRemoveAddr(index, type, addr) {
      const vu = this
      ax
        .post(config.url.user + '/api/account/delWithdrawAddress', {
          type: type,
          outerAddress: addr
        })
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            vu.addrListData.splice(index, 1)
            vu.getWithdrawAddress()
            vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
          } else {
            vu.$Message.error(vu.$t('errorMsg.FAIL'))
          }
        })
        .catch(err => {
          vu.$Message.error(vu.$t('errorMsg.NETWORK_ERROR'))
        })
    }
  },
  mounted() {
    this.getTokenList()
    this.getWithdrawAddress()
    this.addrListTable[0].filters = [...this.tokenList]
    var vu = this
    util.toggleTableHeaderLang(
      vu.addrListTable,
      3,
      'userCenter.withdrawAddress.',
      vu
    )
    bus.$on('langChange', () => {
      vu.$refs.magAddrForm.resetFields()
      util.toggleTableHeaderLang(
        vu.addrListTable,
        3,
        'userCenter.withdrawAddress.',
        vu
      )
    })
  }
}
</script>

<style lang="less">
@import '../style/config.less';
.manage-addr-cont {
  padding: 40px 0;
  .mge-addr-main {
    padding: 50px 60px 80px;
    .form-box {
      padding-bottom: 30px;
      border-bottom: 1px solid #eee;
      .add-btn {
        display: inline-block;
        min-width: 240px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding: 0 10px;
        color: #fff;
        background-color: @font-color-blue;
        text-align: center;
      }
    }
    .addr-list {
      padding-top: 40px;
      .addr-list-title {
        line-height: 1.5;
        color: #000;
      }
    }
  }
}
</style>
