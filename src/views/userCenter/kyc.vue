<template>
  <page>
    <div class="kyc-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content">
        <crd potColor="#429aeb">
          <span slot="title">KYC</span>
          <div class="kyc-main">
            <div class="form-box clearfix">
              <div class="form-item fl">
                <div class="label">名</div>
                <div class="ipt-box">
                  <input class="ipt" type="text" placeholder="名">
                </div>
              </div>
              <div class="form-item fl">
                <div class="label">姓</div>
                <div class="ipt-box">
                  <input class="ipt" type="text" placeholder="姓">
                </div>
              </div>
              <div class="form-item fl">
                <div class="label">身份证号码</div>
                <div class="ipt-box">
                  <input class="ipt" type="text" placeholder="身份证号码">
                </div>
              </div>
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
export default {
  name: 'kyc',
  data () {
    return {
      pageHeight: 0
    }
  },
  components: {
    crd,
    page
  },
  methods: {
    handleWindowResize () {
      this.pageHeight = window.innerHeight - 360
    }
  },
  created () {
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
  .kyc-cont {
    padding-top: 40px;
    font-size: 14px;
    .kyc-main {
      padding: 60px;
      .form-box {
        .form-item {
          width: 420px;
          .label {
            color: #000;
          }
          .ipt-box {
            .ipt {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
