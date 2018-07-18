<template>
    <div class="notice">
        <Card icon="compose" :bordered="false">
            <p slot="title">

                公告</p>
            <ul>
                <li>

                    <a target="_blank" href="https://support.exchain.com/hc/zh-cn/articles/360006935231-Exchain%E8%B6%85%E7%BA%A7%E5%90%88%E4%BD%9C%E4%BC%99%E4%BC%B4%E8%AE%A1%E5%88%92%E5%BC%80%E5%90%AF">
                        Exchain超级合作伙伴计划开启
                        <Icon type="chevron-right"></Icon>
                    </a>
                </li>

            </ul>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'notice'
}
</script>

<style lang="less">
@import url(../style/config.less);
.notice {
  ul {
    list-style: none;
  }
  li {
    font-size: @font-text;
    color: #4aa2e6;
    line-height: @font-text*2;
    cursor: pointer;
  }
  i {
    float: right;
    line-height: @font-text*2; 
  }
}
</style>
