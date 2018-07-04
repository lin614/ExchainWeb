<style>
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background: #222222;
  font-family: HelveticaNeue, Helvetica, Arial, 'Microsoft YaHei', sans-serif;
  font-size: 1.3em;
}
</style>
<template>
    <div class="index">
        <header2></header2>
        <content2></content2>
        <footer2></footer2>

    </div>
</template>
<script>
import header2 from './components/header2'
import content2 from './components/content2'
import footer2 from './components/footer2'
export default {
  components: { header2, content2, footer2 },
  methods: {}
}
</script>

