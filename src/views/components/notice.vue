<template>
    <div class="notice">
        <Card icon="compose" :bordered="false">
            <p slot="title">
                {{ $t('index.announcement.title') }}
                <a class="fr" style="font-weight: 400;" target="_blank" href="https://support.exchain.com/hc/zh-cn" v-if="$t('common.lang') === 'cn'">{{ $t('index.announcement.more') }} ></a>
                <a class="fr" style="font-weight: 400;" target="_blank" href="https://support.exchain.com/hc/en-us" v-if="$t('common.lang') === 'en'">{{ $t('index.announcement.more') }} ></a>
            </p>

            <ul>

                <li>
                    <a class="notice-a" target="_blank" :href="$t('index.announcement.newsUrl1')" :title="$t('index.announcement.newsTitle1')">
                        {{ $t('index.announcement.newsTitle1') }}
                        <Icon type="chevron-right"></Icon>
                    </a>
                </li>

                <li>
                    <a class="notice-a" target="_blank" :href="$t('index.announcement.newsUrl2')" :title="$t('index.announcement.newsTitle2')">
                        {{ $t('index.announcement.newsTitle2') }}
                        <Icon type="chevron-right"></Icon>
                    </a>
                </li>

                <li>
                    <a class="notice-a" target="_blank" :href="$t('index.announcement.newsUrl3')" :title="$t('index.announcement.newsTitle3')">
                        {{ $t('index.announcement.newsTitle3') }}
                        <Icon type="chevron-right"></Icon>
                    </a>
                </li>
                
                <li>
                    <a class="notice-a" target="_blank" :href="$t('index.announcement.newsUrl4')" :title="$t('index.announcement.newsTitle4')">
                        {{ $t('index.announcement.newsTitle4') }}
                        <Icon type="chevron-right"></Icon>
                    </a>
                </li>

                <li>
                    <a class="notice-a" target="_blank" :href="$t('index.announcement.newsUrl5')" :title="$t('index.announcement.newsTitle5')">
                        {{ $t('index.announcement.newsTitle5') }}
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
