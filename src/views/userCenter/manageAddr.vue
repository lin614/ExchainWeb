<template>
  <page>
    <div class="manage-addr-cont">
      <div class="content">
        <crd>
          <span slot="title">提现地址管理</span>
          <div class="mge-addr-main">
            <div class="form-box">
              <Form class="clearfix" ref="magAddrForm" :rules="magAddrRules" :model="magAddrForm" label-position="top" inline>
                <FormItem label="币种" prop="tokenType" style="width: 180px;">
                  <Select v-model="magAddrForm.tokenType">
                    <Option v-for="(item, index) in tokenList" :value="item.value" :key="index">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="提币地址" prop="addr" style="width: 420px;">
                  <Input v-model="magAddrForm.addr"></Input>
                </FormItem>
                <FormItem label="备注" prop="note" style="width: 420px;">
                  <Input v-model="magAddrForm.note"></Input>
                </FormItem>
                <FormItem class="fr">
                  <Button class="add-btn" @click="handleAddAddr">添加</Button>
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
import page from "../components/page"
import crd from "../components/crd.vue"
import ax from 'axios'
export default {
  name: 'manageAddr',
  components: {
    page,
    crd
  },
  data () {
    return {
      magAddrForm: {
        tokenType: '',
        addr: '',
        note: ''
      },
      tokenList: [
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
      magAddrRules: {
        tokenType: [
          { required: true, message: '请选择币种', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入提币地址', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      addrListTable: [
        {
          title: '币种',
          key: 'type',
          maxWidth: 150,
          filters: [
            {
              label: 'Greater than 25',
              value: 1
            },
            {
              label: 'Less than 25',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.type == value
          }
        },
        {
          title: '提币地址',
          key: 'outer_address',
          minWidth: 250,
          render: function(h, params) {
            return h('span', params.row.outer_address)
          }
        },
        {
          title: '备注',
          minWidth: 250,
          key: 'name'
        },
        {
          title: '操作',
          key: 'opera',
          render: (h, params) => {
            return h('span', {
              style: {
                color: '#419aec',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.handleRemoveAddr(params.index, params.row.outer_address)
                }
              }
            }, '删除')
          }
        }
      ],
      addrListData: [
        {
          type: 'BTC',
          outer_address: 'xxx',
          name: '我的BTC地址'
        },
        {
          type: 'ETH',
          outer_address: 'xxx',
          name: '我的BTC地址'
        },
        {
          type: 'BTC',
          outer_address: 'xxx',
          name: '我的BTC地址'
        },
        {
          type: 'BTC',
          outer_address: 'xxx',
          name: '我的BTC地址'
        }
      ]
    }
  },
  methods: {
    getWithdrawAddress () {
      ax.post('/api/account/getWithdrawAddress', {
        type: ''
      })
      .then((res) => {
        if (res.status == '200' && res.data.errorCode == 0) {
          console.log(res.data) // 这是提币地址列表
          this.addrListTable[0].filters = [...res.data.result]
          this.addrListData = [...res.data.result]
        }
      })
      .catch(() => {})
    },
    handleAddAddr () {
      const vu = this
      this.$refs.magAddrForm.validate((valid) => {
        if (valid) {
          ax.post('/api/account/addWithdrawAddress', {
            type: vu.magAddrForm.tokenType,
            name: vu.magAddrForm.note,
            outer_address: vu.magAddrForm.addr
          })
          .then((res) => {
            console.log(1)
            if (res.status == '200' && res.data.errorCode == 0) {
              console.log(res.data.result) // 这是添加提币地址后返回的
              vu.$Message.success('添加地址成功！')
            } else {
              vu.$Message.error('网络异常！')
            }
          })
          .catch((err) => {})
        } else {
          console.log('请检查您的输入')
        }
      })    
    },
    handleRemoveAddr (index) {
      const vu = this
      ax.post('/api/account/delWithdrawAddress', {
        type: vu.magAddrForm.tokenType,
        outerAddress: vu.magAddrForm.addr
      })
      .then((res) => {
        if (res.status == '200' && res.data.errorCode == 0) {
          console.log(res.data.result) // 这是删除提币地址后返回的
          this.addrListData.splice(index, 1)
          vu.$Message.success('删除地址成功！')
        } else {
          vu.$Message.error('网络异常！')
        }
      })
      .catch((err) => {})
    }
  },
  mounted () {
    // outerAddress
    this.getWithdrawAddress()
    this.addrListTable[0].filters = [...this.tokenList]  // 测试用
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
