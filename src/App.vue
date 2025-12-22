<script setup>
    import TheHeader from './layouts/TheHeader.vue';
    import TheSidebar from './layouts/TheSidebar.vue';
    import CandidateList from './views/Candidate/CandidateList.vue';
</script>

<template>
  <div class="container">
    <TheHeader/>
    <div class="content display-flex">
      <TheSidebar/>
      <div class="main-content flex">
        <CandidateList/>
      </div>
    </div>
  </div>
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 13px;
    font-family: Inter, Arial, Helvetica, sans-serif;
  }

  /* Container */
  .container {
      display: flex;
      flex-direction: column;
      width: auto;
      height: 100vh;
      background-color: aqua;
  }

  .content {
    width: 100%;
    flex: 1;
    background-color: rgb(0, 0, 0);
    min-height: 0;
  }

  .main-content {
    background-color: rgb(229, 225, 225);
    padding: 16px 24px;
    width: 100%;
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
  }
</style>
