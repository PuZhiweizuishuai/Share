<template>
  <v-container class="share-list-com">
    <v-card v-for="item in shareList" :key="item.id" class="share-card" elevation="0">
      <!-- 卡片头部：类型图标 + 时间/编辑器徽章 + 操作按钮 -->
      <div class="share-card__head">
        <!-- <div class="share-card__icon">
          <v-icon icon="mdi-text-box-outline" size="20"></v-icon>
        </div> -->
        <div class="share-card__meta">
          <span class="meta-pill">
            <v-icon size="13" icon="mdi-clock-outline"></v-icon>
            {{ formateTimeToChinese(item.createTime) }}
          </span>
          <!-- <span class="meta-pill">
            <v-icon size="13" icon="mdi-pen-outline"></v-icon>
            {{ item.editType == 1 ? '富文本' : 'Markdown' }}
          </span> -->
        </div>
        <!-- <v-spacer /> -->
        <div class="share-card__actions">
          <v-tooltip v-if="item.publicUser" location="top" text="点击查看共享状态">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                variant="tonal"
                size="small"
                color="deep-purple"
                @click="showShareStatus(item)"
              >
                <v-icon icon="mdi-share-variant-outline"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip
            v-else-if="showShareBtn && (item.publicUser == false || item.publicUser == null)"
            location="top"
            text="分享"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                variant="text"
                size="small"
                color="primary"
                @click="showShareInfo(item)"
              >
                <v-icon icon="mdi-share-variant-outline"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip location="top" text="删除">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                variant="text"
                size="small"
                color="error"
                @click="showDeleteDialog(item)"
              >
                <v-icon icon="mdi-delete-outline"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </div>
      <v-divider />
      <v-card-text class="share-card__body">
        <ShowHtml v-if="item.editType == 1" :text="item.data" />
        <ShowMarkdown v-else :markdown="item.data" :speech="false" />
      </v-card-text>
    </v-card>
    <!-- 删除弹框 -->
    <v-dialog v-model="showDelete" max-width="440">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--error">
            <v-icon icon="mdi-delete-alert-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">删除这条分享</div>
          <div class="dlg__subtitle">删除后将无法恢复，请谨慎操作</div>
        </div>
        <v-card-text>
          <div class="dlg__target" :title="deleteData.data">
            <div class="dlg__target-icon dlg__target-icon--text">
              <v-icon size="18" icon="mdi-text-box-outline"></v-icon>
            </div>
            <span class="dlg__target-name">{{ subString(deleteData.data) }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showDelete = false">放弃</v-btn>
          <v-btn color="error" variant="flat" @click="deleteShare()">确认删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 分享弹框 -->
    <v-dialog v-model="showShareDialog" max-width="460">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--primary">
            <v-icon icon="mdi-share-variant-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">分享这条内容</div>
          <div class="dlg__subtitle">分享后任何人均可通过链接查看</div>
        </div>
        <v-card-text>
          <div class="dlg__target" :title="shareItem.data">
            <div class="dlg__target-icon dlg__target-icon--text">
              <v-icon size="18" icon="mdi-text-box-outline"></v-icon>
            </div>
            <span class="dlg__target-name">{{ subString(shareItem.data) }}</span>
          </div>
          <v-switch
            v-model="shareItem.haveUserSeeKey"
            class="mt-2"
            color="primary"
            inset
            hide-details
            label="启用访问密码"
          ></v-switch>
          <v-text-field
            v-show="shareItem.haveUserSeeKey"
            v-model="shareItem.userSeeKey"
            class="mt-2"
            variant="outlined"
            density="compact"
            label="访问密码"
            prepend-inner-icon="mdi-key-variant"
            clearable
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showShareDialog = false">放弃</v-btn>
          <v-btn color="primary" variant="flat" @click="sendSaveShare()">立即分享</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享成功弹窗 -->
    <v-dialog v-model="showseccussShareDialog" max-width="460">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--success">
            <v-icon icon="mdi-check-circle-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">分享成功</div>
          <div class="dlg__subtitle">复制下面的内容发送给你的好友吧</div>
        </div>
        <v-card-text>
          <div class="dlg__link">{{ successShareInfo }}</div>
          <v-btn class="mt-3" block variant="tonal" color="primary" @click="copy()">
            <v-icon icon="mdi-content-copy" start></v-icon>
            复制内容
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 取消分享 -->
    <v-dialog v-model="showShareStatusDilog" max-width="1000">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--purple">
            <v-icon icon="mdi-share-variant-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">分享状态</div>
          <div class="dlg__subtitle">任何人都可通过此链接查看这条分享</div>
        </div>
        <v-card-text>
          <div class="dlg__link">{{ successShareInfo }}</div>
          <div class="text-center mt-3">
            <v-btn variant="tonal" color="primary" size="small" @click="copy()">
              <v-icon icon="mdi-content-copy" start></v-icon>
              复制链接
            </v-btn>
          </div>
          <ViewLogTable
            :target="showShareStatusItem.id"
            :types="0"
          ></ViewLogTable>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showShareStatusDilog = false">关闭</v-btn>
          <v-btn
            color="error"
            variant="flat"
            v-if="showShareBtn"
            @click="cancelShare()"
          >
            取消分享
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="3000"
      :top="true"
    >
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import ShowMarkdown from "@/components/vditor/show-markdown.vue";
import ShowHtml from "@/components/wangeditor/show-html.vue";
import ViewLogTable from "@/components/view-log-list.vue";
export default {
  name: "ShareList",
  components: { ShowMarkdown, ShowHtml, ViewLogTable },
  props: {
    shareList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      page: 1,
      length: 0,
      size: 15,
      total: 0,
      showDelete: false,
      deleteData: {
        data: "",
      },
      auto: false,
      snackbar: false,
      message: "删除成功",
      key: "",
      interval: () => {
        return null;
      },
      showShareDialog: false,
      shareItem: {
        haveUserSeeKey: false,
        userSeeKey: "",
      },
      showseccussShareDialog: false,
      successShareInfo: "",
      showShareBtn: false,
      //
      showShareStatusDilog: false,
      showShareStatusItem: {},
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.successShareInfo)
      this.message = '已复制到剪贴板'
      this.snackbar = true
    },
    cancelShare() {
      this.showShareStatusItem.data = "";
      this.httpPost(
        "/public/share/cancel",
        this.showShareStatusItem,
        (json) => {
          if (json.data) {
            this.message = "取消成功";
            this.snackbar = true;
            this.showShareStatusItem.publicUser = false;
            this.showShareStatusDilog = false;
          } else {
            this.message = "取消失败";
            this.snackbar = true;
            this.showShareStatusDilog = false;
          }
        }
      );
    },
    showShareStatus(item) {
      this.showShareStatusItem = item;

      this.successShareInfo = `链接：${location.origin}/#/share/share/${this.showShareStatusItem.url}`;
      if (this.showShareStatusItem.haveUserSeeKey) {
        this.successShareInfo += `\n密码：${this.showShareStatusItem.userSeeKey}`;
      }

      this.showShareStatusDilog = true;
    },
    checkLogin() {
      this.httpGet("/login/check", (json) => {
        if (json.status == 200) {
          this.showShareBtn = true;
        } else {
          this.showShareBtn = false;
        }
      });
    },
    showShareInfo(item) {
      this.showShareDialog = true;
      this.shareItem = item;
    },

    sendSaveShare() {
      this.httpPost(`/public/share`, this.shareItem, (json) => {
        if (json.data != null) {
          this.successShareInfo = `链接：${location.origin}/#/share/share/${json.data.url}`;
          if (this.shareItem.haveUserSeeKey) {
            this.successShareInfo += `\n密码：${this.shareItem.userSeeKey}`;
          }
          this.showseccussShareDialog = true;
          this.showShareDialog = false;
        } else {
          this.message = json.message;
          this.snackbar = true;
        }
      });
    },
    deleteShare() {
      this.httpPost(`/share/delete`, this.deleteData, (json) => {
        if (json.status === 200) {
          this.message = "删除成功！";
          this.snackbar = true;
          this.showDelete = false;
          // this.getShareList()
          this.$emit("delete", true);
        } else {
          this.message = "删除失败！" + json.message;
          this.snackbar = true;
          this.$emit("delete", false);
        }
      });
    },
    showDeleteDialog(value) {
      this.deleteData = value;
      this.showDelete = true;
    },
    formateTimeToChinese(date) {
      if (date === "" || date == null) {
        return "";
      }
      const da = new Date(date);
      return (
        da.getFullYear() +
        "年" +
        (da.getMonth() + 1) +
        "月" +
        da.getDate() +
        "日 " +
        da.getHours() +
        "时" +
        da.getMinutes() +
        "分"
      );
    },
    subString(data) {
      if (data.length > 30) {
        return data.substring(0, 30) + "......";
      }
      return data;
    },
  },
};
</script>

