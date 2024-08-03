<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import { ElCard, ElPagination } from "element-plus";
  import { Loading } from "@element-plus/icons-vue";
  import { fetchItemById, fetchTopStories } from "./server";
  import dayjs from "dayjs";
  import { Item } from "./types";

  const topstoriesID = ref<number[]>([]);
  const pageSize = ref(5);
  const pageNum = ref(1);
  onMounted(() => {
    fetchTopStories().then((res) => {
      topstoriesID.value = res;

      Promise.all(
        res
          .slice(
            (pageNum.value - 1) * pageSize.value,
            pageNum.value * pageSize.value,
          )
          .map((id) => fetchItemById(id)),
      ).then((res1) => {
        topstories.value = res1;
      });
    });
  });
  const topstories = ref<Item[]>([]);
  watch([pageNum, pageSize], ([pageNum, pageSize]) => {
    Promise.all(
      topstoriesID.value
        .slice((pageNum - 1) * pageSize, pageNum * pageSize)
        .map((id) => fetchItemById(id)),
    ).then((res1) => {
      topstories.value = res1;
    });
  });
</script>

<template>
  <div class="p-4">
    <h2 class="m0 mb-4">Topstories {{ topstoriesID.length }}</h2>
    <div
      v-if="!topstories.length"
      class="xy-center">
      <Loading class="w-50 py-10 c-gray-200 animate-rotating" />
    </div>
    <ElCard
      v-for="(storie, index) in topstories"
      class="mb-2"
      shadow="hover">
      <div class="flex">
        <div class="mr-2">{{ index + 1 + (pageNum - 1) * pageSize }}.</div>
        <div>
          <div>
            <a
              class="font-bold decoration-none c-black"
              target="_blank"
              :href="storie.url">
              {{ storie.title }}
            </a>
          </div>
          {{ storie.score }} points | by {{ storie.by }} |
          {{ dayjs.unix(storie.time).format("YYYY-MM-DD HH:mm:ss") }} |
          {{ storie.descendants }} commants
        </div>
      </div>
    </ElCard>
    <ElPagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      layout="prev, pager, next, sizes"
      :total="topstoriesID.length"
      class="xy-center justify-end" />
  </div>
</template>

<style scoped>
  .animate-rotating {
    animation: rotating 2s linear infinite;
  }
  @keyframes rotating {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
