import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'CIcon',
  functional: true,

  props: {
    size: {
      type: Number,
      default: 22,
    },
    iconPath: {
      type: String,
      default: '',
    },
  },

  render(h, context): VNode {
    const genSvg = (slotPath: VNode, size: number) => {
      const ref = 'svg'
      return h(
        'svg',
        {
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            width: size,
            height: size,
            viewBox: `0 0 24 24`,
            'aria-hidden': true,
          },
          style: {
            fill: 'currentColor',
            fontSize: size,
            width: size,
            height: size,
          },
          staticClass: `c-icon__${ref}`,
          ref,
        },
        [slotPath]
      )
    }

    return h(
      'span',
      {
        class: {
          'c-icon': true,
        },
      },
      [genSvg(h('path', { attrs: { d: context.props.iconPath } }), context.props.size)]
    )
  },
})
