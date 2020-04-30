<script>
export default {
  name: "sideNavItem",
  props: {
    data: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
    parent: {
      type: Object,
    },
  },
  data() {
    return {
      dataItem: {},
    };
  },
  computed: {
    fullBasePath() {
      return `${this.basePath}/${this.data.path}`.replace("//", "/");
    },
    title() {
      return this.dataItem.meta && this.dataItem.meta.title;
    },
  },
  methods: {
    isLevelOneNav(data) {
      const filtered = data.children.filter((item) => !item.hidden);

      console.log("isLevelOneNav", this);
      if (filtered.length > 1) {
        return false;
      } else {
        this.dataItem = filtered.length === 1 ? filtered[0] : this.data;
        return true;
      }
    },
    renderItems() {
      const temp = [];
      return temp;
    },
  },
  render(h) {
    console.log("this", this);
    const key = this.dataItem.name || this.dataItem.path;
    console.log('render', this);
    if (this.data.hidden) {
      return h();
    }
    if (this.isLevelOneNav(this.data)) {
      return h(
        "router-link",
        {
          props: { to: this.fullBasePath },
        },
        [
          h(
            "a-menu-item",
            {
              props: { key: key },
            },
            this.title
          ),
        ]
      );
    } else {
      return h(
        "a-menu-item",
        {
          props: { key: key },
        },
        this.renderItems()
      );
    }
  },
};
</script>