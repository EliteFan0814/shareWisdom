const views = {
  methods: {
    init(to, from) {
      this.getData()
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.init(to, from)
    })
  }
}

export { views }
