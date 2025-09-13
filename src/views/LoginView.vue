<template>
  <div class="relative h-screen w-screen bg-white overflow-hidden">
    <!-- 背景圖片 -->
    <div ref="vantaBg" class="absolute h-full w-full"></div>
    <!-- 毛玻璃登入卡片 -->
    <div class="relative flex items-center justify-center h-full">
      <div class="backdrop-blur-md bg-white/40 rounded-2xl shadow-lg p-10 w-full max-w-md">
        <!-- 小圖一：左上 -->
        <img src="@/assets/login1.png" class="absolute rounded-full shadow-md top-[-40px] left-[-80px] w-32 opacity-75 animate-float" />
        <!-- 小圖二：右上 -->
        <img src="@/assets/login2.png" class="absolute rounded-full shadow-md top-[70px] right-[-70px] w-28 opacity-75 animate-float" />
        <!-- 小圖三：左下 -->
        <img src="@/assets/login3.png" class="absolute rounded-full shadow-md bottom-[-75px] left-[5%] w-24 opacity-75 animate-float" />

        <div class="text-center">
          <h1 class="text-2xl font-bold mb-2">Welcome Back</h1>
          <p class="text-gray-700 mb-6">進銷存</p>
        </div>

        <!-- 登入表單 -->
        <el-form v-if="accountType == 'sign_in'" label-position="top" class="my-6">
          <el-form-item label="帳號" class="font-bold">
            <el-input placeholder="帳號" size="large" v-model="account">
              <template #prefix>
                <i class="ri-account-circle-fill"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="密碼" class="font-bold">
            <el-input :type="show ? 'text' : 'password'" placeholder="密碼" size="large" v-model="password">
              <template #prefix>
                <i class="ri-key-line"></i>
              </template>
              <template #suffix>
                <i :class="show ? 'ri-eye-line' : 'ri-eye-off-line'" class="cursor-pointer hover:text-primary" @click="toggleShow"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="grid grid-cols-4 gap-2">
              <el-input placeholder="驗證碼" class="col-span-2" size="large" v-model="captchaInput"></el-input>
              <div class="col-span-2 opacity-75 justify-items-end">
                <img src="@/assets/demo_verify.gif" />
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500" size="large" block>登入</el-button>
          </el-form-item>

          <el-divider>
            <a href="#" class="text-blue-500" @click.prevent="accountType = 'forget_pwd'">忘記密碼?</a>
          </el-divider>
        </el-form>

        <!-- 忘記密碼表單 -->
        <el-form v-else-if="accountType == 'forget_pwd'" label-position="top" class="my-6">
          <el-form-item label="請輸入帳號" class="font-bold">
            <el-input placeholder="帳號" size="large" v-model="forgetPwdAccount">
              <template #prefix>
                <i class="ri-account-circle-fill"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="請輸入您註冊會員的電子信箱" class="font-bold">
            <el-input type="email" placeholder="電子信箱" size="large" v-model="forgetPwdEmailInput">
              <template #prefix>
                <i class="ri-mail-line"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="grid grid-cols-4 gap-2">
              <el-input placeholder="驗證碼" class="col-span-2" size="large" v-model="forgetPwdCaptchaInput"></el-input>
              <div class="col-span-2 opacity-75 justify-items-end">
                <img src="@/assets/demo_verify.gif" />
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500" size="large" block>重設密碼</el-button>
          </el-form-item>

          <el-divider>
            <a href="#" class="text-blue-500 hover:underline" @click.prevent="accountType = 'sign_in'">回到登入</a>
          </el-divider>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import CLOUDS from 'vanta/dist/vanta.clouds.min'

const accountType = ref('sign_in'); // sign_in 登入、forget_pwd 忘記密碼
const account = ref(''); // 帳號 for 登入
const password = ref(''); // 密碼 for 登入
const captchaInput = ref(''); // 驗證碼輸入 for 登入
const show = ref(false); // 密碼眨眼睛 for 登入
const forgetPwdAccount = ref(''); // 帳號 for 忘記密碼
const forgetPwdEmailInput = ref(''); // 電子信箱 for 忘記密碼
const forgetPwdCaptchaInput = ref(''); // 驗證碼輸入 for 忘記密碼
const vantaBg = ref(null);
let vantaEffect = null

const toggleShow = () => {
  show.value = !show.value;
};
onMounted(() => {
  if (!vantaEffect && vantaBg.value) {
    vantaEffect = CLOUDS({
      el: vantaBg.value,
      THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0xb7e5ff,
        cloudColor: 0xeeeeee,
        cloudShadowColor: 0x429af0,
        sunColor: 0xffc700,
        sunGlareColor: 0x6e1e00,
        sunlightColor: 0xff9844
    })
  }
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
