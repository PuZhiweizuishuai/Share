<template>
  <div class="file-search-list">
    <!-- 文件结果卡片 -->
    <template v-if="fileList.length > 0">
      <v-card v-for="item in fileList" :key="item.id" class="file-card" elevation="0">
        <div class="file-item">
          <!-- 文件类型图标 -->
          <div class="file-icon" :style="iconStyle(item.uploadFilename)">
            <v-icon :icon="fileMeta(item.uploadFilename).icon" size="26"></v-icon>
          </div>

          <!-- 文件信息 -->
          <div class="file-info">
            <v-tooltip
              v-if="item.uploadFilename.length >= 40"
              location="top"
              :text="item.uploadFilename"
            >
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="file-name" style="cursor: default">
                  {{ showFileName(item.uploadFilename) }}
                </div>
              </template>
            </v-tooltip>
            <div v-else class="file-name" :title="item.uploadFilename">
              {{ item.uploadFilename }}
            </div>

            <div class="file-meta">
              <span class="meta-item">
                <v-icon size="14" icon="mdi-database-outline"></v-icon>
                {{ showSize(item.size) }}
              </span>
              <span class="meta-item">
                <v-icon size="14" icon="mdi-clock-outline"></v-icon>
                {{ formateTimeToChinese(item.createTime) }}
              </span>
              <v-tooltip v-if="item.publicUser" location="top" text="点击查看共享状态">
                <template v-slot:activator="{ props }">
                  <span
                    v-bind="props"
                    class="meta-item meta-item--shared"
                    @click="showShareStatus(item)"
                  >
                    <v-icon size="14" icon="mdi-share-variant-outline"></v-icon>
                    已共享
                  </span>
                </template>
              </v-tooltip>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="file-actions">
            <v-tooltip location="top" text="预览">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  variant="text"
                  size="small"
                  color="teal"
                  :href="`${item.path}?filename=${encodeURIComponent(item.uploadFilename)}&type=inline`"
                  target="_blank"
                >
                  <v-icon icon="mdi-eye-outline"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip location="top" text="下载">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  variant="text"
                  size="small"
                  color="success"
                  :href="`${item.path}?filename=${encodeURIComponent(item.uploadFilename)}&type=attachment`"
                  target="_blank"
                >
                  <v-icon icon="mdi-download-outline"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>
            <template v-if="showShareBtn">
              <v-tooltip
                v-if="item.publicUser == false || item.publicUser == null"
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
            </template>
          </div>
        </div>
      </v-card>
    </template>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <v-icon icon="mdi-file-search-outline" size="64" class="empty-state__icon"></v-icon>
      <div class="empty-state__title">没有找到匹配的文件分享</div>
      <div class="empty-state__subtitle">换个关键词试试，或切换到文本分享看看</div>
    </div>

    <!-- 删除弹框 -->
    <v-dialog v-model="showDelete" max-width="490">
      <v-card>
        <v-card-title class="headline">你确定要删除这个文件吗？</v-card-title>

        <v-card-text>
          <span v-text="deleteItemDate.uploadFilename" /> <br /><br />
          删除后将无法恢复，请谨慎操作！！！
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="showDelete = false">
            放弃
          </v-btn>

          <v-btn color="error" text @click="deleteFile()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享弹框 -->
    <v-dialog v-model="showShareDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">你要将这份文件分享出去吗？</v-card-title>

        <v-card-text>
          <p>
            <span v-text="shareItem.uploadFilename" /><br />
            分享后在任何人均可查看
          </p>
          <p>
            <v-row justify="center">
              <v-col>
                <v-switch
                  v-model="shareItem.haveUserSeeKey"
                  color="blue"
                  label="是否启用密码"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row justify="center" v-show="shareItem.haveUserSeeKey">
              <v-col>
                <v-text-field
                  v-model="shareItem.userSeeKey"
                  placeholder="密码"
                  label="密码"
                  clearable
                  variant="underlined"
                />
              </v-col>
            </v-row>
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="showShareDialog = false">
            放弃
          </v-btn>

          <v-btn color="error" text @click="sendSaveShare()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享成功弹窗 -->
    <v-dialog v-model="showseccussShareDialog" max-width="490">
      <v-card>
        <v-card-title class="headline"
          >分享成功，复制下面内容给你的好友吧！</v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col>
              {{ successShareInfo }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="blue-lighten-5" @click="copy()">复制</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 查看取消分享弹窗 -->
    <v-dialog v-model="showShareStatusDilog" max-width="1000">
      <v-card>
        <v-card-title class="headline">分享状态</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              {{ successShareInfo }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="blue-lighten-5" @click="copy()">复制</v-btn>
            </v-col>
          </v-row>
          <ViewLogTable
            :target="showShareStatusItem.id"
            :types="1"
          ></ViewLogTable>
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="showShareStatusDilog = false"
          >
            关闭
          </v-btn>

          <v-btn color="error" v-if="showShareBtn" text @click="cancelShare()">
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
  </div>
</template>

<script>
import ViewLogTable from "@/components/view-log-list.vue";
export default {
  name: "FileSearchList",
  components: { ViewLogTable },
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      showDelete: false,
      deleteItemDate: {
        uploadFilename: "",
      },
      snackbar: false,
      message: "删除成功",
      showShareDialog: false,
      shareItem: {
        haveUserSeeKey: false,
        userSeeKey: "",
      },
      showseccussShareDialog: false,
      successShareInfo: "",
      showShareBtn: false,
      showShareStatusDilog: false,
      showShareStatusItem: {},
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    // 根据文件扩展名返回对应图标与配色
    fileMeta(name) {
      const ext = ((name || "").split(".").pop() || "").toLowerCase();
      if (
        ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico", "tif", "tiff"].includes(
          ext
        )
      ) {
        return { icon: "mdi-file-image-outline", color: "#AB47BC", bg: "rgba(171, 71, 188, 0.12)" };
      }
      if (["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm", "m4v"].includes(ext)) {
        return { icon: "mdi-file-video-outline", color: "#EC407A", bg: "rgba(236, 64, 122, 0.12)" };
      }
      if (["mp3", "wav", "flac", "ape", "ogg", "m4a", "aac"].includes(ext)) {
        return { icon: "mdi-file-music-outline", color: "#26A69A", bg: "rgba(38, 166, 154, 0.12)" };
      }
      if (["zip", "rar", "7z", "tar", "gz", "bz2", "xz"].includes(ext)) {
        return { icon: "mdi-folder-zip-outline", color: "#FFA726", bg: "rgba(255, 167, 38, 0.14)" };
      }
      if (ext === "pdf") {
        return { icon: "mdi-file-pdf-box", color: "#EF5350", bg: "rgba(239, 83, 80, 0.12)" };
      }
      if (["doc", "docx", "rtf"].includes(ext)) {
        return { icon: "mdi-file-word-box", color: "#42A5F5", bg: "rgba(66, 165, 245, 0.12)" };
      }
      if (["xls", "xlsx", "csv"].includes(ext)) {
        return { icon: "mdi-file-excel-box", color: "#66BB6A", bg: "rgba(102, 187, 106, 0.12)" };
      }
      if (["ppt", "pptx"].includes(ext)) {
        return { icon: "mdi-file-powerpoint-box", color: "#FF7043", bg: "rgba(255, 112, 67, 0.12)" };
      }
      if (["txt", "md", "log", "json", "xml", "yml", "yaml"].includes(ext)) {
        return { icon: "mdi-file-document-outline", color: "#78909C", bg: "rgba(120, 144, 156, 0.12)" };
      }
      if (["apk", "exe", "msi", "dmg", "iso"].includes(ext)) {
        return { icon: "mdi-application-cog", color: "#8D6E63", bg: "rgba(141, 110, 99, 0.12)" };
      }
      return { icon: "mdi-file-outline", color: "#546E7A", bg: "rgba(84, 110, 123, 0.1)" };
    },
    iconStyle(name) {
      const meta = this.fileMeta(name);
      return { background: meta.bg, color: meta.color };
    },
    copy() {
      navigator.clipboard.writeText(this.successShareInfo);
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
      this.shareItem = item;
      this.showShareDialog = true;
    },
    sendSaveShare() {
      this.shareItem.size = 0;
      this.shareItem.createTime = 0;
      this.httpPost(`/public/file`, this.shareItem, (json) => {
        if (json.data != null) {
          this.successShareInfo = `链接：${location.origin}/#/share/file/${json.data.url}`;
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
    showShareStatus(item) {
      this.showShareStatusItem = item;
      this.successShareInfo = `链接：${location.origin}/#/share/file/${this.showShareStatusItem.url}`;
      if (this.showShareStatusItem.haveUserSeeKey) {
        this.successShareInfo += `\n密码：${this.showShareStatusItem.userSeeKey}`;
      }
      this.showShareStatusDilog = true;
    },
    cancelShare() {
      this.showShareStatusItem.createTime = 0;
      this.showShareStatusItem.size = 0;
      this.httpPost("/public/file/cancel", this.showShareStatusItem, (json) => {
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
      });
    },
    showDeleteDialog(value) {
      this.deleteItemDate = value;
      this.showDelete = true;
    },
    deleteFile() {
      this.deleteItemDate.size = 0;
      this.deleteItemDate.createTime = 0;
      fetch(`/api/file/delete`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-XSRF-TOKEN": this.$cookies.get("XSRF-TOKEN"),
        },
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(this.deleteItemDate),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === 200) {
            this.message = "删除成功！";
          } else {
            this.message = "删除失败！" + json.message;
          }
          this.showDelete = false;
          this.snackbar = true;
          this.$emit("refresh", true);
        })
        .catch(() => {
          return null;
        });
    },
    showFileName(name) {
      if (name.length >= 40) {
        return name.substr(0, 15) + "..." + name.substr(name.length - 10, 10);
      }
      return name;
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
    showSize(size) {
      if (size == null || isNaN(size)) {
        return "";
      }
      if (size < 1024) {
        return size + " B";
      }
      const kb = size / 1024;
      if (kb < 1024) {
        return kb.toFixed(2) + " KB";
      }
      const mb = kb / 1024;
      if (mb < 1024) {
        return mb.toFixed(2) + " MB";
      }
      return (mb / 1024).toFixed(2) + " GB";
    },
  },
};
</script>

<style scoped>
.file-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-bottom: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.file-card:hover {
  border-color: rgba(25, 118, 210, 0.35);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.1);
  transform: translateY(-1px);
}

.file-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
}

.file-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 5px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}

.meta-item--shared {
  color: #673ab7;
  background: rgba(103, 58, 183, 0.08);
  padding: 2px 10px;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.meta-item--shared:hover {
  background: rgba(103, 58, 183, 0.16);
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

/* ===== 空状态 ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 64px 16px;
  text-align: center;
  border: 1.5px dashed rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.02);
}

.empty-state__icon {
  opacity: 0.35;
}

.empty-state__title {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
}

.empty-state__subtitle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
  max-width: 460px;
}

/* ===== 移动端适配 ===== */
@media (max-width: 600px) {
  .file-item {
    gap: 10px;
    padding: 12px;
  }

  .file-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .file-meta {
    gap: 8px;
  }
}
</style>
