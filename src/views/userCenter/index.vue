<template>
  <page>
    <div class="user-center-cont">
      <div class="content clearfix">
        <crd potColor="#11b588">
          <span slot="title">基本信息</span>
          <div class="card-box basic-info">
            <div class="basic-top">
              <span class="email">goodlcw1@163.com</span>
              <span class="to-kyc">kyc认证 ></span>
            </div>
            <div class="basic-btm">
              <span class="recent-time">最近登录时间： 2018-07-08 16:58:22</span>
              <span>IP: 218.189.23.26</span>
            </div>
          </div>
        </crd>
        <crd potColor="#449aec">
          <span slot="title">安全设置</span>
          <div class="card-box safe-setting">
            <div class="card-item">
              <span class="card-item-title fl">登录密码</span>
              <span class="card-item-opera fr">修改 ></span>
            </div>
            <div class="card-item">
              <span class="card-item-title fl">手机绑定</span>
              <span class="card-item-text fl">提现，修改密码，及安全设置时以收取验证短信</span>
              <span class="card-item-opera fr">修改 ></span>
            </div>
            <div class="card-item car-item-unline">
              <span class="card-item-title fl">谷歌验证</span>
              <span class="card-item-text fl">提现，修改密码，及安全设置时以收取验证短信</span>
              <span class="card-item-opera fr">设置 ></span>
            </div>
          </div>
        </crd>
        <crd potColor="#fe7263">
          <span slot="title">最近登录</span>
          <div class="card-box recent-login">
             <Table :columns="columns1" :data="data1"></Table>
          </div>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from "../components/page"
import crd from "../components/crd.vue"
export default {
  name: "usercenter",
  components: {
    crd,
    page
  },
  data() {
    return {
      columns1: [
        {
          title: "登录",
          key: "type"
        },
        {
          title: "IP地址",
          key: "address"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            console.log('---' + params.row.status)
            if (params.row.status === '0') {
              return h('span', {
                style: {
                  color: '#4298ec'
                }
              }, '成功')
            } else {
              return h('span', {
                style: {
                  color: '#fc4e59'
                }
              }, '失败')
            }
          }
        }
      ],
      data1: [
        {
          type: "Web",
          address: "128.0.0.1",
          status: "0"
        },
        {
          type: "PC",
          address: "128.0.0.2",
          status: "0"
        },
        {
          type: "APP",
          address: "128.0.0.3",
          status: "1"
        }
      ]
    }
  }
}
</script>

<style lang="less">
.user-center-cont {
  width: 100%;
  padding-top: 40px;
  background-color: #f6f6f6;
  .crd {
    margin-bottom: 40px;
  }
  .card-box {
    padding: 0 60px;
    .card-item {
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid #e9eaec;
      .card-item-title {
        padding-right: 50px;
      }
      .card-item-text {
        color: #9a9a9a;
      }
      .card-item-opera {
        color: #419cf6;
        cursor: pointer;
      }
    }
    .car-item-unline {
      border-bottom: none;
    }
  }
  .basic-info {
    padding-top: 36px;
    padding-bottom: 30px;
    .basic-top {
      margin-bottom: 28px;
      .email {
        padding-right: 60px;
      }
      .to-kyc {
        color: #419cf6;
        cursor: pointer;
      }
    }
    .basic-btm {
      color: #9a9a9a;
      .recent-time {
        padding-right: 127px;
      }
    }
  }
  .recent-login {
    padding-top: 26px;
  }
  .ivu-table-wrapper {
    border: none;
    .ivu-table::after {
      width: 0;
    }
    .ivu-table::before {
      width: 0;
    }
    .ivu-table tr {
      height: 80px;
      color: #9a9a9a;
    }
    .ivu-table th {
      background-color: transparent;
      color: #495060;
    }
    .ivu-table tr:last-child td{
      border-bottom: none;
    }
    .ivu-table th:last-child{
      text-align: right;
    }
    .ivu-table td:last-child{
      text-align: right;
    }
  }
}
</style>
