<template>
    <div class="notice">
        <Card icon="compose" :bordered="false">
            <p slot="title">
                {{ $t('index.announcement.title') }}
                <a class="fr" style="font-weight: 400;" target="_blank" href="https://support.exchain.com/hc/zh-cn" v-if="$t('index.announcement.more') === '更多'">{{ $t('index.announcement.more') }} ></a>
                <a class="fr" style="font-weight: 400;" target="_blank" href="https://support.exchain.com/hc/en-us" v-if="$t('index.announcement.more') === 'More'">{{ $t('index.announcement.more') }} ></a>
            </p>
            <ul>
                <li>
                    <a class="notice-a" target="_blank" :href="$t('index.announcement.more') === '更多' ? 'https://support.exchain.com/hc/zh-cn/articles/360006935231' : 'https://support.exchain.com/hc/en-us/articles/360006935231'" :title="$t('index.announcement.news')">
                        {{ $t('index.announcement.news') }}
                        <Icon type="chevron-right"></Icon>
                    </a>
                </li>
                <li v-if="$t('index.announcement.more') === '更多'">
                    <a class="notice-a" target="_blank" href="https://support.exchain.com/hc/zh-cn/articles/360013213691" title="种子测试期间平台使用说明">
                        种子测试期间平台使用说明
                        <Icon type="chevron-right"></Icon>
                    </a>
                </li>
                <li v-if="$t('index.announcement.more') === 'More'">
                    <a class="notice-a" target="_blank" href="https://support.exchain.com/hc/en-us/articles/360013213691" title="Instructions For Exchain Special User Test">
                        Instructions For Exchain Special User Test
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
    line-height: @font-text*2;
    position: absolute;
    right: 11px; 
  }
  .ivu-card-body:hover {
    box-shadow: initial;
  }
  .notice-a {
        display: block;
        width: 228px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 13px;
  }
}
</style>