<style scoped>
/* ===== 分享卡片 ===== */
.share-list-com {
  padding: 0;
  max-width: none;
}

.share-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-bottom: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.share-card:hover {
  border-color: rgba(25, 118, 210, 0.35);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.1);
  transform: translateY(-1px);
}

.share-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  flex-wrap: wrap;
}

.share-card__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.share-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 12.5px;
  color: rgba(0, 0, 0, 0.55);
  white-space: nowrap;
}

.share-card__actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  margin-left: auto;
}

.share-card__body {
  padding: 16px;
}


/* ===== 移动端适配 ===== */
@media (max-width: 600px) {
  .share-card__head {
    gap: 10px;
    padding: 10px 12px;
  }


  .share-card__icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
  }

  .share-card__body {
    padding: 12px;
  }
}

/* ===== 通用弹框 ===== */
.dlg {
  border-radius: 16px;
  padding-top: 8px;
}

.dlg__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: 20px;
  text-align: center;
}

.dlg__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 6px;
}

.dlg__icon--error {
  background: rgba(var(--v-theme-error), 0.1);
  color: rgb(var(--v-theme-error));
}

.dlg__icon--primary {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.dlg__icon--success {
  background: rgba(var(--v-theme-success), 0.12);
  color: rgb(var(--v-theme-success));
}

.dlg__icon--purple {
  background: rgba(103, 58, 183, 0.1);
  color: #673ab7;
}

.dlg__title {
  font-size: 17px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.dlg__subtitle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

.dlg__target {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.dlg__target-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.dlg__target-icon--text {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.dlg__target-name {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.75);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dlg__link {
  padding: 14px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px dashed rgba(0, 0, 0, 0.14);
  font-size: 13px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.65);
  white-space: pre-line;
  word-break: break-all;
}
</style>
