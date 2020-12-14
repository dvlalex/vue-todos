import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'CInput',

  props: {
    model: {
      type: String,
      default: '',
    },
    focus: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isFocused: false,
  }),

  computed: {
    classList() {
      return {
        'c-input': true,
        'c-input--is-focused': this.isFocused,
      }
    },
  },

  watch: {
    focus(value) {
      if (value) (<HTMLInputElement>this.$refs.field).focus()
    },
  },

  methods: {
    onPlaceholderClick() {
      ;(<HTMLInputElement>this.$refs.field).focus()
    },

    onInputFocus() {
      this.isFocused = true
    },

    onInputBlur() {
      this.isFocused = false
    },

    onInputKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault()
        ;(<HTMLInputElement>e.target).blur()
      }
    },

    onInputChange(e: Event) {
      this.$emit('update:title', (<HTMLInputElement>e.target).value)
    },

    getPlaceholder() {
      const ref = 'placeholder'
      return this.$createElement(
        'p',
        { staticClass: `c-input__${ref}`, on: { click: this.onPlaceholderClick }, ref },
        this.model
      )
    },

    getInput() {
      const ref = 'field'
      return this.$createElement('input', {
        attrs: { type: 'text', value: this.model },
        staticClass: `c-input__${ref}`,
        on: {
          change: this.onInputChange,
          focus: this.onInputFocus,
          blur: this.onInputBlur,
          keydown: this.onInputKeydown,
        },
        ref,
      })
    },
  },

  render(h): VNode {
    return h('div', { ref: 'input', class: this.classList }, [this.getPlaceholder(), this.getInput()])
  },
})
