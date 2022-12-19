<!--
 * @Author: cyy
 * @Date: 2022-12-19 11:28:33
 * @LastEditors: cyy
 * @LastEditTime: 2022-12-19 15:15:58
 * @Description: 
-->
<template lang="pug">
.check-box
  .title 验房清单
    a(href="https://cyyjs.github.io/zhengzhou_house_knowledge/finally/" target="_blank") 核心提醒
  template(v-for="(item, i) in list" :key="i")
    van-divider {{i+1}}、{{item.title}}
    .list
      .item(:class="{open: active.join('-') === [i,j].join('-')}" v-for="(text, j) in item.list" :key="[i,j].join('-')" @click="active=[i,j]")
        .text
          van-tag(:type="result[[i,j].join('-')].pass || 'primary'" round size="medium") {{i+1}}.{{j+1}}
          span.body {{text}}
        .footer
          van-button(size="small" text="跳过" @click="changeStatus([i,j].join('-'), '')")
          van-button(size="small" type="danger" text="不通过" @click="changeStatus([i,j].join('-'), 'danger')")
          van-button(size="small" type="success" text="通过" @click="changeStatus([i,j].join('-'), 'success')")
        .remark(:class="{showRemark: result[[i,j].join('-')].remark}")
          van-field(
            v-model="result[[i,j].join('-')].remark"
            rows="1"
            autosize
            label=""
            @blur="save"
            type="textarea"
            placeholder="请输入备注"
          )
    
</template>
<script>
import list from './data'
import { ref } from 'vue'

export default {
  setup() {
    const active = ref([])
    const result = ref({})
    try {
      const store = JSON.parse(localStorage.getItem('result'))
      if (store) {
        result.value = store
      }
    } catch (e) { }
    list.forEach((item,i) => {
      item.list.forEach((t, j) => {
        const k = [i, j].join('-')
        result.value[k] = result.value[k] || {
          pass: '',
          remark: ''
        }
      })
    })
    const save = () => {
      localStorage.setItem('result', JSON.stringify(result.value))
    }
    const changeStatus = (k, v) => {
      result.value[k].pass = v
      save()
    }
    
    return {
      changeStatus,
      save,
      active,
      list,
      result
    }
  }
}
</script>
<style lang="less" scoped>
.check-box {
  &>.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    a {
      position: absolute;
      right: 10px;
      font-size: 14px;
    }
  }
  .list {
    &>.item {
      background-color: #fff;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      .van-tag {
        border-radius: 5px;
        margin-right: 5px;
        display: inline-block;
      }
      .footer {
        display: none;
        text-align: right;
        button {
          margin-left: 20px;
          margin-bottom: 5px;
        }
      }
      .remark {
        display: none;
        .van-field {
          background-color: #cccccc36;
          border-radius: 5px;
        }
        &.showRemark {
          display: block;
        }
      }
      &.open {
        .footer {
          display: block;
        }
        .remark {
          display: block;
        }
      }
    }
  }
}
</style>