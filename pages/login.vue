<template>
  <div class="container">
    <div class="title">
      <h2>{{ isHaveAccount ? 'ログイン画面' : '新規登録画面' }}</h2>
    </div>
    <UCard class="form-card">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <div class="button-wrapper">
        <UButton class="form-button" type="submit">
          {{ isHaveAccount ? 'ログイン' : '新規登録'}}
        </UButton>
      </div>
      </UForm>
    </UCard>
    <UButton class="form-button" color="blue" @click="changeForm">
      {{ isHaveAccount ? '新規登録' : 'ログイン'}}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const isHaveAccount = ref(true);
const router = useRouter();

// 新規登録とログイン画面の切り替え
const changeForm = () => {
    isHaveAccount.value = !isHaveAccount.value;
}

const schema = object({
  email: string().email('有効でないメールアドレスです').required('Required'),
  password: string()
    .min(8, '8文字以上入力してください')
    .required('Required')
})

type Schema = InferType<typeof schema>;

const state = reactive({
  email: '',
  password: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { email, password } = event.data;
  const auth = getAuth();

  try {
    if (isHaveAccount.value) {
      // ログイン処理
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } else {
      // 新規登録処理
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    }

    console.log("処理が完了しました！");
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: center;
}

.form-button {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #040404;
  margin-top: 20px;
  height: 40px;
  width: 30%;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
}

.form-card {
  min-width: 100%;
  max-width: 1000px;
}
</style>