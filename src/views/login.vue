// 登录页
<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/login.jpg" alt="login" title="ele login">
    </div>
    <hx-inputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    ></hx-inputGroup>
    <hx-inputGroup type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code"></hx-inputGroup>
    <div class="login_des">
      <p>
        新用户登陆即自动注册，表示同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <div class="login_btn">
      <button :disabled='isClick' @click='login'>登陆</button>
    </div>
  </div>
</template>

<script>
import inputGroup from "../components/inputGroup";
import { setInterval, clearInterval } from "timers";
export default {
  name: "login",
  components: {
    "hx-inputGroup": inputGroup
  },
  data() {
    return {
      phone: "",
      verifyCode: "",
      errors: {
        phone: "",
        code: ""
      },
      btnTitle: "获取验证码",
      disabled: false
    };
  },
  methods: {
    getVerifyCode() {
      // 判断手机号是否合法
      if (!this.phone) {
        this.errors.phone = "手机号不能为空";
        return;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors.phone = "请填写正确的手机号码";
        return;
      }
      this.errors.phone = "";
      // 获取验证码倒计时展示
      this.validateBtn();
      // 发送请求，获取验证码\
      this.$axios.post("/api/posts/sms_send", {
        tpl_id: 162661,
        key: 'c30600e6aca2b2e9709bf07948426d25',
        phone: this.phone
      })
      // .then((res) => {
      //   console.log(res)
      // })
    },
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          time--;
          this.btnTitle = `${time}s后重试`;
          this.disabled = true;
        }
      }, 1000);
    },
    login () {
      this.errors.phone = '';
      this.errors.code = '';
      // 验证验证码
      this.$axios.post('/api/posts/sms_back', {
        phone: this.phone,
        code: this.verifyCode
      }).then(() => {
        // console.log(res);
        localStorage.setItem('ele_login', true)
        this.$router.push('/')
      }).catch(err => {
        this.errors.code = err.response.data.msg;
      })
    }
  },
  computed: {
    isClick () {
      if(!this.phone || !this.verifyCode){
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  .logo {
    text-align: center;
    img {
      width: 150px;
    }
  }
  .login_des {
    margin-top: 20px;
    color: #aaa;
    line-height: 22px;
    span {
      color: #4d90fe;
    }
  }
  .login_btn {
    button {
      width: 100%;
      height: 40px;
      background-color: #48ca38;
      border-radius: 4px;
      color: white;
      font-size: 14px;
      border: none;
      outline: none;
      &[disabled] {
        background-color: #8bda81;
      }
    }
  }
}
</style>
