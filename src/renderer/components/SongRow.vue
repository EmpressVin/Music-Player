<template>
  <div
    class="song-row"
    :class="{ 'song-row--selected': isHovered }"
    tabindex="0"
    @blur="showContextMenu = false"
    @contextmenu="handleContextMenu"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="song-row__play-container">
      <button v-if="isHovered" class="song-row__play-icon" @click="playSong(id)">
        <SvgIcon :path="playOutlinedPath" />
      </button>
      <span v-else class="font-medium">5</span>
    </div>
    <button class="song-row__heart-icon">
      <SvgIcon :path="heartOutlinedPath" />
    </button>
    <div class="song-row__title">
      {{ title }}
    </div>
    <portal to="contextmenu" v-if="showContextMenu">
      <ContextMenu type="songContextMenu" :position="mousePostion" />
    </portal>
  </div>
</template>

<script>
import SvgIcon from '@/components/ui/SvgIcon';
import ContextMenu from '@/components/ContextMenu';

import * as IconPath from '@/../constants/iconPaths';

export default {
  name: 'SongRow',
  components: { SvgIcon, ContextMenu },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    playSong: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
      showContextMenu: false,
      mousePosition: {
        x: 0,
        y: 0,
      },
      heartOutlinedPath: IconPath.HEART_OUTLINED,
      playOutlinedPath: IconPath.PLAY_OUTLINED,
    };
  },
  methods: {
    handleContextMenu(e) {
      this.showContextMenu = false;

      this.mousePostion = {
        x: e.clientX,
        y: e.clientY,
      };

      this.showContextMenu = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.song-row {
  @include size($w: 100%);
  @include padding-axis($y: 0.55rem);
  @include flex($row: true, $v-center: true);
  color: white;
  border-bottom: 1px solid $secondary-black;

  &:focus {
    outline: none;
  }

  &--selected {
    background-color: $secondary-black;
  }
}

.song-row {
  &__heart-icon {
    @include square-size(1.25rem);
    @include margin-axis($x: 0.75rem);
    fill: $medium-emphasis;

    &:hover {
      fill: white;
    }
  }

  &__play-container {
    @include size($w: 2rem, $h: 1.5rem);
    @include flex($row: true, $v-center: true, $h-center: true);
  }

  &__play-icon {
    @include square-size(1.5rem);
    fill: $high-emphasis;

    &:hover {
      fill: white;
    }
  }

  &__title {
    @include margin($left: 0.75rem);
    color: white;
    font-weight: 500;
    letter-spacing: 0.05rem;
  }
}
</style>
