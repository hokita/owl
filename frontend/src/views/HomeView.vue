<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4"
  >
    <div class="w-full max-w-4xl bg-white rounded shadow p-4 text-gray-900">
      <!-- Title -->
      <h1 class="text-2xl font-bold mb-4">Owl</h1>

      <div class="flex flex-wrap gap-2 mb-4 items-center">
        <!-- Year -->
        <div class="flex items-center">
          <select
            v-model="year"
            class="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
            @change="onChangeDate"
          >
            <option disabled value="">Year</option>
            <option v-for="y in [2025, 2026, 2027]" :key="y" :value="y">
              {{ y }}
            </option>
          </select>
          <span class="ml-1 hidden sm:inline">/</span>
        </div>

        <!-- Month -->
        <div class="flex items-center">
          <select
            v-model="month"
            class="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
            @change="onChangeDate"
          >
            <option disabled value="">Month</option>
            <option v-for="m in 12" :key="m" :value="m">
              {{ m }}
            </option>
          </select>
          <span class="ml-1 hidden sm:inline">-</span>
        </div>

        <!-- Week -->
        <div class="flex items-center">
          <select
            v-model="week"
            class="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
            @change="onChangeDate"
          >
            <option disabled value="">Week</option>
            <option v-for="w in 5" :key="w" :value="w">
              {{ w }}
            </option>
          </select>
        </div>
      </div>

      <!-- Input new note -->
      <div class="flex flex-wrap gap-2 mb-4">
        <input
          v-model="newNoteContent"
          type="text"
          placeholder="Enter a new note..."
          class="flex-1 border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
        />
        <div class="flex items-center w-full sm:w-auto">
          <select
            v-model="type"
            class="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
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
          @click="onClickAddNote"
          class="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600 w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      <div v-if="errorMessage" class="text-red-500 mb-4">
        {{ errorMessage }}
      </div>

      <h2 class="text-xl font-bold mb-2">Events</h2>
      <ul class="list-disc pl-5">
        <li
          v-for="note in eventNotes"
          :key="note.id"
          class="border-b border-gray-200 py-2"
        >
          <div class="flex items-center justify-between">
            {{ note.content }}
            <button
              class="text-red-500 hover:text-red-700"
              @click="onClickDeleteNote(note.id)"
            >
              Del
            </button>
          </div>
        </li>
      </ul>

      <h2 class="text-xl font-bold mb-2 mt-4">Learns</h2>
      <ul class="list-disc pl-5">
        <li
          v-for="note in learnNotes"
          :key="note.id"
          class="border-b border-gray-200 py-2"
        >
          <div class="flex items-center justify-between">
            {{ note.content }}
            <button
              class="text-red-500 hover:text-red-700"
              @click="onClickDeleteNote(note.id)"
            >
              Del
            </button>
          </div>
        </li>
      </ul>

      <h2 class="text-xl font-bold mb-2 mt-4">Nexts</h2>
      <ul class="list-disc pl-5">
        <li
          v-for="note in nextNotes"
          :key="note.id"
          class="border-b border-gray-200 py-2"
        >
          <div class="flex items-center justify-between">
            {{ note.content }}
            <button
              class="text-red-500 hover:text-red-700"
              @click="onClickDeleteNote(note.id)"
            >
              Del
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useReviewQuery from "@/composables/useReviewQuery";
import useReviewMutation from "@/composables/useReviewMutation";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const today = new Date();

let yearParam = route.params.year;
let monthParam = route.params.month;
let weekParam = route.params.week;

if (Array.isArray(yearParam)) {
  yearParam = yearParam[0];
}
if (Array.isArray(monthParam)) {
  monthParam = monthParam[0];
}
if (Array.isArray(weekParam)) {
  weekParam = weekParam[0];
}

const newNoteContent = ref("");
const year = ref(parseInt(yearParam, 10) || today.getFullYear());
const month = ref(parseInt(monthParam, 10) || today.getMonth() + 1);
const week = ref(parseInt(weekParam, 10) || 1);
const type = ref("event");
const errorMessage = ref("");

const { review, refetch, eventNotes, learnNotes, nextNotes } = useReviewQuery(
  year.value,
  month.value,
  week.value,
);

const {
  create: createReview,
  onCreateDone: onCreateReviewDone,
  onCreateError: onCreateReviewError,
  createError: createReviewError,
  createNote,
  onCreateNoteDone,
  onCreateNoteError,
  createNoteError,
  deleteNote,
  onDeleteNoteDone,
  onDeleteNoteError,
  deleteNoteError,
} = useReviewMutation();

onCreateReviewDone(({ data }) => {
  if (data && data.createReview) {
    newNoteContent.value = "";
    refetch();
  }
});

onCreateReviewError((mutationError) => {
  console.error(mutationError);
  errorMessage.value = createReviewError.value?.message ?? "";
});

onCreateNoteDone(({ data }) => {
  if (data && data.createNote) {
    newNoteContent.value = "";
    refetch();
  }
});

onCreateNoteError((mutationError) => {
  console.error(mutationError);
  errorMessage.value = createNoteError.value?.message ?? "";
});

onDeleteNoteDone(({ data }) => {
  if (data && data.deleteNote) {
    refetch();
  }
});

onDeleteNoteError((mutationError) => {
  console.error(mutationError);
  errorMessage.value = deleteNoteError.value?.message ?? "";
});

const onClickAddNote = () => {
  if (!newNoteContent.value) {
    errorMessage.value = "Note content is required";
    return;
  }

  // If review is not exist, create review
  if (!review.value) {
    const input = {
      year: year.value,
      month: month.value,
      week: week.value,
      notes: [
        {
          content: newNoteContent.value,
          type: type.value,
        },
      ],
    };
    createReview({ input });
    return;
  }

  const input = {
    review_id: review.value.id,
    content: newNoteContent.value,
    type: type.value,
  };

  createNote({ input });
};

const onClickDeleteNote = (id: string) => {
  deleteNote({ id });
};

const onChangeDate = () => {
  refetch({
    year: year.value,
    month: month.value,
    week: week.value,
  });

  router.push({
    name: "weekPage",
    params: {
      year: year.value.toString(),
      month: month.value.toString(),
      week: week.value.toString(),
    },
  });
};
</script>

<style scoped></style>
