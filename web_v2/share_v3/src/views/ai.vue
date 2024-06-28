<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">文本转图片</v-tab>
        <v-tab value="two">翻译</v-tab>
        <v-tab value="three">摘要生成</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <v-row>
              <v-col>
                <v-textarea
                  label="提示词 prompt"
                  v-model="inputData.prompt"
                  variant="underlined"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="11">
                <div class="text-caption">
                  降噪强度 strength，默认为
                  1，降噪强度的取值范围为0到1。0表示输入图像中不添加噪声。1表示输入图像完全被噪声替换。降噪强度可以理解为保留原始图像和创建全新图像之间的平衡。降噪强度越高，图像变化越大。
                </div>
                <v-slider
                  v-model="inputData.strength"
                  label="降噪强度 strength"
                  :max="1"
                  :min="0"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="11">
                <div class="text-caption">
                  引导比例 guidance，默认为 7.5，Guidance
                  Scale（引导比例）是指在生成图像时，生成图像与输入提示之间的紧密程度和输入多样性之间的权衡。它是用来调整生成图像的质量和多样性之间的平衡点的参数。
                </div>
                <v-slider
                  v-model="inputData.guidance"
                  label="引导比例 guidance"
                  :max="10"
                  :min="0"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-btn @click="text2Image()">生成</v-btn>
            </v-row>
            <v-col></v-col>
            <v-row v-if="showText2Image">
              <v-col>
                <v-img :src="imgUrl"></v-img>
              </v-col>
            </v-row>
          </v-tabs-window-item>

          <!-- 翻译模块 -->
          <v-tabs-window-item value="two">
            <v-row>
              <v-col>
                <v-textarea
                  label="原文"
                  v-model="inputData.text"
                  variant="underlined"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  label="原语言"
                  :items="languageItems"
                  v-model="inputData.sourceLang"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  label="目标语言"
                  :items="languageItems"
                  v-model="inputData.targetLang"
                ></v-select>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-btn @click="fanyiFun()">翻译</v-btn>
            </v-row>
            <v-col></v-col>
            <v-row>
              <v-col>
                <v-textarea
                  label="翻译结果"
                  v-model="fanyiRes"
                  variant="underlined"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-tabs-window-item>

          <!-- 摘要 -->
          <v-tabs-window-item value="three">
            <v-row>
              <v-col>
                <v-textarea
                  label="原文"
                  v-model="inputData.inputText"
                  variant="underlined"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="number"
                  label="摘要最大长度"
                  v-model="inputData.maxLength"
                  variant="underlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-btn @click="bartFun()">生成</v-btn>
            </v-row>
            <v-col></v-col>
            <v-row>
              <v-col>
                <v-textarea
                  label="摘要"
                  v-model="bartRes"
                  variant="underlined"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>

    <!-- 邀请码 -->
    <v-dialog persistent v-model="showAiDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">请输入邀请码</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="invitationCode"
                placeholder="内测阶段，请输入邀请码！"
                label="邀请码"
                clearable
                variant="underlined"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="error" text @click="getConfigData()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    invitationCode: "",
    showAiDialog: true,
    tab: null,
    inputData: {
      prompt: "",
      strength: 1,
      guidance: 7.5,
      text: "",
      sourceLang: "",
      targetLang: "",
      inputText: "",
      maxLength: 50,
      secretKey: "",
    },
    server_api: {
      text2Image: "",
      fanyi: "",
      bart: "",
      secretKey: "",
    },
    showText2Image: false,
    imgUrl: "",
    fanyiRes: "",
    bartRes: "",
    languageItems: [
      { title: "中文", value: "zh" },
      { title: "英语", value: "en" },
      { title: "日语", value: "ja" },
      { title: "韩语", value: "ko" },
      { title: "德语", value: "de" },
      { title: "西班牙语", value: "es" },
      { title: "法语", value: "fr" },
      { title: "意大利语", value: "it" },
      { title: "俄语", value: "ru" },

      { title: "阿非利卡语", value: "af" },
      { title: "阿姆哈拉语", value: "am" },
      { title: "阿拉伯语", value: "ar" },
      { title: "阿斯图里亚斯语", value: "ast" },
      { title: "阿塞拜疆语", value: "az" },
      { title: "巴什基尔语", value: "ba" },
      { title: "白俄罗斯语", value: "be" },
      { title: "保加利亚语", value: "bg" },
      { title: "孟加拉语", value: "bn" },
      { title: "布列塔尼语", value: "br" },
      { title: "波斯尼亚语", value: "bs" },
      { title: "加泰罗尼亚语", value: "ca" },
      { title: "宿务语", value: "ceb" },
      { title: "捷克语", value: "cs" },
      { title: "威尔士语", value: "cy" },
      { title: "丹麦语", value: "da" },
      { title: "希腊语", value: "el" },
      { title: "爱沙尼亚语", value: "et" },
      { title: "波斯语", value: "fa" },
      { title: "富拉语", value: "ff" },
      { title: "芬兰语", value: "fi" },
      { title: "西弗里西亚语", value: "fy" },
      { title: "爱尔兰语", value: "ga" },
      { title: "苏格兰盖尔语", value: "gd" },
      { title: "加利西亚语", value: "gl" },
      { title: "古吉拉特语", value: "gu" },
      { title: "豪萨语", value: "ha" },
      { title: "希伯来语", value: "he" },
      { title: "印地语", value: "hi" },
      { title: "克罗地亚语", value: "hr" },
      { title: "海地克里奥尔语", value: "ht" },
      { title: "匈牙利语", value: "hu" },
      { title: "亚美尼亚语", value: "hy" },
      { title: "印度尼西亚语", value: "id" },
      { title: "伊博语", value: "ig" },
      { title: "伊洛卡诺语", value: "ilo" },
      { title: "冰岛语", value: "is" },
      { title: "爪哇语", value: "jv" },
      { title: "格鲁吉亚语", value: "ka" },
      { title: "哈萨克语", value: "kk" },
      { title: "中央高棉语", value: "km" },
      { title: "卡纳达语", value: "kn" },
      { title: "卢森堡语", value: "lb" },
      { title: "甘达语", value: "lg" },
      { title: "林加拉语", value: "ln" },
      { title: "老挝语", value: "lo" },
      { title: "立陶宛语", value: "lt" },
      { title: "拉脱维亚语", value: "lv" },
      { title: "马达加斯加语", value: "mg" },
      { title: "马其顿语", value: "mk" },
      { title: "马拉雅拉姆语", value: "ml" },
      { title: "蒙古语", value: "mn" },
      { title: "马拉地语", value: "mr" },
      { title: "马来语", value: "ms" },
      { title: "缅甸语", value: "my" },
      { title: "尼泊尔语", value: "ne" },
      { title: "荷兰语", value: "nl" },
      { title: "挪威语", value: "no" },
      { title: "北索托语", value: "ns" },
      { title: "奥克西塔尼语", value: "oc" },
      { title: "奥里亚语", value: "or" },
      { title: "旁遮普语", value: "pa" },
      { title: "波兰语", value: "pl" },
      { title: "普什图语", value: "ps" },
      { title: "葡萄牙语", value: "pt" },
      { title: "罗马尼亚语", value: "ro" },
      { title: "信德语", value: "sd" },
      { title: "僧伽罗语", value: "si" },
      { title: "斯洛伐克语", value: "sk" },
      { title: "斯洛文尼亚语", value: "sl" },
      { title: "索马里语", value: "so" },
      { title: "阿尔巴尼亚语", value: "sq" },
      { title: "塞尔维亚语", value: "sr" },
      { title: "斯瓦蒂语", value: "ss" },
      { title: "巽他语", value: "su" },
      { title: "瑞典语", value: "sv" },
      { title: "斯瓦希里语", value: "sw" },
      { title: "泰米尔语", value: "ta" },
      { title: "泰语", value: "th" },
      { title: "他加禄语", value: "tl" },
      { title: "茨瓦纳语", value: "tn" },
      { title: "土耳其语", value: "tr" },
      { title: "乌克兰语", value: "uk" },
      { title: "乌尔都语", value: "ur" },
      { title: "乌兹别克语", value: "uz" },
      { title: "越南语", value: "vi" },
      { title: "沃洛夫语", value: "wo" },
      { title: "科萨语", value: "xh" },
      { title: "依地语", value: "yi" },
      { title: "约鲁巴语", value: "yo" },
      { title: "祖鲁语", value: "zu" },
    ],
  }),
  created() {
    this.checkPower();
  },
  methods: {
    text2Image() {
      fetch(`${this.server_api.text2Image}`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify(this.inputData),
      })
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          this.imgUrl = imageUrl;
          this.showText2Image = true;
        })
        .catch((e) => {
          return null;
        });
    },
    fanyiFun() {
      fetch(`${this.server_api.fanyi}`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify(this.inputData),
      })
        .then((response) => response.json())
        .then((json) => {
          this.fanyiRes = json.response.translated_text;
        })
        .catch((e) => {
          return null;
        });
    },
    bartFun() {
      fetch(`${this.server_api.bart}`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify(this.inputData),
      })
        .then((response) => response.json())
        .then((json) => {
          this.bartRes = json.summary;
        })
        .catch((e) => {
          return null;
        });
    },
    checkPower() {
      this.httpGet("/ai/check", (json) => {
        if (json.data) {
          this.getConfigData();
        } else {
          this.showAiDialog = true;
        }
      });
    },
    getConfigData() {
      this.httpPost(
        "/ai/config",
        { invitationCode: this.invitationCode },
        (json) => {
          this.showAiDialog = false;
        
          this.server_api = JSON.parse(json.data.configMessage);
      
          this.inputData.secretKey = this.server_api.secretKey;
        }
      );
    },
  },
};
</script>

<style>
</style>