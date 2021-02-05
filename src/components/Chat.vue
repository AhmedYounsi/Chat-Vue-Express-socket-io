<template>
  <div style="height: 96vh" class="card mt-3">
    <h1 class="text-center m-2">ALL MESSAGES</h1>

    <div class="msg-content">
      <div class="messages" v-for="(msg, index) in messages" :key="index">
        <p class="msg-send">
          <span class="font-weight-bold"></span>{{ msg.message }}
        </p>
      </div>
    </div>

    <div
      style="position: fixed; width: 100%; bottom: 0; position: relative"
      class="card-footer"
    >
      <div class="gorm-group row pb-3">
        <div
          style="position: relative; padding: 0; height: 54px"
          class="col-12"
        >
          <VEmojiPicker
            v-show="show_emoji"
            style="position: absolute; top: -468px; right: 25px"
            @select="selectEmoji"
          />

          <textarea
            placeholder="message..."
            style=""
            cols="40"
            rows="2"
            type="text"
            v-model="message"
            class="input-msg"
          />
          <div style="position: absolute; top: 18px; right: 8px">
            <i
              @click="show_emoji_fun"
              style="font-size: 25px; margin-right: 4px; cursor: pointer"
              class="fas fa-smile-beam"
            ></i>
            <i
              @click="sendMessage"
              style="font-size: 25px; cursor: pointer"
              class="fas fa-paper-plane"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import io from "socket.io-client";
var socket = io("/");
export default {
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      message: "",
      messages: [],
      show_emoji: false,
    };
  },
  watch: {
    messages() {
      setTimeout(() => {
        this.scroll();
      }, 100);
    },
  },
  methods: {
        selectEmoji(emoji) {
     this.message = this.message + emoji.data
    },
    show_emoji_fun() {
      this.show_emoji = !this.show_emoji;
    },
    scroll() {
      var div = document.querySelector(".msg-content");
      div.scrollTo(0, div.scrollHeight);
    },
    sendMessage() {
      var input_msg = document.querySelector(".input-msg");
      if (this.message != "") {
        input_msg.focus();

        socket.emit("SEND_MESSAGE", {
          message: this.message,
        });
        this.message = "";
         this.show_emoji = false
      }
      this.get_all();
    },
    get_all() {
      socket.emit("GET_MESSAGE", {});
      socket.on("MESSAGE", (data) => {
        this.messages = data;
      });
    },
  },
  created() {
      window.onclick = ()=>{

      },
    window.onkeypress = (event) => {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    };
    this.get_all();
  },
};
</script>

<style scoped>
.grid-emojis{
    display: none;
}
.input-msg {
  padding: 10px 40px 10px 10px;
  width: 100%;
}
.msg-content {
  width: 100%;
  height: 80vh;
  padding: 0 10px;
  overflow: auto;
}
.msg-send {
  width: 50%;
  background: #28a745bf;
  padding: 5px 10px;
  border-radius: 13px;
  color: white;
  font-weight: bold;
}
</style>
