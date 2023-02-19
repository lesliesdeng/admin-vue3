<template>
  <div class="page-modal">
    <el-drawer
      :title="modalConfig.title"
      v-model="dialogVisible"
      width="50%"
      append-to-body
      v-bind="modalConfig.modalStyle"
      :close-on-click-modal="false"
      center
      destroy-on-close
    >
      <ui-form v-bind="modalConfig" v-model="formData" ref="ruleFormRef"></ui-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
        </span>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import { useStore } from '@/store'
// import { ElDialog, ElDrawer } from 'element-plus/lib/index'
import UiForm from '@/base-ui/form'

export default defineComponent({
  components: {
    UiForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const ruleFormRef: any = ref(null)
    // 1.绑定属性
    const store = useStore()
    const originFormData: any = {}
    const formData = ref({ ...originFormData })
    // const currentComp = ref(ElDialog)

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 2.内部处理
    const dialogVisible = ref(false)
    const handleConfirmClick = async () => {
      let formCheck = false
      await ruleFormRef.value.ruleUFormRef.validate((valid: any, fields: any) => {
        if (valid) {
          formCheck = true
          console.log('submit!')
        } else {
          formCheck = false
          console.log('error submit!', fields)
        }
      })
      if (!formCheck) {
        return
      }
      // 关闭弹窗
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          queryInfo: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/newPageDataAction', {
          pageName: props.pageName,
          queryInfo: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      formData,
      dialogVisible,
      handleConfirmClick,
      ruleFormRef
      // currentComp
    }
  }
})
</script>

<style scoped></style>
