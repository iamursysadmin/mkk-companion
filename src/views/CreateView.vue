<template>
  <div class="flex h-screen flex-col items-center justify-center p-30">
    <div
      class="flex w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-300 px-8 py-16"
    >
      <UIcon name="i-lucide-image" class="size-8" />
      <p class="text-sm">Upload a folder or drag and drop</p>
    </div>

    <section class="flex w-full flex-col gap-4">
      <p class="text-xs">Unspported files will be ignored</p>
      <router-link to="/">Back</router-link>
    </section>
  </div>
</template>
