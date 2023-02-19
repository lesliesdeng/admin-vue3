<template>
  <div class="page-search">
    <ui-form v-bind="searchConfig" v-model="formData">
      <template #footer>
        <div class="btns">
          <el-button size="default" @click="handleResetClick">
            <el-icon style="vertical-align: middle" size="14">
              <Refresh />
            </el-icon>
            重置
          </el-button>
          <el-button type="primary" size="default" @click="handleQueryClick">
            <el-icon style="vertical-align: middle" size="14">
              <Search />
            </el-icon>
            查询
          </el-button>
        </div>
      </template>
    </ui-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import UiForm, { IForm } from '@/base-ui/form'

interface IFormData {
  [key: string]: any
}

export default defineComponent({
  components: {
    UiForm
  },
  props: {
    searchConfig: {
      type: Object as PropType<IForm>,
      required: true
    },
    title: {
      type: String,
      default: '高级检索'
    }
  },
  emits: ['queryBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    const originFormData: IFormData = {}
    const formItems = props.searchConfig.formItems ?? []
    for (const formItem of formItems) {
      originFormData[`${formItem.field}`] = ''
    }

    const formData = ref<IFormData>({ ...originFormData })

    const handleResetClick = () => {
      for (const key in originFormData) {
        formData.value[`${key}`] = originFormData[key]
      }
      emit('resetBtnClick')
    }

    const handleQueryClick = () => {
      console.log({ ...formData.value })
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  /deep/.el-form-item {
    margin-bottom: 0;
  }
}
.title {
  padding-left: 30px;
  text-align: left;
}

.btns {
  text-align: right;
  padding: 0 10px 20px 0;
}
</style>
