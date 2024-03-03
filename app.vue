<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-full">
      <div
        class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
      ></div>

      <!-- Left sidebar -->
      <div class="hidden bg-red-500 md:block xs-col-span-1 xl:col-span-2">
        Test
      </div>
      <!-- Main content -->
      <!-- Right sidebar -->
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(true);
</script>
