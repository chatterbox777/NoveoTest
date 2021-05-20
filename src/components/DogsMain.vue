<template>
  <div class="main__dogs">
    <div class="breedRows">
      <div class="breedRow"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DogsMain",
  props: {
    msg: String,
  },
  computed: {
    ...mapState("dogs", {
      breeds: (state) => state.breeds,
    }),
  },
  mounted() {
    this.getAllBreeds();
  },
  methods: {
    ...mapActions("dogs", ["getAllBreeds"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main__dogs {
  .breedRows {
    display: flex;
    flex-direction: row;
    .breedRow {
    }
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
