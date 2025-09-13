<template>
  <!-- 主內容 -->
  <main class="flex items-center justify-center min-h-screen">
    <div id="particles-js" class="fixed inset-0 bg-linear z-0"></div>
    <transition name="fade" mode="out-in">
      <!-- 登入 -->
      <div
        v-if="accountType == 'sign_in'"
        class="bg-dark rounded-lg shadow-lg w-96 p-6 z-10 box-reflect"
      >
        <div class="flex justify-center">
          <h2 class="text-2xl font-bold">進銷存 登入</h2>
        </div>

        <el-form label-position="top" class="my-8">
          <el-form-item label="廠商帳號" class="font-bold">
            <el-input placeholder="帳號" size="large" v-model="account">
              <template #prefix>
                <i class="ri-account-circle-fill"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="廠商密碼" class="font-bold">
            <el-input
              :type="show ? 'text' : 'password'"
              placeholder="密碼"
              size="large"
              v-model="password"
            >
              <template #prefix>
                <i class="ri-key-fill"></i>
              </template>
              <template #suffix>
                <i
                  :class="show ?  'ri-eye-fill' : 'ri-eye-off-fill'"
                  class="cursor-pointer hover:text-primary"
                  @click="toggleShow"
                ></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="grid grid-cols-4 gap-2">
              <el-input
                placeholder="驗證碼"
                class="col-span-2"
                size="large"
                v-model="captchaInput"
              ></el-input>
              <div class="col-span-2">
                <img src="@/assets/demo_verify.gif" />
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="w-full mt-4" size="large" block
              >登入</el-button
            >
          </el-form-item>
        </el-form>

        <el-divider style="background: red;">
          <a
            href="#"
            class="text-white hover:underline"
            @click.prevent="accountType = 'forget_pwd'"
            >忘記密碼?</a
          >
        </el-divider>
      </div>
      <!-- 忘記密碼 -->
      <div
        v-else-if="accountType == 'forget_pwd'"
        class="bg-dark rounded-lg shadow-lg w-96 p-6 z-10 box-reflect"
      >
        <div class="flex justify-center">
          <h2 class="text-2xl font-bold">進銷存 忘記密碼</h2>
        </div>

        <el-form label-position="top" class="my-8">
          <el-form-item label="請輸入廠商帳號" class="font-bold">
            <el-input
              placeholder="帳號"
              size="large"
              v-model="forgetPwdAccount"
            >
              <template #prefix>
                <i class="ri-account-circle-fill"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item
            label="請輸入您註冊廠商帳號的電子信箱"
            class="font-bold"
          >
            <el-input
              type="email"
              placeholder="電子信箱"
              size="large"
              v-model="forgetPwdEmailInput"
            >
              <template #prefix>
                <i class="ri-mail-line"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="grid grid-cols-4 gap-2">
              <el-input
                placeholder="驗證碼"
                class="col-span-2"
                size="large"
                v-model="forgetPwdCaptchaInput"
              ></el-input>
              <div class="col-span-2">
                <img src="@/assets/demo_verify.gif" />
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="w-full mt-4" size="large" block
              >重設密碼</el-button
            >
          </el-form-item>
        </el-form>

        <el-divider>
          <a
            href="#"
            class="text-white hover:underline"
            @click.prevent="accountType = 'sign_in'"
            >回到登入</a
          >
        </el-divider>
      </div>
    </transition>
    <!-- copyright -->
    <footer class="fixed bottom-4">
      <p class="text-white">
        &copy;
        {{ new Date().getFullYear() }}
        進銷存平台 All rights reserved.
      </p>
    </footer>
  </main>
</template>
<script setup>
const accountType = ref('sign_in'); // sign_in 登入、forget_pwd 忘記密碼
const account = ref(''); // 帳號 for 登入
const password = ref(''); // 密碼 for 登入
const captchaInput = ref(''); // 驗證碼輸入 for 登入
const show = ref(false); // 密碼眨眼睛 for 登入
const forgetPwdAccount = ref(''); // 帳號 for 忘記密碼
const forgetPwdEmailInput = ref(''); // 電子信箱 for 忘記密碼
const forgetPwdCaptchaInput = ref(''); // 驗證碼輸入 for 忘記密碼
// 載入 particles.min.js
function loadParticlesJs() {
  return new Promise((resolve, reject) => {
    if (window.particlesJS) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "/libs/particles.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
// 刪除 particles.min.js
function unloadParticlesJs() {
  const script = document.querySelector('script[src="/libs/particles.min.js"]');
  if (script) {
    script.remove();
    delete window.particlesJS;
    delete window.pJSDom;
  }
}

// 六角形背景
const particlesBg = () => {
  try {
    particlesJS("particles-js", {
      particles: {
          number: {
            value: 8,
            density: {
              enable: true,
              value_area: 350
            }
          },
          color: {
            value: "#4d516b"
          },
          shape: {
            type: "polygon",
            stroke: {
              width: 0,
              color: "#000"
            },
            polygon: {
              nb_sides: 6
            },
          },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 60,
            random: false,
            anim: {
              enable: true,
              speed: 10,
              size_min: 200,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 200,
            color: "#ffffff",
            opacity: 1,
            width: 4
          },
          move: {
            enable: true,
            speed: 8,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "grab"
            },
            onclick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 316,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 292,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 194,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
    });
  } catch (error) {
    console.error(error);
  }
};

const toggleShow = () => {
  // 開眼、閉眼
  show.value = !show.value;
}

onMounted(async () => {
  await loadParticlesJs();
  particlesBg();
  window.addEventListener("resize", _.debounce(particlesBg, 300));
});

onBeforeUnmount(() => {
  unloadParticlesJs();
  window.removeEventListener("resize", particlesBg);
});
</script>
<style lang="sass" scoped>
.bg-linear
  background-image: radial-gradient( circle farthest-corner at 70.4% 50.5%,  rgba(#6da8de,1) 15%, rgba(#184690,1) 72% )
.box-reflect
  box-reflect: below 10px linear-gradient( to right, rgba(255,255,255,0.0), rgba(255,255,255,0.1))
  -webkit-box-reflect: below 10px linear-gradient( to right, rgba(255,255,255,0.0), rgba(255,255,255,0.1))
.bg-dark
  background-color: #1B3872
  color: #ffffff
  :deep(.el-form-item__label)
    color: #ffffff
  :deep(.el-divider__text)
    background-color: #1B3872
  :deep(.el-input__wrapper.is-focus)
    border: 2px solid #ffffff
</style>
