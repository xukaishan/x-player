<template>
  <div class="home">
    <a-tabs @change="tabChange">
      <a-tab-pane key="0" tab="新歌">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="1" tab="热歌" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="2" tab="流行歌曲">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import apis from './proxy'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  setup () {
    apis.getNewSongs({}, (opt) => {
      // opt.url = 'https://spinsha.re/api/songs/new/2'
    }).then(res => {
      console.log('res=>', res);
    })
    console.log('apis=>', apis);
    const tabChange = (key) => {
      console.log('key=>', key);
    }
    return {
      tabChange
    }
  },
})
</script>

<style scoped lang='less'>
.home{

}
</style>
