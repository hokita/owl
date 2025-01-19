<template>
  <div class="w-screen h-screen flex items-center justify-center bg-gray-100">
    <div
      class="w-full max-w-4xl bg-white rounded shadow p-4 mx-4 text-gray-900"
    >
      <!-- タイトル -->
      <h1 class="text-2xl font-bold mb-4">Owl</h1>

      <div class="flex gap-2 mb-4 items-center">
        <!-- 年 -->
        <div class="flex items-center">
          <select
            v-model="year"
            class="border border-gray-300 rounded px-2 py-1"
          >
            <option disabled value="">Year</option>
            <option v-for="y in [2025, 2026, 2027]" :key="y" :value="y">
              {{ y }}
            </option>
          </select>
          <span class="ml-1">/</span>
        </div>

        <!-- 月 -->
        <div class="flex items-center">
          <select
            v-model="month"
            class="border border-gray-300 rounded px-2 py-1"
          >
            <option disabled value="">Month</option>
            <option v-for="m in 12" :key="m" :value="m">
              {{ m }}
            </option>
          </select>
          <span class="ml-1">-</span>
        </div>

        <!-- 日 -->
        <div class="flex items-center">
          <select
            v-model="week"
            class="border border-gray-300 rounded px-2 py-1"
          >
            <option disabled value="">Week</option>
            <option v-for="w in 5" :key="w" :value="w">
              {{ w }}
            </option>
          </select>
        </div>
      </div>
      <!-- タスク入力欄 -->
      <div class="flex gap-2 mb-4">
        <input
          v-model="newTask"
          type="text"
          placeholder="Enter a new task..."
          class="flex-1 border border-gray-300 rounded px-2 py-1"
          @keyup.enter="addTask"
        />
        <div class="flex items-center">
          <select
            v-model="type"
            class="border border-gray-300 rounded px-2 py-1"
          >
            <option disabled value="">Select Type</option>
            <option
              v-for="type in ['event', 'learn', 'next']"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <button
          @click="addTask"
          class="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <!-- タイトル -->
      <h2 class="text-xl font-bold mb-2">Events</h2>

      <!-- タスクリスト -->
      <ul class="list-disc pl-5">
        <li
          v-for="(note, index) in eventNotes"
          :key="index"
          class="border-b border-gray-200 py-2"
        >
          <div class="flex items-center justify-between">
            {{ note.content }}
            <button
              class="text-red-500 hover:text-red-700"
              @click="removeTask(index)"
            >
              Del
            </button>
          </div>
        </li>
      </ul>

      <!-- タイトル -->
      <h2 class="text-xl font-bold mb-2 mt-4">Learns</h2>

      <!-- タスクリスト -->
      <ul class="list-disc pl-5">
        <li
          v-for="(note, index) in learnNotes"
          :key="index"
          class="border-b border-gray-200 py-2"
        >
          <div class="flex items-center justify-between">
            {{ note.content }}
            <button
              class="text-red-500 hover:text-red-700"
              @click="removeTask(index)"
            >
              Del
            </button>
          </div>
        </li>
      </ul>

      <!-- タイトル -->
      <h2 class="text-xl font-bold mb-2 mt-4">Nexts</h2>

      <!-- タスクリスト -->
      <ul class="list-disc pl-5">
        <li
          v-for="(note, index) in nextNotes"
          :key="index"
          class="border-b border-gray-200 py-2"
        >
          <div class="flex items-center justify-between">
            {{ note.content }}
            <button
              class="text-red-500 hover:text-red-700"
              @click="removeTask(index)"
            >
              Del
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <p>{{ review }}</p>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { graphql } from "@/gql";
import { useQuery } from "@vue/apollo-composable";
import { useFragment } from "@/gql/fragment-masking";
import type { ReviewFieldsFragment, NoteFieldsFragment } from "@/gql/graphql";

/** タスクアイテムの型定義 */
interface Task {
  text: string;
  completed: boolean;
}

const today = new Date();

/** 新しいタスク入力用の文字列 */
const newTask = ref("");
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const week = ref(1);
const type = ref("event");

/** タスクリスト */
const tasks = ref<Task[]>([
  { text: "Vue と Tailwind を連携させる", completed: false },
  { text: "シンプルな TODO アプリを作る", completed: false },
]);

// Graphql
const ReviewFields = graphql(`
  fragment ReviewFields on Review {
    id
    year
    month
    week
    notes {
      ...NoteFields
    }
  }
`);
const NoteFields = graphql(`
  fragment NoteFields on Note {
    id
    type
    content
  }
`);
const GET_WEEK_REVIEW = graphql(`
  query GetWeekReview($year: Int!, $month: Int!, $week: Int!) {
    weekReview(year: $year, month: $month, week: $week) {
      ...ReviewFields
    }
  }
`);
const { result } = useQuery(GET_WEEK_REVIEW, {
  year: year.value,
  month: month.value,
  week: week.value,
});

const review = computed((): ReviewFieldsFragment | undefined =>
  useFragment(ReviewFields, result.value?.weekReview ?? undefined)
);

const notes = computed(
  (): NoteFieldsFragment[] =>
    review.value?.notes.map((note) => useFragment(NoteFields, note)) ?? []
);

// Filter notes by type
const useNotesByType = (type: string) => {
  return computed((): NoteFieldsFragment[] => {
    return notes.value.filter((note) => note.type === type);
  });
};

const eventNotes = useNotesByType("event");
const learnNotes = useNotesByType("learn");
const nextNotes = useNotesByType("next");

/**
 * タスクを追加する
 */
function addTask() {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    text: newTask.value.trim(),
    completed: false,
  });
  newTask.value = "";
}

/**
 * タスクを削除する
 * @param index - 削除するタスクのインデックス
 */
function removeTask(index: number) {
  tasks.value.splice(index, 1);
}
</script>

<style scoped>
/* 必要に応じて追加のスタイルがあればここに書く */
</style>
