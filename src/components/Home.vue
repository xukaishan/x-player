<template>
  <div class="home">
    <ul class="home-nav">
      <li
        :class="{ active: idx === activeNavRef, 'nav-tab-itm': true }"
        v-for="(nav, idx) in navTab"
        :key="nav"
        @click="tabChange(idx)"
      >
        {{ nav }}
      </li>
    </ul>
    <a-spin :spinning="loading">
      <div class="home-nav-content">
        <base-song-list :song-list="songList" />
      </div>
    </a-spin>
    <ul class="page">
      <li
        :class="['prev', 'page-itm', { disabled: pageNo === 0 }]"
        @click="pageChange(-1)"
      >
        prev
      </li>
      <li class="next page-itm" @click="pageChange(1)">next</li>
    </ul>
  </div>
</template>

<script>
import apis from './proxy'
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import BaseSongList from './BaseSongList'
export default defineComponent({
  name: 'Home',
  components: {
    BaseSongList
  },
  setup () {
    /**tab */
    const navTab = ['新歌', '热歌', '流行歌曲'];
    const activeNavRef = ref(0);
    const tabChange = (idx) => {
      activeNavRef.value = idx;
      state.pageNo = 0;
      const type = { '0': 'new', '1': 'hot', '2': 'popular' }[idx];
      getSongs(state.pageNo, type)
    }

    /**list */
    let state = reactive({
      loading: false, // 加载中
      pageNo: 0,
      songList: [1]
    });

    const getSongs = (pageNo = state.pageNo, type = 'new') => {
      const methods = { 'new': 'getNewSongs', 'hot': 'getHotSongs', 'popular': 'getPopularSongs' }[type];
      const reg = { 'new': /new\/.*/, 'hot': /hot\/.*/, 'popular': /popular\/.*/ }[type];

      state.loading = true
      state.songList = []
      return apis[methods]({}, (opt) => {
        opt.url = opt.url.replace(reg, `${type}/${pageNo}`)
      }).then(res => {
        if (res.status === 200) {
          state.songList = res.data;
          return true
        } else {
          return new Error('get song lists fail')
        }
      }).finally(() => {
        state.loading = false
      })
    }

    /**page */
    const pageChange = (i) => {
      if (state.pageNo <= 0 && i === -1) return false
      state.pageNo = state.pageNo + i;
      getSongs(state.pageNo)
    }

    onMounted(async () => {
      await getSongs(state.pageNo)
    })

    return {
      navTab,
      activeNavRef,
      tabChange,
      pageChange,
      ...toRefs(state)
    }
  },
})
</script>

<style scoped lang='less'>
@bgc212629: #212629;
.home {
  padding: 10px 0;
  &-nav {
    display: flex;
    .nav-tab-itm {
      text-align: center;
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      width: 80px;
      &:hover {
        color: #fff;
      }
    }
    .active {
      color: #fff;
    }
  }
  &-nav-content {
    padding: 20px;
    min-height: calc(100vh - 170px);
    .nav-content-itm {
      transition: all 0.2s;
    }
  }
  .page {
    display: flex;
    justify-content: flex-end;
    padding: 30px 0;
    .page-itm {
      width: 80px;
      margin-right: 20px;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      text-align: center;
      background: #2e3235;
      cursor: pointer;
      &.disabled {
        cursor: not-allowed;
      }
      &:hover {
        opacity: 0.6;
      }
      &.next {
        background-color: #5c5f62;
        color: #fff;
      }
    }
  }
}
</style>
