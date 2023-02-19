<template>
  <div class="user">
    <page-search
      :searchConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <page-content
      ref="pageContentRef"
      :contentConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #userhandler>
        <div class="handler">
          <el-button type="primary" link size="small">
            <el-icon style="vertical-align: middle" size="14">
              <Edit />
            </el-icon>
            自定义
          </el-button>
          <el-button link type="danger" size="small">
            <el-icon style="vertical-align: middle" size="14">
              <Delete />
            </el-icon>
            删除
          </el-button>
        </div>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      :defaultInfo="modalInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { IFormItem } from '@/base-ui/form'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 1.查询和重置处理
    const [pageContentRef, handleQueryClick, handleResetClick]: any = usePageSearch()

    // 配置信息
    const store = useStore()

    // 需特殊处理的弹窗项，表格项同理
    const modalConfigRef = computed(() => {
      const roleOption: IFormItem | undefined = modalConfig.formItems?.find(
        (item) => item.field === 'roleId'
      )
      roleOption!.options = store.state.entireRoles.map((item: any) => {
        return { label: item.name, value: item.id }
      })
      const departmentOption: IFormItem | undefined = modalConfig.formItems?.find(
        (item) => item.field === 'departmentId'
      )
      departmentOption!.options = store.state.entireDepartments.map((item: any) => {
        return { label: item.name, value: item.id }
      })
      return modalConfig
    })

    // 区分新增打开还是编辑打开
    const newHandleCallback = () => {
      const passwordItem = modalConfigRef.value.formItems?.find((item) => item.field === 'password')
      passwordItem!.isHidden = false
    }
    const editHandleCallback = () => {
      const passwordItem = modalConfigRef.value.formItems?.find((item) => item.field === 'password')
      passwordItem!.isHidden = true
    }

    // 处理的hook
    const [modalInfo, pageModalRef, handleNewData, handleEditData]: any = usePageModal(
      newHandleCallback,
      editHandleCallback
    )

    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      handleResetClick,
      pageContentRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      modalConfigRef,
      modalInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
