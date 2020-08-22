<template>
  <div
    class="context-menu__item"
    :class="{ 'context-menu__item--selected': hovered }"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <SvgIcon
      :path="icon"
      :className="
        `context-menu-item__icon ${hovered == true &&
          'context-menu-item__icon--selected'}`
      "
    />
    <span class="context-menu-item__text">
      {{ text }}
    </span>
  </div>
</template>

<script>
import SvgIcon from '@/components/ui/SvgIcon';

export default {
  name: 'ContextMenuItem',
  components: { SvgIcon },
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
    };
  },
};
</script>

<style lang="scss">
.context-menu__item {
  @include size($w: 100%);
  @include padding-axis($x: 1.5rem, $y: 0.4rem);
  @include flex($row: true, $v-center: true);
  @include letter-spacing(0.025rem);
  cursor: pointer;
  color: $medium-emphasis;
  font-size: 0.8rem;

  &--selected {
    background-color: $secondary-black-highlight;
    color: white;
  }
}

.context-menu-item__icon {
  @include square-size(1.5rem);
  fill: $medium-emphasis;

  &--selected {
    fill: white;
  }
}

.context-menu-item__text {
  @include margin($left: 0.75rem);
}
</style>
