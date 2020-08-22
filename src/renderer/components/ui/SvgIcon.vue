<script>
export default {
  name: 'Icon',
  functional: true,
  render: function(createElement, ctx) {
    return createElement(
      'svg',
      {
        attrs: {
          viewBox: '0 0 24 24',
        },
        class: `${ctx.props.className}`,
      },
      [
        createElement('path', {
          attrs: {
            d: ctx.props.path,
          },
        }),
      ]
    );
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: false,
    },
  },
};
</script>
