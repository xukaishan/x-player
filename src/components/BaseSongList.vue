<template>
  <div class="base-song-list-wrapper">
    <ul class="base-song-list">
      <li class="itm" v-for="(v, i) in songList" :key="i">
        <a href=""
          ><div class="img-wrapper">
            <img :src="v.cover" /></div
        ></a>
        <p class="artist">{{ v.artist }}</p>
        <p class="title">{{ v.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseSongList',
  props: {
    songList: {
      type: Array,
      default: () => []
    }
  },
  setup () {
  },
})
</script>

<style scoped lang='less'>
@bgc212629: #212629;
.base-song-list-wrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 5px;
  .base-song-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    .itm {
      border-radius: 8px;
      overflow: hidden;
      background: #393e41;
      &:hover{
        opacity: 0.6;
      }
      .img-wrapper {
        height: calc(100% - 70px);
        img {
          width: 100%;
        }
      }
      .artist {
        color: #fff;
        font-size: 16px;
        margin-top: 10px;
      }
      p {
        padding-left: 10px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
