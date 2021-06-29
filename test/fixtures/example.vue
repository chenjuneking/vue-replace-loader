<template>
  <div data-foo="__FOO__" class="cls-__BIZ__">
    {{bar}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      bar: '__BAR__',
    }
  }
}
</script>

<style>
.cls-__BIZ__ {
  color: red;
}
</style>