import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'CIcon',

  props: {
    size: {
      type: Number,
      default: 20,
    },
    iconPath: {
      type: String,
      default: '',
    },
  },

  computed: {
    classList() {
      return {
        'c-icon': true,
      }
    },
  },

  methods: {
    getSvg(slotPath: VNode) {
      const ref = 'svg'
      return this.$createElement(
        'svg',
        {
          attrs: {
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            xmlns: 'http://www.w3.org/2000/svg',
            width: this.size,
            height: this.size,
            viewBox: `0 0 24 24`,
            'aria-hidden': true,
          },
          style: {
            fontSize: this.size,
            width: this.size,
            height: this.size,
          },
          staticClass: `c-icon__${ref}`,
          ref,
        },
        [slotPath]
      )
    },
  },

  render(h): VNode {
    return h('span', { ref: 'icon', class: this.classList }, [this.getSvg(h('path', { attrs: { d: this.iconPath } }))])
  },
})
