<script>
export default {
  name: "ContextMenuDivider",
  functional: true,
  render: function(createElement) {
    return createElement("hr", {
      class: "context-menu__divider"
    });
  }
};
</script>

<style lang="scss">
.context-menu__divider {
  @include margin-axis($y: 0.25rem);
  border-color: $disabled;
}
</style>
