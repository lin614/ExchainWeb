<template>
    <div class="banner-shortcut">
        <ul class="">
            <li class="item novice">
                <h3 class="tit3">新手教学</h3>
                <p class="title">图文指导Exchain使用流程</p>
            </li>
            <li class="item advise">
                <h3 class="tit3">Exchain听你说</h3>
                <p class="title">共享、共有、共建 Exchain</p>
            </li>
            <li class="item announcement">
                <h3 class="tit3">最新公告</h3>
                <p class="title">USDT＋ET加码合作伙伴共赢</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'shortcut'
}
</script>

<style lang="less">
@import url(../style/config.less);
.banner-shortcut{
    .item {
        height: 100px;
        padding: 20px;
    }
    .novice {
        background: #6856a3;
    }
    .advise {
        background: #67868a;
    }
    .announcement {
        background: #895e8e;
    }
  .tit3 {
          margin-bottom: 10px;
    color: #fff;
    font-size: 22px;
    font-weight: 500;
  }
  .title {
    color: #fff;
    font-size: 16px;
  }
}
</style>
