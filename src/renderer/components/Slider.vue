<template>
  <div
    class="slider"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @input="mouseMove"
  >
    <input
      class="slider"
      type="range"
      :min="start"
      :max="end"
      :value="value"
      step="0.1"
      ref="slider"
    />
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  watch: {
    value: function(val) {
      const percent = (val / this.end) * 100;
      const color = `linear-gradient(90deg, #b3b3b3 ${percent}%, #404040 ${percent}%)`;
      this.$refs.slider.style.background = color;
    }
  },
  methods: {
    mouseEnter() {
      const percent = (this.$refs.slider.value / this.end) * 100;
      const color = `linear-gradient(90deg, #1db954 ${percent}%, #404040 ${percent}%)`;
      this.$refs.slider.style.background = color;
    },
    mouseLeave() {
      const percent = (this.$refs.slider.value / this.end) * 100;
      const color = `linear-gradient(90deg, #b3b3b3 ${percent}%, #404040 ${percent}%)`;
      this.$refs.slider.style.background = color;
    },
    mouseMove() {
      const percent = (this.$refs.slider.value / this.end) * 100;
      const color = `linear-gradient(90deg, #1db954 ${percent}%, #404040 ${percent}%)`;
      this.$refs.slider.style.background = color;
    }
  }
};
</script>

<style lang="scss">
.slider {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover input[type="range"]::-webkit-slider-thumb {
    width: 0.75rem;
    height: 0.75rem;
    margin-top: -0.25rem;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }

  input {
    height: 0.25rem;
  }
}
</style>
