<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(document.getElementsByTagName('body')[0].clientHeight)
    const body = document.getElementsByTagName('body')[0]
    body.style.height = `${body.clientHeight}px`
    body.style.width = `${body.clientWidth}px`
  }
}
</script>

<style>
#app {
  font-family: '萍方', 'Avenir', Helvetica, Arial, sans-serif;
}

#app,
body,
html {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

body {
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6,
body,
html,
p,
div {
  margin: 0;
  padding: 0;
}

.bold {
  font-weight: bold;
}
</style>
