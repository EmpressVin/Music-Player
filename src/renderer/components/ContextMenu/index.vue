<script>
import ContextMenuBuilder from './builder';

export default {
  name: 'ContextMenu',
  functional: true,
  props: {
    type: {
      type: String,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
  },
  render: function(createElement, ctx) {
    const contextMenuItems = ContextMenuBuilder(ctx.props.type, createElement);
    const { x: clickX, y: clickY } = ctx.props.position;
    const width = window.innerWidth;
    const height = window.innerHeight;

    let menuX, menuY;

    if (clickX + 208 > width) {
      menuX = clickX - 208;
    } else {
      menuX = clickX;
    }

    if (clickY + 16 + contextMenuItems.length * 36.78 > height - 88) {
      menuY = clickY - 16 - contextMenuItems.length * 36.78;
    } else {
      menuY = clickY;
    }

    return createElement(
      'nav',
      {
        style: {
          top: `${menuY}px`,
          left: `${menuX}px`,
        },
        class: 'context-menu',
      },
      contextMenuItems
    );
  },
};
</script>

<style lang="scss">
.context-menu {
  @include size($w: 208px);
  @include padding-axis($y: 0.5rem);
  position: absolute;
  background-color: $secondary-black;
  box-shadow: $shadow-6dp;
  z-index: 10;
}
</style>
