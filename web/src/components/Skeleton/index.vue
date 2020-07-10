<template>
  <div class="skeleton">
    <div class="skeleton-body">
      <div class="skeleton-title-a"></div>
      <div class="skeleton-content-b"></div>
      <div class="skeleton-content-c"></div>
    </div>
  </div>
</template>
<style>
  .skeleton-title-a {
    width: 100%;
    height: 15px;
  }

  .skeleton-content-b {
    width: 80%;
    height: 15px;
    margin-top: 10px;
  }

  .skeleton-content-c {
    width: 60%;
    height: 15px;
    margin-top: 10px;
  }

  .skeleton .skeleton-title-a,
  .skeleton .skeleton-content-b,
  .skeleton .skeleton-content-c {
    background: rgba(0, 0, 0, 0.02);
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.45) 25%, transparent 25%);
    background-size: 20rem 20rem;
    animation: skeleton-stripes 1s linear infinite;
  }

  @keyframes skeleton-stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 20rem 0;
    }
  }

</style>
